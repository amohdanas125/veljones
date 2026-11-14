'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  ShoppingBag,
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  ExternalLink,
  Eye,
  Check,
  X,
  AlertCircle,
  Tag,
  Layers,
  Sparkles,
  CheckCircle2,
  Flame,
} from 'lucide-react';
import { useAdmin } from '@/context/AdminContext';
import { Product } from '@/types';

export default function AdminProductsPage() {
  const { products, addProduct, updateProduct, deleteProduct } = useAdmin();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Modal States
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deletingProductId, setDeletingProductId] = useState<number | null>(null);
  const [toastMessage, setToastMessage] = useState('');

  // Form State for Add / Edit
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    price: '2499',
    originalPrice: '3499',
    categorySlug: 'sweatpants',
    collectionSlug: 'drop-001',
    description: 'Engineered 280 GSM heavyweight poly-cotton fleece with architectural straight fit.',
    thumbnail: '/images/products/valjons-heavyweight-fleece.jpg',
    badge: 'DROP 001',
    stock: 50,
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch =
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.categorySlug && p.categorySlug.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCat = selectedCategory === 'all' || p.categorySlug === selectedCategory;
      return matchesSearch && matchesCat;
    });
  }, [products, searchQuery, selectedCategory]);

  const handleOpenAdd = () => {
    setFormData({
      title: '',
      slug: '',
      price: '2499',
      originalPrice: '3499',
      categorySlug: 'sweatpants',
      collectionSlug: 'drop-001',
      description: 'Engineered 280 GSM heavyweight poly-cotton fleece with architectural straight fit.',
      thumbnail: '/images/products/valjons-heavyweight-fleece.jpg',
      badge: 'DROP 001',
      stock: 50,
    });
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (p: Product) => {
    setEditingProduct(p);
    const totalStock = p.variants?.reduce((sum, v) => sum + (v.stock || 10), 0) || 45;
    setFormData({
      title: p.title,
      slug: p.slug,
      price: p.price,
      originalPrice: p.originalPrice || '3499',
      categorySlug: p.categorySlug || 'sweatpants',
      collectionSlug: p.collectionSlug || 'drop-001',
      description: p.description || '',
      thumbnail: p.thumbnail || '/images/products/valjons-heavyweight-fleece.jpg',
      badge: p.badge || 'DROP 001',
      stock: totalStock,
    });
  };

  const handleSaveAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title) return;

    const slug = formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const discount = Math.round(
      ((parseFloat(formData.originalPrice) - parseFloat(formData.price)) /
        parseFloat(formData.originalPrice)) *
        100
    );

    addProduct({
      title: formData.title,
      slug,
      price: formData.price,
      originalPrice: formData.originalPrice,
      discountPercent: discount > 0 ? discount : undefined,
      categorySlug: formData.categorySlug,
      collectionSlug: formData.collectionSlug,
      description: formData.description,
      thumbnail: formData.thumbnail,
      images: [formData.thumbnail],
      badge: formData.badge,
      variants: [
        { size: 'S', stock: Math.floor(formData.stock * 0.15) },
        { size: 'M', stock: Math.floor(formData.stock * 0.35) },
        { size: 'L', stock: Math.floor(formData.stock * 0.35) },
        { size: 'XL', stock: Math.floor(formData.stock * 0.15) },
      ],
    });

    setIsAddModalOpen(false);
    showToast(`✓ Added garment "${formData.title}" to catalog!`);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    updateProduct(editingProduct.id, {
      title: formData.title,
      price: formData.price,
      originalPrice: formData.originalPrice,
      categorySlug: formData.categorySlug,
      collectionSlug: formData.collectionSlug,
      description: formData.description,
      thumbnail: formData.thumbnail,
      badge: formData.badge,
    });

    setEditingProduct(null);
    showToast(`✓ Updated product "${formData.title}"!`);
  };

  const handleConfirmDelete = () => {
    if (deletingProductId !== null) {
      deleteProduct(deletingProductId);
      setDeletingProductId(null);
      showToast('✓ Product removed from active catalog.');
    }
  };

  return (
    <div className="space-y-8 font-montserrat">
      {/* Toast Notification */}
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
            <ShoppingBag className="w-3.5 h-3.5 text-[#E83D4D]" />
            <span>ATELIER CATALOG & CRUD</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black font-poppins uppercase tracking-tight text-white">
            Garments Management
          </h2>
          <p className="text-xs text-neutral-400">
            Create, edit, adjust inventory, and manage Drop 001 silhouettes & archives ({products.length} pieces).
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#801414] via-[#991B1B] to-[#C1272D] hover:from-[#991B1B] hover:to-[#E83D4D] text-white text-xs font-black uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(128,20,20,0.5)] flex items-center gap-2 cursor-pointer active:scale-95"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Add New Garment</span>
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="p-4 rounded-2xl bg-[#140D0F]/90 backdrop-blur-xl border border-[#801414]/30 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-[#A87178] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by title, SKU, or tag..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#1A1013] border border-[#801414]/30 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#E83D4D]"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto no-scrollbar py-1">
          {['all', 'sweatpants', 't-shirts', 'sweatshirts', 'ribbed-vests', 'crop-tops'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-[#801414] to-[#C1272D] text-white shadow-[0_0_12px_rgba(128,20,20,0.6)]'
                  : 'bg-black/40 text-neutral-400 hover:text-white border border-[#801414]/20'
              }`}
            >
              {cat.replace('-', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Products Data Table */}
      <div className="rounded-3xl bg-[#140D0F]/90 backdrop-blur-xl border border-[#801414]/30 shadow-2xl overflow-hidden">
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-black/50 border-b border-[#801414]/20 text-[10px] font-mono font-bold uppercase tracking-wider text-[#A87178]">
                <th className="py-4 px-6">Product</th>
                <th className="py-4 px-4">Category</th>
                <th className="py-4 px-4">Price (INR)</th>
                <th className="py-4 px-4">Stock</th>
                <th className="py-4 px-4">Badge</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#801414]/10 font-medium">
              {filteredProducts.map((p) => {
                const totalStock = p.variants?.reduce((sum, v) => sum + (v.stock || 10), 0) || 35;
                const isOutOfStock = totalStock <= 0;
                const isLowStock = totalStock > 0 && totalStock < 15;

                return (
                  <tr key={p.id} className="hover:bg-[#801414]/10 transition-colors group">
                    {/* Thumbnail & Title */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-14 rounded-xl overflow-hidden bg-black/60 border border-[#801414]/40 shrink-0 shadow-sm group-hover:border-[#E83D4D] transition-colors">
                          <img
                            src={p.thumbnail}
                            alt={p.title}
                            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform"
                          />
                        </div>
                        <div>
                          <p className="font-poppins font-bold text-xs uppercase text-white group-hover:text-[#FFA4A4] transition-colors">
                            {p.title}
                          </p>
                          <p className="text-[10px] font-mono text-[#A87178]">SKU: VJ-DROP001-{p.id}</p>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-4 px-4">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase bg-black/60 text-[#FFA4A4] border border-[#801414]/40">
                        {p.categorySlug || 'Unisex'}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="py-4 px-4">
                      <span className="font-mono font-bold text-sm text-white">
                        ₹{parseFloat(p.price).toLocaleString('en-IN')}
                      </span>
                      {p.originalPrice && (
                        <span className="text-[10px] font-mono text-neutral-500 line-through block">
                          ₹{parseFloat(p.originalPrice).toLocaleString('en-IN')}
                        </span>
                      )}
                    </td>

                    {/* Stock Status */}
                    <td className="py-4 px-4">
                      <div className="space-y-1">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase border ${
                            isOutOfStock
                              ? 'bg-rose-500/15 text-rose-300 border-rose-500/30'
                              : isLowStock
                              ? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                              : 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              isOutOfStock ? 'bg-rose-400' : isLowStock ? 'bg-amber-400' : 'bg-emerald-400'
                            }`}
                          />
                          <span>{totalStock} in stock</span>
                        </span>
                      </div>
                    </td>

                    {/* Badge */}
                    <td className="py-4 px-4 font-mono text-[10px] text-[#FFA4A4]">
                      {p.badge || '—'}
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/product/${p.slug}`}
                          target="_blank"
                          title="View on public storefront"
                          className="p-1.5 rounded-lg bg-black/60 hover:bg-[#801414]/30 text-neutral-300 hover:text-white border border-[#801414]/30 transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>

                        <button
                          onClick={() => handleOpenEdit(p)}
                          title="Edit product"
                          className="p-1.5 rounded-lg bg-[#801414]/20 hover:bg-[#801414]/40 text-[#FFA4A4] border border-[#801414]/40 transition-colors cursor-pointer"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => setDeletingProductId(p.id)}
                          title="Delete product"
                          className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
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

      {/* CREATE / ADD PRODUCT MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-[#160E10] border border-[#801414]/40 rounded-3xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-[#801414]/20">
              <div>
                <h3 className="font-poppins font-black text-lg text-white uppercase">Add New Atelier Piece</h3>
                <p className="text-xs text-neutral-400">Deploy a new garment directly into VALJONS Drop 001.</p>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveAdd} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-mono uppercase text-[#FFA4A4]">Garment Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. VALJONS STRAIGHT FIT PC FLEECE (DESERT SAND)"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full bg-[#1F1417] border border-[#801414]/30 rounded-xl px-3 py-2 text-xs text-white focus:border-[#E83D4D]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono uppercase text-[#FFA4A4]">Category</label>
                  <select
                    value={formData.categorySlug}
                    onChange={(e) => setFormData({ ...formData, categorySlug: e.target.value })}
                    className="w-full bg-[#1F1417] border border-[#801414]/30 rounded-xl px-3 py-2 text-xs text-white focus:border-[#E83D4D]"
                  >
                    <option value="sweatpants">Sweatpants / Fleece</option>
                    <option value="t-shirts">T-Shirts</option>
                    <option value="sweatshirts">Sweatshirts</option>
                    <option value="ribbed-vests">Ribbed Vests</option>
                    <option value="crop-tops">Crop Tops</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono uppercase text-[#FFA4A4]">Selling Price (₹ INR)</label>
                  <input
                    type="number"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full bg-[#1F1417] border border-[#801414]/30 rounded-xl px-3 py-2 text-xs text-white focus:border-[#E83D4D]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono uppercase text-[#FFA4A4]">Original / Strike Price (₹)</label>
                  <input
                    type="number"
                    value={formData.originalPrice}
                    onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                    className="w-full bg-[#1F1417] border border-[#801414]/30 rounded-xl px-3 py-2 text-xs text-white focus:border-[#E83D4D]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono uppercase text-[#FFA4A4]">Initial Stock Units</label>
                  <input
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) || 0 })}
                    className="w-full bg-[#1F1417] border border-[#801414]/30 rounded-xl px-3 py-2 text-xs text-white focus:border-[#E83D4D]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono uppercase text-[#FFA4A4]">Tag / Badge</label>
                  <input
                    type="text"
                    value={formData.badge}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                    className="w-full bg-[#1F1417] border border-[#801414]/30 rounded-xl px-3 py-2 text-xs text-white focus:border-[#E83D4D]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono uppercase text-[#FFA4A4]">Image Asset URL</label>
                <input
                  type="text"
                  value={formData.thumbnail}
                  onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                  className="w-full bg-[#1F1417] border border-[#801414]/30 rounded-xl px-3 py-2 text-xs text-white font-mono focus:border-[#E83D4D]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono uppercase text-[#FFA4A4]">Fabric Description</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-[#1F1417] border border-[#801414]/30 rounded-xl px-3 py-2 text-xs text-white focus:border-[#E83D4D]"
                />
              </div>

              <div className="pt-4 border-t border-[#801414]/20 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold uppercase text-neutral-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#801414] via-[#991B1B] to-[#C1272D] text-white text-xs font-black uppercase tracking-wider shadow-[0_0_20px_rgba(128,20,20,0.6)] cursor-pointer"
                >
                  Save & Publish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT PRODUCT MODAL */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-xl bg-[#160E10] border border-[#801414]/40 rounded-3xl p-6 sm:p-8 space-y-6 animate-in zoom-in-95 duration-200 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-[#801414]/20">
              <div>
                <h3 className="font-poppins font-black text-lg text-white uppercase">Edit Product</h3>
                <p className="text-xs text-neutral-400">Updating SKU: VJ-DROP001-{editingProduct.id}</p>
              </div>
              <button
                onClick={() => setEditingProduct(null)}
                className="p-1.5 text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[11px] font-mono uppercase text-[#FFA4A4]">Garment Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-[#1F1417] border border-[#801414]/30 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-mono uppercase text-[#FFA4A4]">Price (INR)</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full bg-[#1F1417] border border-[#801414]/30 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono uppercase text-[#FFA4A4]">Badge</label>
                  <input
                    type="text"
                    value={formData.badge}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                    className="w-full bg-[#1F1417] border border-[#801414]/30 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono uppercase text-[#FFA4A4]">Description</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-[#1F1417] border border-[#801414]/30 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div className="pt-4 border-t border-[#801414]/20 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="px-4 py-2 text-xs font-bold uppercase text-neutral-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#801414] to-[#C1272D] text-white text-xs font-black uppercase tracking-wider"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deletingProductId !== null && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#160E10] border border-[#801414]/50 rounded-3xl p-6 space-y-4 animate-in zoom-in-95 duration-200 shadow-2xl">
            <div className="flex items-center gap-3 text-[#E83D4D]">
              <AlertCircle className="w-6 h-6" />
              <h4 className="font-poppins font-bold text-base uppercase text-white">
                Delete Garment?
              </h4>
            </div>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Are you sure you want to permanently remove this piece from the atelier catalog? This action will update all active drop listings.
            </p>
            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                onClick={() => setDeletingProductId(null)}
                className="px-4 py-2 rounded-xl bg-black/60 text-xs font-bold uppercase text-neutral-300 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-5 py-2 rounded-xl bg-[#801414] hover:bg-[#991B1B] text-white text-xs font-black uppercase tracking-wider shadow-lg"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
