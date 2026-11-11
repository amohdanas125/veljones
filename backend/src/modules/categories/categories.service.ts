import { Injectable, Inject, Optional } from '@nestjs/common';
import { DRIZZLE_PROVIDER } from '../../db/drizzle.provider';
import * as schema from '../../db/schema';
import { INITIAL_CATEGORIES } from '../../db/initial-catalog';

@Injectable()
export class CategoriesService {
  constructor(
    @Optional()
    @Inject(DRIZZLE_PROVIDER)
    private readonly db: any,
  ) {}

  async findAll() {
    if (this.db) {
      try {
        const cats = await this.db.query.categories.findMany();
        if (cats && cats.length > 0) return cats;
      } catch (err) {
        console.warn('DB categories query fallback:', (err as any).message);
      }
    }
    return INITIAL_CATEGORIES;
  }
}
