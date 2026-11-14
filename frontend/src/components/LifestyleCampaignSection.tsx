'use client';

import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useMedia } from '@/context/MediaContext';

export default function LifestyleCampaignSection() {
  const { lifestyleConfig } = useMedia();

  return (
    <section className="w-full py-12 sm:py-24 bg-neutral-950 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14 space-y-2 sm:space-y-3">
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] sm:tracking-[0.25em] text-neutral-400 font-montserrat">
            {lifestyleConfig.editorialTag}
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight font-poppins">
            {lifestyleConfig.mainHeading}
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 font-montserrat px-2">
            {lifestyleConfig.description}
          </p>
        </div>

        {/* Asymmetrical Editorial Lookbook Grid - Mobile Friendly */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 items-stretch">
          {/* Main Large Visual (7 cols) */}
          <div className="md:col-span-7 relative group rounded-2xl overflow-hidden aspect-[4/5] sm:aspect-auto sm:min-h-[500px] md:min-h-[580px] bg-neutral-900 shadow-2xl">
            <img
              src={lifestyleConfig.primaryLook.imageUrl}
              alt={lifestyleConfig.primaryLook.title}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover object-center group-hover:scale-104 transition-transform duration-1000 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

            <div className="absolute bottom-0 inset-x-0 p-5 sm:p-8 space-y-1.5 sm:space-y-2">
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.18em] sm:tracking-[0.2em] font-bold text-neutral-300 font-montserrat">
                {lifestyleConfig.primaryLook.lookTag}
              </span>
              <h3 className="font-poppins font-black text-xl sm:text-3xl uppercase tracking-tight text-white">
                {lifestyleConfig.primaryLook.title}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 font-montserrat max-w-md line-clamp-2 sm:line-clamp-none">
                {lifestyleConfig.primaryLook.description}
              </p>
              <div className="pt-1 sm:pt-2">
                <a
                  href={lifestyleConfig.primaryLook.link}
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white hover:text-neutral-300 transition-colors font-montserrat py-1"
                >
                  <span>Shop This Look</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column Stack (5 cols) */}
          <div className="md:col-span-5 flex flex-col gap-5 sm:gap-6 justify-between">
            {lifestyleConfig.secondaryLooks.slice(0, 2).map((look) => (
              <div
                key={look.id}
                className="relative group rounded-2xl overflow-hidden aspect-[4/3] sm:aspect-[16/10] bg-neutral-900 shadow-xl flex-1"
              >
                <img
                  src={look.imageUrl}
                  alt={look.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />

                <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 space-y-0.5 sm:space-y-1">
                  <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-neutral-400 font-bold font-montserrat">
                    {look.tag}
                  </span>
                  <h4 className="font-poppins font-bold text-base sm:text-lg uppercase text-white">
                    {look.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
