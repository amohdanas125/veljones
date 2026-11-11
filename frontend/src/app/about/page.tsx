'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Sparkles, Shield, Compass, Feather } from 'lucide-react';
import ValjonsLogo from '@/components/ValjonsLogo';

export default function AboutPage() {
  return (
    <div className="w-full min-h-screen bg-white font-montserrat pt-20 sm:pt-24 pb-24 text-neutral-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-8 py-4 border-b border-neutral-100 text-[11px] font-semibold uppercase tracking-wider text-neutral-400 flex items-center gap-2">
        <Link href="/" className="hover:text-black transition-colors flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" /> Home
        </Link>
        <span>/</span>
        <span className="text-black">Our Story</span>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-8 pt-8 sm:pt-14 space-y-12">
        {/* Brand Genesis */}
        <div className="space-y-4 text-center max-w-2xl mx-auto">
          <div className="flex justify-center mb-2">
            <ValjonsLogo theme="light" size="lg" />
          </div>
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#801414] block">
            ATELIER ARCHIVE · DROP 001
          </span>
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-neutral-900 font-poppins leading-tight">
            ENGINEERED FOR LONGEVITY.
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
            VALJONS was founded to challenge fast-fashion disposability through architectural silhouettes, custom-milled heavyweight textiles, and uncompromising durability.
          </p>
        </div>

        {/* Hero Image */}
        <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden shadow-lg border border-neutral-200">
          <img
            src="/images/products/valjons-drop001-lifestyle-fit.jpg"
            alt="VALJONS Atelier studio"
            className="w-full h-full object-cover"
          />
        </div>

        {/* 3 Core Brand Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="p-6 bg-[#FAF9F7] rounded-xl border border-neutral-200/80 space-y-3">
            <Feather className="w-6 h-6 text-black" />
            <h3 className="text-xs font-black uppercase tracking-wider text-black font-poppins">
              280 GSM PC FLEECE
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Custom-spun 70% combed long-staple cotton blended with 30% structural poly for zero sagging, zero pilling, and eternal shape retention.
            </p>
          </div>

          <div className="p-6 bg-[#FAF9F7] rounded-xl border border-neutral-200/80 space-y-3">
            <Compass className="w-6 h-6 text-black" />
            <h3 className="text-xs font-black uppercase tracking-wider text-black font-poppins">
              ARCHITECTURAL CUT
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Every seam is engineered to drape cleanly with effortless stacking over luxury footwear without catching or losing silhouette.
            </p>
          </div>

          <div className="p-6 bg-[#FAF9F7] rounded-xl border border-neutral-200/80 space-y-3">
            <Shield className="w-6 h-6 text-black" />
            <h3 className="text-xs font-black uppercase tracking-wider text-black font-poppins">
              ZERO COMPROMISE
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Designed in India, crafted by master pattern-makers, and released in small, hyper-curated seasonal editions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
