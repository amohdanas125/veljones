'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, ShoppingBag, Heart, User } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import ValjonsLogo from './ValjonsLogo';

export default function Header() {
  const { user, cart, wishlistProducts, openCart, openWishlist, openMenu, openSearch, openOurStory, openContact } = useStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // Hide customer header entirely on Admin routes
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const isHome = pathname === '/';
  // Transparent only when on homepage and at top of the page
  const isTransparent = isHome && !isScrolled;

  useEffect(() => {
    const handleScroll = () => {
      // Transition immediately once scrolled beyond 20px
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 inset-x-0 z-50 w-full transition-all duration-300">
      {/* 1. Festive / Announcement Top Bar - Dark Crimson matching reference */}
      <div className="bg-[#7F1717] text-white text-[10px] sm:text-xs font-semibold uppercase tracking-[0.16em] sm:tracking-[0.22em] py-1.5 sm:py-2 px-3 text-center font-montserrat flex items-center justify-center select-none shadow-xs">
        <span className="truncate">FESTIVE SALE IS LIVE · UP TO 55% OFF</span>
      </div>

      {/* 2. Main Navbar with Seamless Scroll Transition */}
      <nav
        className={`w-full px-3.5 sm:px-8 py-2.5 sm:py-3.5 transition-all duration-300 ease-in-out border-b ${
          isTransparent
            ? 'bg-transparent border-transparent'
            : 'bg-white/95 backdrop-blur-md border-neutral-100 shadow-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Left: Mobile Menu Button & Desktop Links */}
          <div className="flex items-center gap-4 sm:gap-6">
            <button
              onClick={openMenu}
              aria-label="Open navigation menu"
              className={`p-2 -ml-2 rounded-lg transition-colors cursor-pointer md:hidden flex items-center justify-center ${
                isTransparent ? 'text-white hover:bg-white/10' : 'text-black hover:bg-neutral-100'
              }`}
            >
              <Menu className="w-5 h-5 stroke-[2]" />
            </button>

            {/* Desktop 5-Item Navigation */}
            <div
              className={`hidden md:flex items-center gap-7 text-xs font-bold tracking-[0.18em] uppercase font-montserrat ${
                isTransparent ? 'text-white/90' : 'text-neutral-900'
              }`}
            >
              <Link href="/" className="hover:opacity-60 transition-opacity">
                Home
              </Link>
              <a href="#shop-collection" className="hover:opacity-60 transition-opacity">
                Shop
              </a>
              <Link href="/about" className="hover:opacity-60 transition-opacity">
                About Us
              </Link>
              <Link href="/why-valjons" className="hover:opacity-60 transition-opacity">
                Why VALJONS
              </Link>
              <button
                onClick={openContact}
                className="hover:opacity-60 transition-opacity cursor-pointer uppercase font-bold"
              >
                Contact
              </button>
            </div>
          </div>

          {/* Center: VALJONS Logo with Monogram */}
          <div className="flex items-center justify-center">
            <ValjonsLogo
              theme={isTransparent ? 'dark' : 'light'}
              size="md"
            />
          </div>

          {/* Right: Search, Wishlist & Cart Button matching reference */}
          <div className="flex items-center gap-1 sm:gap-3">
            {/* User Account */}
            <Link
              href="/login"
              aria-label={user ? `Logged in as ${user.fullName}` : 'Member Account'}
              className={`p-2 rounded-lg transition-colors cursor-pointer flex items-center justify-center relative ${
                isTransparent ? 'text-white hover:bg-white/10' : 'text-black hover:bg-neutral-100'
              }`}
            >
              {user ? (
                <div className="w-5 h-5 rounded-full bg-black text-white text-[10px] font-bold flex items-center justify-center border border-white/60 shadow-xs">
                  {user.fullName.charAt(0).toUpperCase()}
                </div>
              ) : (
                <User className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.8]" />
              )}
              {user && (
                <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-emerald-500 rounded-full ring-1 ring-white" />
              )}
            </Link>

            {/* Wishlist Heart */}
            <button
              onClick={openWishlist}
              aria-label="Open wishlist"
              className={`p-2 rounded-lg transition-colors cursor-pointer relative flex items-center justify-center ${
                isTransparent ? 'text-white hover:bg-white/10' : 'text-black hover:bg-neutral-100'
              }`}
            >
              <Heart className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.8]" />
              {wishlistProducts.length > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-600 animate-pulse" />
              )}
            </button>

            {/* Shopping Bag with Pill Badge matching user screenshot */}
            <button
              onClick={openCart}
              aria-label="Open shopping cart"
              className={`flex items-center gap-1.5 p-2 -mr-1 rounded-lg transition-colors relative cursor-pointer ${
                isTransparent ? 'text-white hover:bg-white/10' : 'text-black hover:bg-neutral-100'
              }`}
            >
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.8]" />
              {/* Pill badge displaying item count */}
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full leading-none text-center font-montserrat min-w-[20px] transition-colors ${
                  isTransparent
                    ? 'bg-white text-black shadow-xs'
                    : 'bg-white text-black border border-neutral-300 shadow-xs'
                }`}
              >
                {cart.itemCount}
              </span>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
