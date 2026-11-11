'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, X, ArrowUpRight } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { api } from '@/lib/api';
import { Product } from '@/types';

export default function SearchModal() {
  const { isSearchOpen, closeSearch } = useStore();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setIsLoading(true);
      try {
        const found = await api.getProducts({ search: query, limit: 6 });
        setResults(found);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [query]);

  if (!isSearchOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/60 backdrop-blur-xs">
      <div className="w-full max-w-2xl bg-white shadow-2xl border border-neutral-200 overflow-hidden">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-neutral-200 gap-3">
          <Search className="w-5 h-5 text-neutral-400 stroke-[2]" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search hoodies, t-shirts, sweatpants, collections..."
            className="w-full text-sm font-medium text-black placeholder:text-neutral-400 focus:outline-hidden"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-neutral-400 hover:text-black cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={closeSearch}
            className="text-xs uppercase font-bold tracking-wider text-neutral-500 hover:text-black cursor-pointer px-2"
          >
            Esc
          </button>
        </div>

        {/* Quick Suggestion Tags */}
        <div className="px-5 py-3 bg-neutral-50 border-b border-neutral-100 flex items-center gap-2 overflow-x-auto text-[11px] text-neutral-600 font-semibold tracking-wider uppercase">
          <span className="text-neutral-400 shrink-0">Popular:</span>
          {['T-Shirts', 'Sweatpants', 'Fitted Vests', 'SS26', 'Sale'].map((tag) => (
            <button
              key={tag}
              onClick={() => setQuery(tag)}
              className="px-2.5 py-1 bg-white border border-neutral-200 hover:border-black transition-colors shrink-0 cursor-pointer"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Results Body */}
        <div className="max-h-[60vh] overflow-y-auto p-4">
          {isLoading && (
            <div className="text-center py-8 text-xs text-neutral-400">Searching catalog...</div>
          )}

          {!isLoading && query && results.length === 0 && (
            <div className="text-center py-10 text-neutral-400 text-xs">
              No products found for "{query}". Try checking our collections.
            </div>
          )}

          {!isLoading && results.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {results.map((product) => (
                <Link
                  key={product.id}
                  href={`/product/${product.slug}`}
                  onClick={closeSearch}
                  className="flex gap-3 p-2 hover:bg-neutral-50 border border-transparent hover:border-neutral-200 transition-all group"
                >
                  <div className="w-16 h-20 bg-neutral-100 overflow-hidden shrink-0">
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <h4 className="text-xs font-bold uppercase text-neutral-900 group-hover:text-black line-clamp-1">
                      {product.title}
                    </h4>
                    <span className="text-xs font-semibold text-black mt-1">
                      Rs. {parseFloat(product.price).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </span>
                    <span className="text-[10px] text-neutral-400 uppercase tracking-widest mt-0.5">
                      {product.collectionSlug.replace('-', ' ')}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
