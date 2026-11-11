'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Truck,
  RotateCcw,
  Tag,
  Check,
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export default function CartPage() {
  const router = useRouter();
  const { cart, updateCartQuantity, removeFromCart, clearCart, addToast } = useStore();
  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<number | null>(null);
  const [promoError, setPromoError] = useState('');

  const formatPrice = (val: number) => {
    return `Rs. ${val.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const freeShippingProgress = Math.min(
    100,
    Math.round((cart.subtotal / (cart.freeShippingThreshold || 1500)) * 100)
  );

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    const code = promoCode.trim().toUpperCase();
    if (code === 'DROP001' || code === 'VALJONS10') {
      const discount = Math.round(cart.subtotal * 0.1);
      setAppliedDiscount(discount);
      addToast('Promo code applied: 10% off your order');
    } else if (code === 'FREESHIP') {
      addToast('Free express shipping applied');
    } else {
      setPromoError('Invalid promo code. Try "DROP001" for 10% off.');
    }
  };

  const finalTotal = Math.max(0, cart.total - (appliedDiscount || 0));

  return (
    <div className="w-full min-h-screen bg-white font-montserrat pt-20 sm:pt-24 pb-20">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 border-b border-neutral-100 text-[11px] font-semibold uppercase tracking-wider text-neutral-400 flex items-center gap-2">
        <Link href="/" className="hover:text-black transition-colors flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" /> Home
        </Link>
        <span>/</span>
        <span className="text-black">Shopping Bag ({cart.itemCount})</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-6 sm:pt-10">
        <div className="flex items-baseline justify-between mb-8 pb-4 border-b border-neutral-200">
          <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-neutral-900 font-poppins">
            YOUR SHOPPING BAG
          </h1>
          <span className="text-xs font-bold text-neutral-500 uppercase tracking-widest">
            {cart.itemCount} {cart.itemCount === 1 ? 'PIECE' : 'PIECES'}
          </span>
        </div>

        {/* Free Shipping Meter */}
        <div className="mb-8 p-4 bg-[#F8F7F4] rounded-lg border border-neutral-200/80">
          <div className="flex justify-between items-center text-xs mb-2">
            {cart.qualifiesForFreeShipping ? (
              <span className="font-bold text-emerald-800 flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-600" />
                You unlocked FREE EXPRESS DELIVERY across India!
              </span>
            ) : (
              <span className="text-neutral-700">
                Add <span className="font-extrabold text-black">{formatPrice(cart.amountNeededForFreeShipping)}</span> more to qualify for <span className="font-bold">FREE EXPRESS DELIVERY</span>
              </span>
            )}
            <span className="font-bold text-neutral-500 text-[11px]">{freeShippingProgress}%</span>
          </div>

          <div className="w-full bg-neutral-200 h-2 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 rounded-full ${
                cart.qualifiesForFreeShipping ? 'bg-emerald-600' : 'bg-[#801414]'
              }`}
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {cart.items.length === 0 ? (
          /* Empty Bag State */
          <div className="py-20 text-center space-y-4 max-w-md mx-auto">
            <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center mx-auto text-neutral-400">
              <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
            </div>
            <h2 className="text-xl font-black uppercase tracking-tight text-neutral-900 font-poppins">
              YOUR BAG IS CURRENTLY EMPTY
            </h2>
            <p className="text-xs text-neutral-500 leading-relaxed">
              Explore VALJONS Drop 001 engineered straight-fit essentials and heavyweight milled silhouettes.
            </p>
            <Link
              href="/#shop-collection"
              className="inline-block mt-4 px-8 py-4 bg-black text-white text-xs font-extrabold uppercase tracking-[0.2em] hover:bg-neutral-800 transition-colors shadow-md rounded-xs"
            >
              SHOP DROP 001
            </Link>
          </div>
        ) : (
          /* Items & Order Summary Grid */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left: Items List (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="divide-y divide-neutral-200 border-y border-neutral-200">
                {cart.items.map((item) => (
                  <div key={item.id} className="py-6 flex gap-4 sm:gap-6 items-start">
                    {/* Item Thumbnail */}
                    <div className="w-24 h-32 sm:w-28 sm:h-36 bg-[#F5F4F0] rounded-lg overflow-hidden shrink-0 border border-neutral-200/60">
                      <img
                        src={item.product.thumbnail}
                        alt={item.product.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 flex flex-col justify-between self-stretch">
                      <div className="space-y-1">
                        <div className="flex items-start justify-between gap-3">
                          <h3 className="text-xs sm:text-sm font-extrabold uppercase tracking-tight text-neutral-900 font-poppins line-clamp-2">
                            {item.product.title}
                          </h3>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="p-1 text-neutral-400 hover:text-red-600 transition-colors cursor-pointer"
                            title="Remove piece"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="text-[11px] text-neutral-500 flex items-center gap-3 pt-1">
                          <span>
                            Size: <span className="font-bold text-black">{item.size.toUpperCase()}</span>
                          </span>
                          <span>·</span>
                          <span>Standard Boxy Cut</span>
                        </div>

                        <div className="text-xs sm:text-sm font-bold text-black pt-1">
                          {formatPrice(item.price)}
                        </div>
                      </div>

                      {/* Quantity & Item Total */}
                      <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
                        <div className="inline-flex items-center border border-neutral-300 rounded-xs">
                          <button
                            onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                            className="p-1.5 px-2.5 text-neutral-600 hover:text-black hover:bg-neutral-100 transition-colors"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-3 text-xs font-bold text-black">{item.quantity}</span>
                          <button
                            onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                            className="p-1.5 px-2.5 text-neutral-600 hover:text-black hover:bg-neutral-100 transition-colors"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <span className="text-xs sm:text-sm font-black text-neutral-900 font-montserrat">
                          {formatPrice(item.total)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Clear Bag / Continue Shopping */}
              <div className="flex items-center justify-between pt-2 text-xs">
                <Link
                  href="/#shop-collection"
                  className="font-bold uppercase tracking-wider text-neutral-700 hover:text-black transition-colors flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" /> Continue Shopping
                </Link>

                <button
                  onClick={clearCart}
                  className="text-neutral-400 hover:text-red-600 transition-colors underline uppercase tracking-wider text-[11px] cursor-pointer"
                >
                  Clear Bag
                </button>
              </div>
            </div>

            {/* Right: Order Summary (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-6 bg-[#FAF9F7] rounded-xl border border-neutral-200/80 space-y-5">
                <h2 className="text-sm font-black uppercase tracking-[0.18em] text-neutral-900 font-poppins pb-3 border-b border-neutral-200">
                  ORDER SUMMARY
                </h2>

                {/* Promo Code Box */}
                <form onSubmit={handleApplyPromo} className="space-y-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-700 block">
                    Promo / Discount Code
                  </span>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. DROP001"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-1 px-3 py-2 bg-white border border-neutral-300 text-xs uppercase text-black placeholder:text-neutral-400 focus:outline-none focus:border-black rounded-xs"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-black text-white text-xs font-bold uppercase tracking-wider hover:bg-neutral-800 transition-colors rounded-xs cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>
                  {promoError && (
                    <p className="text-[10px] text-red-600 font-medium">{promoError}</p>
                  )}
                  {appliedDiscount && (
                    <p className="text-[10px] text-emerald-700 font-bold">
                      ✓ Promo applied (-{formatPrice(appliedDiscount)})
                    </p>
                  )}
                </form>

                {/* Summary Lines */}
                <div className="space-y-2.5 text-xs text-neutral-600 pt-2 border-t border-neutral-200">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-black">{formatPrice(cart.subtotal)}</span>
                  </div>

                  {appliedDiscount && (
                    <div className="flex justify-between text-emerald-700 font-bold">
                      <span>Promo Discount</span>
                      <span>-{formatPrice(appliedDiscount)}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Express Shipping</span>
                    <span>
                      {cart.shipping === 0 ? (
                        <span className="font-extrabold text-emerald-700 uppercase">FREE</span>
                      ) : (
                        formatPrice(cart.shipping)
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>Estimated GST (18%)</span>
                    <span className="text-neutral-500">Included</span>
                  </div>

                  <div className="flex justify-between text-sm sm:text-base font-black text-neutral-900 pt-3 border-t border-neutral-200">
                    <span>Total Amount</span>
                    <span>{formatPrice(finalTotal)}</span>
                  </div>
                </div>

                {/* Checkout CTA */}
                <Link
                  href="/checkout"
                  className="w-full py-4 bg-[#801414] hover:bg-[#6D1111] text-white text-xs font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg rounded-xs"
                >
                  <span>PROCEED TO CHECKOUT</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                {/* Guarantees */}
                <div className="pt-3 border-t border-neutral-200/80 space-y-2 text-[11px] text-neutral-500">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-black" />
                    <span>256-bit encrypted secure checkout</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <RotateCcw className="w-3.5 h-3.5 text-black" />
                    <span>7-day doorstep exchange & return guarantee</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
