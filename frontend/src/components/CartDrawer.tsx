'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import CheckoutModal from './CheckoutModal';

export default function CartDrawer() {
  const { cart, isCartOpen, closeCart, updateCartQuantity, removeFromCart, clearCart } = useStore();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  if (!isCartOpen) return null;

  const freeProgress = Math.min(100, Math.round((cart.subtotal / cart.freeShippingThreshold) * 100));

  const formatPrice = (val: number) => {
    return `Rs. ${val.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 transition-opacity duration-300"
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 max-w-md w-full bg-white z-50 shadow-2xl flex flex-col transition-transform duration-300">
        {/* Drawer Header */}
        <div className="px-6 py-4 border-b border-neutral-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-black stroke-[1.75]" />
            <h2 className="text-sm font-extrabold uppercase tracking-widest text-black">
              Shopping Bag ({cart.itemCount})
            </h2>
          </div>
          <button
            onClick={closeCart}
            aria-label="Close bag"
            className="p-1 text-neutral-400 hover:text-black transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="bg-neutral-50 px-6 py-3 border-b border-neutral-100">
          <div className="text-[11px] font-medium text-neutral-700 flex justify-between mb-1.5">
            {cart.qualifiesForFreeShipping ? (
              <span className="text-emerald-700 font-bold">🎉 You have qualified for FREE SHIPPING!</span>
            ) : (
              <span>
                Add <span className="font-bold text-black">{formatPrice(cart.amountNeededForFreeShipping)}</span> more for FREE SHIPPING
              </span>
            )}
            <span className="text-neutral-500 font-mono">{freeProgress}%</span>
          </div>
          <div className="w-full bg-neutral-200 h-1.5 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 rounded-full ${
                cart.qualifiesForFreeShipping ? 'bg-emerald-600' : 'bg-black'
              }`}
              style={{ width: `${freeProgress}%` }}
            />
          </div>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-neutral-100">
          {cart.items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-16 text-neutral-400">
              <ShoppingBag className="w-12 h-12 stroke-[1] mb-3 text-neutral-300" />
              <p className="text-sm font-semibold uppercase tracking-wider text-neutral-700">Your bag is empty</p>
              <p className="text-xs text-neutral-400 mt-1 max-w-xs">
                Explore our latest drops and add pieces to your rotation.
              </p>
              <button
                onClick={closeCart}
                className="mt-6 px-6 py-2.5 bg-black text-white text-xs uppercase font-bold tracking-widest hover:bg-neutral-800 transition-colors"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            cart.items.map((item) => (
              <div key={item.id} className="py-4 flex gap-4">
                {/* Item Thumbnail */}
                <div className="w-20 h-24 bg-neutral-100 shrink-0 overflow-hidden">
                  <img
                    src={item.product.thumbnail}
                    alt={item.product.title}
                    className="w-full h-full object-cover object-center"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-xs font-bold uppercase tracking-tight text-neutral-900 line-clamp-2">
                        {item.product.title}
                      </h3>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-neutral-400 hover:text-red-600 transition-colors cursor-pointer"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="mt-1 text-[11px] text-neutral-500 font-medium">
                      Size: <span className="font-bold text-neutral-800">{item.size.toUpperCase()}</span>
                    </div>

                    <div className="mt-1 text-xs font-bold text-black">
                      {formatPrice(item.price)}
                    </div>
                  </div>

                  {/* Quantity Counter */}
                  <div className="flex items-center justify-between pt-2">
                    <div className="inline-flex items-center border border-neutral-300">
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                        className="p-1 px-2 text-neutral-600 hover:text-black hover:bg-neutral-100 transition-colors"
                        aria-label="Decrease"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-3 text-xs font-bold text-black">{item.quantity}</span>
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                        className="p-1 px-2 text-neutral-600 hover:text-black hover:bg-neutral-100 transition-colors"
                        aria-label="Increase"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <span className="text-xs font-extrabold text-neutral-900">
                      {formatPrice(item.total)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer / Checkout */}
        {cart.items.length > 0 && (
          <div className="p-6 bg-white border-t border-neutral-100 space-y-4">
            <div className="space-y-1.5 text-xs text-neutral-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium text-black">{formatPrice(cart.subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>
                  {cart.shipping === 0 ? (
                    <span className="font-bold text-emerald-600 uppercase">FREE</span>
                  ) : (
                    formatPrice(cart.shipping)
                  )}
                </span>
              </div>
              <div className="flex justify-between text-sm font-extrabold text-black pt-2 border-t border-neutral-100">
                <span>Estimated Total</span>
                <span>{formatPrice(cart.total)}</span>
              </div>
            </div>

            <button
              onClick={() => setIsCheckoutOpen(true)}
              className="w-full py-4 bg-[#801414] hover:bg-[#6D1111] text-white text-xs uppercase font-extrabold tracking-[0.2em] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md rounded-xs"
            >
              <span>PROCEED TO CHECKOUT</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Payment & Trust Strip */}
            <div className="flex items-center justify-center gap-3 pt-1 text-[10px] text-neutral-500 uppercase tracking-wider font-semibold">
              <span>UPI</span>
              <span>·</span>
              <span>CARDS</span>
              <span>·</span>
              <span>NETBANKING</span>
              <span>·</span>
              <span>CASH ON DELIVERY</span>
            </div>

            <Link
              href="/cart"
              onClick={closeCart}
              className="w-full py-3 bg-neutral-100 hover:bg-neutral-200 text-black text-xs uppercase font-bold tracking-wider transition-colors flex items-center justify-center gap-1.5 cursor-pointer rounded-xs"
            >
              <span>View Full Shopping Bag</span>
            </Link>

            <div className="text-center">
              <button
                onClick={clearCart}
                className="text-[11px] uppercase tracking-wider text-neutral-400 hover:text-neutral-700 transition-colors underline cursor-pointer"
              >
                Clear Bag
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Checkout Modal */}
      {isCheckoutOpen && (
        <CheckoutModal
          isOpen={isCheckoutOpen}
          onClose={() => setIsCheckoutOpen(false)}
        />
      )}
    </>
  );
}
