import { Injectable, Inject, Optional } from '@nestjs/common';
import { DRIZZLE_PROVIDER } from '../../db/drizzle.provider';
import * as schema from '../../db/schema';
import { eq, like, or, ilike, and } from 'drizzle-orm';
import {
  INITIAL_PRODUCTS,
  INITIAL_COLLECTIONS,
  INITIAL_CATEGORIES,
  INITIAL_REELS,
  InitialProduct,
} from '../../db/initial-catalog';

@Injectable()
export class ProductsService {
  constructor(
    @Optional()
    @Inject(DRIZZLE_PROVIDER)
    private readonly db: any,
  ) {}

  async findAll(query?: {
    collection?: string;
    category?: string;
    gender?: string;
    search?: string;
    limit?: number;
  }) {
    if (this.db) {
      try {
        let conditions: any[] = [];
        if (query?.collection) {
          conditions.push(eq(schema.products.collectionSlug, query.collection));
        }
        if (query?.gender) {
          conditions.push(or(eq(schema.products.gender, query.gender), eq(schema.products.gender, 'unisex')));
        }
        if (query?.search) {
          conditions.push(ilike(schema.products.title, `%${query.search}%`));
        }

        const whereClause = conditions.length > 0 ? and(...conditions) : undefined;
        let queryBuilder = this.db.query.products.findMany({
          where: whereClause,
          with: {
            variants: true,
            category: true,
            collection: true,
          },
          limit: query?.limit,
        });

        const results = await queryBuilder;
        if (results && results.length > 0) {
          return results;
        }
      } catch (err) {
        console.warn('DB query error, falling back to local dataset:', (err as any).message);
      }
    }

    // High performance fallback
    let items = [...INITIAL_PRODUCTS];

    if (query?.collection) {
      items = items.filter(p => p.collectionSlug.toLowerCase() === query.collection?.toLowerCase());
    }

    if (query?.category) {
      items = items.filter(p => p.categorySlug.toLowerCase() === query.category?.toLowerCase());
    }

    if (query?.gender) {
      items = items.filter(p => p.gender === 'unisex' || p.gender === query.gender);
    }

    if (query?.search) {
      const q = query.search.toLowerCase();
      items = items.filter(p => p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
    }

    if (query?.limit) {
      items = items.slice(0, query.limit);
    }

    return items;
  }

  async findBySlug(slug: string) {
    if (this.db) {
      try {
        const item = await this.db.query.products.findFirst({
          where: eq(schema.products.slug, slug),
          with: {
            variants: true,
            category: true,
            collection: true,
          },
        });
        if (item) return item;
      } catch (e) {
        console.warn('DB slug lookup error:', (e as any).message);
      }
    }

    return INITIAL_PRODUCTS.find(p => p.slug === slug) || null;
  }

  async findById(id: number) {
    if (this.db) {
      try {
        const item = await this.db.query.products.findFirst({
          where: eq(schema.products.id, id),
          with: {
            variants: true,
            category: true,
            collection: true,
          },
        });
        if (item) return item;
      } catch (e) {
        console.warn('DB id lookup error:', (e as any).message);
      }
    }

    return INITIAL_PRODUCTS.find(p => p.id === id) || null;
  }

  async getCollections() {
    if (this.db) {
      try {
        const cols = await this.db.query.collections.findMany({
          orderBy: (c: any, { asc }: any) => [asc(c.displayOrder)],
        });
        if (cols && cols.length > 0) return cols;
      } catch (e) {
        console.warn('DB collections error:', (e as any).message);
      }
    }
    return INITIAL_COLLECTIONS;
  }

  async getReels() {
    if (this.db) {
      try {
        const reelsList = await this.db.query.reels.findMany();
        if (reelsList && reelsList.length > 0) return reelsList;
      } catch (e) {
        console.warn('DB reels error:', (e as any).message);
      }
    }
    return INITIAL_REELS;
  }

  async getCatalogGroupedBySection() {
    const collections = await this.getCollections();
    const allProducts = await this.findAll();

    return collections.map(col => ({
      ...col,
      products: allProducts.filter((p: any) => p.collectionSlug === col.slug),
    }));
  }
}
