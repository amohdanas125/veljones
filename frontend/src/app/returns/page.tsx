'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, RotateCcw, CheckCircle, Package, Truck, Clock } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export default function ReturnsPolicyPage() {
  const { addToast } = useStore();
  const [orderNumber, setOrderNumber] = useState('');
  const [phone, setPhone] = useState('');
  const [reason, setReason] = useState('size_swap');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    addToast('Exchange request submitted. Our concierge will contact you within 4 hours.');
  };

  return (
    <div className="w-full min-h-screen bg-white font-montserrat pt-20 sm:pt-24 pb-24 text-neutral-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-8 py-4 border-b border-neutral-100 text-[11px] font-semibold uppercase tracking-wider text-neutral-400 flex items-center gap-2">
        <Link href="/" className="hover:text-black transition-colors flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" /> Home
        </Link>
        <span>/</span>
        <span className="text-black">Returns & Exchanges</span>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-8 pt-8 sm:pt-12 space-y-10">
        <div className="space-y-3 pb-6 border-b border-neutral-200">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#801414]">
            HASSLE-FREE SERVICE
          </span>
          <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-neutral-900 font-poppins">
            7-DAY RETURNS & EXCHANGES
          </h1>
          <p className="text-xs text-neutral-500">
            Doorstep size swaps and hassle-free reverse pickups across all serviceable pincodes in India.
          </p>
        </div>

        {/* 3 Step Visual Flow */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-5 bg-[#FAF9F7] rounded-xl border border-neutral-200/80 space-y-2">
            <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center text-xs font-bold font-poppins">
              1
            </div>
            <h3 className="text-xs font-black uppercase tracking-wider text-black font-poppins">
              REQUEST SIZE SWAP
            </h3>
            <p className="text-xs text-neutral-600">
              Submit your request within 7 days of delivery using the quick form below or via WhatsApp concierge.
            </p>
          </div>

          <div className="p-5 bg-[#FAF9F7] rounded-xl border border-neutral-200/80 space-y-2">
            <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center text-xs font-bold font-poppins">
              2
            </div>
            <h3 className="text-xs font-black uppercase tracking-wider text-black font-poppins">
              DOORSTEP PICKUP
            </h3>
            <p className="text-xs text-neutral-600">
              Our courier partner arrives at your doorstep to inspect and collect the unworn garment in original packaging.
            </p>
          </div>

          <div className="p-5 bg-[#FAF9F7] rounded-xl border border-neutral-200/80 space-y-2">
            <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center text-xs font-bold font-poppins">
              3
            </div>
            <h3 className="text-xs font-black uppercase tracking-wider text-black font-poppins">
              FAST REPLACEMENT
            </h3>
            <p className="text-xs text-neutral-600">
              Your preferred replacement size is dispatched immediately via express air shipping.
            </p>
          </div>
        </div>

        {/* Quick Exchange Request Form */}
        <div className="p-6 sm:p-8 bg-[#F6F5F2] rounded-2xl border border-neutral-200 space-y-5">
          <div>
            <h2 className="text-base sm:text-lg font-black uppercase tracking-wider text-black font-poppins">
              INITIATE RETURN OR EXCHANGE
            </h2>
            <p className="text-xs text-neutral-500 mt-1">
              Enter your order details to generate an instant reverse pickup label.
            </p>
          </div>

          {submitted ? (
            <div className="p-5 bg-white border border-emerald-300 rounded-xl space-y-2 text-center">
              <CheckCircle className="w-8 h-8 text-emerald-600 mx-auto" />
              <h3 className="text-sm font-bold uppercase text-black font-poppins">
                REQUEST RECORDED
              </h3>
              <p className="text-xs text-neutral-600 max-w-sm mx-auto">
                Pickup has been assigned to Delhivery for order #{orderNumber}. The pickup agent will arrive within 24-48 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-700 block">
                    Order Number
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. VJ-89320"
                    value={orderNumber}
                    onChange={(e) => setOrderNumber(e.target.value)}
                    className="w-full px-3.5 py-3 bg-white border border-neutral-300 text-xs text-black placeholder:text-neutral-400 focus:outline-none focus:border-black rounded-lg"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-700 block">
                    Registered Mobile Number
                  </label>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    placeholder="10-digit number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-3 bg-white border border-neutral-300 text-xs text-black placeholder:text-neutral-400 focus:outline-none focus:border-black rounded-lg"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-700 block">
                  Action Required
                </label>
                <select
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full px-3.5 py-3 bg-white border border-neutral-300 text-xs text-black focus:outline-none focus:border-black rounded-lg"
                >
                  <option value="size_swap">Exchange for Different Size (Recommended)</option>
                  <option value="color_swap">Exchange for Different Colourway</option>
                  <option value="defect">Damaged or Defective Item on Arrival</option>
                  <option value="return_refund">Return and Refund to Original Payment Method</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-[#801414] hover:bg-[#6D1111] text-white text-xs font-black uppercase tracking-[0.2em] transition-all rounded-lg cursor-pointer shadow-md"
              >
                SUBMIT EXCHANGE REQUEST
              </button>
            </form>
          )}
        </div>

        {/* Policy Conditions */}
        <div className="space-y-4 text-xs sm:text-sm text-neutral-700 leading-relaxed border-t border-neutral-200 pt-8">
          <h2 className="text-base font-black uppercase tracking-wider text-black font-poppins">
            EXCHANGE CRITERIA
          </h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Items must be unworn, unwashed, and in the original presentation condition with all atelier tags intact.</li>
            <li>Free size exchanges are provided once per order. Subsequent exchanges may carry a nominal logistics fee of Rs. 150.</li>
            <li>Refunds for returns are initiated back to the source account (UPI / Card / NetBanking) within 48 hours of warehouse receipt.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
