'use client';

import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export default function WishlistDrawer() {
  const { isWishlistOpen, closeWishlist, wishlistProducts, toggleWishlist, addToCart } = useStore();

  if (!isWishlistOpen) return null;

  const formatPrice = (val: string | number) => {
    const num = typeof val === 'string' ? parseFloat(val) : val;
    return `Rs. ${num.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <>
      <div
        onClick={closeWishlist}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-md w-full bg-white z-50 shadow-2xl flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-neutral-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-600 fill-red-600" />
            <h2 className="text-sm font-extrabold uppercase tracking-widest text-black">
              Wishlist ({wishlistProducts.length})
            </h2>
          </div>
          <button
            onClick={closeWishlist}
            className="p-1 text-neutral-400 hover:text-black transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-neutral-100">
          {wishlistProducts.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-16 text-neutral-400">
              <Heart className="w-12 h-12 stroke-[1] mb-3 text-neutral-300" />
              <p className="text-sm font-semibold uppercase tracking-wider text-neutral-700">Wishlist is empty</p>
              <p className="text-xs text-neutral-400 mt-1 max-w-xs">
                Save pieces you love by tapping the heart icon on any card.
              </p>
            </div>
          ) : (
            wishlistProducts.map((product) => (
              <div key={product.id} className="py-4 flex gap-4 items-center">
                <div className="w-20 h-24 bg-neutral-100 shrink-0 overflow-hidden">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-full h-full object-cover object-center"
                  />
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between gap-1">
                    <h3 className="text-xs font-bold uppercase tracking-tight text-neutral-900 line-clamp-1">
                      {product.title}
                    </h3>
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className="text-neutral-400 hover:text-red-600 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="mt-1 text-xs font-bold text-black">
                    {formatPrice(product.price)}
                  </div>

                  <div className="mt-3">
                    <button
                      onClick={() => {
                        addToCart(product.id, 'M', 1);
                        toggleWishlist(product.id);
                      }}
                      className="w-full py-2 bg-black text-white text-[11px] font-bold uppercase tracking-wider hover:bg-neutral-800 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      Move to Bag
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
