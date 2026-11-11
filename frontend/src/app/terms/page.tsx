'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="w-full min-h-screen bg-white font-montserrat pt-20 sm:pt-24 pb-24 text-neutral-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-8 py-4 border-b border-neutral-100 text-[11px] font-semibold uppercase tracking-wider text-neutral-400 flex items-center gap-2">
        <Link href="/" className="hover:text-black transition-colors flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" /> Home
        </Link>
        <span>/</span>
        <span className="text-black">Terms & Conditions</span>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-8 pt-8 sm:pt-12 space-y-8">
        <div className="space-y-3 pb-6 border-b border-neutral-200">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#801414]">
            LEGAL
          </span>
          <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-neutral-900 font-poppins">
            TERMS & CONDITIONS
          </h1>
          <p className="text-xs text-neutral-500">
            Effective Date: November 2026 · Governing all orders and platform interactions.
          </p>
        </div>

        <div className="space-y-8 text-xs sm:text-sm text-neutral-700 leading-relaxed font-normal">
          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-black uppercase tracking-wider text-neutral-900 font-poppins">
              1. GENERAL TERMS
            </h2>
            <p>
              By accessing, browsing, or purchasing from VALJONS, you enter into a legally binding agreement governed by the laws of the Republic of India. If you do not agree to these terms, please refrain from using the platform.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-black uppercase tracking-wider text-neutral-900 font-poppins">
              2. PRODUCT SPECIFICATIONS & PRICING
            </h2>
            <p>
              We strive to display garment dimensions, 280 GSM fabric gauges, colors, and cuts as accurately as possible. However, slight color variations may occur depending on screen calibration. All prices are listed in Indian National Rupees (INR / Rs.) and are inclusive of Goods and Services Tax (GST). We reserve the right to revise pricing or rectify typographical errors at any time.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-black uppercase tracking-wider text-neutral-900 font-poppins">
              3. ORDERS & DROP AVAILABILITY
            </h2>
            <p>
              Due to the limited small-batch nature of VALJONS Drop 001 releases, placing an item in your shopping bag does not reserve stock. An order is confirmed only upon successful checkout and receipt of confirmation via email/SMS. In the rare event an item is out of stock after order confirmation, a full refund will be processed immediately.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-black uppercase tracking-wider text-neutral-900 font-poppins">
              4. INTELLECTUAL PROPERTY
            </h2>
            <p>
              All trademarks, monogram icons, logos, garment patterns, photography, and written text appearing on this website are the proprietary intellectual property of VALJONS and Resourzburg. Any reproduction, distribution, or unauthorized commercial use is strictly prohibited.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-black uppercase tracking-wider text-neutral-900 font-poppins">
              5. JURISDICTION
            </h2>
            <p>
              Any disputes arising out of or related to orders placed on VALJONS shall be subject to the exclusive jurisdiction of the competent courts of New Delhi, India.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
