import React from 'react';
import HeroVideoSection from '@/components/HeroVideoSection';
import ShopCollectionSection from '@/components/ShopCollectionSection';
import ProductFeaturesSection from '@/components/ProductFeaturesSection';
import DetailedPhotographySection from '@/components/DetailedPhotographySection';
import LifestyleCampaignSection from '@/components/LifestyleCampaignSection';
import WhyValjonsSection from '@/components/WhyValjonsSection';
import CustomerReviewsSection from '@/components/CustomerReviewsSection';
import InstagramFeedSection from '@/components/InstagramFeedSection';

export const revalidate = 60;

export default function HomePage() {
  return (
    <div className="flex flex-col w-full bg-white selection:bg-black selection:text-white">
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

      {/* 6. Why VALJONS */}
      <WhyValjonsSection />

      {/* 7. Customer reviews */}
      <CustomerReviewsSection />

      {/* 8. Instagram feed */}
      <InstagramFeedSection />
    </div>
  );
}
