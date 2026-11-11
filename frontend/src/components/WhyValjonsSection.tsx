'use client';

import React from 'react';
import { Award, RefreshCw, Scissors, HeartHandshake } from 'lucide-react';

export default function WhyValjonsSection() {
  const pillars = [
    {
      icon: Scissors,
      title: 'Obsessive Pattern Drafting',
      description: 'We don’t buy pre-made blank blanks. Every seam angle, rise depth, and hem opening is calculated to drape architectural straightness.',
    },
    {
      icon: Award,
      title: 'Mill-Direct 280 GSM Fleece',
      description: 'Custom knit with a 70/30 poly-cotton ratio. Cotton inside for cloud-like touch; structural poly outside for zero shrinkage.',
    },
    {
      icon: RefreshCw,
      title: 'Anti-Fast-Fashion Philosophy',
      description: 'Engineered for years of continuous rotation rather than 2-week viral hype cycles. Wear them hard; they only look better with age.',
    },
    {
      icon: HeartHandshake,
      title: 'Small Batch Ethical Drops',
      description: 'Crafted in limited numbered runs with rigorous multi-point hand inspection before any pair leaves the atelier.',
    },
  ];

  return (
    <section className="w-full py-12 sm:py-24 bg-white text-black">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16 space-y-2 sm:space-y-3">
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] sm:tracking-[0.25em] text-neutral-400 font-montserrat">
            Brand Ethos & Standard
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight font-poppins">
            WHY VALJONS
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 font-montserrat px-2">
            Why we refuse to cut corners, compromise on grammage, or follow disposable fashion timelines.
          </p>
        </div>

        {/* 4 Pillars Grid - Responsive for small screens */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 sm:p-8 rounded-2xl bg-neutral-50 border border-neutral-200/70 hover:border-black hover:shadow-lg transition-all duration-300 flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3 sm:space-y-4">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-black text-white flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Icon className="w-5 h-5 stroke-[1.8]" />
                  </div>
                  <h3 className="font-poppins font-black text-base sm:text-lg uppercase tracking-tight text-black">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-montserrat">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 sm:pt-4 border-t border-neutral-200/60 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-neutral-400 font-montserrat">
                  0{idx + 1} / VALJONS STANDARD
                </div>
              </div>
            );
          })}
        </div>

        {/* Quote Banner - Responsive padding */}
        <div className="mt-10 sm:mt-14 p-6 sm:p-12 rounded-2xl bg-black text-white text-center max-w-4xl mx-auto space-y-3 sm:space-y-4 shadow-xl">
          <p className="font-poppins font-bold text-base sm:text-2xl uppercase tracking-wide leading-relaxed">
            &ldquo;We don’t produce clothes for seasons. We engineer garments for longevity.&rdquo;
          </p>
          <div className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-neutral-400 font-montserrat font-bold">
            — VALJONS ATELIER · DROP 001
          </div>
        </div>
      </div>
    </section>
  );
}
