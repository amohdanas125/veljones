import { Injectable, Inject, Optional } from '@nestjs/common';
import { DRIZZLE_PROVIDER } from '../../db/drizzle.provider';
import * as schema from '../../db/schema';
import { eq } from 'drizzle-orm';
import { CartService } from '../cart/cart.service';

export interface CheckoutDto {
  sessionId: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  paymentMethod?: string;
}

@Injectable()
export class OrdersService {
  private fallbackOrders: Map<string, any> = new Map();

  constructor(
    @Optional()
    @Inject(DRIZZLE_PROVIDER)
    private readonly db: any,
    private readonly cartService: CartService,
  ) {}

  async createOrder(dto: CheckoutDto) {
    const cart = await this.cartService.getCart(dto.sessionId);
    if (!cart.items || cart.items.length === 0) {
      throw new Error('Cart is empty. Cannot checkout.');
    }

    const orderNumber = `224-ORD-${Date.now().toString().slice(-6)}-${Math.floor(100 + Math.random() * 900)}`;

    const orderRecord = {
      orderNumber,
      customerName: dto.customerName,
      customerEmail: dto.customerEmail,
      customerPhone: dto.customerPhone || '',
      shippingAddress: dto.shippingAddress,
      totalAmount: cart.total.toFixed(2),
      currency: 'INR',
      status: 'confirmed',
      items: cart.items.map(it => ({
        productId: it.productId,
        title: it.product.title,
        size: it.size,
        price: it.price,
        quantity: it.quantity,
        total: it.total,
        thumbnail: it.product.thumbnail,
      })),
      createdAt: new Date().toISOString(),
    };

    if (this.db) {
      try {
        const [saved] = await this.db.insert(schema.orders).values({
          orderNumber: orderRecord.orderNumber,
          customerName: orderRecord.customerName,
          customerEmail: orderRecord.customerEmail,
          customerPhone: orderRecord.customerPhone,
          shippingAddress: orderRecord.shippingAddress,
          totalAmount: orderRecord.totalAmount,
          currency: orderRecord.currency,
          status: orderRecord.status,
          items: orderRecord.items,
        }).returning();

        // Clear cart
        await this.cartService.clearCart(dto.sessionId);
        return saved;
      } catch (e) {
        console.warn('DB createOrder fallback:', (e as any).message);
      }
    }

    this.fallbackOrders.set(orderNumber, orderRecord);
    await this.cartService.clearCart(dto.sessionId);
    return orderRecord;
  }

  async getOrderByNumber(orderNumber: string) {
    if (this.db) {
      try {
        const row = await this.db.query.orders.findFirst({
          where: eq(schema.orders.orderNumber, orderNumber),
        });
        if (row) return row;
      } catch (e) {
        console.warn('DB getOrderByNumber fallback:', (e as any).message);
      }
    }

    return this.fallbackOrders.get(orderNumber) || null;
  }
}
