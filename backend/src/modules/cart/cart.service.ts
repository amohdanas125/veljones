import { Injectable, Inject, Optional } from '@nestjs/common';
import { DRIZZLE_PROVIDER } from '../../db/drizzle.provider';
import * as schema from '../../db/schema';
import { eq, and } from 'drizzle-orm';
import { ProductsService } from '../products/products.service';

export interface CartItemDto {
  id: string | number;
  productId: number;
  product: any;
  size: string;
  quantity: number;
  price: number;
  total: number;
}

@Injectable()
export class CartService {
  // In-memory fallback map: sessionId -> items[]
  private fallbackStore: Map<string, Array<{ id: string; productId: number; size: string; quantity: number }>> = new Map();

  constructor(
    @Optional()
    @Inject(DRIZZLE_PROVIDER)
    private readonly db: any,
    private readonly productsService: ProductsService,
  ) {}

  async getCart(sessionId: string) {
    let rawItems: Array<{ id: string | number; productId: number; size: string; quantity: number }> = [];

    if (this.db) {
      try {
        const rows = await this.db.select().from(schema.cartItems).where(eq(schema.cartItems.sessionId, sessionId));
        rawItems = rows.map((r: any) => ({
          id: r.id,
          productId: r.productId,
          size: r.size || 'M',
          quantity: r.quantity,
        }));
      } catch (e) {
        console.warn('DB getCart fallback:', (e as any).message);
        rawItems = this.fallbackStore.get(sessionId) || [];
      }
    } else {
      rawItems = this.fallbackStore.get(sessionId) || [];
    }

    // Hydrate items with product details
    const items: CartItemDto[] = [];
    let subtotal = 0;

    for (const item of rawItems) {
      const product = await this.productsService.findById(item.productId);
      if (product) {
        const itemPrice = parseFloat(product.price);
        const itemTotal = itemPrice * item.quantity;
        subtotal += itemTotal;
        items.push({
          id: item.id,
          productId: item.productId,
          product,
          size: item.size,
          quantity: item.quantity,
          price: itemPrice,
          total: itemTotal,
        });
      }
    }

    const freeShippingThreshold = 1500;
    const shipping = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 150;
    const total = subtotal + shipping;

    return {
      items,
      itemCount: items.reduce((sum, it) => sum + it.quantity, 0),
      subtotal,
      shipping,
      freeShippingThreshold,
      qualifiesForFreeShipping: subtotal >= freeShippingThreshold,
      amountNeededForFreeShipping: Math.max(0, freeShippingThreshold - subtotal),
      total,
      currency: 'INR',
    };
  }

  async addItem(sessionId: string, productId: number, size: string, quantity: number = 1) {
    if (this.db) {
      try {
        const existing = await this.db.query.cartItems.findFirst({
          where: and(
            eq(schema.cartItems.sessionId, sessionId),
            eq(schema.cartItems.productId, productId),
            eq(schema.cartItems.size, size),
          ),
        });

        if (existing) {
          await this.db
            .update(schema.cartItems)
            .set({ quantity: existing.quantity + quantity })
            .where(eq(schema.cartItems.id, existing.id));
        } else {
          await this.db.insert(schema.cartItems).values({
            sessionId,
            productId,
            size,
            quantity,
          });
        }
        return this.getCart(sessionId);
      } catch (e) {
        console.warn('DB addItem fallback:', (e as any).message);
      }
    }

    // Fallback store
    const list = this.fallbackStore.get(sessionId) || [];
    const found = list.find(it => it.productId === productId && it.size === size);
    if (found) {
      found.quantity += quantity;
    } else {
      list.push({
        id: `cart_${Date.now()}_${Math.random().toString(36).substring(7)}`,
        productId,
        size: size || 'M',
        quantity,
      });
    }
    this.fallbackStore.set(sessionId, list);
    return this.getCart(sessionId);
  }

  async updateQuantity(sessionId: string, itemId: string | number, quantity: number) {
    if (quantity <= 0) {
      return this.removeItem(sessionId, itemId);
    }

    if (this.db && typeof itemId === 'number') {
      try {
        await this.db
          .update(schema.cartItems)
          .set({ quantity })
          .where(and(eq(schema.cartItems.id, itemId), eq(schema.cartItems.sessionId, sessionId)));
        return this.getCart(sessionId);
      } catch (e) {
        console.warn('DB updateQuantity fallback:', (e as any).message);
      }
    }

    const list = this.fallbackStore.get(sessionId) || [];
    const it = list.find(x => String(x.id) === String(itemId));
    if (it) {
      it.quantity = quantity;
    }
    return this.getCart(sessionId);
  }

  async removeItem(sessionId: string, itemId: string | number) {
    if (this.db && typeof itemId === 'number') {
      try {
        await this.db
          .delete(schema.cartItems)
          .where(and(eq(schema.cartItems.id, itemId), eq(schema.cartItems.sessionId, sessionId)));
        return this.getCart(sessionId);
      } catch (e) {
        console.warn('DB removeItem fallback:', (e as any).message);
      }
    }

    let list = this.fallbackStore.get(sessionId) || [];
    list = list.filter(x => String(x.id) !== String(itemId));
    this.fallbackStore.set(sessionId, list);
    return this.getCart(sessionId);
  }

  async clearCart(sessionId: string) {
    if (this.db) {
      try {
        await this.db.delete(schema.cartItems).where(eq(schema.cartItems.sessionId, sessionId));
      } catch (e) {
        console.warn('DB clearCart fallback:', (e as any).message);
      }
    }
    this.fallbackStore.set(sessionId, []);
    return this.getCart(sessionId);
  }
}
