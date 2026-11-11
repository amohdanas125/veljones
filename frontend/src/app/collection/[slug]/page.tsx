'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, SlidersHorizontal } from 'lucide-react';
import { api } from '@/lib/api';
import { Product } from '@/types';
import ProductCard from '@/components/ProductCard';

export default function CollectionPage() {
  const params = useParams();
  const slug = (params?.slug as string) || 'all';

  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    let fetchPromise;

    if (slug === 'men') {
      fetchPromise = api.getProducts({ gender: 'men' });
    } else if (slug === 'women') {
      fetchPromise = api.getProducts({ gender: 'women' });
    } else if (slug === 'all') {
      fetchPromise = api.getProducts();
    } else {
      fetchPromise = api.getProducts({ collection: slug });
    }

    fetchPromise
      .then(setProducts)
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  }, [slug]);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (selectedCategory !== 'all') {
      result = result.filter((p) => p.categorySlug === selectedCategory);
    }

    if (sortBy === 'price-low') {
      result.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    }

    return result;
  }, [products, selectedCategory, sortBy]);

  const collectionTitle =
    slug === 'all'
      ? 'All Archives & Drops'
      : slug === 'men'
      ? "Men's Streetwear Silhouettes"
      : slug === 'women'
      ? "Women's Fitted Contours & Crops"
      : slug.replace('-', ' ').toUpperCase();

  return (
    <div className="w-full bg-white pb-24">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 text-[11px] font-semibold uppercase tracking-wider text-neutral-400 flex items-center gap-2">
        <Link href="/" className="hover:text-black transition-colors flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" /> Home
        </Link>
        <span>/</span>
        <span className="text-black uppercase">{slug}</span>
      </div>

      {/* Collection Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-4 pb-8 border-b border-neutral-100">
        <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-neutral-900">
          {collectionTitle}
        </h1>
        <p className="mt-2 text-xs uppercase tracking-widest text-neutral-500 font-medium">
          Showing {filteredProducts.length} pieces
        </p>

        {/* Filter and Sort Bar */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-neutral-100">
          {/* Category Chips */}
          <div className="flex flex-wrap gap-2 text-xs font-bold uppercase tracking-wider">
            {['all', 't-shirts', 'sweatpants', 'sweatshirts', 'ribbed-vests', 'crop-tops'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-black text-white'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                {cat.replace('-', ' ')}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 text-xs font-semibold uppercase text-neutral-700">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-neutral-50 border border-neutral-300 py-1.5 px-3 text-xs uppercase font-medium focus:outline-hidden"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-8">
        {isLoading ? (
          <div className="py-24 text-center text-xs uppercase tracking-widest text-neutral-400">
            Loading collection...
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="py-24 text-center space-y-3">
            <p className="text-sm uppercase tracking-wider text-neutral-500 font-bold">
              No products found matching the criteria.
            </p>
            <button
              onClick={() => setSelectedCategory('all')}
              className="px-6 py-2 bg-black text-white text-xs uppercase tracking-widest font-bold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
