'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Heart, ChevronLeft, ChevronRight, ArrowRight, Check } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

// Curated 5 Collection Pieces strictly using genuine client assets from the 'images' folder
const COLLECTION_PRODUCTS = [
  {
    id: 101,
    title: 'DEMON SLAYER TANJIRO TEE',
    colorName: 'Onyx Black',
    slug: 'valjons-straight-fit-pc-fleece-onyx-black',
    price: '1299.00',
    originalPrice: '1999.00',
    discountPercent: 35,
    description: 'Boxy drop-shoulder streetwear tee engineered from 240 GSM combed cotton with high-definition graphic print.',
    images: [
      '/images/products/valjons-heavyweight-fleece.jpg',
      '/images/products/valjons-cargo-fleece.jpg',
      '/images/products/valjons-denim-street.jpg',
    ],
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 102,
    title: 'CARGO WIDE LEG PANTS',
    colorName: 'Vintage Denim Navy',
    slug: 'cargo-wide-leg-pants-navy',
    price: '2999.00',
    originalPrice: '3999.00',
    discountPercent: 25,
    description: 'Relaxed wide-leg cargo pants tailored from premium 280 GSM poly-cotton blend with deep utility pockets and stacking hem.',
    images: [
      '/images/products/valjons-henver-polo.jpg',
      '/images/products/valjons-relaxed-vibe.jpg',
      '/images/products/valjons-denim-street.jpg',
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
  },
  {
    id: 103,
    title: 'CARGO WIDE LEG PANTS',
    colorName: 'Heather Melange Oat',
    slug: 'valjons-straight-fit-pc-fleece-vintage-pine',
    price: '2999.00',
    originalPrice: '3999.00',
    discountPercent: 25,
    description: 'Milled with two-tone heather oat yarns for an effortless architectural drape and all-day streetwear comfort.',
    images: [
      '/images/products/valjons-minimal-purity.jpg',
      '/images/products/valjons-outfit-budget.jpg',
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
  },
  {
    id: 104,
    title: 'CARGO WIDE LEG PANTS',
    colorName: 'Vintage Pine / Olive',
    slug: 'valjons-straight-fit-pc-fleece-heather-oat',
    price: '999.00',
    originalPrice: '1699.00',
    discountPercent: 41,
    microTag: 'This product is 2x larger than our oversized tee. Order 2 sizes down',
    description: 'Subtle garment-dyed olive tone with raw pooling hem and articulated knee seams for fluid motion.',
    images: [
      '/images/products/valjons-cargo-fleece.jpg',
      '/images/products/valjons-orange-streetwear.jpg',
    ],
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 105,
    title: 'DEMON SLAYER TANJIRO TEE',
    colorName: 'Forest Track',
    slug: 'demon-slayer-tanjiro-tee-green',
    price: '999.00',
    originalPrice: '1699.00',
    discountPercent: 41,
    description: 'Relaxed streetwear silhouette featuring signature botanical green dyeing with ribbed athletic trims.',
    images: [
      '/images/products/valjons-orange-streetwear.jpg',
      '/images/products/valjons-denim-street.jpg',
    ],
    sizes: ['S', 'M', 'L', 'XL'],
  },
];

interface ProductCardProps {
  product: typeof COLLECTION_PRODUCTS[0];
  isMobileLayout?: boolean;
}

function CollectionProductCard({ product, isMobileLayout = false }: ProductCardProps) {
  const { isInWishlist, toggleWishlist, addToCart, openCart } = useStore();
  const [imageIdx, setImageIdx] = useState(0);
  const [isAdded, setIsAdded] = useState(false);
  const isWish = isInWishlist(product.id);

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setImageIdx((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setImageIdx((prev) => (prev + 1) % product.images.length);
  };

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    await addToCart(product.id, 'M', 1);
    setIsAdded(true);
    openCart();
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div
      className={`group relative flex flex-col text-left select-none bg-white rounded-xl transition-all duration-300 p-2 sm:p-2.5 border border-transparent ${
        isMobileLayout
          ? 'w-[72vw] max-w-[290px] flex-shrink-0 snap-start'
          : 'hover:shadow-xl hover:-translate-y-1 hover:border-neutral-200/80'
      }`}
    >
      {/* Product Image Frame */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#F6F6F6] rounded-lg">
        <Link href={`/product/${product.slug}`} className="block w-full h-full">
          <img
            src={product.images[imageIdx]}
            alt={product.title}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </Link>

        {/* Top-Left: Red Discount Badge (SAVE XX%) */}
        {product.discountPercent && (
          <div className="absolute top-2.5 left-2.5 bg-[#DC2626] text-white text-[9px] sm:text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-xs font-montserrat shadow-xs z-10 select-none">
            SAVE {product.discountPercent}%
          </div>
        )}

        {/* Top-Right: Wishlist Heart Button in White Circle */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          aria-label={isWish ? 'Remove from wishlist' : 'Add to wishlist'}
          className="absolute top-2.5 right-2.5 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/95 hover:bg-white text-black flex items-center justify-center shadow-xs z-10 cursor-pointer transition-transform duration-200 active:scale-90"
        >
          <Heart
            className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-colors ${
              isWish ? 'fill-[#DC2626] text-[#DC2626]' : 'text-neutral-800 hover:text-black'
            }`}
          />
        </button>

        {/* Desktop Image Slider Navigation Arrows (Visible on card hover) */}
        {!isMobileLayout && product.images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              aria-label="Previous product image"
              className="absolute left-2 top-1/2 -translate-y-1/2 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/95 hover:bg-black hover:text-white text-black flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-all duration-200 z-10 cursor-pointer active:scale-90"
            >
              <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
            </button>
            <button
              onClick={nextImage}
              aria-label="Next product image"
              className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/95 hover:bg-black hover:text-white text-black flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-all duration-200 z-10 cursor-pointer active:scale-90"
            >
              <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
            </button>
          </>
        )}

        {/* Micro Fit Note Pill (Card 4: "This product is 2x larger than our oversized tee. Order 2 sizes down") */}
        {product.microTag && (
          <div
            className={`absolute bottom-2 right-2 max-w-[85%] bg-black/90 backdrop-blur-xs text-white text-[8px] sm:text-[9px] py-1 px-1.5 rounded-xs text-left font-montserrat font-medium z-10 pointer-events-none leading-tight ${
              isMobileLayout ? 'hidden' : 'group-hover:opacity-0 transition-opacity duration-200'
            }`}
          >
            {product.microTag}
          </div>
        )}

        {/* Solid Black ADD TO CART Action Bar:
            - On small devices (123624.png): Solid black button visible at bottom of image
            - On large devices (202233.png): Slides up smoothly on hover */}
        <div
          className={`absolute inset-x-0 bottom-0 z-20 ${
            isMobileLayout
              ? 'translate-y-0 opacity-100'
              : 'transition-all duration-300 transform translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100'
          }`}
        >
          <button
            onClick={handleAddToCart}
            aria-label={`Add ${product.title} to Cart`}
            className="w-full py-2.5 sm:py-3 bg-black hover:bg-neutral-900 active:bg-neutral-800 text-white font-poppins font-black text-[11px] sm:text-xs uppercase tracking-[0.16em] flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-lg"
          >
            {isAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>ADDED</span>
              </>
            ) : (
              <span>ADD TO CART</span>
            )}
          </button>
        </div>
      </div>

      {/* Product Details Below Image */}
      <div className="pt-2.5 pb-1 flex flex-col space-y-1">
        <Link
          href={`/product/${product.slug}`}
          className="font-poppins font-black text-xs sm:text-[13px] uppercase tracking-tight text-neutral-900 line-clamp-1 hover:text-neutral-600 transition-colors"
        >
          {product.title}
        </Link>

        {/* Pricing in INR */}
        <div className="flex items-baseline gap-2 font-montserrat">
          {product.originalPrice && (
            <span className="text-[11px] sm:text-xs text-neutral-400 line-through">
              Rs. {Number(product.originalPrice).toLocaleString('en-IN')}
            </span>
          )}
          <span className="text-xs sm:text-sm font-black text-neutral-900">
            Rs. {Number(product.price).toLocaleString('en-IN')}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function ShopCollectionSection() {
  return (
    <section id="shop-collection" className="w-full py-10 sm:py-16 md:py-20 bg-white text-black scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header Row:
            "OUR COLLECTIONS" on Left (per user request) and "VIEW ALL →" on Right */}
        <div className="flex items-center justify-between mb-5 sm:mb-8 pb-1">
          <h2 className="font-poppins font-black text-xl sm:text-2xl md:text-3xl uppercase tracking-tight text-neutral-900">
            OUR COLLECTIONS
          </h2>

          <Link
            href="/collection/drop-001"
            className="group inline-flex items-center gap-1.5 text-xs sm:text-sm font-black uppercase tracking-wider text-neutral-900 hover:text-neutral-500 transition-colors font-montserrat"
          >
            <span>VIEW ALL</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 1. SMALL DEVICES (< md):
            Horizontal swipe carousel exactly matching user reference 123624.png
            Card 1 is wide & fully visible; Card 2 peeks from right edge with gap; ADD TO CART button visible */}
        <div
          className="flex md:hidden overflow-x-auto snap-x snap-mandatory gap-3 pb-4 px-4 -mx-4 [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {COLLECTION_PRODUCTS.map((product) => (
            <CollectionProductCard key={`mobile-${product.id}`} product={product} isMobileLayout={true} />
          ))}
        </div>

        {/* 2. LARGE DEVICES (>= md):
            5-Column Grid exactly matching user reference 202233.png
            Hover slides up ADD TO CART and reveals carousel navigation arrows */}
        <div className="hidden md:grid md:grid-cols-5 gap-3.5 sm:gap-4 lg:gap-5">
          {COLLECTION_PRODUCTS.map((product) => (
            <CollectionProductCard key={`desktop-${product.id}`} product={product} isMobileLayout={false} />
          ))}
        </div>
      </div>
    </section>
  );
}
