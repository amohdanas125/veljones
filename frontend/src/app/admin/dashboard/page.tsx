'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  TrendingUp,
  PackageCheck,
  ShoppingBag,
  Users,
  ArrowUpRight,
  CreditCard,
  Truck,
  Plus,
  Sparkles,
  Flame,
  CheckCircle2,
  Calendar,
  Layers,
} from 'lucide-react';
import { useAdmin } from '@/context/AdminContext';

export default function AdminDashboardPage() {
  const { stats, orders, adminUser } = useAdmin();
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '6m' | '1y'>('30d');

  const chartData = {
    '7d': [
      { label: 'Mon', revenue: 7497, orders: 3 },
      { label: 'Tue', revenue: 12495, orders: 5 },
      { label: 'Wed', revenue: 9996, orders: 4 },
      { label: 'Thu', revenue: 14994, orders: 6 },
      { label: 'Fri', revenue: 22491, orders: 9 },
      { label: 'Sat', revenue: 27489, orders: 11 },
      { label: 'Sun', revenue: 19992, orders: 8 },
    ],
    '30d': [
      { label: 'Week 1', revenue: 42483, orders: 17 },
      { label: 'Week 2', revenue: 59976, orders: 24 },
      { label: 'Week 3', revenue: 74970, orders: 30 },
      { label: 'Week 4', revenue: 92463, orders: 37 },
    ],
    '6m': [
      { label: 'Jun', revenue: 124950, orders: 50 },
      { label: 'Jul', revenue: 149940, orders: 60 },
      { label: 'Aug', revenue: 174930, orders: 70 },
      { label: 'Sep', revenue: 224910, orders: 90 },
      { label: 'Oct', revenue: 287385, orders: 115 },
      { label: 'Nov', revenue: 349860, orders: 140 },
    ],
    '1y': [
      { label: 'Q1', revenue: 320000, orders: 130 },
      { label: 'Q2', revenue: 480000, orders: 195 },
      { label: 'Q3', revenue: 640000, orders: 260 },
      { label: 'Q4 (Drop 001)', revenue: 950000, orders: 380 },
    ],
  };

  const activePoints = chartData[timeRange];
  const maxRevenue = Math.max(...activePoints.map((p) => p.revenue));

  return (
    <div className="space-y-8 font-montserrat">
      {/* 1. Hero Atelier Welcome Banner in VALJONS Crimson */}
      <div className="relative overflow-hidden p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#1E0B0F]/95 via-[#2A0E14]/85 to-[#150A0C]/95 border border-[#801414]/40 shadow-[0_8px_32px_rgba(128,20,20,0.3)]">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#801414]/30 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-[#B91C1C]/20 rounded-full blur-[90px] pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#801414]/30 border border-[#801414]/60 text-[#FFA4A4] text-[10px] font-mono font-bold uppercase tracking-[0.2em] shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#E83D4D]" />
              <span>VALJONS ATELIER · DROP 001 PERFORMANCE</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black font-poppins uppercase tracking-tight text-white">
              Executive Overview · <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#FFA4A4] to-[#E83D4D]">{adminUser.name}</span>
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300 max-w-xl leading-relaxed">
              Real-time monitoring of 280 GSM PC fleece demand, logistics fulfillment, and national revenue pipelines.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/admin/orders"
              className="px-4 py-2.5 rounded-xl bg-black/60 hover:bg-black text-white border border-[#801414]/40 text-xs font-bold uppercase tracking-wider transition-all shadow-md flex items-center gap-2 cursor-pointer"
            >
              <Truck className="w-4 h-4 text-[#FFA4A4]" />
              <span>Dispatch Pipeline</span>
            </Link>

            <Link
              href="/admin/products?action=new"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#801414] via-[#991B1B] to-[#C1272D] hover:from-[#991B1B] hover:to-[#E83D4D] text-white text-xs font-black uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(128,20,20,0.6)] flex items-center gap-1.5 cursor-pointer active:scale-95"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Add Garment</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Top Analytics Metric Cards in Rich Crimson Glass */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Card 1: Gross Sales */}
        <div className="p-6 rounded-2xl bg-[#140D0F]/90 backdrop-blur-xl border border-[#801414]/30 hover:border-[#E83D4D]/70 transition-all duration-300 shadow-[0_4px_24px_rgba(0,0,0,0.5)] relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-28 h-28 bg-[#801414]/20 rounded-full blur-2xl group-hover:bg-[#801414]/35 transition-all" />
          <div className="flex items-center justify-between text-neutral-400 mb-3">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#A87178]">Total Sales (INR)</span>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#801414] to-[#C1272D] text-white flex items-center justify-center shadow-[0_0_12px_rgba(128,20,20,0.6)]">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl sm:text-3xl font-black font-poppins text-white tracking-tight">
              ₹{stats.totalRevenue.toLocaleString('en-IN')}
            </h3>
            <div className="flex items-center gap-1.5 text-xs text-[#FFA4A4] font-bold">
              <ArrowUpRight className="w-3.5 h-3.5 text-[#E83D4D]" />
              <span>+18.4%</span>
              <span className="text-neutral-400 font-normal">vs last week</span>
            </div>
          </div>
        </div>

        {/* Card 2: Orders Processed */}
        <div className="p-6 rounded-2xl bg-[#140D0F]/90 backdrop-blur-xl border border-[#801414]/30 hover:border-[#E83D4D]/70 transition-all duration-300 shadow-[0_4px_24px_rgba(0,0,0,0.5)] relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-28 h-28 bg-[#991B1B]/20 rounded-full blur-2xl group-hover:bg-[#991B1B]/35 transition-all" />
          <div className="flex items-center justify-between text-neutral-400 mb-3">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#A87178]">Orders Processed</span>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#991B1B] to-[#F59E0B] text-white flex items-center justify-center shadow-[0_0_12px_rgba(153,27,27,0.6)]">
              <PackageCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl sm:text-3xl font-black font-poppins text-white tracking-tight">
              {stats.totalOrders}
            </h3>
            <div className="flex items-center gap-1.5 text-xs text-amber-300 font-bold">
              <span>{stats.pendingOrdersCount} Awaiting Dispatch</span>
            </div>
          </div>
        </div>

        {/* Card 3: Average Order Value */}
        <div className="p-6 rounded-2xl bg-[#140D0F]/90 backdrop-blur-xl border border-[#801414]/30 hover:border-[#E83D4D]/70 transition-all duration-300 shadow-[0_4px_24px_rgba(0,0,0,0.5)] relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-28 h-28 bg-[#801414]/20 rounded-full blur-2xl group-hover:bg-[#801414]/35 transition-all" />
          <div className="flex items-center justify-between text-neutral-400 mb-3">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#A87178]">Average Order Value</span>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#801414] to-[#E83D4D] text-white flex items-center justify-center shadow-[0_0_12px_rgba(128,20,20,0.6)]">
              <CreditCard className="w-4 h-4" />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl sm:text-3xl font-black font-poppins text-white tracking-tight">
              ₹{stats.aov.toLocaleString('en-IN')}
            </h3>
            <div className="flex items-center gap-1.5 text-xs text-neutral-300">
              <span className="text-[#FFA4A4] font-bold">₹2,499</span>
              <span>Drop 001 Anchor</span>
            </div>
          </div>
        </div>

        {/* Card 4: Store Conversion */}
        <div className="p-6 rounded-2xl bg-[#140D0F]/90 backdrop-blur-xl border border-[#801414]/30 hover:border-[#E83D4D]/70 transition-all duration-300 shadow-[0_4px_24px_rgba(0,0,0,0.5)] relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-28 h-28 bg-[#C1272D]/20 rounded-full blur-2xl group-hover:bg-[#C1272D]/35 transition-all" />
          <div className="flex items-center justify-between text-neutral-400 mb-3">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#A87178]">Conversion Rate</span>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#C1272D] to-[#FFA4A4] text-black flex items-center justify-center shadow-[0_0_12px_rgba(193,39,45,0.6)]">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl sm:text-3xl font-black font-poppins text-white tracking-tight">
              {stats.conversionRate}
            </h3>
            <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-bold">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>+0.6%</span>
              <span className="text-neutral-400 font-normal">organic search</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Main Chart & Payment Channel Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left: Revenue Trend Chart in Glowing Crimson (8 Cols) */}
        <div className="lg:col-span-8 p-6 sm:p-7 rounded-3xl bg-[#140D0F]/90 backdrop-blur-xl border border-[#801414]/30 shadow-2xl flex flex-col justify-between space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#FFA4A4]">
                  ATELIER VELOCITY
                </span>
              </div>
              <h4 className="text-lg font-black font-poppins uppercase tracking-tight text-white mt-0.5">
                Revenue Trajectory
              </h4>
            </div>

            {/* Time Filter Tabs */}
            <div className="flex items-center p-1 rounded-xl bg-black/60 border border-[#801414]/30 text-xs font-mono">
              {(['7d', '30d', '6m', '1y'] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => setTimeRange(r)}
                  className={`px-3 py-1 rounded-lg uppercase transition-all cursor-pointer ${
                    timeRange === r
                      ? 'bg-gradient-to-r from-[#801414] to-[#C1272D] text-white font-bold shadow-[0_0_10px_rgba(128,20,20,0.6)]'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          {/* Dynamic SVG Area Chart with Crimson Glow */}
          <div className="w-full h-56 relative flex items-end justify-between gap-3 pt-6 border-b border-[#801414]/20">
            {activePoints.map((point, pIdx) => {
              const heightPercent = Math.max(15, Math.round((point.revenue / maxRevenue) * 100));
              return (
                <div key={pIdx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                  {/* Tooltip on hover */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-2 bg-[#200E12] text-white border border-[#801414]/60 text-[10px] font-mono py-1 px-2.5 rounded-lg shadow-xl pointer-events-none whitespace-nowrap z-20">
                    ₹{point.revenue.toLocaleString('en-IN')} · {point.orders} orders
                  </div>

                  {/* Bar with VALJONS Crimson Gradient */}
                  <div
                    style={{ height: `${heightPercent}%` }}
                    className="w-full max-w-[48px] rounded-t-xl bg-gradient-to-t from-[#801414]/30 via-[#B91C1C]/70 to-[#FF4D5E] group-hover:to-white transition-all duration-300 relative shadow-[0_0_15px_rgba(185,28,28,0.4)]"
                  >
                    <div className="w-full h-1 bg-[#FFA4A4] rounded-t-xl shadow-[0_0_12px_rgba(255,164,164,0.9)]" />
                  </div>

                  <span className="text-[10px] font-mono text-[#A87178] uppercase tracking-wider">
                    {point.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Bottom stats summary */}
          <div className="flex items-center justify-between text-xs text-neutral-400 pt-2">
            <span>Peak Day Revenue: <strong className="text-white">₹{maxRevenue.toLocaleString('en-IN')}</strong></span>
            <span className="text-[#FFA4A4] font-bold">100% Hand-Inspected Quality</span>
          </div>
        </div>

        {/* Right: Payment Method & Channel Split (4 Cols) */}
        <div className="lg:col-span-4 p-6 sm:p-7 rounded-3xl bg-[#140D0F]/90 backdrop-blur-xl border border-[#801414]/30 shadow-2xl flex flex-col justify-between space-y-6">
          <div>
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#FFA4A4]">
              SETTLEMENT MATRIX
            </span>
            <h4 className="text-lg font-black font-poppins uppercase tracking-tight text-white mt-0.5">
              Payment Channels
            </h4>
            <p className="text-xs text-neutral-400 mt-1">
              Live settlement verification across COD and Instant UPI gateways.
            </p>
          </div>

          <div className="space-y-4">
            {/* COD */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
                  Cash on Delivery (COD)
                </span>
                <span className="font-mono text-neutral-300">{stats.paymentSplit.cod} orders</span>
              </div>
              <div className="w-full h-2 rounded-full bg-black/60 overflow-hidden">
                <div
                  style={{
                    width: `${Math.round((stats.paymentSplit.cod / Math.max(1, stats.totalOrders)) * 100)}%`,
                  }}
                  className="h-full bg-gradient-to-r from-amber-500 to-amber-300 rounded-full"
                />
              </div>
            </div>

            {/* UPI */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#E83D4D] shadow-[0_0_8px_rgba(232,61,77,0.8)]" />
                  Direct UPI / QR
                </span>
                <span className="font-mono text-neutral-300">{stats.paymentSplit.upi} orders</span>
              </div>
              <div className="w-full h-2 rounded-full bg-black/60 overflow-hidden">
                <div
                  style={{
                    width: `${Math.round((stats.paymentSplit.upi / Math.max(1, stats.totalOrders)) * 100)}%`,
                  }}
                  className="h-full bg-gradient-to-r from-[#801414] via-[#B91C1C] to-[#E83D4D] rounded-full"
                />
              </div>
            </div>

            {/* Cards */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                  Credit / Debit Cards
                </span>
                <span className="font-mono text-neutral-300">{stats.paymentSplit.card} orders</span>
              </div>
              <div className="w-full h-2 rounded-full bg-black/60 overflow-hidden">
                <div
                  style={{
                    width: `${Math.round((stats.paymentSplit.card / Math.max(1, stats.totalOrders)) * 100)}%`,
                  }}
                  className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full"
                />
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#801414]/15 border border-[#801414]/30 text-xs text-neutral-300 flex items-center gap-3">
            <CheckCircle2 className="w-4 h-4 text-[#FFA4A4] shrink-0" />
            <span>Pincode 276306 & All Tier 1-3 COD enabled via BlueDart.</span>
          </div>
        </div>
      </div>

      {/* 4. Recent Orders Fulfillment Table */}
      <div className="p-6 sm:p-7 rounded-3xl bg-[#140D0F]/90 backdrop-blur-xl border border-[#801414]/30 shadow-2xl space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-lg font-black font-poppins uppercase tracking-tight text-white">
              Recent Atelier Orders
            </h4>
            <p className="text-xs text-neutral-400">
              Real-time customer dispatch and tracking AWB status.
            </p>
          </div>

          <Link
            href="/admin/orders"
            className="text-xs font-bold uppercase tracking-wider text-[#FFA4A4] hover:text-white flex items-center gap-1 transition-colors"
          >
            <span>View All ({orders.length})</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Dense Table */}
        <div className="overflow-x-auto no-scrollbar -mx-6 px-6">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#801414]/20 text-[10px] font-mono font-bold uppercase tracking-wider text-[#A87178]">
                <th className="pb-3">Order ID</th>
                <th className="pb-3">Customer</th>
                <th className="pb-3">Items</th>
                <th className="pb-3">Amount</th>
                <th className="pb-3">Payment</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Carrier / AWB</th>
                <th className="pb-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-medium">
              {orders.slice(0, 5).map((ord) => (
                <tr key={ord.id} className="hover:bg-[#801414]/10 transition-colors">
                  <td className="py-3.5 font-mono text-[#FFA4A4] font-bold">
                    {ord.orderNumber}
                  </td>
                  <td className="py-3.5">
                    <p className="font-bold text-white">{ord.customerName}</p>
                    <p className="text-[11px] text-neutral-400 font-mono">{ord.city}, {ord.pincode}</p>
                  </td>
                  <td className="py-3.5 text-neutral-300">
                    {ord.items.length} {ord.items.length === 1 ? 'garment' : 'garments'}
                  </td>
                  <td className="py-3.5 font-mono font-bold text-white">
                    ₹{ord.totalAmount.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3.5">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-black/60 text-neutral-300 border border-[#801414]/30">
                      {ord.paymentMethod}
                    </span>
                  </td>
                  <td className="py-3.5">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase border ${
                        ord.orderStatus === 'Delivered'
                          ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                          : ord.orderStatus === 'Shipped'
                          ? 'bg-gradient-to-r from-[#801414]/40 to-[#B91C1C]/40 text-[#FFA4A4] border-[#801414]/60'
                          : ord.orderStatus === 'Confirmed'
                          ? 'bg-blue-500/15 text-blue-300 border-blue-500/30'
                          : 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                      }`}
                    >
                      {ord.orderStatus}
                    </span>
                  </td>
                  <td className="py-3.5 font-mono text-[11px] text-neutral-400">
                    {ord.trackingNumber ? (
                      <span className="text-[#FFA4A4]">{ord.trackingNumber}</span>
                    ) : (
                      <span className="text-neutral-500">Unassigned</span>
                    )}
                  </td>
                  <td className="py-3.5 text-right">
                    <Link
                      href="/admin/orders"
                      className="px-3 py-1 rounded-lg bg-gradient-to-r from-[#801414]/40 to-[#991B1B]/40 hover:from-[#801414] hover:to-[#B91C1C] text-white text-[11px] font-bold uppercase transition-all border border-[#801414]/40"
                    >
                      Manage
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
