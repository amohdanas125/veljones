import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as dotenv from 'dotenv';
import * as schema from '../db/schema';
import {
  INITIAL_CATEGORIES,
  INITIAL_COLLECTIONS,
  INITIAL_PRODUCTS,
  INITIAL_REELS,
} from '../db/initial-catalog';

dotenv.config();

async function runSeed() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString || connectionString.trim() === '' || connectionString.includes('placeholder')) {
    console.error('❌ DATABASE_URL is not configured or uses placeholder in .env!');
    console.error('👉 Please set DATABASE_URL=postgresql://user:pass@ep-xyz-neon.tech/dbname?sslmode=require and retry.');
    process.exit(1);
  }

  console.log(' Connecting to NeonDB...');
  const pool = new Pool({
    connectionString,
    ssl: connectionString.includes('neon.tech') ? { rejectUnauthorized: false } : undefined,
  });

  const db: any = drizzle(pool, { schema });

  console.log(' Purging existing tables...');
  try {
    await db.delete(schema.wishlistItems);
    await db.delete(schema.cartItems);
    await db.delete(schema.productVariants);
    await db.delete(schema.products);
    await db.delete(schema.collections);
    await db.delete(schema.categories);
    await db.delete(schema.reels);
  } catch (err: any) {
    console.warn('⚠️ Table purge note (may be empty schema):', err.message);
  }

  console.log(' Seeding Categories...');
  const insertedCategories = await db.insert(schema.categories).values(
    INITIAL_CATEGORIES.map(c => ({
      name: c.name,
      slug: c.slug,
      description: c.description,
    }))
  ).returning();
  const categoryMap = new Map(insertedCategories.map((c: any) => [c.slug, c.id]));

  console.log(' Seeding Collections...');
  const insertedCollections = await db.insert(schema.collections).values(
    INITIAL_COLLECTIONS.map(c => ({
      name: c.name,
      slug: c.slug,
      subtitle: c.subtitle,
      displayOrder: c.displayOrder,
      isActive: true,
    }))
  ).returning();
  const collectionMap = new Map(insertedCollections.map((c: any) => [c.slug, c.id]));

  console.log(' Seeding Products & Variants...');
  for (const p of INITIAL_PRODUCTS) {
    const categoryId = categoryMap.get(p.categorySlug) || insertedCategories[0].id;
    const collectionId = collectionMap.get(p.collectionSlug) || insertedCollections[0].id;

    const productValues: any = {
      title: p.title,
      slug: p.slug,
      description: p.description,
      details: p.details,
      price: p.price,
      originalPrice: p.originalPrice || null,
      discountPercent: p.discountPercent || null,
      badge: p.badge || null,
      categoryId,
      collectionId,
      collectionSlug: p.collectionSlug,
      gender: p.gender,
      isBestSeller: p.isBestSeller || false,
      isNewArrival: p.isNewArrival || false,
      isOnSale: p.isOnSale || false,
      isFeatured: p.isFeatured || false,
      thumbnail: p.thumbnail,
      images: p.images,
    };

    const [insertedProduct] = await db.insert(schema.products).values(productValues).returning();

    for (const v of p.variants) {
      const variantValues: any = {
        productId: insertedProduct.id,
        size: v.size,
        color: v.color,
        colorCode: v.colorCode,
        stock: v.stock,
        sku: `${p.slug}-${v.size}-${v.color.replace(/\s+/g, '').toLowerCase()}`,
      };
      await db.insert(schema.productVariants).values(variantValues);
    }
  }

  console.log(' Seeding 224 Family Reels...');
  await db.insert(schema.reels).values(
    INITIAL_REELS.map(r => ({
      title: r.title,
      videoUrl: r.videoUrl,
      thumbnailUrl: r.thumbnailUrl,
      caption: r.caption,
      authorHandle: r.authorHandle,
      likesCount: r.likesCount,
      duration: r.duration,
    }))
  );

  console.log(' NeonDB seed completed successfully! 224. Luxury Streetwear catalog is ready.');
  await pool.end();
  process.exit(0);
}

runSeed().catch(err => {
  console.error(' Seed script failed:', err);
  process.exit(1);
});
