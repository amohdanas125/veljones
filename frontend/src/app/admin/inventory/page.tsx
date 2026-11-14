'use client';

import React, { useState } from 'react';
import {
  Layers,
  Search,
  Plus,
  Minus,
  AlertTriangle,
  CheckCircle2,
  Package,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { useAdmin } from '@/context/AdminContext';

export default function AdminInventoryPage() {
  const { products, updateProduct } = useAdmin();
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const filteredProducts = products.filter(
    (p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.slug.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAdjustStock = (productId: number, size: string, delta: number) => {
    const product = products.find((p) => p.id === productId);
    if (!product) return;

    const currentVariants = product.variants || [
      { size: 'S', stock: 10 },
      { size: 'M', stock: 20 },
      { size: 'L', stock: 20 },
      { size: 'XL', stock: 10 },
    ];

    const updatedVariants = currentVariants.map((v) => {
      if (v.size === size) {
        return { ...v, stock: Math.max(0, (v.stock || 0) + delta) };
      }
      return v;
    });

    updateProduct(productId, { variants: updatedVariants });
    showToast(`✓ Replenished ${product.title} (Size ${size} +${delta})`);
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
            <Layers className="w-3.5 h-3.5 text-black" />
            <span>STOCK & ALLOCATION MATRIX · DROP 001</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black font-poppins uppercase tracking-tight text-[#0A0A0A] mt-1">
            Inventory Matrix
          </h2>
          <p className="text-xs text-[#64748B]">
            Monitor size-level allocation (S, M, L, XL, XXL) and execute rapid stock replenishment.
          </p>
        </div>
      </div>

      {/* Search & Stock Summary */}
      <div className="p-4 rounded-3xl neu-flat border border-white/80 shadow-md flex items-center justify-between gap-4">
        <div className="relative w-full max-w-md">
          <Search className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search garments by name or SKU..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full neu-inset rounded-2xl pl-10 pr-4 py-2.5 text-xs text-[#0A0A0A] placeholder-[#94A3B8] border border-white/40 focus:outline-none focus:ring-2 focus:ring-black/10 font-montserrat"
          />
        </div>

        <span className="text-xs font-mono text-[#0A0A0A] neu-flat-sm px-3.5 py-1.5 rounded-2xl border border-white/80 hidden sm:inline shrink-0 font-bold">
          {filteredProducts.length} Atelier Garments Monitored
        </span>
      </div>

      {/* Matrix Table */}
      <div className="rounded-3xl neu-flat border border-white/80 overflow-hidden">
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#E2E8F0] text-[10px] font-mono font-bold uppercase tracking-wider text-[#64748B] bg-[#F0F3F8]">
                <th className="py-4 px-6">Garment Archive</th>
                <th className="py-4 px-3 text-center">Size S</th>
                <th className="py-4 px-3 text-center">Size M</th>
                <th className="py-4 px-3 text-center">Size L</th>
                <th className="py-4 px-3 text-center">Size XL</th>
                <th className="py-4 px-4 text-center">Total Vault Units</th>
                <th className="py-4 px-6 text-right">Rapid Allocation (+10)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]/60 font-medium">
              {filteredProducts.map((p) => {
                const variants = p.variants || [
                  { size: 'S', stock: 12 },
                  { size: 'M', stock: 24 },
                  { size: 'L', stock: 28 },
                  { size: 'XL', stock: 14 },
                ];

                const totalStock = variants.reduce((acc, v) => acc + (v.stock || 0), 0);
                const sStock = variants.find((v) => v.size === 'S')?.stock ?? 12;
                const mStock = variants.find((v) => v.size === 'M')?.stock ?? 24;
                const lStock = variants.find((v) => v.size === 'L')?.stock ?? 28;
                const xlStock = variants.find((v) => v.size === 'XL')?.stock ?? 14;

                return (
                  <tr key={p.id} className="hover:bg-white/60 transition-colors group">
                    {/* Garment Details */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3.5">
                        <div className="w-11 h-14 rounded-2xl overflow-hidden neu-flat border border-white/80 shrink-0 p-0.5 shadow-sm group-hover:scale-105 transition-transform">
                          <img
                            src={p.thumbnail}
                            alt={p.title}
                            className="w-full h-full object-cover object-center rounded-xl"
                          />
                        </div>
                        <div>
                          <p className="font-poppins font-bold text-xs uppercase text-[#0A0A0A] transition-colors">
                            {p.title}
                          </p>
                          <p className="text-[10px] font-mono text-[#64748B] mt-0.5">
                            SKU: VJ-DROP001-{p.id}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* S */}
                    <td className="py-4 px-3 text-center">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-xl font-mono font-bold text-xs border ${
                          sStock < 5
                            ? 'bg-rose-100 text-rose-800 border-rose-300'
                            : 'neu-flat-sm text-[#0A0A0A] border-white/80'
                        }`}
                      >
                        {sStock}
                      </span>
                    </td>

                    {/* M */}
                    <td className="py-4 px-3 text-center">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-xl font-mono font-bold text-xs border ${
                          mStock < 5
                            ? 'bg-rose-100 text-rose-800 border-rose-300'
                            : 'neu-flat-sm text-[#0A0A0A] border-white/80'
                        }`}
                      >
                        {mStock}
                      </span>
                    </td>

                    {/* L */}
                    <td className="py-4 px-3 text-center">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-xl font-mono font-bold text-xs border ${
                          lStock < 5
                            ? 'bg-rose-100 text-rose-800 border-rose-300'
                            : 'neu-flat-sm text-[#0A0A0A] border-white/80'
                        }`}
                      >
                        {lStock}
                      </span>
                    </td>

                    {/* XL */}
                    <td className="py-4 px-3 text-center">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-xl font-mono font-bold text-xs border ${
                          xlStock < 5
                            ? 'bg-rose-100 text-rose-800 border-rose-300'
                            : 'neu-flat-sm text-[#0A0A0A] border-white/80'
                        }`}
                      >
                        {xlStock}
                      </span>
                    </td>

                    {/* Total */}
                    <td className="py-4 px-4 text-center font-mono font-bold text-sm text-[#0A0A0A]">
                      {totalStock} pcs
                    </td>

                    {/* Quick Restock Buttons */}
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleAdjustStock(p.id, 'M', 10)}
                          className="px-2.5 py-1.5 rounded-xl neu-btn hover:neu-btn-dark hover:text-white text-[#0A0A0A] text-[10px] font-mono font-bold uppercase transition-all cursor-pointer border border-white/80"
                        >
                          +10 M
                        </button>
                        <button
                          onClick={() => handleAdjustStock(p.id, 'L', 10)}
                          className="px-2.5 py-1.5 rounded-xl neu-btn hover:neu-btn-dark hover:text-white text-[#0A0A0A] text-[10px] font-mono font-bold uppercase transition-all cursor-pointer border border-white/80"
                        >
                          +10 L
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
