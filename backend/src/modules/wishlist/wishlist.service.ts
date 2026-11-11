import { Injectable, Inject, Optional } from '@nestjs/common';
import { DRIZZLE_PROVIDER } from '../../db/drizzle.provider';
import * as schema from '../../db/schema';
import { eq, and } from 'drizzle-orm';
import { ProductsService } from '../products/products.service';

@Injectable()
export class WishlistService {
  // In-memory fallback: sessionId -> Set of productIds
  private fallbackStore: Map<string, Set<number>> = new Map();

  constructor(
    @Optional()
    @Inject(DRIZZLE_PROVIDER)
    private readonly db: any,
    private readonly productsService: ProductsService,
  ) {}

  async getWishlist(sessionId: string) {
    let productIds: number[] = [];

    if (this.db) {
      try {
        const rows = await this.db.select().from(schema.wishlistItems).where(eq(schema.wishlistItems.sessionId, sessionId));
        productIds = rows.map((r: any) => r.productId);
      } catch (e) {
        console.warn('DB wishlist query fallback:', (e as any).message);
        productIds = Array.from(this.fallbackStore.get(sessionId) || []);
      }
    } else {
      productIds = Array.from(this.fallbackStore.get(sessionId) || []);
    }

    const products = [];
    for (const pid of productIds) {
      const prod = await this.productsService.findById(pid);
      if (prod) products.push(prod);
    }

    return {
      items: products,
      count: products.length,
      productIds,
    };
  }

  async toggleWishlist(sessionId: string, productId: number) {
    if (this.db) {
      try {
        const existing = await this.db.query.wishlistItems.findFirst({
          where: and(
            eq(schema.wishlistItems.sessionId, sessionId),
            eq(schema.wishlistItems.productId, productId),
          ),
        });

        if (existing) {
          await this.db.delete(schema.wishlistItems).where(eq(schema.wishlistItems.id, existing.id));
          return { inWishlist: false, productId };
        } else {
          await this.db.insert(schema.wishlistItems).values({ sessionId, productId });
          return { inWishlist: true, productId };
        }
      } catch (e) {
        console.warn('DB toggleWishlist fallback:', (e as any).message);
      }
    }

    let set = this.fallbackStore.get(sessionId);
    if (!set) {
      set = new Set<number>();
      this.fallbackStore.set(sessionId, set);
    }

    if (set.has(productId)) {
      set.delete(productId);
      return { inWishlist: false, productId };
    } else {
      set.add(productId);
      return { inWishlist: true, productId };
    }
  }

  async removeItem(sessionId: string, productId: number) {
    if (this.db) {
      try {
        await this.db
          .delete(schema.wishlistItems)
          .where(and(eq(schema.wishlistItems.sessionId, sessionId), eq(schema.wishlistItems.productId, productId)));
      } catch (e) {
        console.warn('DB wishlist removeItem fallback:', (e as any).message);
      }
    }

    const set = this.fallbackStore.get(sessionId);
    if (set) {
      set.delete(productId);
    }
    return this.getWishlist(sessionId);
  }
}
