'use client';

import React from 'react';
import Link from 'next/link';
import {
  X,
  ArrowRight,
  ShoppingBag,
  BookOpen,
  MessageSquare,
  Home,
  Sparkles,
  Truck,
  RotateCcw,
  ShieldCheck,
  FileText,
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import ValjonsLogo from './ValjonsLogo';

export default function MobileNavDrawer() {
  const { isMenuOpen, closeMenu, openCart, openOurStory, openContact } = useStore();

  if (!isMenuOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={closeMenu}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 transition-opacity"
      />

      <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-white z-50 shadow-2xl flex flex-col font-montserrat animate-slide-up">
        {/* Drawer Header */}
        <div className="px-6 py-5 border-b border-neutral-100 flex items-center justify-between">
          <ValjonsLogo theme="light" size="sm" />
          <button
            onClick={closeMenu}
            className="p-1.5 text-neutral-400 hover:text-black transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Core Navigation Items */}
        <div className="p-6 flex-1 space-y-6 overflow-y-auto">
          <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400">
            Navigation
          </div>

          <div className="flex flex-col space-y-3.5 text-sm font-bold uppercase tracking-wider font-poppins">
            {/* 1. Home */}
            <Link
              href="/"
              onClick={closeMenu}
              className="flex justify-between items-center text-black hover:opacity-60 transition-opacity py-1 border-b border-neutral-100"
            >
              <div className="flex items-center gap-3">
                <Home className="w-4 h-4 text-neutral-500" />
                <span>Home</span>
              </div>
              <ArrowRight className="w-4 h-4 text-neutral-400" />
            </Link>

            {/* 2. Shop Drop 001 */}
            <a
              href="/#shop-collection"
              onClick={closeMenu}
              className="flex justify-between items-center text-black hover:opacity-60 transition-opacity py-1 border-b border-neutral-100"
            >
              <div className="flex items-center gap-3">
                <Sparkles className="w-4 h-4 text-neutral-500" />
                <span>Shop Drop 001</span>
              </div>
              <span className="text-[9px] font-bold px-2 py-0.5 bg-neutral-100 rounded text-neutral-600">
                3 Colours
              </span>
            </a>

            {/* 3. About Us */}
            <Link
              href="/about"
              onClick={closeMenu}
              className="flex justify-between items-center text-black hover:opacity-60 transition-opacity py-1 border-b border-neutral-100 w-full"
            >
              <div className="flex items-center gap-3">
                <BookOpen className="w-4 h-4 text-neutral-500" />
                <span>About Us</span>
              </div>
              <ArrowRight className="w-4 h-4 text-neutral-400" />
            </Link>

            {/* 4. Why VALJONS */}
            <Link
              href="/why-valjons"
              onClick={closeMenu}
              className="flex justify-between items-center text-black hover:opacity-60 transition-opacity py-1 border-b border-neutral-100 w-full"
            >
              <div className="flex items-center gap-3">
                <Sparkles className="w-4 h-4 text-[#801414]" />
                <span>Why VALJONS</span>
              </div>
              <ArrowRight className="w-4 h-4 text-neutral-400" />
            </Link>

            {/* 4. Contact */}
            <button
              onClick={() => {
                closeMenu();
                openContact();
              }}
              className="flex justify-between items-center text-black hover:opacity-60 transition-opacity py-1 border-b border-neutral-100 w-full text-left cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <MessageSquare className="w-4 h-4 text-neutral-500" />
                <span>Contact Support</span>
              </div>
              <ArrowRight className="w-4 h-4 text-neutral-400" />
            </button>

            {/* 5. Cart */}
            <button
              onClick={() => {
                closeMenu();
                openCart();
              }}
              className="flex justify-between items-center text-black hover:opacity-60 transition-opacity py-1 border-b border-neutral-100 w-full text-left cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-4 h-4 text-neutral-500" />
                <span>Shopping Bag</span>
              </div>
              <ArrowRight className="w-4 h-4 text-neutral-400" />
            </button>
          </div>

          {/* Customer Care & Policies */}
          <div className="pt-2 space-y-3">
            <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400">
              Customer Services
            </div>

            <div className="flex flex-col space-y-2 text-xs font-semibold text-neutral-700 uppercase tracking-wider">
              <Link
                href="/shipping#track"
                onClick={closeMenu}
                className="flex items-center gap-2.5 py-1 hover:text-black transition-colors"
              >
                <Truck className="w-3.5 h-3.5 text-neutral-400" />
                <span>Track Order</span>
              </Link>
              <Link
                href="/returns"
                onClick={closeMenu}
                className="flex items-center gap-2.5 py-1 hover:text-black transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5 text-neutral-400" />
                <span>7-Day Returns & Exchanges</span>
              </Link>
              <Link
                href="/shipping"
                onClick={closeMenu}
                className="flex items-center gap-2.5 py-1 hover:text-black transition-colors"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-neutral-400" />
                <span>Shipping Policy</span>
              </Link>
              <Link
                href="/terms"
                onClick={closeMenu}
                className="flex items-center gap-2.5 py-1 hover:text-black transition-colors"
              >
                <FileText className="w-3.5 h-3.5 text-neutral-400" />
                <span>Terms & Conditions</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Footer info in drawer */}
        <div className="p-5 bg-neutral-50 border-t border-neutral-100 text-[11px] text-neutral-500 space-y-1.5">
          <p className="font-bold text-black uppercase tracking-wider">
            VALJONS DROP 001
          </p>
          <p>PC Fleece · 280 GSM · Straight Fit</p>
          <p className="text-[10px] text-emerald-700 font-bold pt-0.5">
            ✓ Free Express Delivery Across India on All Orders.
          </p>
        </div>
      </div>
    </>
  );
}
