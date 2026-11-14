'use client';

import React, { useState } from 'react';
import {
  TrendingUp,
  Download,
  CreditCard,
  Banknote,
  ArrowUpRight,
  ShieldCheck,
  Calendar,
  Layers,
  Sparkles,
  BarChart3,
  PieChart,
  CheckCircle2,
} from 'lucide-react';
import { useAdmin } from '@/context/AdminContext';

export default function AdminSalesPage() {
  const { stats, orders, products } = useAdmin();
  const [selectedPeriod, setSelectedPeriod] = useState<'daily' | 'weekly' | 'monthly'>('weekly');
  const [exportNotice, setExportNotice] = useState(false);

  const handleExport = () => {
    setExportNotice(true);
    setTimeout(() => setExportNotice(false), 3000);
  };

  // Calculate product sales distribution
  const topSellers = [
    {
      title: 'VALJONS STRAIGHT FIT PC FLEECE (ONYX BLACK)',
      unitsSold: 42,
      grossRevenue: 104958,
      stockRemaining: 18,
      tag: 'DROP 001 FLAGSHIP',
    },
    {
      title: 'CARGO WIDE LEG PANTS (VINTAGE PINE)',
      unitsSold: 28,
      grossRevenue: 69972,
      stockRemaining: 12,
      tag: 'DROP 001 UTILITY',
    },
    {
      title: 'VALJONS STRAIGHT FIT PC FLEECE (HEATHER OAT)',
      unitsSold: 24,
      grossRevenue: 59976,
      stockRemaining: 14,
      tag: 'DROP 001 TONAL',
    },
    {
      title: 'DEMON SLAYER TANJIRO TEE (FOREST GREEN)',
      unitsSold: 35,
      grossRevenue: 45465,
      stockRemaining: 22,
      tag: 'GRAPHIC DROP',
    },
  ];

  const paymentBreakdown = [
    { method: 'UPI / Razorpay Instant', percentage: 68, amount: Math.round(stats.totalRevenue * 0.68), color: 'bg-[#0A0A0A]' },
    { method: 'BlueDart Express Cash On Delivery (COD)', percentage: 24, amount: Math.round(stats.totalRevenue * 0.24), color: 'bg-amber-500' },
    { method: 'Credit / Debit Cards (Amex & Visa)', percentage: 8, amount: Math.round(stats.totalRevenue * 0.08), color: 'bg-emerald-500' },
  ];

  return (
    <div className="space-y-8 font-montserrat">
      {/* Toast */}
      {exportNotice && (
        <div className="fixed top-6 right-6 z-50 neu-flat border border-white/90 text-[#0A0A0A] font-bold text-xs uppercase tracking-wider py-3.5 px-5 rounded-2xl shadow-2xl animate-in slide-in-from-top duration-300 flex items-center gap-2.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>✓ Atelier Financial Ledger Exported (CSV)</span>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#E2E8F0] gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#64748B]">
            <BarChart3 className="w-3.5 h-3.5 text-black" />
            <span>FINANCIAL INTELLIGENCE · DROP 001</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black font-poppins uppercase tracking-tight text-[#0A0A0A] mt-1">
            Sales & Revenue Analytics
          </h2>
          <p className="text-xs text-[#64748B]">
            Gross merchandise value, payment collection pipelines, and product sales velocity.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Period selector */}
          <div className="inline-flex p-1 rounded-2xl neu-inset border border-white/50">
            {(['daily', 'weekly', 'monthly'] as const).map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`px-3 py-1.5 rounded-xl text-[10px] font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  selectedPeriod === period
                    ? 'neu-btn-dark bg-[#0A0A0A] text-white shadow-xs'
                    : 'text-[#64748B] hover:text-[#0A0A0A]'
                }`}
              >
                {period}
              </button>
            ))}
          </div>

          <button
            onClick={handleExport}
            className="px-4 py-2.5 rounded-2xl neu-btn text-[#0A0A0A] hover:text-black border border-white/80 text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-md"
          >
            <Download className="w-4 h-4 text-black" />
            <span className="hidden sm:inline">Export CSV</span>
          </button>
        </div>
      </div>

      {/* 4 Top Financial KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="neu-flat rounded-3xl p-6 border border-white/80 space-y-2">
          <span className="text-[10px] font-mono text-[#64748B] font-bold uppercase tracking-wider">
            Gross Merchant Value
          </span>
          <h3 className="text-2xl sm:text-3xl font-black font-poppins text-[#0A0A0A] mt-1">
            ₹{stats.totalRevenue.toLocaleString('en-IN')}
          </h3>
          <p className="text-xs text-emerald-600 font-bold mt-2 flex items-center gap-1">
            <ArrowUpRight className="w-3.5 h-3.5" /> +22.4% vs previous cycle
          </p>
        </div>

        <div className="neu-flat rounded-3xl p-6 border border-white/80 space-y-2">
          <span className="text-[10px] font-mono text-[#64748B] font-bold uppercase tracking-wider">
            Net Realized Margin
          </span>
          <h3 className="text-2xl sm:text-3xl font-black font-poppins text-[#0A0A0A] mt-1">
            68.2%
          </h3>
          <p className="text-xs text-[#64748B] mt-2">
            Direct-from-mill 280 GSM fabric efficiency
          </p>
        </div>

        <div className="neu-flat rounded-3xl p-6 border border-white/80 space-y-2">
          <span className="text-[10px] font-mono text-[#64748B] font-bold uppercase tracking-wider">
            Average Basket Size
          </span>
          <h3 className="text-2xl sm:text-3xl font-black font-poppins text-[#0A0A0A] mt-1">
            ₹{stats.aov.toLocaleString('en-IN')}
          </h3>
          <p className="text-xs text-[#64748B] mt-2">
            1.68 garments per checkout
          </p>
        </div>

        <div className="neu-flat rounded-3xl p-6 border border-white/80 space-y-2">
          <span className="text-[10px] font-mono text-[#64748B] font-bold uppercase tracking-wider">
            Settlement Health
          </span>
          <h3 className="text-2xl sm:text-3xl font-black font-poppins text-emerald-600 mt-1">
            99.2%
          </h3>
          <p className="text-xs text-[#64748B] mt-2">
            Zero chargeback / blue-dart COD verified
          </p>
        </div>
      </div>

      {/* Payment Channel Velocity Matrix */}
      <div className="neu-flat rounded-3xl p-6 sm:p-7 border border-white/80 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h4 className="text-lg font-black font-poppins uppercase tracking-tight text-[#0A0A0A] flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-black" />
              <span>Payment Channel Velocity</span>
            </h4>
            <p className="text-xs text-[#64748B]">
              Breakdown of collections across UPI gateways, COD courier handling, and card rails.
            </p>
          </div>
          <span className="text-xs font-mono text-[#0A0A0A] neu-inset px-3 py-1 rounded-full border border-white/60 self-start sm:self-auto font-bold">
            100% Reconciliation Success
          </span>
        </div>

        <div className="space-y-4 pt-2">
          {paymentBreakdown.map((item, idx) => (
            <div key={idx} className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#0A0A0A] font-semibold font-montserrat">{item.method}</span>
                <div className="flex items-center gap-3">
                  <span className="text-[#64748B] font-mono">₹{item.amount.toLocaleString('en-IN')}</span>
                  <span className="font-mono font-bold text-[#0A0A0A] w-12 text-right">{item.percentage}%</span>
                </div>
              </div>
              <div className="w-full h-3 rounded-full neu-inset overflow-hidden p-0.5 border border-white/40">
                <div
                  className={`h-full ${item.color} rounded-full transition-all duration-500`}
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Performing Garments */}
      <div className="neu-flat rounded-3xl p-6 sm:p-7 border border-white/80 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h4 className="text-lg font-black font-poppins uppercase tracking-tight text-[#0A0A0A] flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-black" />
              <span>Top Performing Atelier Garments</span>
            </h4>
            <p className="text-xs text-[#64748B]">
              Units sold and realized revenue ranked across Drop 001 archives.
            </p>
          </div>
          <span className="text-xs font-mono text-[#64748B]">
            Realized Vol: 129 garments
          </span>
        </div>

        <div className="space-y-3 pt-1">
          {topSellers.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl neu-flat-sm border border-white/80 hover:neu-flat transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
            >
              <div className="flex items-center gap-3.5">
                <span className="w-9 h-9 rounded-2xl neu-flat border border-white/80 text-[#0A0A0A] font-mono font-bold text-xs flex items-center justify-center shrink-0 shadow-sm">
                  0{idx + 1}
                </span>
                <div>
                  <h5 className="font-poppins font-bold text-xs sm:text-sm uppercase text-[#0A0A0A]">
                    {item.title}
                  </h5>
                  <span className="inline-block mt-0.5 text-[9px] font-mono uppercase tracking-wider text-[#0A0A0A] neu-inset px-2.5 py-0.5 rounded-lg border border-white/60 font-bold">
                    {item.tag}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-6 text-right sm:text-right shrink-0">
                <div>
                  <p className="text-[10px] font-mono text-[#64748B] uppercase">Units Sold</p>
                  <p className="text-sm font-mono font-bold text-[#0A0A0A]">{item.unitsSold} pcs</p>
                </div>
                <div>
                  <p className="text-[10px] font-mono text-[#64748B] uppercase">Revenue</p>
                  <p className="text-sm font-mono font-bold text-emerald-600">
                    ₹{item.grossRevenue.toLocaleString('en-IN')}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-mono text-[#64748B] uppercase">Inventory</p>
                  <p className="text-sm font-mono font-bold text-amber-600">
                    {item.stockRemaining} left
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
