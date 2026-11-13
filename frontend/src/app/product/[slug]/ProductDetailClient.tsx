'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  Heart,
  ShoppingBag,
  ArrowLeft,
  MapPin,
  Lock,
  RotateCcw,
  Leaf,
  Check,
  CheckCircle2,
  Sparkles,
  Share2,
  Flame,
  Clock,
  Ruler,
  X,
  ShieldCheck,
  Truck,
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { api } from '@/lib/api';
import { Product } from '@/types';
import CustomerReviewsSection from '@/components/CustomerReviewsSection';
import GarmentMeasurementDiagram from '@/components/GarmentMeasurementDiagram';

// Pre-configured rich colorways strictly using genuine client assets from the 'images' folder
const COLORWAYS = [
  {
    id: 'onyx-black',
    name: 'ONYX BLACK',
    slug: 'valjons-straight-fit-pc-fleece-onyx-black',
    thumbnail: '/images/products/valjons-heavyweight-fleece.jpg',
    images: [
      '/images/products/valjons-heavyweight-fleece.jpg',
      '/images/products/valjons-cargo-fleece.jpg',
      '/images/products/valjons-denim-street.jpg',
    ],
  },
  {
    id: 'heather-oat',
    name: 'HEATHER MELANGE / OAT',
    slug: 'valjons-straight-fit-pc-fleece-heather-oat',
    thumbnail: '/images/products/valjons-henver-polo.jpg',
    images: [
      '/images/products/valjons-henver-polo.jpg',
      '/images/products/valjons-relaxed-vibe.jpg',
      '/images/products/valjons-outfit-budget.jpg',
    ],
  },
  {
    id: 'vintage-pine',
    name: 'VINTAGE PINE / OLIVE',
    slug: 'valjons-straight-fit-pc-fleece-vintage-pine',
    thumbnail: '/images/products/valjons-minimal-purity.jpg',
    images: [
      '/images/products/valjons-minimal-purity.jpg',
      '/images/products/valjons-orange-streetwear.jpg',
      '/images/products/valjons-cargo-fleece.jpg',
    ],
  },
];

// Curated "You May Also Like" products strictly using genuine assets from 'images' folder
const RELATED_ITEMS = [
  {
    id: 901,
    title: 'VALJONS STRAIGHT FIT PC FLEECE (ONYX BLACK)',
    slug: 'valjons-straight-fit-pc-fleece-onyx-black',
    price: 2499,
    originalPrice: 3499,
    discountPercent: 28,
    thumbnail: '/images/products/valjons-heavyweight-fleece.jpg',
  },
  {
    id: 902,
    title: 'CARGO WIDE LEG PANTS (HEATHER OAT)',
    slug: 'valjons-straight-fit-pc-fleece-heather-oat',
    price: 2499,
    originalPrice: 3499,
    discountPercent: 28,
    thumbnail: '/images/products/valjons-henver-polo.jpg',
  },
  {
    id: 903,
    title: 'CARGO WIDE LEG PANTS (VINTAGE PINE)',
    slug: 'valjons-straight-fit-pc-fleece-vintage-pine',
    price: 2499,
    originalPrice: 3499,
    discountPercent: 28,
    thumbnail: '/images/products/valjons-minimal-purity.jpg',
  },
];

export default function ProductDetailClient() {
  const params = useParams();
  const slug = (params?.slug as string) || 'valjons-straight-fit-pc-fleece-onyx-black';

  const { addToCart, isInWishlist, toggleWishlist, addToast } = useStore();
  const [product, setProduct] = useState<Product | null>(null);
  const [activeColor, setActiveColor] = useState('onyx-black');
  const [selectedSize, setSelectedSize] = useState('M');
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Sticky mobile bottom bar control
  const [showStickyBar, setShowStickyBar] = useState(false);
  const mainBuyBtnRef = useRef<HTMLButtonElement | null>(null);

  // Fit Advisor modal state
  const [isFitModalOpen, setIsFitModalOpen] = useState(false);
  const [advisorHeight, setAdvisorHeight] = useState('5ft 10in - 6ft 0in');
  const [advisorDrape, setAdvisorDrape] = useState('oversized');

  // Pincode delivery check state
  const [pincode, setPincode] = useState('');
  const [pincodeDetails, setPincodeDetails] = useState<{
    city: string;
    deliveryDate: string;
    isCodAvailable: boolean;
  } | null>(null);
  const [isCheckingPincode, setIsCheckingPincode] = useState(false);

  // Adaptive measurement chart state (auto-detected, user toggleable)
  const isLowerInitial = Boolean(
    slug.includes('pant') ||
    slug.includes('sweatpant') ||
    slug.includes('fleece') ||
    slug.includes('cargo')
  );
  const [measurementType, setMeasurementType] = useState<'upper' | 'lower'>(isLowerInitial ? 'lower' : 'upper');

  useEffect(() => {
    if (product) {
      const isLower = Boolean(
        product.categorySlug === 'sweatpants' ||
        product.title?.toLowerCase().includes('pant') ||
        product.title?.toLowerCase().includes('cargo') ||
        product.slug?.toLowerCase().includes('pant')
      );
      setMeasurementType(isLower ? 'lower' : 'upper');
    }
  }, [product]);

  useEffect(() => {
    setIsLoading(true);
    api.getProductBySlug(slug)
      .then((prod) => {
        if (prod) {
          setProduct(prod);
          const matchColor = COLORWAYS.find((c) => c.slug === prod.slug);
          if (matchColor) setActiveColor(matchColor.id);
        }
      })
      .catch((err) => {
        console.warn('Fallback to local product definition:', err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [slug]);

  // Scroll listener for Sticky Mobile Bar
  useEffect(() => {
    const handleScroll = () => {
      if (!mainBuyBtnRef.current) return;
      const rect = mainBuyBtnRef.current.getBoundingClientRect();
      // Show sticky bar once the main buy button is scrolled out of top view
      if (rect.bottom < 80) {
        setShowStickyBar(true);
      } else {
        setShowStickyBar(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fallback product data strictly using genuine client assets
  const currentTitle = product?.title || 'VALJONS DROP 001 — STRAIGHT FIT PC FLEECE SWEATPANTS';
  const currentPrice = product?.price ? parseFloat(product.price) : 2499;
  const originalPrice = product?.originalPrice ? parseFloat(product.originalPrice) : 3499;
  const discountPercent = product?.discountPercent || 28;

  const activeColorObj = COLORWAYS.find((c) => c.id === activeColor) || COLORWAYS[0];
  const displayImages =
    product?.images && product.images.length > 0 && !product.images[0].includes('unsplash')
      ? product.images
      : activeColorObj.images;

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  // Upper body measurement specifications (Inches)
  const upperBodyMeasurements = [
    { size: 'XS', chest: '40', shoulder: '19', length: '26', sleeve: '9 1/2' },
    { size: 'S', chest: '42', shoulder: '20', length: '27', sleeve: '9 3/4' },
    { size: 'M', chest: '44', shoulder: '20 1/2', length: '28', sleeve: '10' },
    { size: 'L', chest: '46', shoulder: '21', length: '29', sleeve: '10 1/4' },
    { size: 'XL', chest: '48', shoulder: '21 1/2', length: '30', sleeve: '10 1/2' },
    { size: 'XXL', chest: '50', shoulder: '22', length: '31', sleeve: '10 3/4' },
  ];

  // Lower body measurement specifications (Inches)
  const lowerBodyMeasurements = [
    { size: 'XS', waist: '28 - 30', hip: '38', inseam: '29 1/2', length: '39 1/2', hem: '9' },
    { size: 'S', waist: '30 - 32', hip: '40', inseam: '30', length: '40 1/2', hem: '9 1/2' },
    { size: 'M', waist: '32 - 34', hip: '42', inseam: '30 1/2', length: '41 1/2', hem: '10' },
    { size: 'L', waist: '34 - 36', hip: '44', inseam: '31', length: '42 1/2', hem: '10 1/2' },
    { size: 'XL', waist: '36 - 38', hip: '46', inseam: '31 1/2', length: '43 1/2', hem: '11' },
    { size: 'XXL', waist: '38 - 40', hip: '48', inseam: '32', length: '44 1/2', hem: '11 1/2' },
  ];

  // Smart Indian Pincode Resolver
  const handlePincodeCheck = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPin = pincode.trim().replace(/\D/g, '');
    if (cleanPin.length !== 6) {
      addToast('Please enter a valid 6-digit Indian PIN code.', 'error');
      return;
    }

    setIsCheckingPincode(true);

    setTimeout(() => {
      setIsCheckingPincode(false);

      // Comprehensive Indian Postal Circle Dictionary
      const PINCODE_CIRCLES: Record<string, string> = {
        '11': 'New Delhi',
        '12': 'Gurugram / Faridabad',
        '13': 'Panipat / Haryana',
        '14': 'Ludhiana / Punjab',
        '15': 'Bathinda / Punjab',
        '16': 'Chandigarh / Mohali',
        '17': 'Shimla / Himachal Pradesh',
        '18': 'Jammu / J&K',
        '19': 'Srinagar / Kashmir',
        '20': 'Noida / Ghaziabad / Western UP',
        '21': 'Prayagraj / Southern UP',
        '22': 'Lucknow / Central UP',
        '23': 'Varanasi / Mirzapur / UP',
        '24': 'Meerut / Bareilly / UP',
        '25': 'Muzaffarnagar / Saharanpur / UP',
        '26': 'Bareilly / Pilibhit / UP',
        '27': 'Azamgarh / Mau / Eastern UP',
        '28': 'Agra / Mathura / Jhansi / UP',
        '30': 'Jaipur / Rajasthan',
        '31': 'Udaipur / Rajasthan',
        '32': 'Kota / Rajasthan',
        '33': 'Bikaner / Rajasthan',
        '34': 'Jodhpur / Rajasthan',
        '36': 'Rajkot / Saurashtra / Gujarat',
        '37': 'Kutch / Bhuj / Gujarat',
        '38': 'Ahmedabad / Gandhinagar',
        '39': 'Surat / Vadodara / Gujarat',
        '40': 'Mumbai / Navi Mumbai / Thane',
        '41': 'Pune / Western Maharashtra',
        '42': 'Nashik / Dhule / Maharashtra',
        '43': 'Aurangabad / Marathwada',
        '44': 'Nagpur / Vidarbha',
        '45': 'Indore / Western MP',
        '46': 'Bhopal / Central MP',
        '47': 'Gwalior / Northern MP',
        '48': 'Jabalpur / Eastern MP',
        '49': 'Raipur / Chhattisgarh',
        '50': 'Hyderabad / Secunderabad',
        '51': 'Tirupati / Rayalaseema',
        '52': 'Vijayawada / Guntur / AP',
        '53': 'Visakhapatnam / Coastal AP',
        '56': 'Bengaluru Urban & Rural',
        '57': 'Mangalore / Mysuru / Karnataka',
        '58': 'Hubballi / North Karnataka',
        '59': 'Belagavi / North Karnataka',
        '60': 'Chennai / Kanchipuram',
        '61': 'Thanjavur / Central TN',
        '62': 'Madurai / South TN',
        '63': 'Salem / Vellore / North TN',
        '64': 'Coimbatore / Tiruppur / West TN',
        '67': 'Kozhikode / Malabar / Kerala',
        '68': 'Kochi / Ernakulam / Kerala',
        '69': 'Thiruvananthapuram / Kerala',
        '70': 'Kolkata / Howrah',
        '71': 'Hooghly / Burdwan / WB',
        '72': 'Kharagpur / Medinipur / WB',
        '73': 'Siliguri / North Bengal',
        '74': 'North 24 Parganas / WB',
        '75': 'Bhubaneswar / Cuttack / Odisha',
        '76': 'Berhampur / Odisha',
        '77': 'Rourkela / Odisha',
        '78': 'Guwahati / Assam',
        '79': 'Shillong / North East',
        '80': 'Patna / Central Bihar',
        '81': 'Bhagalpur / Bihar',
        '82': 'Gaya / South Bihar',
        '83': 'Ranchi / Jamshedpur / Jharkhand',
        '84': 'Muzaffarpur / North Bihar',
        '85': 'Purnia / Katihar / Bihar',
      };

      const prefix2 = cleanPin.substring(0, 2);
      const prefix3 = cleanPin.substring(0, 3);
      let city = PINCODE_CIRCLES[prefix2] || 'Your Region';
      if (prefix3 === '403') {
        city = 'Panaji / Goa';
      }

      const isMetro = ['11', '40', '56', '50', '60', '70', '41', '38'].includes(prefix2);
      const deliveryDate = new Date();
      deliveryDate.setDate(deliveryDate.getDate() + (isMetro ? 2 : 4));
      const dateStr = deliveryDate.toLocaleDateString('en-IN', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      });

      setPincodeDetails({
        city,
        deliveryDate: dateStr,
        isCodAvailable: true,
      });

      addToast(`Delivery confirmed to ${city} (${cleanPin})!`, 'success');
    }, 450);
  };

  const handleAddBag = () => {
    const prodId = product?.id || 101;
    addToCart(prodId, selectedSize, 1);
  };

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      addToast('Product link copied to clipboard!');
    }
  };

  // Fit Advisor recommendation algorithm
  const getRecommendedSize = () => {
    if (advisorHeight.includes('5ft 4in') || advisorHeight.includes('5ft 6in')) {
      return advisorDrape === 'tailored' ? 'XS' : advisorDrape === 'oversized' ? 'S' : 'M';
    } else if (advisorHeight.includes('5ft 7in') || advisorHeight.includes('5ft 9in')) {
      return advisorDrape === 'tailored' ? 'S' : advisorDrape === 'oversized' ? 'M' : 'L';
    } else if (advisorHeight.includes('5ft 10in') || advisorHeight.includes('6ft 0in')) {
      return advisorDrape === 'tailored' ? 'M' : advisorDrape === 'oversized' ? 'L' : 'XL';
    } else {
      return advisorDrape === 'tailored' ? 'L' : advisorDrape === 'oversized' ? 'XL' : 'XXL';
    }
  };

  const isWish = product ? isInWishlist(product.id) : false;

  return (
    <div className="w-full bg-white pb-16 font-montserrat pt-20 sm:pt-24 selection:bg-black selection:text-white">
      {/* 1. Breadcrumb navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 text-[11px] font-semibold uppercase tracking-wider text-neutral-400 flex items-center justify-between border-b border-neutral-100">
        <div className="flex items-center gap-2 overflow-hidden">
          <Link href="/" className="hover:text-black transition-colors flex items-center gap-1 shrink-0">
            <ArrowLeft className="w-3.5 h-3.5" /> Home
          </Link>
          <span>/</span>
          <Link href="/#shop-collection" className="hover:text-black transition-colors shrink-0">
            Shop
          </Link>
          <span>/</span>
          <span className="text-black truncate max-w-[200px] sm:max-w-none">{currentTitle}</span>
        </div>

        {/* Live Viewing Counter */}
        <div className="hidden sm:flex items-center gap-1.5 text-[10px] font-bold text-neutral-600 bg-neutral-100 px-2.5 py-1 rounded-full uppercase tracking-wider">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>24 shoppers viewing now</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-6 sm:pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14">
          {/* LEFT: Product Photography & Gallery (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Featured Image Frame */}
            <div className="relative aspect-[3/4] w-full bg-[#F5F4F0] rounded-xl overflow-hidden shadow-xs border border-neutral-200/60 group">
              <img
                src={displayImages[activeImageIndex] || displayImages[0]}
                alt={currentTitle}
                className="w-full h-full object-cover object-center transition-all duration-500 group-hover:scale-105"
              />

              {discountPercent > 0 && (
                <div className="absolute top-4 left-4 bg-[#7F1717] text-white text-[10px] sm:text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-sm shadow-sm">
                  {discountPercent}% OFF
                </div>
              )}

              {/* Limited Drop Badge */}
              <div className="absolute top-4 right-4 bg-black/85 backdrop-blur-xs text-white text-[9px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-xs flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>DROP 001 · 280 GSM</span>
              </div>
            </div>

            {/* Thumbnail Carousel */}
            {displayImages.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
                {displayImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-20 h-24 shrink-0 rounded-lg overflow-hidden border-2 transition-all cursor-pointer bg-[#F5F4F0] ${
                      activeImageIndex === idx
                        ? 'border-black scale-[1.02] shadow-sm'
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT: Product Details & Purchase Actions (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Title, Price & Actions */}
            <div className="space-y-3 pb-5 border-b border-neutral-200">
              <div className="flex items-start justify-between gap-4">
                <h1 className="text-lg sm:text-2xl font-black uppercase tracking-tight text-neutral-900 font-poppins leading-snug">
                  {currentTitle}
                </h1>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={handleShare}
                    aria-label="Share product"
                    className="p-2.5 rounded-full border border-neutral-300 hover:border-black transition-colors cursor-pointer shadow-xs text-neutral-800"
                    title="Copy Link"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => product && toggleWishlist(product.id)}
                    aria-label="Save to Wishlist"
                    className="p-2.5 rounded-full border border-neutral-300 hover:border-black transition-colors cursor-pointer shadow-xs"
                  >
                    <Heart className={`w-4 h-4 ${isWish ? 'fill-[#DC2626] text-[#DC2626]' : 'text-neutral-800'}`} />
                  </button>
                </div>
              </div>

              {/* Price Details */}
              <div className="flex items-baseline gap-3">
                <span className="text-xl sm:text-2xl font-extrabold text-black font-montserrat">
                  Rs. {currentPrice.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </span>
                {originalPrice > currentPrice && (
                  <span className="text-sm text-neutral-400 line-through">
                    Rs. {originalPrice.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                  </span>
                )}
                {discountPercent > 0 && (
                  <span className="text-xs font-bold text-[#801414] uppercase">
                    ({discountPercent}% off)
                  </span>
                )}
              </div>

              {/* Social Proof & Same-Day Dispatch Badges */}
              <div className="flex flex-col gap-1.5 pt-1">
                <div className="flex items-center gap-2 text-[11px] font-bold text-neutral-800">
                  <Flame className="w-4 h-4 text-amber-600 fill-amber-500" />
                  <span>Limited Drop: Only 3 units remaining in Size {selectedSize}</span>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-neutral-600">
                  <Clock className="w-3.5 h-3.5 text-neutral-500" />
                  <span>Order within <span className="font-bold text-black">2h 45m</span> for same-day express dispatch.</span>
                </div>
              </div>
            </div>

            {/* 3 Value Proposition Badges */}
            <div className="grid grid-cols-3 gap-2 py-3 px-2 bg-[#F9F8F6] rounded-lg border border-neutral-200/70 text-center">
              <div className="flex flex-col items-center justify-center space-y-1 p-1">
                <Lock className="w-4 h-4 text-neutral-700" />
                <span className="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider text-black">
                  SECURE PAYMENTS
                </span>
              </div>

              <div className="flex flex-col items-center justify-center space-y-1 p-1 border-x border-neutral-200">
                <RotateCcw className="w-4 h-4 text-neutral-700" />
                <span className="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider text-black">
                  EASY RETURNS
                </span>
              </div>

              <div className="flex flex-col items-center justify-center space-y-1 p-1">
                <Leaf className="w-4 h-4 text-neutral-700" />
                <span className="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider text-black">
                  SUSTAINABLE
                </span>
              </div>
            </div>

            {/* COLOURS section */}
            <div className="space-y-3 pt-2">
              <span className="text-xs font-black uppercase tracking-[0.18em] text-neutral-900 block font-poppins">
                COLOURS
              </span>

              <div className="flex items-center gap-4">
                {COLORWAYS.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => {
                      setActiveColor(c.id);
                      setActiveImageIndex(0);
                    }}
                    className="flex flex-col items-center space-y-1.5 group cursor-pointer"
                  >
                    <div
                      className={`w-14 h-16 rounded-md overflow-hidden border-2 transition-all bg-[#F5F4F0] p-0.5 ${
                        activeColor === c.id
                          ? 'border-black shadow-sm'
                          : 'border-transparent opacity-75 group-hover:opacity-100'
                      }`}
                    >
                      <img src={c.thumbnail} alt={c.name} className="w-full h-full object-cover rounded-xs" />
                    </div>

                    <span
                      className={`text-[9px] font-bold uppercase tracking-wider transition-colors pb-0.5 max-w-[80px] text-center truncate ${
                        activeColor === c.id
                          ? 'text-black border-b-2 border-[#801414]'
                          : 'text-neutral-500'
                      }`}
                    >
                      {c.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* SIZES section + Fit Advisor Button */}
            <div className="space-y-3 pt-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-black uppercase tracking-[0.18em] text-neutral-900 font-poppins">
                  SIZES
                </span>

                <button
                  type="button"
                  onClick={() => setIsFitModalOpen(true)}
                  className="text-[11px] text-[#801414] hover:text-black font-bold uppercase tracking-wider flex items-center gap-1 cursor-pointer transition-colors underline"
                >
                  <Ruler className="w-3.5 h-3.5" />
                  <span>Fit Advisor</span>
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`min-w-12 h-11 px-3 text-xs font-extrabold uppercase transition-all rounded-xs cursor-pointer border ${
                      selectedSize === s
                        ? 'bg-[#181818] text-white border-black shadow-md'
                        : 'bg-white text-neutral-800 border-neutral-300 hover:border-black'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* ADD TO SHOPPING BAG button */}
            <div className="pt-2">
              <button
                ref={mainBuyBtnRef}
                onClick={handleAddBag}
                className="w-full py-4 bg-[#801414] hover:bg-[#6D1111] active:scale-[0.99] text-white font-extrabold text-xs uppercase tracking-[0.22em] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg rounded-xs font-montserrat"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>ADD TO SHOPPING BAG · SIZE {selectedSize}</span>
              </button>
            </div>

            {/* SMART CHECK DELIVERY section */}
            <div className="space-y-2.5 pt-4 border-t border-neutral-200">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-[0.18em] text-neutral-900 block font-poppins">
                  CHECK DELIVERY & COD
                </span>
                <span className="text-[10px] text-emerald-700 font-bold uppercase tracking-wider">
                  Free Express Delivery
                </span>
              </div>

              <form onSubmit={handlePincodeCheck} className="flex gap-2">
                <input
                  type="text"
                  maxLength={6}
                  placeholder="Enter 6-digit Pincode (e.g. 110001)"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                  className="flex-1 px-3.5 py-2.5 border border-neutral-300 text-xs text-black placeholder:text-neutral-400 focus:outline-none focus:border-black rounded-xs font-montserrat"
                />
                <button
                  type="submit"
                  disabled={isCheckingPincode}
                  className="px-5 py-2.5 border border-neutral-900 bg-black hover:bg-neutral-800 text-white text-xs font-bold uppercase tracking-wider transition-colors rounded-xs cursor-pointer"
                >
                  {isCheckingPincode ? 'Checking...' : 'Check'}
                </button>
              </form>

              {pincodeDetails ? (
                <div className="p-3 bg-emerald-50/80 border border-emerald-200 rounded-md space-y-1.5 text-xs text-emerald-950">
                  <div className="flex items-center gap-2 font-bold text-emerald-900">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Express Delivery to {pincodeDetails.city} by {pincodeDetails.deliveryDate}</span>
                  </div>
                  <div className="flex items-center gap-4 text-[11px] text-emerald-800 pl-6">
                    <span className="flex items-center gap-1">
                      <Truck className="w-3.5 h-3.5 text-emerald-600" /> Free Express Courier
                    </span>
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Cash on Delivery Available
                    </span>
                  </div>
                </div>
              ) : (
                <div className="flex items-start gap-1.5 text-[11px] text-neutral-500">
                  <MapPin className="w-3.5 h-3.5 mt-0.5 text-neutral-400 shrink-0" />
                  <span>Enter your 6-digit Indian PIN code to view live delivery dates and COD status</span>
                </div>
              )}
            </div>

            {/* SIZE CHART section matching reference design */}
            <div className="space-y-3.5 pt-3 border-t border-neutral-200">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-[0.18em] text-neutral-900 block font-poppins">
                  SIZE CHART & SPECIFICATIONS
                </span>
                <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider">
                  {measurementType === 'lower' ? 'Pants / Bottoms' : 'Tees / Tops'}
                </span>
              </div>

              {/* Segmented Toggle: Lower Body vs Upper Body */}
              <div className="grid grid-cols-2 p-1 bg-neutral-100 rounded-lg text-[10px] sm:text-xs font-bold uppercase tracking-wider font-poppins">
                <button
                  type="button"
                  onClick={() => setMeasurementType('lower')}
                  className={`py-2 px-2 text-center rounded-md transition-all cursor-pointer ${
                    measurementType === 'lower'
                      ? 'bg-black text-white shadow-xs'
                      : 'text-neutral-500 hover:text-black'
                  }`}
                >
                  Lower Body (Pants)
                </button>
                <button
                  type="button"
                  onClick={() => setMeasurementType('upper')}
                  className={`py-2 px-2 text-center rounded-md transition-all cursor-pointer ${
                    measurementType === 'upper'
                      ? 'bg-black text-white shadow-xs'
                      : 'text-neutral-500 hover:text-black'
                  }`}
                >
                  Upper Body (Tees / Tops)
                </button>
              </div>

              {/* Vector Architectural Garment Diagram (Infinitely crisp SVG) */}
              <div className="p-3 bg-[#FAF9F7] rounded-xl border border-neutral-200 shadow-2xs">
                <GarmentMeasurementDiagram type={measurementType} />
              </div>

              {/* Measurement Table */}
              <div className="overflow-x-auto">
                <div className="bg-[#801414] text-white text-[10px] font-bold uppercase tracking-[0.2em] py-1.5 px-3 text-center rounded-t-md">
                  ALL MEASUREMENTS IN INCHES · {measurementType === 'lower' ? 'SWEATPANTS & CARGO' : 'STREETWEAR TEES'}
                </div>

                {measurementType === 'lower' ? (
                  <table className="w-full text-center border-collapse text-[10px] border border-neutral-200 rounded-b-md overflow-hidden">
                    <thead>
                      <tr className="bg-neutral-100/80 font-bold uppercase text-neutral-600 border-b border-neutral-200">
                        <th className="py-2 px-1">SIZE</th>
                        <th className="py-2 px-1">WAIST</th>
                        <th className="py-2 px-1">HIP</th>
                        <th className="py-2 px-1">INSEAM</th>
                        <th className="py-2 px-1">OUTSEAM</th>
                        <th className="py-2 px-1">HEM</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                      {lowerBodyMeasurements.map((m) => (
                        <tr
                          key={m.size}
                          className={selectedSize === m.size ? 'bg-red-50/70 font-bold' : 'hover:bg-neutral-50'}
                        >
                          <td className="py-2 px-1 font-bold text-black">{m.size}</td>
                          <td className="py-1 px-1">
                            <span className="inline-block px-1.5 py-0.5 rounded-full border border-neutral-300 bg-white text-neutral-800">
                              {m.waist}
                            </span>
                          </td>
                          <td className="py-1 px-1">
                            <span className="inline-block px-1.5 py-0.5 rounded-full border border-neutral-300 bg-white text-neutral-800">
                              {m.hip}
                            </span>
                          </td>
                          <td className="py-1 px-1">
                            <span className="inline-block px-1.5 py-0.5 rounded-full border border-neutral-300 bg-white text-neutral-800">
                              {m.inseam}
                            </span>
                          </td>
                          <td className="py-1 px-1">
                            <span className="inline-block px-1.5 py-0.5 rounded-full border border-neutral-300 bg-white text-neutral-800">
                              {m.length}
                            </span>
                          </td>
                          <td className="py-1 px-1">
                            <span className="inline-block px-1.5 py-0.5 rounded-full border border-neutral-300 bg-white text-neutral-800">
                              {m.hem}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <table className="w-full text-center border-collapse text-[10px] border border-neutral-200 rounded-b-md overflow-hidden">
                    <thead>
                      <tr className="bg-neutral-100/80 font-bold uppercase text-neutral-600 border-b border-neutral-200">
                        <th className="py-2 px-1">SIZE</th>
                        <th className="py-2 px-1">CHEST</th>
                        <th className="py-2 px-1">SHOULDER</th>
                        <th className="py-2 px-1">LENGTH</th>
                        <th className="py-2 px-1">SLEEVE</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                      {upperBodyMeasurements.map((m) => (
                        <tr
                          key={m.size}
                          className={selectedSize === m.size ? 'bg-red-50/70 font-bold' : 'hover:bg-neutral-50'}
                        >
                          <td className="py-2 px-1 font-bold text-black">{m.size}</td>
                          <td className="py-1 px-1">
                            <span className="inline-block px-1.5 py-0.5 rounded-full border border-neutral-300 bg-white text-neutral-800">
                              {m.chest}
                            </span>
                          </td>
                          <td className="py-1 px-1">
                            <span className="inline-block px-1.5 py-0.5 rounded-full border border-neutral-300 bg-white text-neutral-800">
                              {m.shoulder}
                            </span>
                          </td>
                          <td className="py-1 px-1">
                            <span className="inline-block px-1.5 py-0.5 rounded-full border border-neutral-300 bg-white text-neutral-800">
                              {m.length}
                            </span>
                          </td>
                          <td className="py-1 px-1">
                            <span className="inline-block px-1.5 py-0.5 rounded-full border border-neutral-300 bg-white text-neutral-800">
                              {m.sleeve}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>

              {/* Contextual HOW TO MEASURE guide */}
              <div className="p-3 bg-neutral-50 rounded-lg text-[10px] text-neutral-600 space-y-1.5 leading-relaxed border border-neutral-200/60">
                <p className="font-bold uppercase tracking-wider text-black">
                  HOW TO MEASURE ({measurementType === 'lower' ? 'PANTS / BOTTOMS' : 'TEES / TOPS'})?
                </p>
                <p className="text-neutral-500">All measurements are taken flat across relaxed garments.</p>
                {measurementType === 'lower' ? (
                  <>
                    <p><span className="font-bold text-neutral-900">[A] WAIST</span> — Measure flat across elasticated waistband relaxed (double for circumference).</p>
                    <p><span className="font-bold text-neutral-900">[B] HIP</span> — Across the widest part of the seat/hips.</p>
                    <p><span className="font-bold text-neutral-900">[C] INSEAM</span> — Inner leg seam from crotch down to bottom hem pooling.</p>
                    <p><span className="font-bold text-neutral-900">[D] OUTSEAM</span> — Total outer side seam from top of waistband to leg cuff.</p>
                    <p><span className="font-bold text-neutral-900">[E] HEM</span> — Flat width of the bottom ankle opening.</p>
                  </>
                ) : (
                  <>
                    <p><span className="font-bold text-neutral-900">[A] CHEST</span> — Across the chest, 2cm below the armhole, pit to pit.</p>
                    <p><span className="font-bold text-neutral-900">[B] LENGTH</span> — Highest point of shoulder down to bottom hem.</p>
                    <p><span className="font-bold text-neutral-900">[C] SHOULDER</span> — Across the back, from shoulder seam to shoulder seam.</p>
                    <p><span className="font-bold text-neutral-900">[D] SLEEVE</span> — From shoulder seam down to sleeve cuff opening.</p>
                  </>
                )}
              </div>
            </div>

            {/* DESCRIPTION section */}
            <div className="space-y-3 pt-3 border-t border-neutral-200">
              <span className="text-xs font-black uppercase tracking-[0.18em] text-neutral-900 block font-poppins">
                CRAFTSMANSHIP & DETAILS
              </span>

              <p className="text-xs text-neutral-600 leading-relaxed font-normal">
                Architectural straight-fit silhouette tailored in custom milled 280 GSM PC fleece. Built with deep encased waistband drawstrings, reinforced double-needle chain stitching, and structured raw pooling hems that stack effortlessly over sneakers.
              </p>

              <ul className="text-xs text-neutral-700 space-y-1.5 pt-1">
                <li className="flex items-start gap-2">
                  <span className="text-black font-bold">·</span>
                  <span>70% Combed Cotton / 30% Structural Polyester loopback fleece</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-black font-bold">·</span>
                  <span>Anti-lint brushed interior with Zero pill finish</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-black font-bold">·</span>
                  <span>Deep side pockets engineered with concealed reinforcement</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-black font-bold">·</span>
                  <span>Embroidered tonal VALJONS insignia at left thigh</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* YOU MAY ALSO LIKE Section */}
        <div className="mt-20 pt-14 border-t border-neutral-200">
          <div className="text-center space-y-1 mb-8">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#801414] font-montserrat">
              Complete The Rotation
            </span>
            <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight font-poppins text-black">
              YOU MAY ALSO LIKE
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {RELATED_ITEMS.map((item) => (
              <div
                key={item.id}
                className="group relative flex flex-col bg-white border border-neutral-200 rounded-lg overflow-hidden shadow-2xs hover:shadow-lg transition-all duration-300"
              >
                {/* Photo */}
                <div className="relative aspect-[3/4] w-full bg-[#F5F4F0] overflow-hidden">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <button
                    onClick={() => addToast('Saved to wishlist')}
                    aria-label="Wishlist"
                    className="absolute top-3 right-3 p-2 rounded-full bg-white/90 hover:bg-white text-neutral-700 shadow-xs cursor-pointer"
                  >
                    <Heart className="w-4 h-4" />
                  </button>
                </div>

                {/* Details */}
                <div className="p-4 flex flex-col justify-between flex-1 space-y-2">
                  <Link
                    href={`/product/${item.slug}`}
                    className="text-xs font-bold uppercase tracking-tight text-neutral-900 group-hover:text-black line-clamp-2 leading-snug font-poppins"
                  >
                    {item.title}
                  </Link>

                  <div className="flex items-baseline gap-2 pt-1">
                    <span className="text-sm font-extrabold text-black font-montserrat">
                      Rs. {item.price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </span>
                    <span className="text-xs text-neutral-400 line-through">
                      Rs. {item.originalPrice.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </span>
                    <span className="text-[11px] font-bold text-[#801414]">
                      ({item.discountPercent}% off)
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      addToCart(item.id, 'M', 1);
                    }}
                    className="w-full mt-2 py-2.5 bg-black text-white text-[11px] font-bold uppercase tracking-wider hover:bg-neutral-800 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Quick Add</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Customer Reviews Section embedded on PDP */}
        <div className="mt-16">
          <CustomerReviewsSection productTitle={currentTitle} />
        </div>
      </div>

      {/* STICKY MOBILE ADD TO BAG BAR (Visible when scrolled past main CTA) */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-neutral-200/90 p-3 lg:hidden transition-all duration-300 shadow-2xl ${
          showStickyBar ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex items-center justify-between gap-3 max-w-lg mx-auto">
          {/* Thumbnail & Title */}
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-11 h-13 rounded bg-neutral-100 overflow-hidden shrink-0 border border-neutral-200">
              <img
                src={displayImages[0]}
                alt={currentTitle}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="min-w-0">
              <h4 className="text-[11px] font-bold text-neutral-900 truncate uppercase font-poppins">
                {currentTitle}
              </h4>
              <div className="flex items-baseline gap-1.5">
                <span className="text-xs font-black text-black">
                  Rs. {currentPrice.toLocaleString('en-IN')}
                </span>
                <span className="text-[10px] text-neutral-400 line-through">
                  Rs. {originalPrice.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </div>

          {/* Size Pill + Add to Bag CTA */}
          <div className="flex items-center gap-2 shrink-0">
            <select
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
              className="h-10 px-2 border border-neutral-300 rounded text-xs font-bold uppercase bg-white text-black focus:outline-none"
            >
              {sizes.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>

            <button
              onClick={handleAddBag}
              className="h-10 px-4 bg-[#801414] hover:bg-[#6D1111] text-white text-[11px] font-extrabold uppercase tracking-wider rounded flex items-center gap-1.5 shadow-md active:scale-95 transition-all"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
          </div>
        </div>
      </div>

      {/* FIT & SIZING ADVISOR MODAL */}
      {isFitModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-fade-in font-montserrat">
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 sm:p-7 space-y-5 text-black">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <div className="flex items-center gap-2">
                <Ruler className="w-5 h-5 text-[#801414]" />
                <h3 className="text-base font-black uppercase tracking-tight font-poppins text-black">
                  Valjons Fit Advisor
                </h3>
              </div>
              <button
                onClick={() => setIsFitModalOpen(false)}
                className="p-1 rounded-full text-neutral-400 hover:text-black transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              {/* Step 1: Height Selector */}
              <div className="space-y-1.5">
                <label className="font-bold uppercase tracking-wider text-neutral-700 block text-[11px]">
                  1. Select Your Height
                </label>
                <select
                  value={advisorHeight}
                  onChange={(e) => setAdvisorHeight(e.target.value)}
                  className="w-full px-3 py-2.5 border border-neutral-300 rounded-md bg-white text-xs font-medium focus:border-black focus:outline-none"
                >
                  <option value="5ft 4in - 5ft 6in">5&apos;4&quot; &ndash; 5&apos;6&quot; (162 &ndash; 168 cm)</option>
                  <option value="5ft 7in - 5ft 9in">5&apos;7&quot; &ndash; 5&apos;9&quot; (170 &ndash; 175 cm)</option>
                  <option value="5ft 10in - 6ft 0in">5&apos;10&quot; &ndash; 6&apos;0&quot; (177 &ndash; 183 cm)</option>
                  <option value="6ft 1in - 6ft 3in">6&apos;1&quot; &ndash; 6&apos;3&quot; (185 &ndash; 190 cm)</option>
                  <option value="6ft 4in+">6&apos;4&quot;+ (192+ cm)</option>
                </select>
              </div>

              {/* Step 2: Desired Drape */}
              <div className="space-y-1.5">
                <label className="font-bold uppercase tracking-wider text-neutral-700 block text-[11px]">
                  2. Choose Silhouette Style
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'tailored', label: 'Tailored', desc: 'Clean, no pooling' },
                    { id: 'oversized', label: 'Boxy Drape', desc: 'Signature stack' },
                    { id: 'extreme', label: 'Heavy Baggy', desc: 'Extra length & pool' },
                  ].map((style) => (
                    <button
                      type="button"
                      key={style.id}
                      onClick={() => setAdvisorDrape(style.id)}
                      className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
                        advisorDrape === style.id
                          ? 'border-black bg-neutral-900 text-white shadow-xs'
                          : 'border-neutral-200 bg-neutral-50 text-neutral-700 hover:border-black'
                      }`}
                    >
                      <div className="font-bold text-xs uppercase">{style.label}</div>
                      <div className="text-[10px] opacity-75 mt-0.5">{style.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Recommendation Card */}
              <div className="p-4 bg-[#FAF9F7] rounded-xl border border-neutral-200 space-y-2 text-center">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#801414]">
                  Recommended Size
                </span>
                <div className="text-3xl font-black font-poppins text-black">
                  SIZE {getRecommendedSize()}
                </div>
                <p className="text-[11px] text-neutral-600">
                  Engineered for {advisorHeight} seeking a {advisorDrape} fit over sneakers with clean stacking.
                </p>
              </div>

              {/* Apply Size CTA */}
              <button
                type="button"
                onClick={() => {
                  setSelectedSize(getRecommendedSize());
                  setIsFitModalOpen(false);
                  addToast(`Size ${getRecommendedSize()} selected!`, 'success');
                }}
                className="w-full py-3 bg-black hover:bg-neutral-800 text-white rounded-md text-xs font-bold uppercase tracking-wider shadow-md cursor-pointer transition-all"
              >
                Apply Size {getRecommendedSize()}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
