import { MetadataRoute } from 'next';
import { INITIAL_PRODUCTS, INITIAL_COLLECTIONS } from '@/lib/catalog-data';

const SITE_URL = 'https://heartfelt-trifle-08576c.netlify.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date();

  // Core brand and content routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/about-us`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/why-valjons`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/why-valjones`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/shipping`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/returns`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/privacy-policy`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.4,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.4,
    },
  ];

  // Dynamic product routes
  const productRoutes: MetadataRoute.Sitemap = INITIAL_PRODUCTS.map((prod) => ({
    url: `${SITE_URL}/product/${prod.slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  // Dynamic collection routes
  const collectionRoutes: MetadataRoute.Sitemap = INITIAL_COLLECTIONS.map((col) => ({
    url: `${SITE_URL}/collection/${col.slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.75,
  }));

  return [...staticRoutes, ...productRoutes, ...collectionRoutes];
}
