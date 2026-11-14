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
  CheckCircle2,
  Calendar,
  Layers,
  ChevronRight,
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
      {/* 1. Hero Atelier Welcome Banner in Neumorphic White & Black */}
      <div className="neu-flat rounded-3xl p-6 sm:p-8 border border-white/80">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full neu-inset text-[#0A0A0A] text-[10px] font-mono font-bold uppercase tracking-[0.2em] border border-white/60">
              <Sparkles className="w-3.5 h-3.5 text-black" />
              <span>VALJONS ATELIER · DROP 001 PERFORMANCE</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black font-poppins uppercase tracking-tight text-[#0A0A0A]">
              Executive Overview · <span>{adminUser.name}</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#64748B] max-w-xl leading-relaxed">
              Real-time monitoring of 280 GSM PC fleece demand, logistics fulfillment, and national revenue pipelines.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/admin/orders"
              className="px-4 py-2.5 rounded-2xl neu-btn text-[#0A0A0A] hover:text-black border border-white/80 text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer"
            >
              <Truck className="w-4 h-4 text-[#0A0A0A]" />
              <span>Dispatch Pipeline</span>
            </Link>

            <Link
              href="/admin/products?action=new"
              className="px-5 py-2.5 rounded-2xl neu-btn-dark bg-[#0A0A0A] hover:bg-black text-white text-xs font-black uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Add Garment</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Top 4 High-Contrast KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Total Sales */}
        <div className="neu-flat rounded-3xl p-6 border border-white/80 space-y-4 transition-all hover:scale-[1.01]">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#64748B]">
              Total Sales (INR)
            </span>
            <div className="w-9 h-9 rounded-2xl neu-flat flex items-center justify-center text-[#0A0A0A] border border-white/80">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div>
            <h3 className="text-2xl sm:text-3xl font-black font-poppins text-[#0A0A0A]">
              ₹{stats.totalRevenue.toLocaleString('en-IN')}
            </h3>
            <p className="text-xs font-bold text-emerald-600 mt-1 flex items-center gap-1">
              <ArrowUpRight className="w-3.5 h-3.5" /> +18.4% vs last week
            </p>
          </div>
        </div>

        {/* Orders Processed */}
        <div className="neu-flat rounded-3xl p-6 border border-white/80 space-y-4 transition-all hover:scale-[1.01]">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#64748B]">
              Orders Processed
            </span>
            <div className="w-9 h-9 rounded-2xl neu-flat flex items-center justify-center text-[#0A0A0A] border border-white/80">
              <PackageCheck className="w-4 h-4" />
            </div>
          </div>
          <div>
            <h3 className="text-2xl sm:text-3xl font-black font-poppins text-[#0A0A0A]">
              {stats.totalOrders}
            </h3>
            <p className="text-xs font-medium text-[#64748B] mt-1">
              {stats.pendingOrdersCount} Awaiting Dispatch
            </p>
          </div>
        </div>

        {/* Average Order Value */}
        <div className="neu-flat rounded-3xl p-6 border border-white/80 space-y-4 transition-all hover:scale-[1.01]">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#64748B]">
              Average Order Value
            </span>
            <div className="w-9 h-9 rounded-2xl neu-flat flex items-center justify-center text-[#0A0A0A] border border-white/80">
              <CreditCard className="w-4 h-4" />
            </div>
          </div>
          <div>
            <h3 className="text-2xl sm:text-3xl font-black font-poppins text-[#0A0A0A]">
              ₹{stats.aov.toLocaleString('en-IN')}
            </h3>
            <p className="text-xs font-medium text-[#64748B] mt-1">
              ₹2,499 Drop 001 Anchor
            </p>
          </div>
        </div>

        {/* Conversion Rate */}
        <div className="neu-flat rounded-3xl p-6 border border-white/80 space-y-4 transition-all hover:scale-[1.01]">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#64748B]">
              Conversion Rate
            </span>
            <div className="w-9 h-9 rounded-2xl neu-flat flex items-center justify-center text-[#0A0A0A] border border-white/80">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <div>
            <h3 className="text-2xl sm:text-3xl font-black font-poppins text-[#0A0A0A]">
              3.8%
            </h3>
            <p className="text-xs font-bold text-emerald-600 mt-1 flex items-center gap-1">
              <ArrowUpRight className="w-3.5 h-3.5" /> +0.6% organic search
            </p>
          </div>
        </div>
      </div>

      {/* 3. Charts & Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Neumorphic Revenue Chart (2 cols) */}
        <div className="lg:col-span-2 neu-flat rounded-3xl p-6 sm:p-7 border border-white/80 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#64748B]">
                ATELIER VELOCITY
              </span>
              <h4 className="text-lg font-black font-poppins uppercase tracking-tight text-[#0A0A0A]">
                Revenue Trajectory
              </h4>
            </div>

            {/* Timeframe selector */}
            <div className="flex items-center gap-1 p-1 rounded-2xl neu-inset border border-white/50">
              {(['7d', '30d', '6m', '1y'] as const).map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-3 py-1 rounded-xl text-[10px] font-mono font-bold uppercase transition-all cursor-pointer ${
                    timeRange === range
                      ? 'neu-btn-dark bg-[#0A0A0A] text-white shadow-sm'
                      : 'text-[#64748B] hover:text-[#0A0A0A]'
                  }`}
                >
                  {range.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Neumorphic Chart Area */}
          <div className="w-full h-56 relative flex items-end justify-between gap-4 pt-6 border-b border-[#E2E8F0]">
            {activePoints.map((point, pIdx) => {
              const heightPercent = Math.max(16, Math.round((point.revenue / maxRevenue) * 100));
              return (
                <div key={pIdx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                  {/* Tooltip on hover */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-2 bg-[#0A0A0A] text-white text-[10px] font-mono py-1 px-2.5 rounded-xl shadow-xl pointer-events-none whitespace-nowrap z-20">
                    ₹{point.revenue.toLocaleString('en-IN')} · {point.orders} orders
                  </div>

                  {/* Neumorphic Bar */}
                  <div
                    style={{ height: `${heightPercent}%` }}
                    className="w-full max-w-[48px] rounded-2xl bg-[#0A0A0A] group-hover:bg-black transition-all duration-300 relative shadow-[4px_4px_10px_rgba(10,10,10,0.2),-2px_-2px_6px_rgba(255,255,255,0.8)]"
                  >
                    <div className="w-full h-1.5 bg-white/40 rounded-t-2xl" />
                  </div>

                  <span className="text-[10px] font-mono text-[#64748B] font-bold uppercase tracking-wider">
                    {point.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Bottom stats summary */}
          <div className="flex items-center justify-between text-xs text-[#64748B] pt-2">
            <span>Peak Day Revenue: <strong className="text-[#0A0A0A]">₹{maxRevenue.toLocaleString('en-IN')}</strong></span>
            <span className="text-[#0A0A0A] font-bold">100% Hand-Inspected Quality</span>
          </div>
        </div>

        {/* Payment Channels Matrix (1 col) */}
        <div className="neu-flat rounded-3xl p-6 sm:p-7 border border-white/80 space-y-6 flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#64748B]">
              SETTLEMENT MATRIX
            </span>
            <h4 className="text-lg font-black font-poppins uppercase tracking-tight text-[#0A0A0A]">
              Payment Channels
            </h4>
            <p className="text-xs text-[#64748B] mt-1">
              Live settlement verification across COD and Instant UPI gateways.
            </p>
          </div>

          <div className="space-y-4">
            {/* COD */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="flex items-center gap-1.5 text-[#0A0A0A]">
                  <span className="w-2 h-2 rounded-full bg-amber-500" /> Cash on Delivery (COD)
                </span>
                <span className="font-mono text-[#64748B]">{stats.paymentSplit.cod} orders</span>
              </div>
              <div className="w-full h-3 rounded-full neu-inset overflow-hidden p-0.5 border border-white/40">
                <div
                  style={{
                    width: `${Math.round((stats.paymentSplit.cod / Math.max(1, stats.totalOrders)) * 100)}%`,
                  }}
                  className="h-full bg-amber-500 rounded-full"
                />
              </div>
            </div>

            {/* UPI */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="flex items-center gap-1.5 text-[#0A0A0A]">
                  <span className="w-2 h-2 rounded-full bg-[#0A0A0A]" /> Direct UPI / QR
                </span>
                <span className="font-mono text-[#64748B]">{stats.paymentSplit.upi} orders</span>
              </div>
              <div className="w-full h-3 rounded-full neu-inset overflow-hidden p-0.5 border border-white/40">
                <div
                  style={{
                    width: `${Math.round((stats.paymentSplit.upi / Math.max(1, stats.totalOrders)) * 100)}%`,
                  }}
                  className="h-full bg-[#0A0A0A] rounded-full"
                />
              </div>
            </div>

            {/* Cards */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="flex items-center gap-1.5 text-[#0A0A0A]">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" /> Credit / Debit Cards
                </span>
                <span className="font-mono text-[#64748B]">{stats.paymentSplit.card} orders</span>
              </div>
              <div className="w-full h-3 rounded-full neu-inset overflow-hidden p-0.5 border border-white/40">
                <div
                  style={{
                    width: `${Math.round((stats.paymentSplit.card / Math.max(1, stats.totalOrders)) * 100)}%`,
                  }}
                  className="h-full bg-emerald-500 rounded-full"
                />
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl neu-inset border border-white/50 text-xs text-[#0A0A0A] flex items-center gap-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="font-medium">Pincode 276306 & All Tier 1-3 COD enabled via BlueDart.</span>
          </div>
        </div>
      </div>

      {/* 4. Recent Orders Fulfillment Table */}
      <div className="neu-flat rounded-3xl p-6 sm:p-7 border border-white/80 space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-lg font-black font-poppins uppercase tracking-tight text-[#0A0A0A]">
              Recent Atelier Orders
            </h4>
            <p className="text-xs text-[#64748B]">
              Real-time customer dispatch and tracking AWB status.
            </p>
          </div>

          <Link
            href="/admin/orders"
            className="neu-btn px-3.5 py-1.5 rounded-2xl text-xs font-bold uppercase tracking-wider text-[#0A0A0A] hover:text-black flex items-center gap-1.5 border border-white/80 transition-all"
          >
            <span>View All ({orders.length})</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Dense Table */}
        <div className="overflow-x-auto no-scrollbar -mx-6 px-6">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#E2E8F0] text-[10px] font-mono font-bold uppercase tracking-wider text-[#64748B]">
                <th className="pb-3 px-3">Order ID</th>
                <th className="pb-3 px-3">Customer</th>
                <th className="pb-3 px-3">Items</th>
                <th className="pb-3 px-3">Amount</th>
                <th className="pb-3 px-3">Payment</th>
                <th className="pb-3 px-3">Status</th>
                <th className="pb-3 px-3">Carrier / AWB</th>
                <th className="pb-3 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]/60 font-medium">
              {orders.slice(0, 5).map((ord) => (
                <tr key={ord.id} className="hover:bg-white/50 transition-colors">
                  <td className="py-3.5 px-3 font-mono text-[#0A0A0A] font-bold">
                    {ord.orderNumber}
                  </td>
                  <td className="py-3.5 px-3">
                    <p className="font-bold text-[#0A0A0A]">{ord.customerName}</p>
                    <p className="text-[11px] text-[#64748B] font-mono">{ord.city}, {ord.pincode}</p>
                  </td>
                  <td className="py-3.5 px-3 text-[#475569]">
                    {ord.items.length} {ord.items.length === 1 ? 'garment' : 'garments'}
                  </td>
                  <td className="py-3.5 px-3 font-mono font-bold text-[#0A0A0A]">
                    ₹{ord.totalAmount.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3.5 px-3">
                    <span className="px-2.5 py-1 rounded-xl text-[10px] font-mono font-bold uppercase neu-flat-sm text-[#0A0A0A] border border-white/80">
                      {ord.paymentMethod}
                    </span>
                  </td>
                  <td className="py-3.5 px-3">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase border ${
                        ord.orderStatus === 'Delivered'
                          ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                          : ord.orderStatus === 'Shipped'
                          ? 'bg-[#0A0A0A] text-white border-black'
                          : ord.orderStatus === 'Confirmed'
                          ? 'bg-blue-100 text-blue-800 border-blue-300'
                          : 'bg-amber-100 text-amber-800 border-amber-300'
                      }`}
                    >
                      {ord.orderStatus}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 font-mono text-[11px] text-[#475569]">
                    {ord.trackingNumber ? (
                      <span className="text-[#0A0A0A] font-bold">{ord.trackingNumber}</span>
                    ) : (
                      <span className="text-[#94A3B8]">Unassigned</span>
                    )}
                  </td>
                  <td className="py-3.5 px-3 text-right">
                    <Link
                      href="/admin/orders"
                      className="px-3.5 py-1.5 rounded-xl neu-btn hover:neu-btn-dark hover:text-white text-[#0A0A0A] text-[11px] font-bold uppercase transition-all border border-white/80 inline-block"
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
