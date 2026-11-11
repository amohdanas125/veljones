'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, ShoppingBag, Trash2, ArrowLeft } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export default function WishlistPage() {
  const { wishlistProducts, toggleWishlist, addToCart, openCart } = useStore();

  const formatPrice = (val: string | number) => {
    const num = typeof val === 'string' ? parseFloat(val) : val;
    return `Rs. ${num.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <div className="min-h-screen bg-white text-black pt-28 pb-16 font-montserrat">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Header Breadcrumb */}
        <div className="flex items-center gap-2 mb-6 text-xs text-neutral-500">
          <Link href="/" className="hover:text-black transition-colors flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
          <span>/</span>
          <span className="text-black font-semibold">Wishlist</span>
        </div>

        {/* Title */}
        <div className="flex items-center justify-between pb-6 border-b border-neutral-200 mb-8">
          <div className="flex items-center gap-3">
            <Heart className="w-6 h-6 text-[#DC2626] fill-[#DC2626]" />
            <h1 className="font-poppins font-black text-2xl sm:text-4xl uppercase tracking-tight">
              My Saved Pieces ({wishlistProducts.length})
            </h1>
          </div>
          <Link
            href="/#shop-collection"
            className="text-xs sm:text-sm font-bold uppercase tracking-wider text-neutral-600 hover:text-black transition-colors"
          >
            Continue Shopping →
          </Link>
        </div>

        {/* Empty State */}
        {wishlistProducts.length === 0 ? (
          <div className="py-24 flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 rounded-full bg-neutral-100 flex items-center justify-center mb-4">
              <Heart className="w-10 h-10 text-neutral-300 stroke-[1.5]" />
            </div>
            <h2 className="font-poppins font-bold text-lg uppercase text-neutral-800">
              Your Wishlist is Empty
            </h2>
            <p className="text-xs text-neutral-500 mt-2 max-w-sm leading-relaxed">
              Explore our collections and tap the heart icon on any piece to save your favorite streetwear silhouettes.
            </p>
            <Link
              href="/#shop-collection"
              className="mt-6 px-8 py-3.5 bg-black text-white text-xs font-bold uppercase tracking-widest hover:bg-neutral-800 transition-colors shadow-lg"
            >
              Explore Collection
            </Link>
          </div>
        ) : (
          /* Products Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {wishlistProducts.map((product) => (
              <div
                key={product.id}
                className="group relative flex flex-col bg-white border border-neutral-200/80 rounded-xl overflow-hidden shadow-xs hover:shadow-xl transition-all"
              >
                {/* Image */}
                <div className="relative aspect-[3/4] w-full bg-neutral-100 overflow-hidden">
                  <Link href={`/product/${product.slug}`} className="block w-full h-full">
                    <img
                      src={product.thumbnail || product.images?.[0]}
                      alt={product.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                  </Link>
                  {/* Delete button */}
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    aria-label="Remove from wishlist"
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/95 hover:bg-red-50 text-neutral-600 hover:text-red-600 flex items-center justify-center shadow-md transition-all active:scale-90"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Info */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <Link
                      href={`/product/${product.slug}`}
                      className="font-poppins font-black text-xs uppercase tracking-tight text-neutral-900 line-clamp-1 hover:text-neutral-600 transition-colors"
                    >
                      {product.title}
                    </Link>
                    <div className="mt-1 font-black text-sm text-neutral-900">
                      {formatPrice(product.price)}
                    </div>
                  </div>

                  <button
                    onClick={async () => {
                      await addToCart(product.id, 'M', 1);
                      openCart();
                    }}
                    className="w-full py-2.5 bg-black hover:bg-neutral-900 active:scale-98 text-white text-[11px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-md"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Move to Bag</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
