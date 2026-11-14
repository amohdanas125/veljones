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
    showToast(`✓ Added product "${formData.title}" successfully!`);
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
      showToast('✓ Product deleted from catalog.');
    }
  };

  return (
    <div className="space-y-8 font-montserrat">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-emerald-500 text-black font-bold text-xs uppercase tracking-wider py-3 px-5 rounded-xl shadow-2xl animate-in slide-in-from-top duration-300 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/10 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-cyan-400">
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>CATALOG & PRODUCT CRUD</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black font-poppins uppercase tracking-tight text-white">
            Atelier Products Management
          </h2>
          <p className="text-xs text-neutral-400">
            Create, edit, adjust inventory, and manage Drop 001 silhouettes & archives ({products.length} products).
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-black text-xs font-black uppercase tracking-wider transition-all shadow-lg flex items-center gap-2 cursor-pointer active:scale-95"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Add New Garment</span>
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="p-4 rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by title, SKU, or tag..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-800/80 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-400"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto no-scrollbar py-1">
          {['all', 'sweatpants', 't-shirts', 'sweatshirts', 'ribbed-vests', 'crop-tops'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-cyan-500 text-black shadow-sm'
                  : 'bg-white/5 text-neutral-400 hover:text-white border border-white/5'
              }`}
            >
              {cat.replace('-', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Products Data Table */}
      <div className="rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl overflow-hidden">
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-800/60 border-b border-white/10 text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-400">
                <th className="py-4 px-6">Product</th>
                <th className="py-4 px-4">Category</th>
                <th className="py-4 px-4">Price (INR)</th>
                <th className="py-4 px-4">Stock</th>
                <th className="py-4 px-4">Badge</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-medium">
              {filteredProducts.map((p) => {
                const totalStock = p.variants?.reduce((sum, v) => sum + (v.stock || 10), 0) || 35;
                const isOutOfStock = totalStock <= 0;
                const isLowStock = totalStock > 0 && totalStock < 15;

                return (
                  <tr key={p.id} className="hover:bg-white/5 transition-colors group">
                    {/* Thumbnail & Title */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-14 rounded-lg overflow-hidden bg-black/40 border border-white/10 shrink-0">
                          <img
                            src={p.thumbnail}
                            alt={p.title}
                            className="w-full h-full object-cover object-center"
                          />
                        </div>
                        <div>
                          <p className="font-poppins font-bold text-xs uppercase text-white group-hover:text-cyan-400 transition-colors">
                            {p.title}
                          </p>
                          <p className="text-[10px] font-mono text-neutral-400">SKU: VJ-DROP001-{p.id}</p>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-4 px-4">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase bg-slate-800 text-neutral-300 border border-white/10">
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
                    <td className="py-4 px-4 font-mono text-[10px] text-cyan-400">
                      {p.badge || '—'}
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/product/${p.slug}`}
                          target="_blank"
                          title="View on public storefront"
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-neutral-300 hover:text-white border border-white/10 transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>

                        <button
                          onClick={() => handleOpenEdit(p)}
                          title="Edit product"
                          className="p-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 transition-colors cursor-pointer"
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
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-slate-900 border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
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
                  <label className="text-[11px] font-mono uppercase text-neutral-300">Garment Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. VALJONS STRAIGHT FIT PC FLEECE (DESERT SAND)"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full bg-slate-800 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono uppercase text-neutral-300">Category</label>
                  <select
                    value={formData.categorySlug}
                    onChange={(e) => setFormData({ ...formData, categorySlug: e.target.value })}
                    className="w-full bg-slate-800 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                  >
                    <option value="sweatpants">Sweatpants / Fleece</option>
                    <option value="t-shirts">T-Shirts</option>
                    <option value="sweatshirts">Sweatshirts</option>
                    <option value="ribbed-vests">Ribbed Vests</option>
                    <option value="crop-tops">Crop Tops</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono uppercase text-neutral-300">Selling Price (₹ INR)</label>
                  <input
                    type="number"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full bg-slate-800 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono uppercase text-neutral-300">Original / Strike Price (₹)</label>
                  <input
                    type="number"
                    value={formData.originalPrice}
                    onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                    className="w-full bg-slate-800 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono uppercase text-neutral-300">Initial Stock Units</label>
                  <input
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) || 0 })}
                    className="w-full bg-slate-800 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono uppercase text-neutral-300">Tag / Badge</label>
                  <input
                    type="text"
                    value={formData.badge}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                    className="w-full bg-slate-800 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono uppercase text-neutral-300">Image Asset URL</label>
                <input
                  type="text"
                  value={formData.thumbnail}
                  onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                  className="w-full bg-slate-800 border border-white/10 rounded-xl px-3 py-2 text-xs text-white font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono uppercase text-neutral-300">Fabric Description</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-slate-800 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                />
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
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 text-black text-xs font-black uppercase tracking-wider shadow-lg cursor-pointer"
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
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-xl bg-slate-900 border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
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
                <label className="text-[11px] font-mono uppercase text-neutral-300">Garment Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-slate-800 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-mono uppercase text-neutral-300">Price (INR)</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full bg-slate-800 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono uppercase text-neutral-300">Badge</label>
                  <input
                    type="text"
                    value={formData.badge}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                    className="w-full bg-slate-800 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono uppercase text-neutral-300">Description</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-slate-800 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="px-4 py-2 text-xs font-bold uppercase text-neutral-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-black uppercase tracking-wider"
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
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-slate-900 border border-rose-500/30 rounded-2xl p-6 space-y-4 animate-in zoom-in-95 duration-200">
            <div className="flex items-center gap-3 text-rose-400">
              <AlertCircle className="w-6 h-6" />
              <h4 className="font-poppins font-bold text-base uppercase text-white">
                Delete Product?
              </h4>
            </div>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Are you sure you want to permanently remove this piece from the atelier catalog? This action will update all active drop listings.
            </p>
            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                onClick={() => setDeletingProductId(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-xs font-bold uppercase text-neutral-300 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-black uppercase tracking-wider"
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
