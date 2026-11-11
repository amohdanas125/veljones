'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Truck, PackageCheck, MapPin, Clock, Search } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export default function ShippingPage() {
  const { addToast } = useStore();
  const [trackNumber, setTrackNumber] = useState('');
  const [trackingResult, setTrackingResult] = useState<any>(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackNumber) return;
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      setTrackingResult({
        orderNumber: trackNumber.toUpperCase(),
        carrier: 'BlueDart Express Air',
        status: 'In Transit - Out for Delivery',
        destination: 'New Delhi Hub',
        estimatedDelivery: 'Tomorrow, by 6:00 PM',
        history: [
          { time: 'Today, 08:30 AM', event: 'Dispatched from Northern Sorting Facility' },
          { time: 'Yesterday, 04:15 PM', event: 'Order packed & passed 280 GSM QC inspection' },
          { time: 'Yesterday, 11:00 AM', event: 'Order confirmed at VALJONS Atelier' },
        ],
      });
      addToast('Tracking record retrieved');
    }, 450);
  };

  return (
    <div className="w-full min-h-screen bg-white font-montserrat pt-20 sm:pt-24 pb-24 text-neutral-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-8 py-4 border-b border-neutral-100 text-[11px] font-semibold uppercase tracking-wider text-neutral-400 flex items-center gap-2">
        <Link href="/" className="hover:text-black transition-colors flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" /> Home
        </Link>
        <span>/</span>
        <span className="text-black">Shipping & Returns</span>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-8 pt-8 sm:pt-12 space-y-10">
        <div className="space-y-3 pb-6 border-b border-neutral-200">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#801414]">
            PAN-INDIA LOGISTICS
          </span>
          <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-neutral-900 font-poppins">
            SHIPPING & DELIVERY
          </h1>
          <p className="text-xs text-neutral-500">
            Express air courier dispatch for all VALJONS Drop 001 streetwear releases.
          </p>
        </div>

        {/* Live Order Tracking Box */}
        <div id="track" className="p-6 sm:p-8 bg-[#F6F5F2] rounded-2xl border border-neutral-200 space-y-4">
          <div>
            <h2 className="text-base sm:text-lg font-black uppercase tracking-wider text-black font-poppins">
              TRACK YOUR VALJONS PARCEL
            </h2>
            <p className="text-xs text-neutral-500 mt-1">
              Enter your Order Number (e.g., VJ-10492) or AWB Tracking Code.
            </p>
          </div>

          <form onSubmit={handleTrack} className="flex gap-2">
            <input
              type="text"
              required
              placeholder="Enter Order ID / AWB Tracking number"
              value={trackNumber}
              onChange={(e) => setTrackNumber(e.target.value)}
              className="flex-1 px-4 py-3 bg-white border border-neutral-300 text-xs text-black placeholder:text-neutral-400 focus:outline-none focus:border-black rounded-lg"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-black hover:bg-neutral-800 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Search className="w-4 h-4" />
              <span>{isSearching ? 'Locating...' : 'Track'}</span>
            </button>
          </form>

          {trackingResult && (
            <div className="p-5 bg-white rounded-xl border border-neutral-200 space-y-3 mt-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-neutral-100 pb-3 gap-2">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                    Order ID: {trackingResult.orderNumber}
                  </span>
                  <h4 className="text-sm font-black text-emerald-800 uppercase font-poppins">
                    {trackingResult.status}
                  </h4>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-black block">
                    ETA: {trackingResult.estimatedDelivery}
                  </span>
                  <span className="text-[10px] text-neutral-500">
                    Carrier: {trackingResult.carrier}
                  </span>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block">
                  Transit Milestones
                </span>
                {trackingResult.history.map((step: any, idx: number) => (
                  <div key={idx} className="flex items-start gap-2 text-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-black mt-1.5 shrink-0" />
                    <div>
                      <span className="font-semibold text-neutral-900">{step.event}</span>
                      <span className="text-neutral-400 text-[10px] block">{step.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Shipping Timelines Table */}
        <div className="space-y-4">
          <h2 className="text-base sm:text-lg font-black uppercase tracking-wider text-black font-poppins">
            DELIVERY TIMELINES & CHARGES
          </h2>

          <div className="overflow-x-auto border border-neutral-200 rounded-xl overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-neutral-100/80 font-bold uppercase text-neutral-700 border-b border-neutral-200">
                <tr>
                  <th className="py-3 px-4">Region</th>
                  <th className="py-3 px-4">Estimated Transit</th>
                  <th className="py-3 px-4">Shipping Cost</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 text-neutral-600">
                <tr>
                  <td className="py-3 px-4 font-bold text-black">Delhi-NCR, Mumbai, Bengaluru</td>
                  <td className="py-3 px-4">2 – 3 Business Days</td>
                  <td className="py-3 px-4 text-emerald-700 font-bold">FREE (Air Express)</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold text-black">Major Metros (Hyd, Chennai, Kol, Pune)</td>
                  <td className="py-3 px-4">2 – 4 Business Days</td>
                  <td className="py-3 px-4 text-emerald-700 font-bold">FREE on orders &gt; Rs. 1,500</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold text-black">Tier 2 / Tier 3 & Rest of India</td>
                  <td className="py-3 px-4">4 – 5 Business Days</td>
                  <td className="py-3 px-4 text-emerald-700 font-bold">FREE on orders &gt; Rs. 1,500</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* COD Policy */}
        <div className="p-5 bg-neutral-50 rounded-xl border border-neutral-200 space-y-2 text-xs text-neutral-600 leading-relaxed">
          <h3 className="text-xs font-bold uppercase tracking-wider text-black font-poppins">
            CASH ON DELIVERY (COD) TERMS
          </h3>
          <p>
            Cash on Delivery is available across 19,000+ Indian postal codes. Please ensure someone is present at your delivery address to receive the parcel and provide payment to the delivery associate.
          </p>
        </div>
      </div>
    </div>
  );
}
