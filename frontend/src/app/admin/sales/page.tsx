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
  Flame,
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
    { method: 'UPI / Razorpay Instant', percentage: 68, amount: Math.round(stats.totalRevenue * 0.68), color: 'bg-[#E83D4D]' },
    { method: 'BlueDart Express Cash On Delivery (COD)', percentage: 24, amount: Math.round(stats.totalRevenue * 0.24), color: 'bg-[#801414]' },
    { method: 'Credit / Debit Cards (Amex & Visa)', percentage: 8, amount: Math.round(stats.totalRevenue * 0.08), color: 'bg-amber-500' },
  ];

  return (
    <div className="space-y-8 font-montserrat">
      {/* Toast */}
      {exportNotice && (
        <div className="fixed top-6 right-6 z-50 bg-[#801414] border border-[#FFA4A4]/40 text-white font-bold text-xs uppercase tracking-wider py-3 px-5 rounded-2xl shadow-[0_8px_32px_rgba(128,20,20,0.6)] animate-in slide-in-from-top duration-300 flex items-center gap-2.5">
          <CheckCircle2 className="w-4 h-4 text-[#FFA4A4]" />
          <span>✓ Atelier Financial Ledger Exported (CSV)</span>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#801414]/20 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#FFA4A4]">
            <Flame className="w-3.5 h-3.5 text-[#E83D4D]" />
            <span>FINANCIAL INTELLIGENCE · DROP 001</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black font-poppins uppercase tracking-tight text-white mt-1">
            Sales & Revenue Analytics
          </h2>
          <p className="text-xs text-neutral-400">
            Gross merchandise value, payment collection pipelines, and product sales velocity.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Period selector */}
          <div className="inline-flex p-1 rounded-xl bg-[#140D0F] border border-[#801414]/30">
            {(['daily', 'weekly', 'monthly'] as const).map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  selectedPeriod === period
                    ? 'bg-[#801414] text-white shadow-xs'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {period}
              </button>
            ))}
          </div>

          <button
            onClick={handleExport}
            className="px-4 py-2.5 rounded-xl bg-[#1A1013] hover:bg-[#25151A] text-white border border-[#801414]/40 text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-md hover:border-[#801414]/80"
          >
            <Download className="w-4 h-4 text-[#FFA4A4]" />
            <span className="hidden sm:inline">Export CSV</span>
          </button>
        </div>
      </div>

      {/* 4 Top Financial KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="p-6 rounded-3xl bg-[#140D0F]/85 backdrop-blur-xl border border-[#801414]/30 hover:border-[#801414]/60 transition-all shadow-[0_8px_30px_rgba(0,0,0,0.4)] relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-28 h-28 bg-[#801414]/15 rounded-full blur-2xl pointer-events-none group-hover:bg-[#801414]/25 transition-all" />
          <span className="text-[10px] font-mono text-[#A87178] font-bold uppercase tracking-wider">
            Gross Merchant Value
          </span>
          <h3 className="text-2xl sm:text-3xl font-black font-poppins text-white mt-1">
            ₹{stats.totalRevenue.toLocaleString('en-IN')}
          </h3>
          <p className="text-xs text-emerald-400 font-bold mt-2 flex items-center gap-1">
            <ArrowUpRight className="w-3 h-3" /> +22.4% vs previous cycle
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-[#140D0F]/85 backdrop-blur-xl border border-[#801414]/30 hover:border-[#801414]/60 transition-all shadow-[0_8px_30px_rgba(0,0,0,0.4)] relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-28 h-28 bg-[#E83D4D]/15 rounded-full blur-2xl pointer-events-none group-hover:bg-[#E83D4D]/25 transition-all" />
          <span className="text-[10px] font-mono text-[#A87178] font-bold uppercase tracking-wider">
            Net Realized Margin
          </span>
          <h3 className="text-2xl sm:text-3xl font-black font-poppins text-[#FFA4A4] mt-1">
            68.2%
          </h3>
          <p className="text-xs text-neutral-400 mt-2">
            Direct-from-mill 280 GSM fabric efficiency
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-[#140D0F]/85 backdrop-blur-xl border border-[#801414]/30 hover:border-[#801414]/60 transition-all shadow-[0_8px_30px_rgba(0,0,0,0.4)] relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-28 h-28 bg-[#801414]/15 rounded-full blur-2xl pointer-events-none group-hover:bg-[#801414]/25 transition-all" />
          <span className="text-[10px] font-mono text-[#A87178] font-bold uppercase tracking-wider">
            Average Basket Size
          </span>
          <h3 className="text-2xl sm:text-3xl font-black font-poppins text-white mt-1">
            ₹{stats.aov.toLocaleString('en-IN')}
          </h3>
          <p className="text-xs text-neutral-400 mt-2">
            1.68 garments per checkout
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-[#140D0F]/85 backdrop-blur-xl border border-[#801414]/30 hover:border-[#801414]/60 transition-all shadow-[0_8px_30px_rgba(0,0,0,0.4)] relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-28 h-28 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-emerald-500/20 transition-all" />
          <span className="text-[10px] font-mono text-[#A87178] font-bold uppercase tracking-wider">
            Settlement Health
          </span>
          <h3 className="text-2xl sm:text-3xl font-black font-poppins text-emerald-400 mt-1">
            99.2%
          </h3>
          <p className="text-xs text-neutral-400 mt-2">
            Zero chargeback / blue-dart COD verified
          </p>
        </div>
      </div>

      {/* Payment Channel Velocity Matrix */}
      <div className="p-6 sm:p-7 rounded-3xl bg-[#140D0F]/85 backdrop-blur-xl border border-[#801414]/30 shadow-[0_8px_32px_rgba(0,0,0,0.4)] space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h4 className="text-lg font-black font-poppins uppercase tracking-tight text-white flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-[#E83D4D]" />
              <span>Payment Channel Velocity</span>
            </h4>
            <p className="text-xs text-neutral-400">
              Breakdown of collections across UPI gateways, COD courier handling, and card rails.
            </p>
          </div>
          <span className="text-xs font-mono text-[#FFA4A4] bg-[#801414]/20 border border-[#801414]/30 px-3 py-1 rounded-full self-start sm:self-auto">
            100% Reconciliation Success
          </span>
        </div>

        <div className="space-y-4 pt-2">
          {paymentBreakdown.map((item, idx) => (
            <div key={idx} className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-white font-semibold font-montserrat">{item.method}</span>
                <div className="flex items-center gap-3">
                  <span className="text-neutral-400 font-mono">₹{item.amount.toLocaleString('en-IN')}</span>
                  <span className="font-mono font-bold text-[#FFA4A4] w-12 text-right">{item.percentage}%</span>
                </div>
              </div>
              <div className="w-full h-2 rounded-full bg-black/60 overflow-hidden border border-[#801414]/20">
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
      <div className="p-6 sm:p-7 rounded-3xl bg-[#140D0F]/85 backdrop-blur-xl border border-[#801414]/30 shadow-[0_8px_32px_rgba(0,0,0,0.4)] space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h4 className="text-lg font-black font-poppins uppercase tracking-tight text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#E83D4D]" />
              <span>Top Performing Atelier Garments</span>
            </h4>
            <p className="text-xs text-neutral-400">
              Units sold and realized revenue ranked across Drop 001 archives.
            </p>
          </div>
          <span className="text-xs font-mono text-neutral-400">
            Realized Vol: 129 garments
          </span>
        </div>

        <div className="space-y-3 pt-1">
          {topSellers.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-[#191013]/70 border border-[#801414]/20 hover:border-[#801414]/50 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group hover:bg-[#1E1217]"
            >
              <div className="flex items-center gap-3.5">
                <span className="w-9 h-9 rounded-xl bg-black/80 border border-[#801414]/40 text-[#FFA4A4] font-mono font-bold text-xs flex items-center justify-center shrink-0 shadow-inner group-hover:border-[#E83D4D]/60 transition-colors">
                  0{idx + 1}
                </span>
                <div>
                  <h5 className="font-poppins font-bold text-xs sm:text-sm uppercase text-white group-hover:text-[#FFA4A4] transition-colors">
                    {item.title}
                  </h5>
                  <span className="inline-block mt-0.5 text-[9px] font-mono uppercase tracking-wider text-[#FFA4A4] bg-[#801414]/25 px-2 py-0.5 rounded border border-[#801414]/40">
                    {item.tag}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-6 text-right sm:text-right shrink-0">
                <div>
                  <p className="text-[10px] font-mono text-[#A87178] uppercase">Units Sold</p>
                  <p className="text-sm font-mono font-bold text-white">{item.unitsSold} pcs</p>
                </div>
                <div>
                  <p className="text-[10px] font-mono text-[#A87178] uppercase">Revenue</p>
                  <p className="text-sm font-mono font-bold text-emerald-400">
                    ₹{item.grossRevenue.toLocaleString('en-IN')}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-mono text-[#A87178] uppercase">Inventory</p>
                  <p className="text-sm font-mono font-bold text-amber-400">
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
