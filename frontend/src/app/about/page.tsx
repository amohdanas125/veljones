import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Sparkles, Shield, Compass, Feather, Mail, MapPin, ArrowRight, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us · The Atelier Archive',
  description:
    'Discover the VALJONS story. We engineer 280 GSM poly-cotton fleece, architectural straight-fit pattern drafting, and small-batch luxury streetwear in India.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About Us · The Atelier Archive | VALJONS',
    description:
      'Discover the VALJONS story. 280 GSM poly-cotton fleece, architectural straight-fit drafting, and small-batch luxury streetwear in India.',
    url: 'https://heartfelt-trifle-08576c.netlify.app/about',
    siteName: 'VALJONS Atelier',
  },
};

export default function AboutPage() {
  const highlights = [
    {
      title: 'Obsessive Pattern Drafting',
      desc: 'Engineered in-house with zero pre-made blanks. We draft precise rise angles, thigh room, and hem widths so our pants drape architecturally straight over sneakers with natural pooling.',
    },
    {
      title: 'Custom-Milled 280 GSM Fleece',
      desc: 'Knit to our proprietary 70% combed long-staple cotton and 30% structural poly ratio. Inward cloud softness with zero shrinkage and eternal shape memory.',
    },
    {
      title: 'Anti-Disposability Philosophy',
      desc: 'We refuse fast-fashion cycles. Every garment is designed for multi-year daily rotation with reinforced twin-needle seams and indestructible metal hardware.',
    },
    {
      title: 'Ethical Small-Batch Drops',
      desc: 'Crafted in limited, numbered atelier runs in India. Zero deadstock waste, with 100% hand inspection before every order is packaged.',
    },
  ];

  return (
    <div className="w-full min-h-screen bg-white font-montserrat pt-20 sm:pt-24 pb-24 text-neutral-800 selection:bg-black selection:text-white">
      {/* Breadcrumb Navigation */}
      <div className="max-w-5xl mx-auto px-4 sm:px-8 py-4 border-b border-neutral-100 text-[11px] font-semibold uppercase tracking-wider text-neutral-400 flex items-center gap-2">
        <Link href="/" className="hover:text-black transition-colors flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" /> Home
        </Link>
        <span>/</span>
        <span className="text-black">About Us</span>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-8 pt-8 sm:pt-14 space-y-16">
        {/* Brand Genesis Hero */}
        <div className="space-y-4 text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#801414] block">
            ABOUT US · THE ATELIER ARCHIVE
          </span>
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-neutral-900 font-poppins leading-tight">
            ENGINEERED FOR LONGEVITY.
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
            VALJONS was founded to challenge fast-fashion disposability through architectural silhouettes, custom-milled heavyweight textiles, and uncompromising durability.
          </p>
        </div>

        {/* Hero Image */}
        <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden shadow-xl border border-neutral-200">
          <img
            src="/images/products/valjons-drop001-lifestyle-fit.jpg"
            alt="VALJONS Atelier studio and streetwear silhouette"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent flex items-end p-6 sm:p-10">
            <div className="text-white space-y-1">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.22em] text-neutral-300">
                Atelier Philosophy · Made in India
              </span>
              <p className="font-poppins font-black text-lg sm:text-2xl uppercase tracking-wide">
                Built different. Worn everywhere.
              </p>
            </div>
          </div>
        </div>

        {/* 3 Core Textile & Cut Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          <div className="p-6 bg-[#FAF9F7] rounded-xl border border-neutral-200/80 space-y-3">
            <Feather className="w-6 h-6 text-[#801414]" />
            <h3 className="text-xs font-black uppercase tracking-wider text-black font-poppins">
              280 GSM PC FLEECE
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Custom-spun 70% combed long-staple cotton blended with 30% structural poly for zero sagging, zero pilling, and eternal shape retention.
            </p>
          </div>

          <div className="p-6 bg-[#FAF9F7] rounded-xl border border-neutral-200/80 space-y-3">
            <Compass className="w-6 h-6 text-[#801414]" />
            <h3 className="text-xs font-black uppercase tracking-wider text-black font-poppins">
              ARCHITECTURAL CUT
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Every seam is engineered to drape cleanly with effortless stacking over luxury footwear without catching or losing silhouette.
            </p>
          </div>

          <div className="p-6 bg-[#FAF9F7] rounded-xl border border-neutral-200/80 space-y-3">
            <Shield className="w-6 h-6 text-[#801414]" />
            <h3 className="text-xs font-black uppercase tracking-wider text-black font-poppins">
              ZERO COMPROMISE
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Designed in India, crafted by master pattern-makers, and released in small, hyper-curated seasonal editions.
            </p>
          </div>
        </div>

        {/* Studio Visual Showcase */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-neutral-200 group">
            <img
              src="/images/products/valjons-heavyweight-fleece.jpg"
              alt="280 GSM Loopback Fleece"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
              <span className="text-white text-xs font-black uppercase tracking-wider font-poppins">
                Dense 280 GSM Loopback
              </span>
            </div>
          </div>

          <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-neutral-200 group">
            <img
              src="/images/products/valjons-drop001-cargo-fleece.jpg"
              alt="Precision Seam Drafting"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
              <span className="text-white text-xs font-black uppercase tracking-wider font-poppins">
                Precision Pattern Drafting
              </span>
            </div>
          </div>

          <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-neutral-200 group">
            <img
              src="/images/products/valjons-drop001-denim-street.jpg"
              alt="Effortless Streetwear Stacking"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
              <span className="text-white text-xs font-black uppercase tracking-wider font-poppins">
                Effortless Pooling Hem
              </span>
            </div>
          </div>
        </div>

        {/* Detailed Manifesto Grid */}
        <div className="space-y-6">
          <div className="text-center space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-400">
              The Standard We Uphold
            </span>
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-neutral-900 font-poppins">
              Why We Build VALJONS
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {highlights.map((item, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-8 rounded-2xl bg-neutral-50 border border-neutral-200/80 hover:border-black transition-all space-y-3"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                  <h3 className="font-poppins font-black text-base uppercase text-black">
                    {item.title}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Atelier Concierge & Contact */}
        <div className="p-8 sm:p-12 rounded-2xl bg-neutral-50 border border-neutral-200/80 space-y-6">
          <div className="space-y-2 text-center max-w-xl mx-auto">
            <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#801414]">
              Direct Atelier Concierge
            </span>
            <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-neutral-900 font-poppins">
              Connect With VALJONS
            </h2>
            <p className="text-xs text-neutral-600">
              Have questions regarding sizing, custom drop orders, or our mill-direct 280 GSM textile specifications?
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
            <a
              href="mailto:support@valjons.com"
              className="flex items-center gap-3 p-4 bg-white rounded-xl border border-neutral-200/80 hover:border-black transition-colors"
            >
              <Mail className="w-5 h-5 text-black shrink-0" />
              <div>
                <span className="text-[10px] font-bold uppercase text-neutral-400 block tracking-wider">
                  Concierge Email
                </span>
                <span className="text-xs font-bold text-black font-sans lowercase">
                  support@valjons.com
                </span>
              </div>
            </a>

            <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-neutral-200/80">
              <MapPin className="w-5 h-5 text-black shrink-0" />
              <div>
                <span className="text-[10px] font-bold uppercase text-neutral-400 block tracking-wider">
                  Origin & Craft
                </span>
                <span className="text-xs font-bold text-black">
                  Designed & Crafted in India
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Banner & Explore Drop 001 CTA */}
        <div className="p-8 sm:p-14 rounded-2xl bg-black text-white text-center space-y-4 shadow-xl">
          <p className="font-poppins font-bold text-base sm:text-2xl uppercase tracking-wide leading-relaxed max-w-2xl mx-auto">
            &ldquo;We don’t produce clothes for seasons. We engineer garments for longevity.&rdquo;
          </p>
          <div className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-neutral-400 font-bold">
            — VALJONS ATELIER · DROP 001
          </div>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/#shop-collection"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-black font-extrabold text-xs uppercase tracking-widest hover:bg-neutral-200 transition-colors rounded-sm shadow-md"
            >
              <span>Explore Drop 001</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/why-valjons"
              className="inline-flex items-center gap-2 px-8 py-3.5 border border-white/40 text-white font-extrabold text-xs uppercase tracking-widest hover:bg-white/10 transition-colors rounded-sm"
            >
              <span>Why VALJONS Pillars</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
