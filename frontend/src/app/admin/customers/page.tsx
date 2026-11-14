'use client';

import React, { useState } from 'react';
import {
  Users,
  Search,
  Plus,
  Mail,
  Phone,
  Calendar,
  Award,
  Sparkles,
  CheckCircle2,
  X,
  ShieldCheck,
} from 'lucide-react';
import { useAdmin } from '@/context/AdminContext';

export default function AdminCustomersPage() {
  const { customers, addCustomer } = useAdmin();
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const [newCust, setNewCust] = useState({
    fullName: '',
    email: '',
    phone: '',
    tier: 'Atelier Member',
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const filteredCustomers = customers.filter(
    (c) =>
      c.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phone.includes(searchQuery)
  );

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCust.fullName || !newCust.email) return;

    addCustomer({
      fullName: newCust.fullName,
      email: newCust.email,
      phone: newCust.phone,
      tier: newCust.tier,
      totalOrders: 0,
      totalSpent: 0,
      joinedDate: 'Nov 2026',
      lastOrderDate: 'Just added',
    });

    setIsAddModalOpen(false);
    showToast(`✓ Registered member ${newCust.fullName}`);
    setNewCust({ fullName: '', email: '', phone: '', tier: 'Atelier Member' });
  };

  const getTierBadge = (tier: string) => {
    if (tier.toLowerCase().includes('founding')) {
      return 'neu-inset text-[#0A0A0A] border-white/60 font-bold';
    }
    if (tier.toLowerCase().includes('vip')) {
      return 'neu-btn-dark bg-[#0A0A0A] text-white border-black font-bold';
    }
    return 'neu-flat-sm text-[#475569] border-white/80';
  };

  return (
    <div className="space-y-8 font-montserrat">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 neu-flat border border-white/90 text-[#0A0A0A] font-bold text-xs uppercase tracking-wider py-3.5 px-5 rounded-2xl shadow-2xl animate-in slide-in-from-top duration-300 flex items-center gap-2.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#E2E8F0] gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#64748B]">
            <Users className="w-3.5 h-3.5 text-black" />
            <span>COMMUNITY DIRECTORY · DROP 001</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black font-poppins uppercase tracking-tight text-[#0A0A0A] mt-1">
            Atelier Members & VIPs
          </h2>
          <p className="text-xs text-[#64748B]">
            Registered member profiles, lifetime spend analytics, and concierge outreach.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-5 py-2.5 rounded-2xl neu-btn-dark bg-[#0A0A0A] hover:bg-black text-white text-xs font-black uppercase tracking-wider transition-all shadow-[4px_4px_12px_rgba(10,10,10,0.2)] flex items-center gap-2 cursor-pointer active:scale-95"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Add Member Profile</span>
        </button>
      </div>

      {/* Search & Counter */}
      <div className="p-4 rounded-3xl neu-flat border border-white/80 shadow-md flex items-center justify-between gap-4">
        <div className="relative w-full max-w-md">
          <Search className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by customer name, phone, or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full neu-inset rounded-2xl pl-10 pr-4 py-2.5 text-xs text-[#0A0A0A] placeholder-[#94A3B8] border border-white/40 focus:outline-none focus:ring-2 focus:ring-black/10 font-montserrat"
          />
        </div>

        <span className="text-xs font-mono text-[#0A0A0A] neu-flat-sm px-3.5 py-1.5 rounded-2xl border border-white/80 hidden sm:inline shrink-0 font-bold">
          {filteredCustomers.length} registered accounts
        </span>
      </div>

      {/* Customers Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {filteredCustomers.map((cust) => (
          <div
            key={cust.id}
            className="p-6 rounded-3xl neu-flat border border-white/80 space-y-4 hover:scale-[1.01] transition-all"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-[#0A0A0A] text-white flex items-center justify-center font-bold text-sm uppercase shadow-md">
                  {cust.fullName.charAt(0)}
                </div>
                <div>
                  <h4 className="font-poppins font-bold text-sm text-[#0A0A0A] uppercase">
                    {cust.fullName}
                  </h4>
                  <span className={`inline-block mt-0.5 text-[9px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${getTierBadge(cust.tier)}`}>
                    {cust.tier}
                  </span>
                </div>
              </div>

              <span className="px-2.5 py-1 rounded-xl text-[9px] font-mono font-bold uppercase neu-flat-sm border border-white/80 text-[#64748B]">
                {cust.joinedDate}
              </span>
            </div>

            <div className="space-y-2 text-xs text-[#475569] pt-2 border-t border-[#E2E8F0] font-mono">
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#94A3B8]" />
                <span className="truncate">{cust.email}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#94A3B8]" />
                <span>{cust.phone}</span>
              </p>
            </div>

            <div className="p-3.5 rounded-2xl neu-inset border border-white/50 flex items-center justify-between text-xs">
              <div>
                <p className="text-[10px] font-mono text-[#64748B] uppercase font-bold">Orders</p>
                <p className="font-bold text-[#0A0A0A] font-mono mt-0.5">{cust.totalOrders} checkouts</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-mono text-[#64748B] uppercase font-bold">Lifetime Spend</p>
                <p className="font-bold text-emerald-600 font-mono mt-0.5">
                  ₹{cust.totalSpent.toLocaleString('en-IN')}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ADD CUSTOMER MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#F0F3F8] border border-white/90 rounded-3xl p-6 sm:p-8 space-y-6 animate-in zoom-in-95 duration-200 shadow-2xl neu-flat">
            <div className="flex items-center justify-between pb-4 border-b border-[#E2E8F0]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#0A0A0A] flex items-center justify-center text-white">
                  <Plus className="w-4 h-4 stroke-[3]" />
                </div>
                <h3 className="font-poppins font-black text-base text-[#0A0A0A] uppercase">
                  Add Atelier Member
                </h3>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-2 text-[#64748B] hover:text-black rounded-xl neu-btn cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[11px] font-mono uppercase text-[#0A0A0A] font-bold">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Zaid Khan"
                  value={newCust.fullName}
                  onChange={(e) => setNewCust({ ...newCust, fullName: e.target.value })}
                  className="w-full neu-inset rounded-2xl px-3.5 py-2.5 text-xs text-[#0A0A0A] border border-white/50 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono uppercase text-[#0A0A0A] font-bold">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. zaid@gmail.com"
                  value={newCust.email}
                  onChange={(e) => setNewCust({ ...newCust, email: e.target.value })}
                  className="w-full neu-inset rounded-2xl px-3.5 py-2.5 text-xs text-[#0A0A0A] border border-white/50 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono uppercase text-[#0A0A0A] font-bold">Mobile Phone</label>
                <input
                  type="text"
                  required
                  placeholder="+91 9876543210"
                  value={newCust.phone}
                  onChange={(e) => setNewCust({ ...newCust, phone: e.target.value })}
                  className="w-full neu-inset rounded-2xl px-3.5 py-2.5 text-xs text-[#0A0A0A] border border-white/50 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono uppercase text-[#0A0A0A] font-bold">Membership Tier</label>
                <select
                  value={newCust.tier}
                  onChange={(e) => setNewCust({ ...newCust, tier: e.target.value })}
                  className="w-full neu-inset rounded-2xl px-3.5 py-2.5 text-xs text-[#0A0A0A] border border-white/50 focus:outline-none"
                >
                  <option value="Atelier Member">Atelier Member</option>
                  <option value="VIP Collector">VIP Collector</option>
                  <option value="Atelier Founding Member">Atelier Founding Member</option>
                </select>
              </div>

              <div className="pt-4 border-t border-[#E2E8F0] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold uppercase text-[#64748B] hover:text-black cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-2xl neu-btn-dark bg-[#0A0A0A] hover:bg-black text-white text-xs font-black uppercase tracking-wider transition-all shadow-md cursor-pointer"
                >
                  Create Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
