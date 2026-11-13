import { MetadataRoute } from 'next';

const SITE_URL = 'https://heartfelt-trifle-08576c.netlify.app';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/checkout',
          '/checkout/*',
          '/cart',
          '/api/',
          '/api/*',
          '/login',
          '/register',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/checkout', '/cart', '/api/', '/login', '/register'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
