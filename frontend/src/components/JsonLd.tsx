import React from 'react';

const SITE_URL = 'https://heartfelt-trifle-08576c.netlify.app';

export default function JsonLd() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'ClothingStore'],
    '@id': `${SITE_URL}/#organization`,
    name: 'VALJONS',
    legalName: 'VALJONS Atelier',
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/images/valjons-monogram-black.png`,
      width: 512,
      height: 512,
      caption: 'VALJONS Monogram Logo',
    },
    image: `${SITE_URL}/images/products/valjons-heavyweight-fleece.jpg`,
    description:
      'VALJONS is an Indian architectural luxury streetwear atelier engineering 280 GSM poly-cotton fleece pants, box-fit tees, and limited numbered drops.',
    foundingDate: '2025',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'IN',
    },
    priceRange: '₹₹₹',
    currenciesAccepted: 'INR',
    paymentAccepted: 'Cash on Delivery, Credit Card, Debit Card, UPI, Net Banking',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Care & Concierge',
      email: 'support@valjons.com',
      availableLanguage: ['English', 'Hindi'],
    },
    sameAs: [
      'https://instagram.com/valjons',
      'https://facebook.com/valjons',
    ],
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: 'VALJONS',
    description: 'Engineered for longevity. High-end PC fleece streetwear essentials, 280 GSM straight-fit silhouettes.',
    publisher: {
      '@id': `${SITE_URL}/#organization`,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/?q={search_term_string}#shop-collection`,
      'query-input': 'required name=search_term_string',
    },
    inLanguage: 'en-IN',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}
