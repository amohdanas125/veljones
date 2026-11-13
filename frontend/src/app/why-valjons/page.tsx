import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Award, RefreshCw, Scissors, HeartHandshake, CheckCircle2, ArrowRight } from 'lucide-react';
import ValjonsLogo from '@/components/ValjonsLogo';

export const metadata: Metadata = {
  title: 'Why VALJONS? · Architectural 280 GSM Fleece & Pattern Drafting',
  description:
    'Learn why VALJONS refuses fast-fashion shortcuts. Mill-direct 280 GSM PC fleece, bespoke straight-fit drafting, zero shrinkage, and numbered small batch drops.',
  alternates: {
    canonical: '/why-valjons',
  },
  openGraph: {
    title: 'Why VALJONS? · The 4 Atelier Pillars',
    description:
      'Mill-direct 280 GSM PC fleece, bespoke straight-fit drafting, zero shrinkage, and numbered small batch drops.',
    url: 'https://heartfelt-trifle-08576c.netlify.app/why-valjons',
    siteName: 'VALJONS Atelier',
  },
};

export default function WhyValjonsPage() {
  const pillars = [
    {
      icon: Scissors,
      title: 'Obsessive Pattern Drafting',
      subtitle: 'Architectural Straight Fit',
      description: 'We do not buy pre-made blanks. Every rise angle, waist rise depth, inseam gradient, and hem opening is calculated to drape architectural straightness over footwear without awkward stacking.',
    },
    {
      icon: Award,
      title: 'Mill-Direct 280 GSM Fleece',
      subtitle: '70% Combed Cotton / 30% Structural Poly',
      description: 'Custom knit at source with our signature 70/30 blend. Combed cotton interior for cloud-like skin touch; structural poly exterior for complete color retention and zero shrinkage over years of wear.',
    },
    {
      icon: RefreshCw,
      title: 'Anti-Fast-Fashion Philosophy',
      subtitle: 'Built For Multi-Year Rotation',
      description: 'Engineered for years of continuous rotation rather than 2-week viral hype cycles. Reinforced stress seams, custom hardware, and premium ribbing that will not slacken or bacon.',
    },
    {
      icon: HeartHandshake,
      title: 'Small Batch Ethical Drops',
      subtitle: 'Strict Numbered Production',
      description: 'Crafted in limited numbered runs with rigorous multi-point hand inspection before any garment leaves our atelier. Zero deadstock, zero factory overruns.',
    },
  ];

  const specs = [
    { label: 'Grammage', val: '280 GSM Heavyweight Fleece' },
    { label: 'Fiber Composition', val: '70% Cotton / 30% Poly Fleece' },
    { label: 'Knit Structure', val: 'Loopback Compact French Terry Face' },
    { label: 'Seam Construction', val: 'Twin-Needle Flatlock Reinforcement' },
    { label: 'Hardware', val: 'Gunmetal Zinc Alloy Eyelets & Aglets' },
    { label: 'Shrinkage Tolerance', val: '< 1.5% Pre-Shrunk Garment Wash' },
  ];

  return (
    <div className="w-full min-h-screen bg-white font-montserrat pt-20 sm:pt-24 pb-24 text-neutral-800 selection:bg-black selection:text-white">
      {/* Breadcrumb Navigation */}
      <div className="max-w-5xl mx-auto px-4 sm:px-8 py-4 border-b border-neutral-100 text-[11px] font-semibold uppercase tracking-wider text-neutral-400 flex items-center gap-2">
        <Link href="/" className="hover:text-black transition-colors flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" /> Home
        </Link>
        <span>/</span>
        <span className="text-black">Why VALJONS</span>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-8 pt-8 sm:pt-14 space-y-16">
        {/* Header Hero */}
        <div className="space-y-3 text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#801414] block">
            THE ATELIER STANDARD
          </span>
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-neutral-900 font-poppins leading-tight">
            WHY VALJONS?
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
            Why we refuse to cut corners, compromise on grammage, or adhere to disposable fast-fashion timelines.
          </p>
        </div>

        {/* Hero Banner Image */}
        <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden shadow-lg border border-neutral-200">
          <img
            src="/images/products/valjons-drop001-lifestyle-fit.jpg"
            alt="VALJONS Architectural Garment Drafting"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-6 sm:p-10">
            <div className="text-white space-y-1.5">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.22em] text-neutral-300">
                Garment Architecture · Drop 001
              </span>
              <p className="font-poppins font-black text-lg sm:text-2xl uppercase tracking-wide">
                Built different. Worn everywhere.
              </p>
            </div>
          </div>
        </div>

        {/* Studio Visual Showcase */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-neutral-200 group">
            <img
              src="/images/products/valjons-heavyweight-fleece.jpg"
              alt="280 GSM Heavyweight Fleece"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
              <span className="text-white text-xs font-black uppercase tracking-wider font-poppins">
                280 GSM Loopback Fleece
              </span>
            </div>
          </div>

          <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-neutral-200 group">
            <img
              src="/images/products/valjons-drop001-cargo-fleece.jpg"
              alt="Architectural Seam Drafting"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
              <span className="text-white text-xs font-black uppercase tracking-wider font-poppins">
                Precision Seam Drafting
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
                Natural Pooling Hem
              </span>
            </div>
          </div>
        </div>

        {/* 4 Brand Pillars Grid */}
        <div className="space-y-6">
          <div className="text-center space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-400">
              Four Uncompromising Tenets
            </span>
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-neutral-900 font-poppins">
              The Four Pillars of VALJONS
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {pillars.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="p-6 sm:p-8 rounded-2xl bg-neutral-50 border border-neutral-200/80 hover:border-black hover:shadow-lg transition-all duration-300 flex flex-col justify-between space-y-4 group"
                >
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-xl bg-black text-white flex items-center justify-center group-hover:scale-105 transition-transform shadow-xs">
                      <Icon className="w-5 h-5 stroke-[1.8]" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#801414] block">
                        {item.subtitle}
                      </span>
                      <h3 className="font-poppins font-black text-lg sm:text-xl uppercase tracking-tight text-black pt-0.5">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-neutral-200/70 text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                    0{idx + 1} / VALJONS STANDARD
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Technical Specification Matrix */}
        <div className="p-8 sm:p-12 rounded-2xl bg-neutral-50 border border-neutral-200/80 space-y-8">
          <div className="space-y-2 text-center max-w-xl mx-auto">
            <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-neutral-400">
              Raw Material Integrity
            </span>
            <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-neutral-900 font-poppins">
              Textile Specification Breakdown
            </h2>
            <p className="text-xs text-neutral-600">
              Every detail is engineered with zero compromises from yarn spin to final hand-finish.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {specs.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-4 bg-white rounded-xl border border-neutral-200/60 shadow-2xs"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <div className="text-xs space-y-0.5">
                  <span className="font-semibold text-neutral-500 uppercase tracking-wider text-[10px] block">
                    {item.label}
                  </span>
                  <span className="font-bold text-neutral-900 font-poppins">
                    {item.val}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quote Banner */}
        <div className="p-8 sm:p-14 rounded-2xl bg-black text-white text-center space-y-4 shadow-xl">
          <p className="font-poppins font-bold text-base sm:text-2xl uppercase tracking-wide leading-relaxed max-w-2xl mx-auto">
            &ldquo;We don’t produce clothes for seasons. We engineer garments for longevity.&rdquo;
          </p>
          <div className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-neutral-400 font-bold">
            — VALJONS ATELIER · DROP 001
          </div>
          <div className="pt-4">
            <Link
              href="/#shop-collection"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-black font-extrabold text-xs uppercase tracking-widest hover:bg-neutral-200 transition-colors rounded-sm shadow-md"
            >
              <span>Explore Collection</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
