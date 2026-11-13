import type { Metadata } from 'next';
import { INITIAL_PRODUCTS } from '@/lib/catalog-data';
import ProductDetailClient from './ProductDetailClient';

const SITE_URL = 'https://heartfelt-trifle-08576c.netlify.app';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = INITIAL_PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    return {
      title: 'Drop 001 PC Fleece | VALJONS Atelier',
      description:
        'Exclusive 280 GSM poly-cotton straight-fit fleece and luxury essentials by VALJONS.',
    };
  }

  const title = `${product.title} | VALJONS Drop 001`;
  const description =
    product.description?.slice(0, 160) ||
    `Shop ${product.title} at VALJONS. Engineered 280 GSM fleece, straight fit silhouette, luxury Indian craft. Cash on delivery and free express shipping available.`;

  const ogImage = product.images?.[0]
    ? product.images[0].startsWith('http')
      ? product.images[0]
      : `${SITE_URL}${product.images[0]}`
    : `${SITE_URL}/images/products/valjons-heavyweight-fleece.jpg`;

  return {
    title,
    description,
    alternates: {
      canonical: `/product/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/product/${slug}`,
      siteName: 'VALJONS Atelier',
      locale: 'en_IN',
      type: 'website',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 1200,
          alt: product.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: '@valjons',
      images: [ogImage],
    },
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = INITIAL_PRODUCTS.find((p) => p.slug === slug);

  const productJsonLd = product
    ? {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.title,
        image: product.images?.map((img) =>
          img.startsWith('http') ? img : `${SITE_URL}${img}`
        ) || [`${SITE_URL}/images/products/valjons-heavyweight-fleece.jpg`],
        description: product.description,
        sku: `VALJONS-${product.id}`,
        mpn: `VJ-DROP001-${product.id}`,
        brand: {
          '@type': 'Brand',
          name: 'VALJONS',
        },
        offers: {
          '@type': 'Offer',
          url: `${SITE_URL}/product/${product.slug}`,
          priceCurrency: 'INR',
          price: product.price,
          priceValidUntil: '2027-12-31',
          itemCondition: 'https://schema.org/NewCondition',
          availability: 'https://schema.org/InStock',
          seller: {
            '@type': 'Organization',
            name: 'VALJONS Atelier',
          },
          shippingDetails: {
            '@type': 'OfferShippingDetails',
            shippingRate: {
              '@type': 'MonetaryAmount',
              value: '0',
              currency: 'INR',
            },
            deliveryTime: {
              '@type': 'ShippingDeliveryTime',
              transitTime: {
                '@type': 'QuantitativeValue',
                minValue: 3,
                maxValue: 5,
                unitCode: 'd',
              },
            },
          },
          hasMerchantReturnPolicy: {
            '@type': 'MerchantReturnPolicy',
            applicableCountry: 'IN',
            returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
            merchantReturnDays: 7,
            returnMethod: 'https://schema.org/ReturnByMail',
            returnFees: 'https://schema.org/FreeReturn',
          },
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.9',
          reviewCount: '128',
          bestRating: '5',
          worstRating: '1',
        },
      }
    : null;

  return (
    <>
      {productJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
        />
      )}
      <ProductDetailClient />
    </>
  );
}
