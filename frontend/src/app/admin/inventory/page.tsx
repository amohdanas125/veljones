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
    showToast(`✓ Updated ${product.title} (Size ${size})`);
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
            <Layers className="w-3.5 h-3.5" />
            <span>STOCK & ALLOCATION MATRIX</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black font-poppins uppercase tracking-tight text-white">
            Inventory Matrix
          </h2>
          <p className="text-xs text-neutral-400">
            Monitor size-level allocation (S, M, L, XL, XXL) and execute rapid stock replenishment.
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="p-4 rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-lg flex items-center justify-between">
        <div className="relative w-full max-w-md">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search garments by name or SKU..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-800/80 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-400"
          />
        </div>
      </div>

      {/* Matrix Table */}
      <div className="rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl overflow-hidden">
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-800/60 border-b border-white/10 text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-400">
                <th className="py-4 px-6">Garment</th>
                <th className="py-4 px-3 text-center">Size S</th>
                <th className="py-4 px-3 text-center">Size M</th>
                <th className="py-4 px-3 text-center">Size L</th>
                <th className="py-4 px-3 text-center">Size XL</th>
                <th className="py-4 px-4 text-center">Total Units</th>
                <th className="py-4 px-6 text-right">Quick Restock</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-medium">
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
                  <tr key={p.id} className="hover:bg-white/5 transition-colors">
                    {/* Garment Details */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-12 rounded-lg overflow-hidden bg-black/40 border border-white/10 shrink-0">
                          <img
                            src={p.thumbnail}
                            alt={p.title}
                            className="w-full h-full object-cover object-center"
                          />
                        </div>
                        <div>
                          <p className="font-poppins font-bold text-xs uppercase text-white">{p.title}</p>
                          <p className="text-[10px] font-mono text-cyan-400">SKU: VJ-DROP001-{p.id}</p>
                        </div>
                      </div>
                    </td>

                    {/* S */}
                    <td className="py-4 px-3 text-center">
                      <span
                        className={`inline-block px-2 py-1 rounded font-mono font-bold text-xs ${
                          sStock < 5 ? 'bg-rose-500/20 text-rose-300' : 'bg-slate-800 text-neutral-300'
                        }`}
                      >
                        {sStock}
                      </span>
                    </td>

                    {/* M */}
                    <td className="py-4 px-3 text-center">
                      <span
                        className={`inline-block px-2 py-1 rounded font-mono font-bold text-xs ${
                          mStock < 5 ? 'bg-rose-500/20 text-rose-300' : 'bg-slate-800 text-neutral-300'
                        }`}
                      >
                        {mStock}
                      </span>
                    </td>

                    {/* L */}
                    <td className="py-4 px-3 text-center">
                      <span
                        className={`inline-block px-2 py-1 rounded font-mono font-bold text-xs ${
                          lStock < 5 ? 'bg-rose-500/20 text-rose-300' : 'bg-slate-800 text-neutral-300'
                        }`}
                      >
                        {lStock}
                      </span>
                    </td>

                    {/* XL */}
                    <td className="py-4 px-3 text-center">
                      <span
                        className={`inline-block px-2 py-1 rounded font-mono font-bold text-xs ${
                          xlStock < 5 ? 'bg-rose-500/20 text-rose-300' : 'bg-slate-800 text-neutral-300'
                        }`}
                      >
                        {xlStock}
                      </span>
                    </td>

                    {/* Total */}
                    <td className="py-4 px-4 text-center font-mono font-bold text-sm text-white">
                      {totalStock} pcs
                    </td>

                    {/* Quick Restock Buttons */}
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleAdjustStock(p.id, 'M', 10)}
                          className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-cyan-500 hover:text-black text-neutral-300 text-[10px] font-mono font-bold uppercase transition-colors"
                        >
                          +10 M
                        </button>
                        <button
                          onClick={() => handleAdjustStock(p.id, 'L', 10)}
                          className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-cyan-500 hover:text-black text-neutral-300 text-[10px] font-mono font-bold uppercase transition-colors"
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
