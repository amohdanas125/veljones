'use client';

import React, { useState } from 'react';
import { X, Heart, ShoppingBag, Check } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export default function QuickViewModal() {
  const { activeQuickView, closeQuickView, addToCart, isInWishlist, toggleWishlist } = useStore();
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!activeQuickView) return null;

  const product = activeQuickView;
  const isWish = isInWishlist(product.id);
  const images = product.images && product.images.length > 0 ? product.images : [product.thumbnail];
  const sizes = product.variants?.map(v => v.size) || ['XS', 'S', 'M', 'L', 'XL'];

  const formatPrice = (val: string | number) => {
    const num = typeof val === 'string' ? parseFloat(val) : val;
    return `Rs. ${num.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const handleAddToCart = () => {
    addToCart(product.id, selectedSize, quantity);
    closeQuickView();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-3xl bg-white shadow-2xl overflow-hidden max-h-[90vh] flex flex-col md:flex-row">
        {/* Close Button */}
        <button
          onClick={closeQuickView}
          className="absolute top-4 right-4 z-10 p-1.5 rounded-full bg-white/80 hover:bg-white text-black transition-colors cursor-pointer shadow-xs"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Images Column */}
        <div className="md:w-1/2 bg-neutral-100 flex flex-col">
          <div className="relative aspect-[3/4] w-full overflow-hidden">
            <img
              src={images[activeImageIndex] || product.thumbnail}
              alt={product.title}
              className="w-full h-full object-cover object-center"
            />
          </div>

          {images.length > 1 && (
            <div className="flex gap-2 p-3 bg-white border-t border-neutral-100 overflow-x-auto">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-14 h-18 shrink-0 overflow-hidden border-2 transition-colors cursor-pointer ${
                    activeImageIndex === idx ? 'border-black' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Details Column */}
        <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto">
          <div className="space-y-4">
            <div>
              <div className="text-[11px] uppercase tracking-widest text-neutral-400 font-semibold">
                {product.collectionSlug.replace('-', ' ')}
              </div>
              <h2 className="text-lg sm:text-xl font-black uppercase tracking-tight text-neutral-900 mt-1">
                {product.title}
              </h2>

              <div className="mt-2 flex items-center gap-3">
                <span className="text-base font-bold text-black">{formatPrice(product.price)}</span>
                {product.originalPrice && (
                  <span className="text-xs text-neutral-400 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
                {product.discountPercent && (
                  <span className="text-xs font-semibold text-[#C85A32]">
                    ({product.discountPercent}% OFF)
                  </span>
                )}
              </div>
            </div>

            <p className="text-xs text-neutral-600 leading-relaxed">
              {product.description}
            </p>

            {/* Size Selector */}
            <div className="space-y-2 pt-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold uppercase tracking-wider text-black">Select Size</span>
                <span className="text-neutral-400 text-[11px]">Size Guide (True to Boxy Fit)</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`min-w-10 h-10 px-3 text-xs font-bold uppercase transition-all cursor-pointer ${
                      selectedSize === s
                        ? 'bg-black text-white'
                        : 'bg-neutral-100 text-neutral-800 hover:bg-neutral-200'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Product Details List */}
            {product.details && product.details.length > 0 && (
              <div className="space-y-1.5 pt-2 border-t border-neutral-100">
                <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                  Fabric & Construction
                </span>
                <ul className="text-xs text-neutral-600 space-y-1">
                  {product.details.map((d, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-black shrink-0" />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="pt-6 space-y-3">
            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                className="flex-1 py-3.5 bg-black text-white text-xs font-extrabold uppercase tracking-[0.2em] hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Bag</span>
              </button>

              <button
                onClick={() => toggleWishlist(product.id)}
                className="p-3.5 border border-neutral-300 hover:border-black transition-colors cursor-pointer"
                aria-label="Wishlist"
              >
                <Heart className={`w-4 h-4 ${isWish ? 'fill-[#DC2626] text-[#DC2626]' : 'text-black'}`} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
