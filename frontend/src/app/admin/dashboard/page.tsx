'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  TrendingUp,
  PackageCheck,
  ShoppingBag,
  Users,
  ArrowUpRight,
  ArrowDownRight,
  CreditCard,
  Clock,
  CheckCircle2,
  AlertCircle,
  Truck,
  Plus,
  Eye,
  Filter,
  Sparkles,
} from 'lucide-react';
import { useAdmin } from '@/context/AdminContext';

export default function AdminDashboardPage() {
  const { stats, orders, products, adminUser } = useAdmin();
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '6m' | '1y'>('30d');

  // Chart seed points based on time range
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
      {/* 1. Welcome & Time Greeting Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/10 gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-cyan-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>EXECUTIVE COMMAND DASHBOARD</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black font-poppins uppercase tracking-tight text-white">
            Good afternoon, {adminUser.name.split(' ')[0]}
          </h2>
          <p className="text-xs text-neutral-400">
            Drop 001 performance: 280 GSM straight-fit collection & nationwide fulfillment.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center gap-3">
          <Link
            href="/admin/orders"
            className="px-4 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-white/10 text-xs font-bold uppercase tracking-wider text-white transition-all shadow-sm flex items-center gap-2"
          >
            <Truck className="w-3.5 h-3.5 text-cyan-400" />
            <span>Fulfillment Pipeline</span>
          </Link>

          <Link
            href="/admin/products?action=new"
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-black text-xs font-black uppercase tracking-wider transition-all shadow-lg flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>New Drop Piece</span>
          </Link>
        </div>
      </div>

      {/* 2. Top Analytics Metric Cards (matching video layout) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Card 1: Gross Sales */}
        <div className="p-6 rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-white/10 hover:border-cyan-500/40 transition-all duration-300 shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-all" />
          <div className="flex items-center justify-between text-neutral-400 mb-3">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider">Total Sales (INR)</span>
            <div className="w-8 h-8 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl sm:text-3xl font-black font-poppins text-white tracking-tight">
              ₹{stats.totalRevenue.toLocaleString('en-IN')}
            </h3>
            <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-bold">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>+18.4%</span>
              <span className="text-neutral-500 font-normal">vs last week</span>
            </div>
          </div>
        </div>

        {/* Card 2: Orders Processed */}
        <div className="p-6 rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-white/10 hover:border-amber-500/40 transition-all duration-300 shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-500/20 transition-all" />
          <div className="flex items-center justify-between text-neutral-400 mb-3">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider">Orders Processed</span>
            <div className="w-8 h-8 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center">
              <PackageCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl sm:text-3xl font-black font-poppins text-white tracking-tight">
              {stats.totalOrders}
            </h3>
            <div className="flex items-center gap-1.5 text-xs text-amber-400 font-bold">
              <span>{stats.pendingOrdersCount} Awaiting Dispatch</span>
            </div>
          </div>
        </div>

        {/* Card 3: Average Order Value */}
        <div className="p-6 rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-white/10 hover:border-emerald-500/40 transition-all duration-300 shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-all" />
          <div className="flex items-center justify-between text-neutral-400 mb-3">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider">Average Order Value</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
              <CreditCard className="w-4 h-4" />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl sm:text-3xl font-black font-poppins text-white tracking-tight">
              ₹{stats.aov.toLocaleString('en-IN')}
            </h3>
            <div className="flex items-center gap-1.5 text-xs text-neutral-400">
              <span className="text-emerald-400 font-bold">₹2,499</span>
              <span>Drop 001 Anchor</span>
            </div>
          </div>
        </div>

        {/* Card 4: Store Conversion */}
        <div className="p-6 rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-white/10 hover:border-rose-500/40 transition-all duration-300 shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/10 rounded-full blur-2xl group-hover:bg-rose-500/20 transition-all" />
          <div className="flex items-center justify-between text-neutral-400 mb-3">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider">Conversion Rate</span>
            <div className="w-8 h-8 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-400 flex items-center justify-center">
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
              <span className="text-neutral-500 font-normal">organic search</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Main Chart & Payment Channel Split (matching video layout) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left: Revenue Trend Chart (8 Cols) */}
        <div className="lg:col-span-8 p-6 sm:p-7 rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl flex flex-col justify-between space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-cyan-400">
                  REVENUE VELOCITY
                </span>
              </div>
              <h4 className="text-lg font-black font-poppins uppercase tracking-tight text-white mt-1">
                Sales Trajectory
              </h4>
            </div>

            {/* Time Filter Tabs */}
            <div className="flex items-center p-1 rounded-xl bg-slate-800/80 border border-white/10 text-xs font-mono">
              {(['7d', '30d', '6m', '1y'] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => setTimeRange(r)}
                  className={`px-3 py-1 rounded-lg uppercase transition-all cursor-pointer ${
                    timeRange === r
                      ? 'bg-cyan-500 text-black font-bold shadow-xs'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          {/* Dynamic SVG Area Chart */}
          <div className="w-full h-56 relative flex items-end justify-between gap-3 pt-6 border-b border-white/10">
            {activePoints.map((point, pIdx) => {
              const heightPercent = Math.max(15, Math.round((point.revenue / maxRevenue) * 100));
              return (
                <div key={pIdx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                  {/* Tooltip on hover */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-2 bg-slate-800 text-white border border-white/20 text-[10px] font-mono py-1 px-2.5 rounded-lg shadow-xl pointer-events-none whitespace-nowrap z-20">
                    ₹{point.revenue.toLocaleString('en-IN')} · {point.orders} orders
                  </div>

                  {/* Bar with gradient */}
                  <div
                    style={{ height: `${heightPercent}%` }}
                    className="w-full max-w-[48px] rounded-t-xl bg-gradient-to-t from-cyan-500/20 via-teal-500/50 to-cyan-400 group-hover:to-white transition-all duration-300 relative"
                  >
                    <div className="w-full h-1 bg-cyan-300 rounded-t-xl shadow-[0_0_12px_rgba(6,182,212,0.8)]" />
                  </div>

                  <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">
                    {point.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Bottom stats summary */}
          <div className="flex items-center justify-between text-xs text-neutral-400 pt-2">
            <span>Peak Day Revenue: <strong className="text-white">₹{maxRevenue.toLocaleString('en-IN')}</strong></span>
            <span className="text-emerald-400 font-bold">100% On-Time Dispatch</span>
          </div>
        </div>

        {/* Right: Payment Method & Channel Split (4 Cols) */}
        <div className="lg:col-span-4 p-6 sm:p-7 rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl flex flex-col justify-between space-y-6">
          <div>
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-rose-400">
              PAYMENT RATIOS
            </span>
            <h4 className="text-lg font-black font-poppins uppercase tracking-tight text-white mt-1">
              Payment Methods
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
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  Cash on Delivery (COD)
                </span>
                <span className="font-mono text-neutral-300">{stats.paymentSplit.cod} orders</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                <div
                  style={{
                    width: `${Math.round((stats.paymentSplit.cod / Math.max(1, stats.totalOrders)) * 100)}%`,
                  }}
                  className="h-full bg-amber-400 rounded-full"
                />
              </div>
            </div>

            {/* UPI */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                  Direct UPI / QR
                </span>
                <span className="font-mono text-neutral-300">{stats.paymentSplit.upi} orders</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                <div
                  style={{
                    width: `${Math.round((stats.paymentSplit.upi / Math.max(1, stats.totalOrders)) * 100)}%`,
                  }}
                  className="h-full bg-cyan-400 rounded-full"
                />
              </div>
            </div>

            {/* Cards */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  Credit / Debit Cards
                </span>
                <span className="font-mono text-neutral-300">{stats.paymentSplit.card} orders</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                <div
                  style={{
                    width: `${Math.round((stats.paymentSplit.card / Math.max(1, stats.totalOrders)) * 100)}%`,
                  }}
                  className="h-full bg-emerald-400 rounded-full"
                />
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs text-neutral-300 flex items-center gap-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Pincode 276306 & All Tier 1-3 COD enabled via BlueDart.</span>
          </div>
        </div>
      </div>

      {/* 4. Recent Orders Fulfillment Table */}
      <div className="p-6 sm:p-7 rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl space-y-5">
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
            className="text-xs font-bold uppercase tracking-wider text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
          >
            <span>View All ({orders.length})</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Dense Table */}
        <div className="overflow-x-auto no-scrollbar -mx-6 px-6">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-400">
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
                <tr key={ord.id} className="hover:bg-white/5 transition-colors">
                  <td className="py-3.5 font-mono text-cyan-400 font-bold">
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
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-slate-800 text-neutral-300 border border-white/10">
                      {ord.paymentMethod}
                    </span>
                  </td>
                  <td className="py-3.5">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase border ${
                        ord.orderStatus === 'Delivered'
                          ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                          : ord.orderStatus === 'Shipped'
                          ? 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30'
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
                      <span className="text-neutral-300">{ord.trackingNumber}</span>
                    ) : (
                      <span className="text-neutral-500">Unassigned</span>
                    )}
                  </td>
                  <td className="py-3.5 text-right">
                    <Link
                      href="/admin/orders"
                      className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white text-[11px] font-bold uppercase transition-colors"
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
