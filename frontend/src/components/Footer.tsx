'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { FacebookIcon, InstagramIcon } from '@/components/SocialIcons';
import { useStore } from '@/context/StoreContext';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { addToast } = useStore();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubscribed(true);
    addToast('Subscribed to VALJONS exclusive drop notifications');
  };

  return (
    <footer className="w-full bg-[#EAEAEA] text-neutral-800 pt-16 pb-12 border-t border-neutral-300">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-14 border-b border-neutral-300/80">
          {/* Brand Identity Column (matching Figma) */}
          <div className="md:col-span-5 space-y-4">
            <Link href="/" className="inline-block">
              <span className="text-3xl sm:text-4xl font-black tracking-tight text-black font-poppins leading-none">
                VALJONS
              </span>
            </Link>

            <div className="space-y-0.5 text-xs font-bold uppercase tracking-wider text-neutral-900">
              <p>VALJONS</p>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-4 pt-2 text-neutral-800">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="w-8 h-8 rounded-full border border-neutral-400 flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-colors"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 rounded-full border border-neutral-400 flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-colors"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
            </div>

            {/* Newsletter Input */}
            <div className="pt-4 max-w-sm">
              <p className="text-xs font-bold uppercase tracking-wider text-black mb-2">
                Join The Inner Circle
              </p>
              <form onSubmit={handleSubscribe} className="flex">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-3.5 py-2.5 bg-white text-xs border border-neutral-300 focus:outline-hidden focus:border-black text-black placeholder:text-neutral-400"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="px-4 bg-black text-white hover:bg-neutral-800 transition-colors cursor-pointer flex items-center justify-center"
                >
                  {isSubscribed ? <Check className="w-4 h-4 text-emerald-400" /> : <ArrowRight className="w-4 h-4" />}
                </button>
              </form>
            </div>
          </div>

          {/* Navigation Links Columns (matching Figma prototype labels) */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {/* COMPANY */}
            <div className="space-y-3">
              <h4 className="text-xs font-black uppercase tracking-widest text-black">
                Company
              </h4>
              <ul className="space-y-2 text-xs font-semibold tracking-wider uppercase text-neutral-600">
                <li>
                  <Link href="/why-valjons" className="hover:text-black transition-colors">
                    Why VALJONS
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-black transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-black transition-colors">
                    Our Story
                  </Link>
                </li>
              </ul>
            </div>

            {/* SUPPORT */}
            <div className="space-y-3">
              <h4 className="text-xs font-black uppercase tracking-widest text-black">
                Support
              </h4>
              <ul className="space-y-2 text-xs font-semibold tracking-wider uppercase text-neutral-600">
                <li>
                  <Link href="/customer-care" className="hover:text-black transition-colors">
                    Customer Care
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-black transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <a href="mailto:support@valjons.com" className="hover:text-black transition-colors lowercase font-sans">
                    support@valjons.com
                  </a>
                </li>
              </ul>
            </div>

            {/* LEGAL */}
            <div className="space-y-3">
              <h4 className="text-xs font-black uppercase tracking-widest text-black">
                Legal
              </h4>
              <ul className="space-y-2 text-xs font-semibold tracking-wider uppercase text-neutral-600">
                <li>
                  <Link href="/terms" className="hover:text-black transition-colors">
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link href="/returns" className="hover:text-black transition-colors">
                    Returns/Exchange Policy
                  </Link>
                </li>
                <li>
                  <Link href="/shipping" className="hover:text-black transition-colors">
                    Shipping & Returns
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Subfooter */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-neutral-500 font-medium gap-4">
          <p>© {new Date().getFullYear()} VALJONS. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-4 uppercase tracking-wider text-[10px]">
            <span>Crafted for modern streetwear purists</span>
            <span>•</span>
            <span>Made in India</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
