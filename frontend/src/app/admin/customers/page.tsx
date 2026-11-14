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
  Flame,
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
      return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
    }
    if (tier.toLowerCase().includes('vip')) {
      return 'bg-[#801414]/40 text-[#FFA4A4] border-[#801414]/60';
    }
    return 'bg-white/10 text-neutral-300 border-white/20';
  };

  return (
    <div className="space-y-8 font-montserrat">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-[#801414] border border-[#FFA4A4]/40 text-white font-bold text-xs uppercase tracking-wider py-3 px-5 rounded-2xl shadow-[0_8px_32px_rgba(128,20,20,0.6)] animate-in slide-in-from-top duration-300 flex items-center gap-2.5">
          <CheckCircle2 className="w-4 h-4 text-[#FFA4A4]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#801414]/20 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#FFA4A4]">
            <Users className="w-3.5 h-3.5 text-[#E83D4D]" />
            <span>COMMUNITY DIRECTORY · DROP 001</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black font-poppins uppercase tracking-tight text-white mt-1">
            Atelier Members & VIPs
          </h2>
          <p className="text-xs text-neutral-400">
            Registered member profiles, lifetime spend analytics, and concierge outreach.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#801414] via-[#991B1B] to-[#C1272D] hover:from-[#991B1B] hover:to-[#E83D4D] text-white text-xs font-black uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(128,20,20,0.6)] flex items-center gap-2 cursor-pointer active:scale-95"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Add Member Profile</span>
        </button>
      </div>

      {/* Search & Counter */}
      <div className="p-4 rounded-3xl bg-[#140D0F]/85 backdrop-blur-xl border border-[#801414]/30 shadow-lg flex items-center justify-between gap-4">
        <div className="relative w-full max-w-md">
          <Search className="w-4 h-4 text-[#A87178] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by customer name, phone, or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#1C1215] border border-[#801414]/30 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#E83D4D] focus:ring-1 focus:ring-[#801414] transition-all"
          />
        </div>

        <span className="text-xs font-mono text-[#FFA4A4] bg-[#801414]/20 border border-[#801414]/30 px-3 py-1.5 rounded-xl hidden sm:inline shrink-0">
          {filteredCustomers.length} registered accounts
        </span>
      </div>

      {/* Customers Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {filteredCustomers.map((cust) => (
          <div
            key={cust.id}
            className="p-6 rounded-3xl bg-[#140D0F]/85 backdrop-blur-xl border border-[#801414]/30 hover:border-[#801414]/70 transition-all shadow-[0_8px_30px_rgba(0,0,0,0.4)] space-y-4 relative overflow-hidden group hover:shadow-[0_12px_36px_rgba(128,20,20,0.25)]"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#801414]/10 rounded-full blur-2xl pointer-events-none group-hover:bg-[#801414]/20 transition-all" />

            <div className="flex items-start justify-between relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#801414] via-[#991B1B] to-[#C1272D] flex items-center justify-center font-bold text-sm text-white uppercase shadow-md border border-[#FFA4A4]/20">
                  {cust.fullName.charAt(0)}
                </div>
                <div>
                  <h4 className="font-poppins font-bold text-sm text-white uppercase group-hover:text-[#FFA4A4] transition-colors">
                    {cust.fullName}
                  </h4>
                  <span className={`inline-block mt-0.5 text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${getTierBadge(cust.tier)}`}>
                    {cust.tier}
                  </span>
                </div>
              </div>

              <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase bg-black/60 border border-[#801414]/30 text-neutral-400">
                {cust.joinedDate}
              </span>
            </div>

            <div className="space-y-2 text-xs text-neutral-300 pt-2 border-t border-[#801414]/20 font-mono relative z-10">
              <p className="flex items-center gap-2 text-neutral-300">
                <Mail className="w-3.5 h-3.5 text-[#A87178]" />
                <span className="truncate">{cust.email}</span>
              </p>
              <p className="flex items-center gap-2 text-neutral-300">
                <Phone className="w-3.5 h-3.5 text-[#A87178]" />
                <span>{cust.phone}</span>
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#191013] border border-[#801414]/20 flex items-center justify-between text-xs relative z-10">
              <div>
                <p className="text-[10px] font-mono text-[#A87178] uppercase">Orders</p>
                <p className="font-bold text-white font-mono mt-0.5">{cust.totalOrders} checkouts</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-mono text-[#A87178] uppercase">Lifetime Spend</p>
                <p className="font-bold text-emerald-400 font-mono mt-0.5">
                  ₹{cust.totalSpent.toLocaleString('en-IN')}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ADD CUSTOMER MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#140D0F] border border-[#801414]/40 rounded-3xl p-6 sm:p-8 space-y-6 animate-in zoom-in-95 duration-200 shadow-[0_16px_64px_rgba(0,0,0,0.8)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#801414]/25 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-center justify-between pb-4 border-b border-[#801414]/30 relative z-10">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#801414] to-[#C1272D] flex items-center justify-center">
                  <Plus className="w-4 h-4 text-white" />
                </div>
                <h3 className="font-poppins font-black text-base text-white uppercase">
                  Add Atelier Member
                </h3>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-4 relative z-10">
              <div className="space-y-1">
                <label className="text-[11px] font-mono uppercase text-[#A87178]">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Zaid Khan"
                  value={newCust.fullName}
                  onChange={(e) => setNewCust({ ...newCust, fullName: e.target.value })}
                  className="w-full bg-[#1C1215] border border-[#801414]/30 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#E83D4D]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono uppercase text-[#A87178]">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. zaid@gmail.com"
                  value={newCust.email}
                  onChange={(e) => setNewCust({ ...newCust, email: e.target.value })}
                  className="w-full bg-[#1C1215] border border-[#801414]/30 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#E83D4D]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono uppercase text-[#A87178]">Mobile Phone</label>
                <input
                  type="text"
                  required
                  placeholder="+91 9876543210"
                  value={newCust.phone}
                  onChange={(e) => setNewCust({ ...newCust, phone: e.target.value })}
                  className="w-full bg-[#1C1215] border border-[#801414]/30 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#E83D4D]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono uppercase text-[#A87178]">Membership Tier</label>
                <select
                  value={newCust.tier}
                  onChange={(e) => setNewCust({ ...newCust, tier: e.target.value })}
                  className="w-full bg-[#1C1215] border border-[#801414]/30 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#E83D4D]"
                >
                  <option value="Atelier Member" className="bg-[#140D0F] text-white">Atelier Member</option>
                  <option value="VIP Collector" className="bg-[#140D0F] text-white">VIP Collector</option>
                  <option value="Atelier Founding Member" className="bg-[#140D0F] text-white">Atelier Founding Member</option>
                </select>
              </div>

              <div className="pt-4 border-t border-[#801414]/30 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold uppercase text-neutral-400 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#801414] via-[#991B1B] to-[#C1272D] hover:from-[#991B1B] hover:to-[#E83D4D] text-white text-xs font-black uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(128,20,20,0.6)] cursor-pointer"
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
