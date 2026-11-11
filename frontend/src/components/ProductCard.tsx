'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Heart, Eye, ShoppingBag } from 'lucide-react';
import { Product } from '@/types';
import { useStore } from '@/context/StoreContext';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { isInWishlist, toggleWishlist, openQuickView, addToCart } = useStore();
  const [isHovered, setIsHovered] = useState(false);
  const isWish = isInWishlist(product.id);

  // Formatting price to INR "Rs. 2,199.00"
  const formatPrice = (val?: string | number) => {
    if (!val) return '';
    const num = typeof val === 'string' ? parseFloat(val) : val;
    return `Rs. ${num.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <div
      className="group relative flex flex-col w-full text-left select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Frame */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-100">
        <Link href={`/product/${product.slug}`} className="block w-full h-full">
          <img
            src={product.thumbnail}
            alt={product.title}
            loading="lazy"
            className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </Link>

        {/* Wishlist Button (Top Right Heart) */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          aria-label={isWish ? 'Remove from wishlist' : 'Add to wishlist'}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white text-black backdrop-blur-xs transition-all duration-200 z-10 cursor-pointer shadow-xs"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isWish ? 'fill-[#DC2626] text-[#DC2626]' : 'text-neutral-800 hover:text-black'
            }`}
          />
        </button>

        {/* Discount Badge on Image (if applicable) */}
        {product.discountPercent && (
          <div className="absolute top-3 left-3 bg-black text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5">
            {product.badge || `${product.discountPercent}% OFF`}
          </div>
        )}

        {/* Quick View / Quick Add Overlay Action */}
        <div
          className={`absolute inset-x-3 bottom-3 hidden sm:flex gap-2 transition-all duration-300 ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
          }`}
        >
          <button
            onClick={(e) => {
              e.preventDefault();
              openQuickView(product);
            }}
            className="flex-1 py-2.5 px-3 bg-white/95 hover:bg-white text-black text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 backdrop-blur-xs shadow-md transition-colors cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            Quick View
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              addToCart(product.id, 'M', 1);
            }}
            className="py-2.5 px-3 bg-black text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center hover:bg-neutral-800 transition-colors cursor-pointer"
            title="Quick add size M"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="pt-3 pb-1 flex flex-col space-y-1">
        <Link
          href={`/product/${product.slug}`}
          className="text-xs sm:text-[13px] font-bold tracking-tight text-neutral-900 uppercase hover:text-neutral-600 line-clamp-1 transition-colors"
        >
          {product.title}
        </Link>

        {/* Price & Discounts */}
        <div className="flex items-center gap-2 text-xs sm:text-[13px] font-medium">
          <span className="text-black font-semibold">{formatPrice(product.price)}</span>

          {product.originalPrice && (
            <span className="text-neutral-400 line-through text-[11px] sm:text-xs">
              {formatPrice(product.originalPrice)}
            </span>
          )}

          {product.discountPercent && (
            <span className="text-[#C85A32] text-[11px] sm:text-xs font-medium">
              ({product.discountPercent}% off)
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
