'use client';

import React from 'react';
import { X, ShieldCheck, Sparkles, Feather } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export default function OurStoryModal() {
  const { isOurStoryOpen, closeOurStory } = useStore();

  if (!isOurStoryOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl bg-white text-black p-6 sm:p-10 rounded-2xl shadow-2xl border border-neutral-100 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={closeOurStory}
          aria-label="Close Our Story"
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-neutral-100 transition-colors cursor-pointer text-black"
        >
          <X className="w-5 h-5 stroke-[2]" />
        </button>

        {/* Brand Header */}
        <div className="space-y-2 mb-8">
          <span className="text-xs uppercase tracking-[0.25em] text-neutral-400 font-bold font-montserrat">
            Brand Identity & Manifesto
          </span>
          <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight font-poppins">
            OUR STORY
          </h2>
          <div className="w-12 h-1 bg-black mt-2" />
        </div>

        {/* Story Body */}
        <div className="space-y-6 text-sm sm:text-base leading-relaxed text-neutral-700 font-montserrat">
          <p className="font-semibold text-black text-lg">
            VALJONS was founded with a singular conviction: streetwear should be engineered for longevity, not fleeting hype cycles.
          </p>

          <p>
            In a fashion ecosystem dominated by flimsy fabrics and disposable fast-fashion cuts, we set out to build wardrobe pillars with zero compromise. Every piece in our drops is crafted from custom-milled dense textiles, beginning with our flagship <strong>280 GSM Poly-Cotton (PC) Fleece</strong>.
          </p>

          <p>
            The Poly-Cotton composition was meticulously engineered to provide the supreme softness of combed natural cotton against the skin, reinforced by structural polyester filaments that prevent sagging, preserve the straight-leg drape, and eliminate pilling wash after wash.
          </p>

          {/* Pillars Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-neutral-200">
            <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-100 space-y-1.5">
              <Feather className="w-5 h-5 text-black" />
              <h4 className="font-poppins font-bold text-xs uppercase tracking-wider text-black">
                280 GSM Milled
              </h4>
              <p className="text-xs text-neutral-500">
                Heavyweight gauge delivering architectural pooling over footwear.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-100 space-y-1.5">
              <Sparkles className="w-5 h-5 text-black" />
              <h4 className="font-poppins font-bold text-xs uppercase tracking-wider text-black">
                PC Fleece Tech
              </h4>
              <p className="text-xs text-neutral-500">
                Zero shrinkage and resilient shape retention across seasons.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-100 space-y-1.5">
              <ShieldCheck className="w-5 h-5 text-black" />
              <h4 className="font-poppins font-bold text-xs uppercase tracking-wider text-black">
                Straight Fit
              </h4>
              <p className="text-xs text-neutral-500">
                Precision pattern-drafted silhouette designed in India.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-8 pt-6 border-t border-neutral-100 flex justify-end">
          <button
            onClick={closeOurStory}
            className="px-6 py-3 bg-black text-white text-xs font-bold uppercase tracking-widest rounded-lg hover:bg-neutral-800 transition-colors"
          >
            Explore Drop 001
          </button>
        </div>
      </div>
    </div>
  );
}
