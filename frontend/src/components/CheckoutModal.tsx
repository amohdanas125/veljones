'use client';

import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, Truck } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { api } from '@/lib/api';
import ValjonsLogo from './ValjonsLogo';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const { cart, sessionId, closeCart, addToast } = useStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<any>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    postalCode: '',
    paymentMethod: 'cod',
  });

  if (!isOpen) return null;

  const formatPrice = (val: number | string) => {
    const num = typeof val === 'string' ? parseFloat(val) : val;
    return `Rs. ${num.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.street || !formData.city) {
      addToast('Please complete all required shipping fields', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      const order = await api.checkout({
        sessionId,
        customerName: formData.name,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        shippingAddress: {
          street: formData.street,
          city: formData.city,
          state: formData.state || 'Maharashtra',
          postalCode: formData.postalCode || '400001',
          country: 'India',
        },
      });
      setCompletedOrder(order);
      addToast('Order confirmed successfully!', 'success');
    } catch (err: any) {
      console.error(err);
      addToast(err.message || 'Checkout failed', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl bg-white shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-neutral-800 flex items-center justify-between bg-black text-white">
          <div className="flex items-center gap-3">
            <ValjonsLogo theme="dark" size="sm" />
            <span className="text-xs uppercase tracking-widest text-neutral-400">| Express Checkout</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-neutral-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {completedOrder ? (
            /* Order Confirmation View */
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10 stroke-[2]" />
              </div>

              <h2 className="text-2xl font-black uppercase tracking-tight text-black">
                Order Confirmed
              </h2>

              <p className="text-xs text-neutral-500 uppercase tracking-widest">
                Order Reference: <span className="font-mono font-bold text-black">{completedOrder.orderNumber}</span>
              </p>

              <div className="bg-neutral-50 p-4 border border-neutral-200 text-left max-w-md mx-auto space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-neutral-500">Customer:</span>
                  <span className="font-bold text-black">{completedOrder.customerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Total Charged:</span>
                  <span className="font-bold text-black">{formatPrice(completedOrder.totalAmount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Estimated Delivery:</span>
                  <span className="font-bold text-emerald-700">3 - 5 Business Days</span>
                </div>
              </div>

              <div className="pt-4 flex justify-center gap-4">
                <button
                  onClick={() => {
                    onClose();
                    closeCart();
                  }}
                  className="px-8 py-3 bg-black text-white text-xs font-bold uppercase tracking-widest hover:bg-neutral-800 transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          ) : (
            /* Checkout Form */
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Customer Contact */}
              <div className="space-y-3">
                <h3 className="text-xs font-black uppercase tracking-widest text-neutral-900 flex items-center gap-2">
                  <span>1. Contact Details</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-600 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ayaan Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 border border-neutral-300 text-xs focus:border-black focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-600 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="name@domain.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2 border border-neutral-300 text-xs focus:border-black focus:outline-hidden"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-600 mb-1">
                      Phone Number (for Courier SMS updates)
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3 py-2 border border-neutral-300 text-xs focus:border-black focus:outline-hidden"
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="space-y-3 pt-2 border-t border-neutral-100">
                <h3 className="text-xs font-black uppercase tracking-widest text-neutral-900 flex items-center gap-2">
                  <span>2. Delivery Address</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-600 mb-1">
                      Street Address & Apartment *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Flat 4B, Signature Heights, Bandra West"
                      value={formData.street}
                      onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                      className="w-full px-3 py-2 border border-neutral-300 text-xs focus:border-black focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-600 mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Mumbai"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-3 py-2 border border-neutral-300 text-xs focus:border-black focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-600 mb-1">
                      Postal Code / PIN
                    </label>
                    <input
                      type="text"
                      placeholder="400050"
                      value={formData.postalCode}
                      onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                      className="w-full px-3 py-2 border border-neutral-300 text-xs focus:border-black focus:outline-hidden"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method Selection */}
              <div className="space-y-3 pt-2 border-t border-neutral-100">
                <h3 className="text-xs font-black uppercase tracking-widest text-neutral-900">
                  3. Payment Method
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <label
                    className={`border p-3 flex flex-col cursor-pointer transition-colors ${
                      formData.paymentMethod === 'cod' ? 'border-black bg-neutral-50' : 'border-neutral-200'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="payment"
                        value="cod"
                        checked={formData.paymentMethod === 'cod'}
                        onChange={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                        className="text-black focus:ring-0"
                      />
                      <span className="text-xs font-bold uppercase">Cash on Delivery</span>
                    </div>
                    <span className="text-[10px] text-neutral-500 mt-1 pl-5">Pay cash or UPI upon courier arrival</span>
                  </label>

                  <label
                    className={`border p-3 flex flex-col cursor-pointer transition-colors ${
                      formData.paymentMethod === 'upi' ? 'border-black bg-neutral-50' : 'border-neutral-200'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="payment"
                        value="upi"
                        checked={formData.paymentMethod === 'upi'}
                        onChange={() => setFormData({ ...formData, paymentMethod: 'upi' })}
                        className="text-black focus:ring-0"
                      />
                      <span className="text-xs font-bold uppercase">UPI / Cards</span>
                    </div>
                    <span className="text-[10px] text-neutral-500 mt-1 pl-5">Instant zero-fee secure checkout</span>
                  </label>
                </div>
              </div>

              {/* Summary and Order Button */}
              <div className="pt-4 border-t border-neutral-100 space-y-3">
                <div className="flex justify-between items-center text-sm font-black text-black">
                  <span>Total Payable:</span>
                  <span>{formatPrice(cart.total)}</span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-black text-white text-xs font-extrabold uppercase tracking-[0.2em] hover:bg-neutral-800 transition-colors cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? 'Processing Order...' : 'Confirm & Place Order'}
                </button>

                <div className="flex items-center justify-center gap-4 text-[10px] text-neutral-400 font-medium">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-black" />
                    256-bit Encrypted
                  </span>
                  <span className="flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5 text-black" />
                    Express Dispatch
                  </span>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
