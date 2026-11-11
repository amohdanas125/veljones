'use client';

import React from 'react';
import { Layers, Weight, Sparkles, ShieldCheck, Ruler } from 'lucide-react';

export default function ProductFeaturesSection() {
  const features = [
    {
      icon: Layers,
      title: 'PC FLEECE FABRICATION',
      subtitle: '70% Cotton · 30% Structural Polyester',
      description:
        'A custom milled interloop knit combining the breathable softness of combed ring-spun cotton with the tensile resilience of high-gauge poly. Eliminates shrinkage and resists pilling over lifetime wear.',
      tag: 'Core Material',
    },
    {
      icon: Weight,
      title: '280 GSM WEIGHT GAUGE',
      subtitle: 'Heavyweight Drape · Year-Round Comfort',
      description:
        'Engineered to hit the elusive balance between substantive hand-feel and breathability. Substantial enough to hold architectural shape, flexible enough for daily movement.',
      tag: 'Textile Gauge',
    },
    {
      icon: Ruler,
      title: 'STRAIGHT FIT SILHOUETTE',
      subtitle: 'True-to-Leg Cut · Zero Taper Ankle',
      description:
        'Pattern-drafted from scratch to avoid the dated jogger cuff. The relaxed straight leg pools naturally over low-profile sneakers, skate shoes, and chunky runners.',
      tag: 'Pattern Drafting',
    },
  ];

  const secondarySpecs = [
    {
      title: 'Pre-Shrunk & Bio-Washed',
      desc: 'Pre-treated to retain 100% of length and waist circumference after laundering.',
    },
    {
      title: 'Deep Jersey-Lined Pockets',
      desc: 'Concealed side slash pockets reinforced with cotton jersey to safely hold phones and keys.',
    },
    {
      title: 'Internal Heavy Drawcord',
      desc: 'Elasticated encased ribbed waistband featuring heavyweight cord with debossed VJ aglets.',
    },
    {
      title: 'Double-Needle Flatlock Hem',
      desc: 'Cleanly finished bottom cuffs with double-needle anchoring for zero curling.',
    },
  ];

  return (
    <section id="product-features" className="w-full py-12 sm:py-24 bg-neutral-50 text-black border-y border-neutral-200/70 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16 space-y-2 sm:space-y-3">
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] sm:tracking-[0.25em] text-neutral-400 font-montserrat">
            Technical Specification & Anatomy
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight font-poppins">
            PRODUCT FEATURES
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 font-montserrat px-2">
            Every millimeter of VALJONS DROP 001 is engineered for structural longevity and supreme day-to-night comfort.
          </p>
        </div>

        {/* 3 Main Technical Pillars (PC Fleece, 280 GSM, Straight Fit) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-8 mb-10 sm:mb-16">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 sm:p-8 border border-neutral-200/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-4 sm:space-y-5">
                  <div className="flex items-center justify-between">
                    <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-xl bg-black text-white flex items-center justify-center group-hover:scale-105 transition-transform shadow-md">
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.8]" />
                    </div>
                    <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 bg-neutral-100 rounded-full text-neutral-600 font-montserrat">
                      {item.tag}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h3 className="font-poppins font-black text-lg sm:text-xl uppercase tracking-tight text-black">
                      {item.title}
                    </h3>
                    <p className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-neutral-400 font-montserrat">
                      {item.subtitle}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-montserrat">
                    {item.description}
                  </p>
                </div>

                <div className="pt-5 mt-5 sm:pt-6 sm:mt-6 border-t border-neutral-100 flex items-center gap-2 text-[11px] sm:text-xs font-bold uppercase tracking-widest text-black font-montserrat">
                  <Sparkles className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Engineered For Longevity</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Secondary Technical Specs Grid */}
        <div className="bg-white rounded-2xl p-5 sm:p-10 border border-neutral-200/80">
          <div className="max-w-md mb-5 sm:mb-6">
            <h4 className="font-poppins font-black text-base sm:text-lg uppercase tracking-tight text-black">
              Garment Construction Details
            </h4>
            <p className="text-[11px] sm:text-xs text-neutral-500 font-montserrat mt-0.5">
              The subtle nuances that separate mass apparel from true luxury streetwear.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pt-3 sm:pt-4 border-t border-neutral-100 font-montserrat">
            {secondarySpecs.map((spec, i) => (
              <div key={i} className="space-y-1">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-black shrink-0" />
                  <h5 className="font-bold text-xs uppercase tracking-wider text-black">
                    {spec.title}
                  </h5>
                </div>
                <p className="text-xs text-neutral-500 leading-relaxed pl-6">
                  {spec.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
