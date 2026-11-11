'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from './ProductCard';
import { Product } from '@/types';

interface SectionRowProps {
  id?: string;
  title: string;
  subtitle?: string;
  products: Product[];
  collectionSlug?: string;
}

export default function SectionRow({ id, title, subtitle, products, collectionSlug }: SectionRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const offset = direction === 'left' ? -400 : 400;
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  if (!products || products.length === 0) return null;

  return (
    <section id={id} className="w-full py-12 sm:py-16 border-b border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-neutral-900">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-1 text-xs sm:text-sm text-neutral-500 uppercase tracking-widest">
              {subtitle}
            </p>
          )}
        </div>

        {/* Carousel / Grid Wrapper with Arrow Controls */}
        <div className="relative group">
          {/* Scroll Left Button */}
          <button
            onClick={() => scroll('left')}
            aria-label="Scroll left"
            className="hidden lg:flex absolute -left-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border border-neutral-200 shadow-md items-center justify-center text-black hover:bg-neutral-50 transition-opacity opacity-0 group-hover:opacity-100 cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Scrollable Container */}
          <div
            ref={scrollRef}
            className="grid grid-flow-col auto-cols-[82%] sm:auto-cols-[46%] md:grid-cols-3 lg:grid-cols-3 gap-5 sm:gap-7 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory pb-4"
          >
            {products.map((product) => (
              <div key={product.id} className="snap-start">
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          {/* Scroll Right Button */}
          <button
            onClick={() => scroll('right')}
            aria-label="Scroll right"
            className="hidden lg:flex absolute -right-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border border-neutral-200 shadow-md items-center justify-center text-black hover:bg-neutral-50 transition-opacity opacity-0 group-hover:opacity-100 cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Prototype-Matching "DISCOVER MORE" Button */}
        <div className="mt-10 sm:mt-14 flex justify-center">
          <Link
            href={collectionSlug ? `/collection/${collectionSlug}` : '/collection/all'}
            className="inline-block border border-black px-10 py-3.5 uppercase text-xs font-bold tracking-[0.2em] text-black hover:bg-black hover:text-white transition-all duration-200"
          >
            DISCOVER MORE
          </Link>
        </div>
      </div>
    </section>
  );
}
