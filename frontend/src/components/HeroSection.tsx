'use client';

import React from 'react';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative w-full h-[88vh] min-h-[600px] max-h-[900px] bg-neutral-950 overflow-hidden flex items-end -mt-[56px] pt-[56px]">
      {/* Background Hero Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-102 hover:scale-100"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=1800&auto=format&fit=crop&q=90')`,
        }}
      >
        {/* Cinematic Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/40" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 pb-14 sm:pb-20 text-white">
        <div className="max-w-xl space-y-4">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-neutral-300 font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#DC2626]" />
            SS26 ARCHIVE DROP
          </div>

          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight leading-[1.05]">
            Engineered For
            <br />
            Longevity<span className="text-[#DC2626]">.</span>
          </h1>

          <p className="text-sm sm:text-base text-neutral-300 font-normal leading-relaxed max-w-md">
            Heavyweight 280 GSM combed compact cottons, sculptural wide-leg sweatpants, and signature ribbed contours.
          </p>

          <div className="pt-2 flex flex-wrap gap-4">
            <a
              href="#best-sellers"
              className="px-7 py-3.5 bg-white text-black font-semibold text-xs uppercase tracking-widest hover:bg-neutral-200 transition-colors duration-200 inline-block"
            >
              Shop Best Sellers
            </a>
            <a
              href="#new-arrivals"
              className="px-7 py-3.5 border border-white text-white font-semibold text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors duration-200 inline-block backdrop-blur-xs"
            >
              New Arrivals
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
