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
        <div className="fixed top-6 right-6 z-50 neu-flat text-[#0A0A0A] font-bold text-xs uppercase tracking-wider py-3.5 px-5 rounded-2xl shadow-2xl border border-white/90 animate-in slide-in-from-top duration-300 flex items-center gap-2.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#E2E8F0] gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#64748B]">
            <PackageCheck className="w-3.5 h-3.5 text-black" />
            <span>FULFILLMENT & LOGISTICS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black font-poppins uppercase tracking-tight text-[#0A0A0A] mt-1">
            Orders Pipeline
          </h2>
          <p className="text-xs text-[#64748B]">
            Real-time fulfillment, BlueDart AWB generation, and delivery tracking across Drop 001.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-[#64748B] neu-flat-sm px-3.5 py-1.5 rounded-full border border-white/80">
            Total Active Orders: <strong className="text-[#0A0A0A] font-bold font-mono">{orders.length}</strong>
          </span>
        </div>
      </div>

      {/* Filter Tabs in Neumorphic White & Black */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {['All', 'Pending', 'Confirmed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map((status) => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`px-3.5 sm:px-4 py-2 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                selectedStatus === status
                  ? 'neu-btn-dark bg-[#0A0A0A] text-white shadow-md'
                  : 'neu-flat-sm text-[#475569] hover:text-[#0A0A0A] border border-white/80'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by order #, phone, city..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full neu-inset rounded-2xl pl-10 pr-4 py-2.5 text-xs text-[#0A0A0A] placeholder-[#94A3B8] border border-white/40 focus:outline-none focus:ring-2 focus:ring-black/10 font-montserrat"
          />
        </div>
      </div>

      {/* Orders Table */}
      <div className="rounded-3xl neu-flat border border-white/80 overflow-hidden">
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#E2E8F0] text-[10px] font-mono font-bold uppercase tracking-wider text-[#64748B]">
                <th className="py-4 px-6">Order</th>
                <th className="py-4 px-4">Customer & City</th>
                <th className="py-4 px-4">Items</th>
                <th className="py-4 px-4">Total</th>
                <th className="py-4 px-4">Status</th>
                <th className="py-4 px-4">Courier / Tracking AWB</th>
                <th className="py-4 px-6 text-right">Invoice & Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]/60 font-medium">
              {filteredOrders.map((ord) => (
                <tr key={ord.id} className="hover:bg-white/60 transition-colors group">
                  {/* Order Number & Timestamp */}
                  <td className="py-4 px-6">
                    <p className="font-mono font-bold text-[#0A0A0A] text-sm">{ord.orderNumber}</p>
                    <p className="text-[10px] text-[#64748B] font-mono mt-0.5">
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
                    <p className="font-bold text-[#0A0A0A] text-xs">{ord.customerName}</p>
                    <p className="text-[11px] text-[#64748B] font-mono flex items-center gap-1 mt-0.5">
                      <Phone className="w-3 h-3 text-[#94A3B8]" /> {ord.customerPhone}
                    </p>
                    <p className="text-[11px] text-[#94A3B8] font-mono">
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
                            className="w-8 h-10 rounded-lg overflow-hidden neu-flat border border-white/80 shrink-0 p-0.5"
                          >
                            <img
                              src={item.thumbnail}
                              alt={item.title}
                              className="w-full h-full object-cover object-center rounded-md"
                            />
                          </div>
                        ))}
                      </div>
                      <span className="text-[11px] text-[#475569] font-mono">
                        {ord.items.length} {ord.items.length === 1 ? 'item' : 'items'}
                      </span>
                    </div>
                  </td>

                  {/* Amount & Payment Method */}
                  <td className="py-4 px-4">
                    <p className="font-mono font-bold text-[#0A0A0A] text-sm">
                      ₹{ord.totalAmount.toLocaleString('en-IN')}
                    </p>
                    <span
                      className={`inline-block px-2 py-0.5 rounded-lg text-[9px] font-mono font-bold uppercase mt-1 border ${
                        ord.paymentMethod === 'COD'
                          ? 'bg-amber-100 text-amber-800 border-amber-300'
                          : 'neu-inset text-[#0A0A0A] border-white/60'
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
                      className={`text-[11px] font-mono font-bold uppercase py-1.5 px-3 rounded-xl border focus:outline-none cursor-pointer ${
                        ord.orderStatus === 'Delivered'
                          ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                          : ord.orderStatus === 'Shipped'
                          ? 'bg-[#0A0A0A] text-white border-black'
                          : ord.orderStatus === 'Confirmed'
                          ? 'bg-blue-100 text-blue-800 border-blue-300'
                          : ord.orderStatus === 'Cancelled'
                          ? 'bg-rose-100 text-rose-800 border-rose-300'
                          : 'bg-amber-100 text-amber-800 border-amber-300'
                      }`}
                    >
                      <option value="Pending" className="bg-white text-black">Pending</option>
                      <option value="Confirmed" className="bg-white text-black">Confirmed</option>
                      <option value="Processing" className="bg-white text-black">Processing</option>
                      <option value="Shipped" className="bg-white text-black">Shipped</option>
                      <option value="Delivered" className="bg-white text-black">Delivered</option>
                      <option value="Cancelled" className="bg-white text-black">Cancelled</option>
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
                          className="w-36 neu-inset rounded-xl px-2.5 py-1 text-xs text-[#0A0A0A] font-mono border border-black/20"
                        />
                        <button
                          onClick={() => handleSaveTracking(ord.id)}
                          className="p-1.5 rounded-xl neu-btn-dark bg-[#0A0A0A] text-white hover:bg-black"
                        >
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </button>
                        <button
                          onClick={() => setEditingTrackingId(null)}
                          className="p-1.5 rounded-xl neu-btn text-[#64748B] hover:text-black"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <div>
                          <p className="font-mono text-xs text-[#0A0A0A]">
                            {ord.trackingNumber ? (
                              <span className="font-bold text-[#0A0A0A]">{ord.trackingNumber}</span>
                            ) : (
                              <span className="text-[#94A3B8] italic">No AWB</span>
                            )}
                          </p>
                          <p className="text-[10px] text-[#64748B]">{ord.carrier || 'BlueDart'}</p>
                        </div>
                        <button
                          onClick={() => handleStartEditTracking(ord)}
                          className="p-1 text-[#64748B] hover:text-black transition-colors"
                          title="Edit AWB tracking number"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-6 text-right">
                    <button
                      onClick={() => setSelectedOrder(ord)}
                      className="px-3.5 py-1.5 rounded-2xl neu-btn hover:neu-btn-dark hover:text-white text-[#0A0A0A] text-xs font-bold uppercase transition-all border border-white/80"
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
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-[#F0F3F8] border border-white/90 rounded-3xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200 shadow-2xl neu-flat">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#E2E8F0]">
              <div>
                <span className="text-[10px] font-mono text-[#64748B] font-bold uppercase tracking-wider">
                  ATELIER DISPATCH MANIFEST
                </span>
                <h3 className="text-xl font-black font-poppins text-[#0A0A0A] uppercase mt-0.5">
                  Order {selectedOrder.orderNumber}
                </h3>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-2 rounded-xl neu-btn text-[#64748B] hover:text-black cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Customer Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 rounded-2xl neu-inset border border-white/50 text-xs text-[#0A0A0A]">
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-[#64748B] uppercase font-bold">Customer Contact</span>
                <p className="font-bold text-[#0A0A0A] text-sm">{selectedOrder.customerName}</p>
                <p className="text-[#475569] font-mono">{selectedOrder.customerPhone}</p>
                <p className="text-[#64748B] font-mono">{selectedOrder.customerEmail}</p>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-mono text-[#64748B] uppercase font-bold">Shipping Destination</span>
                <p className="text-[#334155]">{selectedOrder.shippingAddress}</p>
                <p className="text-[#0A0A0A] font-bold font-mono">
                  {selectedOrder.city}, {selectedOrder.state} — {selectedOrder.pincode}
                </p>
                <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-emerald-100 text-emerald-800 border border-emerald-300 mt-1">
                  BlueDart Air Serviceable
                </span>
              </div>
            </div>

            {/* Items Breakdown */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#0A0A0A] font-mono">
                Order Garment Manifest
              </h4>
              <div className="space-y-2">
                {selectedOrder.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl neu-flat-sm border border-white/80 flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-12 rounded-xl overflow-hidden neu-flat border border-white/80 shrink-0 p-0.5">
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className="w-full h-full object-cover object-center rounded-lg"
                        />
                      </div>
                      <div>
                        <p className="font-bold text-[#0A0A0A] uppercase">{item.title}</p>
                        <p className="text-[11px] font-mono text-[#64748B]">
                          Size: {item.size} · Qty: {item.quantity}
                        </p>
                      </div>
                    </div>
                    <span className="font-mono font-bold text-sm text-[#0A0A0A]">
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Logistics Status & AWB */}
            <div className="p-5 rounded-2xl neu-flat border border-white/80 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-mono text-[#64748B] uppercase font-bold">Air Waybill (AWB)</span>
                <p className="text-sm font-mono font-bold text-[#0A0A0A] mt-0.5">
                  {selectedOrder.trackingNumber || 'Unassigned — Click edit in table to enter'}
                </p>
                <p className="text-[11px] text-[#64748B]">Carrier: {selectedOrder.carrier || 'BlueDart'}</p>
              </div>

              <div className="text-right">
                <span className="text-[10px] font-mono text-[#64748B] uppercase font-bold">Total Payable</span>
                <p className="text-xl font-mono font-black text-[#0A0A0A]">
                  ₹{selectedOrder.totalAmount.toLocaleString('en-IN')}
                </p>
                <span className="text-[10px] font-mono text-[#64748B]">{selectedOrder.paymentMethod}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 flex items-center justify-between">
              <button
                onClick={() => window.print()}
                className="px-4 py-2.5 rounded-2xl neu-btn text-[#0A0A0A] hover:text-black text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer border border-white/80"
              >
                <Printer className="w-4 h-4 text-black" />
                <span>Print Packing Slip</span>
              </button>

              <button
                onClick={() => setSelectedOrder(null)}
                className="px-6 py-2.5 rounded-2xl neu-btn-dark bg-[#0A0A0A] hover:bg-black text-white text-xs font-black uppercase tracking-wider cursor-pointer shadow-md"
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
