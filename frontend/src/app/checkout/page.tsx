'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ShieldCheck,
  CheckCircle,
  Truck,
  CreditCard,
  QrCode,
  Banknote,
  ArrowRight,
  ArrowLeft,
  Lock,
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import ValjonsLogo from '@/components/ValjonsLogo';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, clearCart, addToast } = useStore();

  const [step, setStep] = useState<'details' | 'payment' | 'confirmed'>('details');

  // Customer & Shipping Address State
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: 'New Delhi',
    state: 'Delhi',
    pincode: '110001',
    paymentMethod: 'upi',
  });

  const [orderId, setOrderId] = useState('VJ-98421');
  const [isProcessing, setIsProcessing] = useState(false);

  const formatPrice = (val: number) => {
    return `Rs. ${val.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handlePlaceOrder = () => {
    setIsProcessing(true);
    const newOrderId = `VJ-${Math.floor(10000 + Math.random() * 90000)}`;
    setOrderId(newOrderId);

    setTimeout(() => {
      setIsProcessing(false);
      setStep('confirmed');
      clearCart();
      addToast(`Order ${newOrderId} placed successfully!`);
    }, 1200);
  };

  if (step === 'confirmed') {
    return (
      <div className="w-full min-h-screen bg-white font-montserrat pt-24 pb-20 flex items-center justify-center px-4">
        <div className="w-full max-w-lg bg-[#FAF9F7] rounded-2xl border border-neutral-200 p-8 text-center space-y-6 shadow-xl">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
            <CheckCircle className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#801414] font-montserrat">
              PAYMENT VERIFIED
            </span>
            <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-neutral-900 font-poppins">
              THANK YOU FOR YOUR ORDER
            </h1>
            <p className="text-xs text-neutral-600">
              Your order confirmation and receipt have been dispatched to{' '}
              <span className="font-bold text-black">{formData.email || 'your email'}</span> and via SMS to +91 {formData.phone || 'mobile'}.
            </p>
          </div>

          <div className="p-4 bg-white rounded-xl border border-neutral-200 text-left space-y-2 text-xs">
            <div className="flex justify-between border-b border-neutral-100 pb-2">
              <span className="text-neutral-500">Order Reference:</span>
              <span className="font-black text-black font-poppins">{orderId}</span>
            </div>
            <div className="flex justify-between border-b border-neutral-100 pb-2">
              <span className="text-neutral-500">Payment Mode:</span>
              <span className="font-bold uppercase text-black">{formData.paymentMethod}</span>
            </div>
            <div className="flex justify-between border-b border-neutral-100 pb-2">
              <span className="text-neutral-500">Delivery Address:</span>
              <span className="font-medium text-black text-right truncate max-w-[200px]">
                {formData.address || 'H-44, Connaught Place'}, {formData.city} - {formData.pincode}
              </span>
            </div>
            <div className="flex justify-between pt-1 font-bold text-neutral-900">
              <span>Estimated Delivery:</span>
              <span className="text-emerald-700">In 2 - 3 Business Days</span>
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <Link
              href="/"
              className="flex-1 py-3.5 bg-black text-white text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-neutral-800 transition-colors"
            >
              Back to Home
            </Link>
            <Link
              href="/shipping#track"
              className="flex-1 py-3.5 border border-neutral-300 bg-white text-black text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-neutral-50 transition-colors"
            >
              Track Status
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-white font-montserrat pt-20 sm:pt-24 pb-20">
      {/* Checkout Header */}
      <div className="border-b border-neutral-200 py-4 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <ValjonsLogo theme="light" size="sm" />
          <div className="flex items-center gap-2 text-xs text-neutral-500">
            <Lock className="w-3.5 h-3.5 text-black" />
            <span className="font-bold text-black uppercase tracking-wider text-[11px]">
              256-Bit SSL Encrypted
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Checkout Form Column (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {step === 'details' ? (
              <form onSubmit={handleDetailsSubmit} className="space-y-6">
                <div className="space-y-1">
                  <h2 className="text-lg font-black uppercase tracking-tight text-neutral-900 font-poppins">
                    1. CONTACT & SHIPPING ADDRESS
                  </h2>
                  <p className="text-xs text-neutral-500">
                    Where should we deliver your VALJONS pieces?
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-700 block">
                      First Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full px-3.5 py-3 border border-neutral-300 text-xs text-black focus:outline-none focus:border-black rounded-lg"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-700 block">
                      Last Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Verma"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="w-full px-3.5 py-3 border border-neutral-300 text-xs text-black focus:outline-none focus:border-black rounded-lg"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-700 block">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-3 border border-neutral-300 text-xs text-black focus:outline-none focus:border-black rounded-lg"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-700 block">
                      Mobile Number (+91)
                    </label>
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      placeholder="10-digit number"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '') })
                      }
                      className="w-full px-3.5 py-3 border border-neutral-300 text-xs text-black focus:outline-none focus:border-black rounded-lg"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-700 block">
                    Street Address & Apartment
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="House/Flat No., Building Name, Street"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-3.5 py-3 border border-neutral-300 text-xs text-black focus:outline-none focus:border-black rounded-lg"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-700 block">
                      PIN Code
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={6}
                      placeholder="e.g. 110001"
                      value={formData.pincode}
                      onChange={(e) =>
                        setFormData({ ...formData, pincode: e.target.value.replace(/\D/g, '') })
                      }
                      className="w-full px-3.5 py-3 border border-neutral-300 text-xs text-black focus:outline-none focus:border-black rounded-lg"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-700 block">
                      City
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. New Delhi"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-3.5 py-3 border border-neutral-300 text-xs text-black focus:outline-none focus:border-black rounded-lg"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-700 block">
                      State
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Delhi"
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full px-3.5 py-3 border border-neutral-300 text-xs text-black focus:outline-none focus:border-black rounded-lg"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#801414] hover:bg-[#6D1111] text-white text-xs font-black uppercase tracking-[0.2em] transition-all rounded-lg flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                >
                  <span>CONTINUE TO PAYMENT</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            ) : (
              /* Step 2: Payment Options */
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
                  <h2 className="text-lg font-black uppercase tracking-tight text-neutral-900 font-poppins">
                    2. SELECT PAYMENT METHOD
                  </h2>
                  <button
                    onClick={() => setStep('details')}
                    className="text-xs font-bold text-neutral-500 hover:text-black uppercase underline"
                  >
                    Edit Address
                  </button>
                </div>

                <div className="space-y-3">
                  {/* UPI */}
                  <label
                    className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition-all ${
                      formData.paymentMethod === 'upi'
                        ? 'border-black bg-neutral-50 shadow-xs'
                        : 'border-neutral-200 hover:bg-neutral-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        value="upi"
                        checked={formData.paymentMethod === 'upi'}
                        onChange={() => setFormData({ ...formData, paymentMethod: 'upi' })}
                        className="text-black"
                      />
                      <div className="flex items-center gap-2.5">
                        <QrCode className="w-5 h-5 text-neutral-800" />
                        <div>
                          <span className="text-xs font-bold uppercase tracking-wider text-black block">
                            UPI Instant Payment (GPay, PhonePe, Paytm, QR)
                          </span>
                          <span className="text-[11px] text-neutral-500">
                            Fastest checkout with 0 transaction fees
                          </span>
                        </div>
                      </div>
                    </div>
                  </label>

                  {/* Cards */}
                  <label
                    className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition-all ${
                      formData.paymentMethod === 'card'
                        ? 'border-black bg-neutral-50 shadow-xs'
                        : 'border-neutral-200 hover:bg-neutral-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        value="card"
                        checked={formData.paymentMethod === 'card'}
                        onChange={() => setFormData({ ...formData, paymentMethod: 'card' })}
                      />
                      <div className="flex items-center gap-2.5">
                        <CreditCard className="w-5 h-5 text-neutral-800" />
                        <div>
                          <span className="text-xs font-bold uppercase tracking-wider text-black block">
                            Credit / Debit Cards
                          </span>
                          <span className="text-[11px] text-neutral-500">
                            Visa, Mastercard, RuPay, Amex
                          </span>
                        </div>
                      </div>
                    </div>
                  </label>

                  {/* COD */}
                  <label
                    className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition-all ${
                      formData.paymentMethod === 'cod'
                        ? 'border-black bg-neutral-50 shadow-xs'
                        : 'border-neutral-200 hover:bg-neutral-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        value="cod"
                        checked={formData.paymentMethod === 'cod'}
                        onChange={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                      />
                      <div className="flex items-center gap-2.5">
                        <Banknote className="w-5 h-5 text-neutral-800" />
                        <div>
                          <span className="text-xs font-bold uppercase tracking-wider text-black block">
                            Cash on Delivery (COD)
                          </span>
                          <span className="text-[11px] text-neutral-500">
                            Pay with cash or UPI upon delivery
                          </span>
                        </div>
                      </div>
                    </div>
                  </label>
                </div>

                <button
                  onClick={handlePlaceOrder}
                  disabled={isProcessing}
                  className="w-full py-4 bg-[#801414] hover:bg-[#6D1111] text-white text-xs font-black uppercase tracking-[0.2em] transition-all rounded-lg flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                >
                  {isProcessing ? (
                    <span>AUTHORIZING PAYMENT...</span>
                  ) : (
                    <>
                      <span>CONFIRM & PLACE ORDER ({formatPrice(cart.total || 2199)})</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Right: Order Summary Sidebar (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 bg-[#FAF9F7] rounded-xl border border-neutral-200 space-y-4">
              <h3 className="text-xs font-black uppercase tracking-[0.18em] text-neutral-900 font-poppins pb-3 border-b border-neutral-200">
                BAG ITEMS ({cart.itemCount})
              </h3>

              <div className="divide-y divide-neutral-200/80 max-h-72 overflow-y-auto pr-1">
                {cart.items.map((item) => (
                  <div key={item.id} className="py-3 flex gap-3 items-center">
                    <img
                      src={item.product.thumbnail}
                      alt={item.product.title}
                      className="w-14 h-18 object-cover rounded bg-[#F5F4F0]"
                    />
                    <div className="flex-1">
                      <h4 className="text-xs font-bold uppercase text-black line-clamp-1">
                        {item.product.title}
                      </h4>
                      <div className="text-[10px] text-neutral-500">
                        Size: <span className="font-bold text-black">{item.size.toUpperCase()}</span> · Qty: {item.quantity}
                      </div>
                      <div className="text-xs font-extrabold text-black mt-1">
                        {formatPrice(item.total)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-neutral-200 space-y-2 text-xs">
                <div className="flex justify-between text-neutral-600">
                  <span>Subtotal</span>
                  <span className="font-bold text-black">{formatPrice(cart.subtotal)}</span>
                </div>
                <div className="flex justify-between text-neutral-600">
                  <span>Express Delivery</span>
                  <span className="font-bold text-emerald-700">FREE</span>
                </div>
                <div className="flex justify-between text-sm font-black text-black pt-2 border-t border-neutral-200">
                  <span>Total Payable</span>
                  <span>{formatPrice(cart.total || 2199)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
