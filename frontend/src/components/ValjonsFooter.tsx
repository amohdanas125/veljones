'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Truck, RefreshCw, Send, Lock, RotateCcw, Leaf } from 'lucide-react';
import ValjonsLogo from './ValjonsLogo';

export default function ValjonsFooter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
      setSubscribed(false);
    }, 3500);
  };

  return (
    <footer className="w-full bg-[#EAE6E2] text-neutral-900 border-t border-neutral-300/80 font-montserrat">
      {/* 1. Value Proposition Strip matching Product Page & Reference */}
      <div className="bg-[#E2DDD8] border-b border-neutral-300/70 py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-3.5">
            <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center shadow-xs shrink-0">
              <Lock className="w-5 h-5 stroke-[1.8] text-neutral-800" />
            </div>
            <div>
              <h5 className="font-poppins font-bold text-xs uppercase tracking-wider text-black">
                SECURE PAYMENTS
              </h5>
              <p className="text-[11px] text-neutral-600">UPI, Cards, NetBanking & COD</p>
            </div>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-3.5">
            <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center shadow-xs shrink-0">
              <RotateCcw className="w-5 h-5 stroke-[1.8] text-neutral-800" />
            </div>
            <div>
              <h5 className="font-poppins font-bold text-xs uppercase tracking-wider text-black">
                EASY RETURNS
              </h5>
              <p className="text-[11px] text-neutral-600">7-Day doorstep size swap & return</p>
            </div>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-3.5">
            <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center shadow-xs shrink-0">
              <Leaf className="w-5 h-5 stroke-[1.8] text-neutral-800" />
            </div>
            <div>
              <h5 className="font-poppins font-bold text-xs uppercase tracking-wider text-black">
                SUSTAINABLE
              </h5>
              <p className="text-[11px] text-neutral-600">280 GSM heavy cotton built to outlast</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Footer Body matching Reference Image media_1793946098659_79921ce5.png */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          {/* Brand & Socials (Col 1-4) */}
          <div className="md:col-span-4 space-y-4">
            <div className="space-y-1">
              <ValjonsLogo theme="light" size="lg" />
              <div className="text-[11px] font-black tracking-[0.25em] text-neutral-700 uppercase font-poppins pt-0.5">
                VALJONS
              </div>
            </div>

            {/* Social Icons matching Reference (Facebook Blue & Instagram Pink/Gradient) */}
            <div className="flex items-center gap-3 pt-2">
              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-8 h-8 rounded-md bg-[#1877F2] text-white flex items-center justify-center hover:opacity-90 transition-opacity shadow-xs cursor-pointer"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 rounded-md bg-gradient-to-tr from-[#FF543E] via-[#D62976] to-[#4F5BD5] text-white flex items-center justify-center hover:opacity-90 transition-opacity shadow-xs cursor-pointer"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>

            <p className="text-xs text-neutral-600 leading-relaxed max-w-sm pt-2">
              Engineering architectural streetwear essentials with custom milled 280 GSM PC Fleece. Designed for effortless pooling and timeless longevity.
            </p>
          </div>

          {/* COMPANY Column */}
          <div className="md:col-span-2 space-y-3.5">
            <h4 className="font-poppins font-black text-xs uppercase tracking-[0.18em] text-neutral-900">
              COMPANY
            </h4>
            <ul className="space-y-2 text-xs font-semibold text-neutral-700 uppercase tracking-wider">
              <li>
                <Link href="/why-valjons" className="hover:text-black transition-colors block">
                  WHY VALJONS
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-black transition-colors block">
                  ABOUT US
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-black transition-colors block">
                  OUR STORY
                </Link>
              </li>
              <li>
                <Link href="/#shop-collection" className="hover:text-black transition-colors block">
                  COLLECTION
                </Link>
              </li>
            </ul>
          </div>

          {/* SUPPORT Column */}
          <div className="md:col-span-2 space-y-3.5">
            <h4 className="font-poppins font-black text-xs uppercase tracking-[0.18em] text-neutral-900">
              SUPPORT
            </h4>
            <ul className="space-y-2 text-xs font-semibold text-neutral-700 uppercase tracking-wider">
              <li>
                <Link href="/contact" className="hover:text-black transition-colors block">
                  CUSTOMER CARE
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-black transition-colors block">
                  CONTACT
                </Link>
              </li>
              <li>
                <Link href="/shipping#track" className="hover:text-black transition-colors block">
                  TRACK ORDER
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-black transition-colors block">
                  MY ACCOUNT
                </Link>
              </li>
            </ul>
          </div>

          {/* LEGAL Column */}
          <div className="md:col-span-2 space-y-3.5">
            <h4 className="font-poppins font-black text-xs uppercase tracking-[0.18em] text-neutral-900">
              LEGAL
            </h4>
            <ul className="space-y-2 text-xs font-semibold text-neutral-700 uppercase tracking-wider">
              <li>
                <Link href="/terms" className="hover:text-black transition-colors block">
                  TERMS & CONDITIONS
                </Link>
              </li>
              <li>
                <Link href="/returns" className="hover:text-black transition-colors block">
                  RETURNS/EXCHANGE POLICY
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:text-black transition-colors block">
                  SHIPPING & RETURNS
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-black transition-colors block">
                  PRIVACY POLICY
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter (Col 9-12) */}
          <div className="md:col-span-2 space-y-3.5">
            <h4 className="font-poppins font-black text-xs uppercase tracking-[0.18em] text-neutral-900">
              DROP ALERTS
            </h4>
            <p className="text-[11px] text-neutral-600 leading-relaxed">
              Get early access to Drop 002 release dates and private codes.
            </p>

            {subscribed ? (
              <div className="p-2.5 bg-neutral-900 text-white rounded text-[11px] font-bold">
                ✓ You are on the private list.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input
                  type="email"
                  required
                  placeholder="Enter email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-neutral-300 text-xs text-black placeholder-neutral-400 focus:outline-none focus:border-black transition-colors"
                />
                <button
                  type="submit"
                  className="w-full py-2 bg-black text-white text-[11px] font-bold uppercase tracking-wider hover:bg-neutral-800 transition-colors cursor-pointer"
                >
                  Join
                </button>
              </form>
            )}
          </div>
        </div>

        {/* 3. Bottom Strip */}
        <div className="pt-8 mt-12 border-t border-neutral-300/80 flex flex-col sm:flex-row items-center justify-between text-[11px] text-neutral-600 gap-3">
          <div>
            &copy; {new Date().getFullYear()} VALJONS. All rights reserved.
          </div>
          <div className="flex items-center gap-5">
            <Link href="/privacy-policy" className="hover:text-black transition-colors">
              Privacy Policy
            </Link>
            <span>·</span>
            <Link href="/terms" className="hover:text-black transition-colors">
              Terms & Conditions
            </Link>
            <span>·</span>
            <Link href="/returns" className="hover:text-black transition-colors">
              Returns & Exchanges
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
