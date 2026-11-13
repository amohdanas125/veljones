import React from 'react';
import type { Metadata } from 'next';
import HeroVideoSection from '@/components/HeroVideoSection';
import ShopCollectionSection from '@/components/ShopCollectionSection';
import ProductFeaturesSection from '@/components/ProductFeaturesSection';
import DetailedPhotographySection from '@/components/DetailedPhotographySection';
import LifestyleCampaignSection from '@/components/LifestyleCampaignSection';
import CustomerReviewsSection from '@/components/CustomerReviewsSection';
import InstagramFeedSection from '@/components/InstagramFeedSection';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'VALJONS | Drop 001 — PC Fleece (280 GSM, Straight Fit)',
  description:
    'Engineered for longevity. High-end 280 GSM PC fleece streetwear, straight-fit sweatpants, and luxury oversized essentials. Free shipping & COD across India.',
  alternates: {
    canonical: 'https://heartfelt-trifle-08576c.netlify.app',
  },
};

const homeItemListJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'VALJONS Drop 001 — PC Fleece Collection',
  description: 'Architectural straight-fit 280 GSM poly-cotton fleece essentials.',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      url: 'https://heartfelt-trifle-08576c.netlify.app/product/valjons-straight-fit-pc-fleece-onyx-black',
      name: 'VALJONS Straight Fit PC Fleece · Onyx Black',
    },
    {
      '@type': 'ListItem',
      position: 2,
      url: 'https://heartfelt-trifle-08576c.netlify.app/product/valjons-straight-fit-pc-fleece-heather-oat',
      name: 'VALJONS Straight Fit PC Fleece · Heather Oat Melange',
    },
    {
      '@type': 'ListItem',
      position: 3,
      url: 'https://heartfelt-trifle-08576c.netlify.app/product/valjons-straight-fit-pc-fleece-vintage-pine',
      name: 'VALJONS Straight Fit PC Fleece · Vintage Pine Olive',
    },
  ],
};

export default function HomePage() {
  return (
    <div className="flex flex-col w-full bg-white selection:bg-black selection:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeItemListJsonLd) }}
      />
      {/* 1. Hero banner – VALJONS DROP 001 (Looping Video) */}
      <HeroVideoSection />

      {/* 2. Shop the Collection – three colour options */}
      <ShopCollectionSection />

      {/* 3. Product features – PC Fleece, 280 GSM, Straight Fit */}
      <ProductFeaturesSection />

      {/* 4. Detailed product photography */}
      <DetailedPhotographySection />

      {/* 5. Lifestyle campaign */}
      <LifestyleCampaignSection />

      {/* 6. Customer reviews */}
      <CustomerReviewsSection />

      {/* 8. Instagram feed */}
      <InstagramFeedSection />
    </div>
  );
}
