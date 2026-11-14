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
        <div className="fixed top-6 right-6 z-50 neu-flat text-[#0A0A0A] font-bold text-xs uppercase tracking-wider py-3.5 px-5 rounded-2xl shadow-2xl border border-white/90 animate-in slide-in-from-top duration-300 flex items-center gap-2.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#E2E8F0] gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#64748B]">
            <ShoppingBag className="w-3.5 h-3.5 text-black" />
            <span>ATELIER CATALOG & CRUD</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black font-poppins uppercase tracking-tight text-[#0A0A0A] mt-1">
            Garments Management
          </h2>
          <p className="text-xs text-[#64748B]">
            Create, edit, adjust inventory, and manage Drop 001 silhouettes & archives ({products.length} pieces).
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-5 py-2.5 rounded-2xl neu-btn-dark bg-[#0A0A0A] hover:bg-black text-white text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer active:scale-95 shadow-[4px_4px_12px_rgba(10,10,10,0.2)]"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Add New Garment</span>
        </button>
      </div>

      {/* Search & Filter Bar (Neumorphic) */}
      <div className="p-4 rounded-3xl neu-flat border border-white/80 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by title, SKU, or tag..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full neu-inset rounded-2xl pl-10 pr-4 py-2.5 text-xs text-[#0A0A0A] placeholder-[#94A3B8] border border-white/40 focus:outline-none focus:ring-2 focus:ring-black/10 transition-all font-montserrat"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto no-scrollbar py-1">
          {['all', 'sweatpants', 't-shirts', 'sweatshirts', 'ribbed-vests', 'crop-tops'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-2xl text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                selectedCategory === cat
                  ? 'neu-btn-dark bg-[#0A0A0A] text-white'
                  : 'neu-flat-sm text-[#475569] hover:text-[#0A0A0A] border border-white/80'
              }`}
            >
              {cat.replace('-', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Products Data Table (Neumorphic Flat Container) */}
      <div className="rounded-3xl neu-flat border border-white/80 overflow-hidden">
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#E2E8F0] text-[10px] font-mono font-bold uppercase tracking-wider text-[#64748B]">
                <th className="py-4 px-6">Product</th>
                <th className="py-4 px-4">Category</th>
                <th className="py-4 px-4">Price (INR)</th>
                <th className="py-4 px-4">Stock</th>
                <th className="py-4 px-4">Badge</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]/60 font-medium">
              {filteredProducts.map((p) => {
                const totalStock = p.variants?.reduce((sum, v) => sum + (v.stock || 10), 0) || 35;
                const isOutOfStock = totalStock <= 0;
                const isLowStock = totalStock > 0 && totalStock < 15;

                return (
                  <tr key={p.id} className="hover:bg-white/60 transition-colors group">
                    {/* Thumbnail & Title */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3.5">
                        <div className="w-12 h-14 rounded-2xl overflow-hidden neu-flat border border-white/80 shrink-0 p-0.5 shadow-sm group-hover:scale-105 transition-transform">
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
                          <p className="text-[10px] font-mono text-[#64748B] mt-0.5">SKU: VJ-DROP001-{p.id}</p>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-4 px-4">
                      <span className="px-2.5 py-1 rounded-xl text-[10px] font-mono font-bold uppercase neu-flat-sm text-[#0A0A0A] border border-white/80">
                        {p.categorySlug || 'Unisex'}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="py-4 px-4">
                      <span className="font-mono font-bold text-sm text-[#0A0A0A]">
                        ₹{parseFloat(p.price).toLocaleString('en-IN')}
                      </span>
                      {p.originalPrice && (
                        <span className="text-[10px] font-mono text-[#94A3B8] line-through block">
                          ₹{parseFloat(p.originalPrice).toLocaleString('en-IN')}
                        </span>
                      )}
                    </td>

                    {/* Stock Status */}
                    <td className="py-4 px-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase border ${
                          isOutOfStock
                            ? 'bg-rose-100 text-rose-800 border-rose-300'
                            : isLowStock
                            ? 'bg-amber-100 text-amber-800 border-amber-300'
                            : 'bg-emerald-100 text-emerald-800 border-emerald-300'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            isOutOfStock ? 'bg-rose-500' : isLowStock ? 'bg-amber-500' : 'bg-emerald-500'
                          }`}
                        />
                        <span>{totalStock} in stock</span>
                      </span>
                    </td>

                    {/* Badge */}
                    <td className="py-4 px-4 font-mono text-[10px] font-bold text-[#0A0A0A]">
                      {p.badge ? (
                        <span className="neu-inset px-2 py-0.5 rounded-lg border border-white/60">
                          {p.badge}
                        </span>
                      ) : (
                        '—'
                      )}
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/product/${p.slug}`}
                          target="_blank"
                          title="View on public storefront"
                          className="p-2 rounded-xl neu-btn text-[#475569] hover:text-black border border-white/80 transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>

                        <button
                          onClick={() => handleOpenEdit(p)}
                          title="Edit product"
                          className="p-2 rounded-xl neu-btn text-[#0A0A0A] hover:neu-btn-dark hover:text-white border border-white/80 transition-all cursor-pointer"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => setDeletingProductId(p.id)}
                          title="Delete product"
                          className="p-2 rounded-xl neu-btn text-rose-600 hover:bg-rose-600 hover:text-white border border-white/80 transition-colors cursor-pointer"
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
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-[#F0F3F8] border border-white/90 rounded-3xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200 shadow-2xl neu-flat">
            <div className="flex items-center justify-between pb-4 border-b border-[#E2E8F0]">
              <div>
                <h3 className="font-poppins font-black text-lg text-[#0A0A0A] uppercase">Add New Atelier Piece</h3>
                <p className="text-xs text-[#64748B]">Deploy a new garment directly into VALJONS Drop 001.</p>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-2 rounded-xl neu-btn text-[#64748B] hover:text-black cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveAdd} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-mono uppercase text-[#0A0A0A] font-bold">Garment Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. VALJONS STRAIGHT FIT PC FLEECE (DESERT SAND)"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full neu-inset rounded-2xl px-3.5 py-2.5 text-xs text-[#0A0A0A] border border-white/50 focus:outline-none focus:ring-2 focus:ring-black/10"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono uppercase text-[#0A0A0A] font-bold">Category</label>
                  <select
                    value={formData.categorySlug}
                    onChange={(e) => setFormData({ ...formData, categorySlug: e.target.value })}
                    className="w-full neu-inset rounded-2xl px-3.5 py-2.5 text-xs text-[#0A0A0A] border border-white/50 focus:outline-none focus:ring-2 focus:ring-black/10"
                  >
                    <option value="sweatpants">Sweatpants / Fleece</option>
                    <option value="t-shirts">T-Shirts</option>
                    <option value="sweatshirts">Sweatshirts</option>
                    <option value="ribbed-vests">Ribbed Vests</option>
                    <option value="crop-tops">Crop Tops</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono uppercase text-[#0A0A0A] font-bold">Selling Price (₹ INR)</label>
                  <input
                    type="number"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full neu-inset rounded-2xl px-3.5 py-2.5 text-xs text-[#0A0A0A] border border-white/50 focus:outline-none focus:ring-2 focus:ring-black/10"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono uppercase text-[#0A0A0A] font-bold">Original / Strike Price (₹)</label>
                  <input
                    type="number"
                    value={formData.originalPrice}
                    onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                    className="w-full neu-inset rounded-2xl px-3.5 py-2.5 text-xs text-[#0A0A0A] border border-white/50 focus:outline-none focus:ring-2 focus:ring-black/10"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono uppercase text-[#0A0A0A] font-bold">Initial Stock Units</label>
                  <input
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) || 0 })}
                    className="w-full neu-inset rounded-2xl px-3.5 py-2.5 text-xs text-[#0A0A0A] border border-white/50 focus:outline-none focus:ring-2 focus:ring-black/10"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono uppercase text-[#0A0A0A] font-bold">Tag / Badge</label>
                  <input
                    type="text"
                    value={formData.badge}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                    className="w-full neu-inset rounded-2xl px-3.5 py-2.5 text-xs text-[#0A0A0A] border border-white/50 focus:outline-none focus:ring-2 focus:ring-black/10"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono uppercase text-[#0A0A0A] font-bold">Image Asset URL</label>
                <input
                  type="text"
                  value={formData.thumbnail}
                  onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                  className="w-full neu-inset rounded-2xl px-3.5 py-2.5 text-xs text-[#0A0A0A] font-mono border border-white/50 focus:outline-none focus:ring-2 focus:ring-black/10"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono uppercase text-[#0A0A0A] font-bold">Fabric Description</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full neu-inset rounded-2xl px-3.5 py-2.5 text-xs text-[#0A0A0A] border border-white/50 focus:outline-none focus:ring-2 focus:ring-black/10"
                />
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
                  className="px-6 py-2.5 rounded-2xl neu-btn-dark bg-[#0A0A0A] text-white text-xs font-black uppercase tracking-wider cursor-pointer shadow-[4px_4px_12px_rgba(10,10,10,0.25)]"
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
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-xl bg-[#F0F3F8] border border-white/90 rounded-3xl p-6 sm:p-8 space-y-6 animate-in zoom-in-95 duration-200 shadow-2xl neu-flat">
            <div className="flex items-center justify-between pb-4 border-b border-[#E2E8F0]">
              <div>
                <h3 className="font-poppins font-black text-lg text-[#0A0A0A] uppercase">Edit Product</h3>
                <p className="text-xs text-[#64748B]">Updating SKU: VJ-DROP001-{editingProduct.id}</p>
              </div>
              <button
                onClick={() => setEditingProduct(null)}
                className="p-2 rounded-xl neu-btn text-[#64748B] hover:text-black cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[11px] font-mono uppercase text-[#0A0A0A] font-bold">Garment Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full neu-inset rounded-2xl px-3.5 py-2.5 text-xs text-[#0A0A0A] border border-white/50 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-mono uppercase text-[#0A0A0A] font-bold">Price (INR)</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full neu-inset rounded-2xl px-3.5 py-2.5 text-xs text-[#0A0A0A] border border-white/50 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono uppercase text-[#0A0A0A] font-bold">Badge</label>
                  <input
                    type="text"
                    value={formData.badge}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                    className="w-full neu-inset rounded-2xl px-3.5 py-2.5 text-xs text-[#0A0A0A] border border-white/50 focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono uppercase text-[#0A0A0A] font-bold">Description</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full neu-inset rounded-2xl px-3.5 py-2.5 text-xs text-[#0A0A0A] border border-white/50 focus:outline-none"
                />
              </div>

              <div className="pt-4 border-t border-[#E2E8F0] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="px-4 py-2 text-xs font-bold uppercase text-[#64748B] hover:text-black cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-2xl neu-btn-dark bg-[#0A0A0A] text-white text-xs font-black uppercase tracking-wider cursor-pointer shadow-[4px_4px_12px_rgba(10,10,10,0.25)]"
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
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#F0F3F8] border border-white/90 rounded-3xl p-6 space-y-4 animate-in zoom-in-95 duration-200 shadow-2xl neu-flat">
            <div className="flex items-center gap-3 text-rose-600">
              <AlertCircle className="w-6 h-6" />
              <h4 className="font-poppins font-bold text-base uppercase text-[#0A0A0A]">
                Delete Garment?
              </h4>
            </div>
            <p className="text-xs text-[#475569] leading-relaxed">
              Are you sure you want to permanently remove this piece from the atelier catalog? This action will update all active drop listings.
            </p>
            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                onClick={() => setDeletingProductId(null)}
                className="px-4 py-2 rounded-2xl neu-btn text-xs font-bold uppercase text-[#64748B] hover:text-black cursor-pointer border border-white/80"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-5 py-2.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-black uppercase tracking-wider shadow-lg cursor-pointer"
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
