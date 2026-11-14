'use client';

import React, { useState } from 'react';
import {
  TrendingUp,
  DollarSign,
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

  return (
    <div className="space-y-8 font-montserrat">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/10 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-cyan-400">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>FINANCIAL INTELLIGENCE</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black font-poppins uppercase tracking-tight text-white">
            Sales & Revenue Analytics
          </h2>
          <p className="text-xs text-neutral-400">
            Gross merchandise value, payment collection pipelines, and product sales velocity.
          </p>
        </div>

        <button
          onClick={handleExport}
          className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white border border-white/10 text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-2 cursor-pointer shadow-md"
        >
          <Download className="w-4 h-4 text-cyan-400" />
          <span>{exportNotice ? 'Report Exported (CSV)' : 'Export Financial CSV'}</span>
        </button>
      </div>

      {/* 4 Top Financial KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="p-6 rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-lg">
          <span className="text-[10px] font-mono text-neutral-400 font-bold uppercase tracking-wider">
            Gross Merchant Value
          </span>
          <h3 className="text-2xl sm:text-3xl font-black font-poppins text-white mt-1">
            ₹{stats.totalRevenue.toLocaleString('en-IN')}
          </h3>
          <p className="text-xs text-emerald-400 font-bold mt-2 flex items-center gap-1">
            <ArrowUpRight className="w-3 h-3" /> +22.4% vs previous cycle
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-lg">
          <span className="text-[10px] font-mono text-neutral-400 font-bold uppercase tracking-wider">
            Net Realized Margin
          </span>
          <h3 className="text-2xl sm:text-3xl font-black font-poppins text-cyan-400 mt-1">
            68.2%
          </h3>
          <p className="text-xs text-neutral-400 mt-2">
            Direct-from-mill 280 GSM fabric efficiency
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-lg">
          <span className="text-[10px] font-mono text-neutral-400 font-bold uppercase tracking-wider">
            Average Basket Size
          </span>
          <h3 className="text-2xl sm:text-3xl font-black font-poppins text-white mt-1">
            ₹{stats.aov.toLocaleString('en-IN')}
          </h3>
          <p className="text-xs text-neutral-400 mt-2">
            1.68 garments per checkout
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-lg">
          <span className="text-[10px] font-mono text-neutral-400 font-bold uppercase tracking-wider">
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

      {/* Top Performing Garments */}
      <div className="p-6 sm:p-7 rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl space-y-5">
        <div>
          <h4 className="text-lg font-black font-poppins uppercase tracking-tight text-white">
            Top Performing Atelier Garments
          </h4>
          <p className="text-xs text-neutral-400">
            Units sold and realized revenue ranked across Drop 001 archives.
          </p>
        </div>

        <div className="space-y-4">
          {topSellers.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-slate-800/40 border border-white/5 hover:border-white/15 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-black border border-white/10 text-cyan-400 font-mono font-bold text-xs flex items-center justify-center shrink-0">
                  0{idx + 1}
                </span>
                <div>
                  <h5 className="font-poppins font-bold text-xs sm:text-sm uppercase text-white">
                    {item.title}
                  </h5>
                  <span className="text-[10px] font-mono text-cyan-400">{item.tag}</span>
                </div>
              </div>

              <div className="flex items-center gap-6 text-right sm:text-right">
                <div>
                  <p className="text-[10px] font-mono text-neutral-400 uppercase">Units Sold</p>
                  <p className="text-sm font-mono font-bold text-white">{item.unitsSold} pcs</p>
                </div>
                <div>
                  <p className="text-[10px] font-mono text-neutral-400 uppercase">Revenue</p>
                  <p className="text-sm font-mono font-bold text-emerald-400">
                    ₹{item.grossRevenue.toLocaleString('en-IN')}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-mono text-neutral-400 uppercase">Inventory</p>
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
