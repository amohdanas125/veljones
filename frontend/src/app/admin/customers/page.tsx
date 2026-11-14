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

  return (
    <div className="space-y-8 font-montserrat">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-cyan-400 text-black font-bold text-xs uppercase tracking-wider py-3 px-5 rounded-xl shadow-2xl animate-in slide-in-from-top duration-300 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/10 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-cyan-400">
            <Users className="w-3.5 h-3.5" />
            <span>COMMUNITY DIRECTORY</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black font-poppins uppercase tracking-tight text-white">
            Atelier Members & Customers
          </h2>
          <p className="text-xs text-neutral-400">
            Registered member profiles, lifetime spend analytics, and concierge outreach.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-black text-xs font-black uppercase tracking-wider transition-all shadow-lg flex items-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Add Member Profile</span>
        </button>
      </div>

      {/* Search */}
      <div className="p-4 rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-lg flex items-center justify-between">
        <div className="relative w-full max-w-md">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by customer name, phone, or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-800/80 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-400"
          />
        </div>

        <span className="text-xs font-mono text-neutral-400 hidden sm:inline">
          {filteredCustomers.length} registered accounts
        </span>
      </div>

      {/* Customers Cards / Table */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {filteredCustomers.map((cust) => (
          <div
            key={cust.id}
            className="p-6 rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-white/10 hover:border-cyan-500/30 transition-all shadow-xl space-y-4"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-500 to-rose-500 flex items-center justify-center font-bold text-sm text-white uppercase shadow-sm">
                  {cust.fullName.charAt(0)}
                </div>
                <div>
                  <h4 className="font-poppins font-bold text-sm text-white uppercase">
                    {cust.fullName}
                  </h4>
                  <span className="text-[10px] font-mono text-cyan-400">{cust.tier}</span>
                </div>
              </div>

              <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase bg-white/10 text-neutral-300">
                {cust.joinedDate}
              </span>
            </div>

            <div className="space-y-1.5 text-xs text-neutral-300 pt-2 border-t border-white/5 font-mono">
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-neutral-500" />
                <span className="truncate">{cust.email}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-neutral-500" />
                <span>{cust.phone}</span>
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-800/40 border border-white/5 flex items-center justify-between text-xs pt-3">
              <div>
                <p className="text-[10px] font-mono text-neutral-400 uppercase">Orders</p>
                <p className="font-bold text-white font-mono">{cust.totalOrders}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-mono text-neutral-400 uppercase">Lifetime Spend</p>
                <p className="font-bold text-emerald-400 font-mono">
                  ₹{cust.totalSpent.toLocaleString('en-IN')}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ADD CUSTOMER MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-slate-900 border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <h3 className="font-poppins font-black text-base text-white uppercase">
                Add Atelier Member
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[11px] font-mono uppercase text-neutral-300">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Zaid Khan"
                  value={newCust.fullName}
                  onChange={(e) => setNewCust({ ...newCust, fullName: e.target.value })}
                  className="w-full bg-slate-800 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono uppercase text-neutral-300">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. zaid@gmail.com"
                  value={newCust.email}
                  onChange={(e) => setNewCust({ ...newCust, email: e.target.value })}
                  className="w-full bg-slate-800 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono uppercase text-neutral-300">Mobile Phone</label>
                <input
                  type="text"
                  required
                  placeholder="+91 9876543210"
                  value={newCust.phone}
                  onChange={(e) => setNewCust({ ...newCust, phone: e.target.value })}
                  className="w-full bg-slate-800 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono uppercase text-neutral-300">Membership Tier</label>
                <select
                  value={newCust.tier}
                  onChange={(e) => setNewCust({ ...newCust, tier: e.target.value })}
                  className="w-full bg-slate-800 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                >
                  <option value="Atelier Member">Atelier Member</option>
                  <option value="VIP Collector">VIP Collector</option>
                  <option value="Atelier Founding Member">Atelier Founding Member</option>
                </select>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold uppercase text-neutral-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-black uppercase tracking-wider"
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
