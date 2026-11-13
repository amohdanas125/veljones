import type { Metadata } from 'next';
import { INITIAL_COLLECTIONS } from '@/lib/catalog-data';
import CollectionClient from './CollectionClient';

const SITE_URL = 'https://heartfelt-trifle-08576c.netlify.app';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const col = INITIAL_COLLECTIONS.find((c) => c.slug === slug);

  const title = col
    ? `${col.name} — ${col.subtitle || 'Atelier Streetwear'} | VALJONS`
    : slug === 'all'
    ? 'All Drops & Streetwear Archives | VALJONS'
    : slug === 'men'
    ? "Men's Luxury Streetwear Silhouettes | VALJONS"
    : slug === 'women'
    ? "Women's Fitted Contours & Streetwear | VALJONS"
    : `${slug.replace('-', ' ').toUpperCase()} | VALJONS`;

  const description =
    col?.subtitle ||
    `Explore VALJONS ${slug} collection. High-end PC fleece, straight-fit pants, and luxury streetwear essentials. Cash on delivery available.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/collection/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/collection/${slug}`,
      siteName: 'VALJONS Atelier',
      locale: 'en_IN',
      type: 'website',
      images: [
        {
          url: `${SITE_URL}/images/products/valjons-heavyweight-fleece.jpg`,
          width: 1200,
          height: 630,
          alt: `VALJONS ${slug} Collection`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: '@valjons',
      images: [`${SITE_URL}/images/products/valjons-heavyweight-fleece.jpg`],
    },
  };
}

export default async function CollectionPage({ params }: PageProps) {
  const { slug } = await params;

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: SITE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Collections',
        item: `${SITE_URL}/#collections`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: slug.toUpperCase(),
        item: `${SITE_URL}/collection/${slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <CollectionClient />
    </>
  );
}
