'use client';

import React, { useState } from 'react';
import {
  PackageCheck,
  Truck,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  AlertCircle,
  ExternalLink,
  MapPin,
  Phone,
  Mail,
  Printer,
  X,
  Edit3,
  Save,
  Check,
  ChevronRight,
  Flame,
} from 'lucide-react';
import { useAdmin } from '@/context/AdminContext';
import { AdminOrder, OrderStatus } from '@/types';

export default function AdminOrdersPage() {
  const { orders, updateOrderStatus, updateOrderTracking } = useAdmin();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');

  // Selected Order for Full Detail Drawer / Packing Slip
  const [selectedOrder, setSelectedOrder] = useState<AdminOrder | null>(null);

  // Tracking editor state
  const [editingTrackingId, setEditingTrackingId] = useState<string | null>(null);
  const [carrierInput, setCarrierInput] = useState('BlueDart Express Air');
  const [awbInput, setAwbInput] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customerPhone.includes(searchQuery) ||
      o.pincode.includes(searchQuery);

    const matchesStatus = selectedStatus === 'All' || o.orderStatus === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const handleStartEditTracking = (ord: AdminOrder) => {
    setEditingTrackingId(ord.id);
    setCarrierInput(ord.carrier || 'BlueDart Express Air');
    setAwbInput(ord.trackingNumber || '');
  };

  const handleSaveTracking = (orderId: string) => {
    if (!awbInput) return;
    updateOrderTracking(orderId, carrierInput, awbInput);
    setEditingTrackingId(null);
    showToast(`✓ Order tracking updated: ${awbInput}`);
  };

  const handleStatusChange = (orderId: string, nextStatus: OrderStatus) => {
    updateOrderStatus(orderId, nextStatus);
    showToast(`✓ Status updated to ${nextStatus}`);
  };

  return (
    <div className="space-y-8 font-montserrat">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-gradient-to-r from-[#801414] to-[#C1272D] text-white font-bold text-xs uppercase tracking-wider py-3 px-5 rounded-2xl shadow-[0_0_30px_rgba(128,20,20,0.7)] border border-white/20 animate-in slide-in-from-top duration-300 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-[#FFA4A4]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#801414]/20 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#FFA4A4]">
            <PackageCheck className="w-3.5 h-3.5 text-[#E83D4D]" />
            <span>FULFILLMENT & LOGISTICS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black font-poppins uppercase tracking-tight text-white">
            Orders Pipeline
          </h2>
          <p className="text-xs text-neutral-400">
            Real-time fulfillment, BlueDart AWB generation, and delivery tracking across Drop 001.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-[#A87178]">
            Total Active Orders: <strong className="text-white font-bold font-mono">{orders.length}</strong>
          </span>
        </div>
      </div>

      {/* Filter Tabs in VALJONS Crimson */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {['All', 'Pending', 'Confirmed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map((status) => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                selectedStatus === status
                  ? 'bg-gradient-to-r from-[#801414] to-[#C1272D] text-white shadow-[0_0_15px_rgba(128,20,20,0.6)]'
                  : 'bg-[#140D0F]/90 text-neutral-400 hover:text-white border border-[#801414]/20'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-[#A87178] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by order #, phone, city..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#1A1013] border border-[#801414]/30 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#E83D4D]"
          />
        </div>
      </div>

      {/* Orders Table */}
      <div className="rounded-3xl bg-[#140D0F]/90 backdrop-blur-xl border border-[#801414]/30 shadow-2xl overflow-hidden">
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-black/50 border-b border-[#801414]/20 text-[10px] font-mono font-bold uppercase tracking-wider text-[#A87178]">
                <th className="py-4 px-6">Order</th>
                <th className="py-4 px-4">Customer & City</th>
                <th className="py-4 px-4">Items</th>
                <th className="py-4 px-4">Total</th>
                <th className="py-4 px-4">Status</th>
                <th className="py-4 px-4">Courier / Tracking AWB</th>
                <th className="py-4 px-6 text-right">Invoice & Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#801414]/10 font-medium">
              {filteredOrders.map((ord) => (
                <tr key={ord.id} className="hover:bg-[#801414]/10 transition-colors group">
                  {/* Order Number & Timestamp */}
                  <td className="py-4 px-6">
                    <p className="font-mono font-bold text-[#FFA4A4] text-sm">{ord.orderNumber}</p>
                    <p className="text-[10px] text-neutral-500 font-mono mt-0.5">
                      {new Date(ord.createdAt).toLocaleDateString('en-IN', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </td>

                  {/* Customer Info */}
                  <td className="py-4 px-4">
                    <p className="font-bold text-white text-xs">{ord.customerName}</p>
                    <p className="text-[11px] text-neutral-400 font-mono flex items-center gap-1 mt-0.5">
                      <Phone className="w-3 h-3 text-[#A87178]" /> {ord.customerPhone}
                    </p>
                    <p className="text-[11px] text-neutral-500 font-mono">
                      {ord.city}, {ord.pincode}
                    </p>
                  </td>

                  {/* Items */}
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <div className="flex -space-x-2">
                        {ord.items.slice(0, 3).map((item, i) => (
                          <div
                            key={i}
                            className="w-8 h-10 rounded-md overflow-hidden bg-black/60 border border-[#801414]/40 shrink-0"
                          >
                            <img
                              src={item.thumbnail}
                              alt={item.title}
                              className="w-full h-full object-cover object-center"
                            />
                          </div>
                        ))}
                      </div>
                      <span className="text-[11px] text-neutral-300 font-mono">
                        {ord.items.length} {ord.items.length === 1 ? 'item' : 'items'}
                      </span>
                    </div>
                  </td>

                  {/* Amount & Payment Method */}
                  <td className="py-4 px-4">
                    <p className="font-mono font-bold text-white text-sm">
                      ₹{ord.totalAmount.toLocaleString('en-IN')}
                    </p>
                    <span
                      className={`inline-block px-1.5 py-0.5 rounded text-[9px] font-mono font-bold uppercase mt-1 ${
                        ord.paymentMethod === 'COD'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          : 'bg-[#801414]/30 text-[#FFA4A4] border border-[#801414]/50'
                      }`}
                    >
                      {ord.paymentMethod} · {ord.paymentStatus}
                    </span>
                  </td>

                  {/* Status Dropdown */}
                  <td className="py-4 px-4">
                    <select
                      value={ord.orderStatus}
                      onChange={(e) => handleStatusChange(ord.id, e.target.value as OrderStatus)}
                      className={`text-[11px] font-mono font-bold uppercase py-1 px-2.5 rounded-lg border focus:outline-none cursor-pointer ${
                        ord.orderStatus === 'Delivered'
                          ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                          : ord.orderStatus === 'Shipped'
                          ? 'bg-[#801414]/40 text-[#FFA4A4] border-[#801414]/60'
                          : ord.orderStatus === 'Confirmed'
                          ? 'bg-blue-500/15 text-blue-300 border-blue-500/30'
                          : ord.orderStatus === 'Cancelled'
                          ? 'bg-rose-500/15 text-rose-300 border-rose-500/30'
                          : 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                      }`}
                    >
                      <option value="Pending" className="bg-[#120B0D] text-white">Pending</option>
                      <option value="Confirmed" className="bg-[#120B0D] text-white">Confirmed</option>
                      <option value="Processing" className="bg-[#120B0D] text-white">Processing</option>
                      <option value="Shipped" className="bg-[#120B0D] text-white">Shipped</option>
                      <option value="Delivered" className="bg-[#120B0D] text-white">Delivered</option>
                      <option value="Cancelled" className="bg-[#120B0D] text-white">Cancelled</option>
                    </select>
                  </td>

                  {/* Courier & Tracking AWB */}
                  <td className="py-4 px-4">
                    {editingTrackingId === ord.id ? (
                      <div className="flex items-center gap-1.5">
                        <input
                          type="text"
                          placeholder="e.g. BD784920194IN"
                          value={awbInput}
                          onChange={(e) => setAwbInput(e.target.value)}
                          className="w-36 bg-[#1F1417] border border-[#E83D4D] rounded-lg px-2 py-1 text-xs text-white font-mono"
                        />
                        <button
                          onClick={() => handleSaveTracking(ord.id)}
                          className="p-1 rounded-md bg-[#801414] text-white hover:bg-[#991B1B]"
                        >
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </button>
                        <button
                          onClick={() => setEditingTrackingId(null)}
                          className="p-1 rounded-md bg-black/60 text-neutral-400 hover:text-white"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <div>
                          <p className="font-mono text-xs text-white">
                            {ord.trackingNumber ? (
                              <span className="text-[#FFA4A4] font-bold">{ord.trackingNumber}</span>
                            ) : (
                              <span className="text-neutral-500 italic">No AWB</span>
                            )}
                          </p>
                          <p className="text-[10px] text-neutral-400">{ord.carrier || 'BlueDart'}</p>
                        </div>
                        <button
                          onClick={() => handleStartEditTracking(ord)}
                          className="p-1 text-neutral-400 hover:text-[#FFA4A4] transition-colors"
                          title="Edit AWB tracking number"
                        >
                          <Edit3 className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-6 text-right">
                    <button
                      onClick={() => setSelectedOrder(ord)}
                      className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#801414]/30 to-[#991B1B]/30 hover:from-[#801414] hover:to-[#B91C1C] text-white text-xs font-bold uppercase transition-all border border-[#801414]/40 shadow-xs"
                    >
                      Inspect
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ORDER DETAIL DRAWER & PACKING SLIP MODAL */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-[#160E10] border border-[#801414]/40 rounded-3xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200 shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#801414]/20">
              <div>
                <span className="text-[10px] font-mono text-[#FFA4A4] font-bold uppercase tracking-wider">
                  ATELIER DISPATCH MANIFEST
                </span>
                <h3 className="text-xl font-black font-poppins text-white uppercase mt-0.5">
                  Order {selectedOrder.orderNumber}
                </h3>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-1.5 text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Customer Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-[#1F1417] border border-[#801414]/30 text-xs">
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-[#A87178] uppercase font-bold">Customer Contact</span>
                <p className="font-bold text-white text-sm">{selectedOrder.customerName}</p>
                <p className="text-neutral-300 font-mono">{selectedOrder.customerPhone}</p>
                <p className="text-neutral-400 font-mono">{selectedOrder.customerEmail}</p>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-mono text-[#A87178] uppercase font-bold">Shipping Destination</span>
                <p className="text-neutral-200">{selectedOrder.shippingAddress}</p>
                <p className="text-white font-bold font-mono">
                  {selectedOrder.city}, {selectedOrder.state} — {selectedOrder.pincode}
                </p>
                <span className="inline-block px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-emerald-500/20 text-emerald-300 mt-1">
                  BlueDart Air Serviceable
                </span>
              </div>
            </div>

            {/* Items Breakdown */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#FFA4A4] font-mono">
                Order Garment Manifest
              </h4>
              <div className="space-y-2">
                {selectedOrder.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-[#1F1417]/80 border border-[#801414]/20 flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-12 rounded-lg overflow-hidden bg-black/60 border border-[#801414]/30 shrink-0">
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className="w-full h-full object-cover object-center"
                        />
                      </div>
                      <div>
                        <p className="font-bold text-white uppercase">{item.title}</p>
                        <p className="text-[11px] font-mono text-[#FFA4A4]">
                          Size: {item.size} · Qty: {item.quantity}
                        </p>
                      </div>
                    </div>
                    <span className="font-mono font-bold text-sm text-white">
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Logistics Status & AWB */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-[#801414]/30 to-[#1F1417] border border-[#801414]/40 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-mono text-[#FFA4A4] uppercase font-bold">Air Waybill (AWB)</span>
                <p className="text-sm font-mono font-bold text-white mt-0.5">
                  {selectedOrder.trackingNumber || 'Unassigned — Click edit to enter'}
                </p>
                <p className="text-[11px] text-neutral-400">Carrier: {selectedOrder.carrier || 'BlueDart'}</p>
              </div>

              <div className="text-right">
                <span className="text-[10px] font-mono text-neutral-400 uppercase font-bold">Total Payable</span>
                <p className="text-xl font-mono font-black text-[#FFA4A4]">
                  ₹{selectedOrder.totalAmount.toLocaleString('en-IN')}
                </p>
                <span className="text-[10px] font-mono text-neutral-300">{selectedOrder.paymentMethod}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 flex items-center justify-between">
              <button
                onClick={() => window.print()}
                className="px-4 py-2.5 rounded-xl bg-black/60 hover:bg-black text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer border border-[#801414]/30"
              >
                <Printer className="w-4 h-4 text-[#FFA4A4]" />
                <span>Print Packing Slip</span>
              </button>

              <button
                onClick={() => setSelectedOrder(null)}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#801414] to-[#C1272D] hover:from-[#991B1B] hover:to-[#E83D4D] text-white text-xs font-black uppercase tracking-wider shadow-[0_0_15px_rgba(128,20,20,0.6)]"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
