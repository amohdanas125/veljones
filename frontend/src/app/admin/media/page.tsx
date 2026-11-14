'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import {
  Video,
  Film,
  Sparkles,
  Plus,
  Trash2,
  Edit3,
  Eye,
  CheckCircle2,
  X,
  RotateCcw,
  Play,
  Pause,
  Layers,
  Crosshair,
  Image as ImageIcon,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Save,
  Tag,
  AlertCircle,
} from 'lucide-react';
import { useMedia } from '@/context/MediaContext';
import { Reel, PerspectiveItem, PerspectiveHotspot } from '@/types';

type MediaTab = 'hero' | 'reels' | 'detailed' | 'lifestyle';

export default function AdminMediaStudioPage() {
  const {
    heroConfig,
    updateHeroConfig,
    reels,
    addReel,
    updateReel,
    deleteReel,
    reorderReels,
    perspectives,
    addPerspective,
    updatePerspective,
    deletePerspective,
    addHotspot,
    updateHotspot,
    deleteHotspot,
    lifestyleConfig,
    updateLifestyleConfig,
    resetMediaToDefaults,
  } = useMedia();

  const [activeTab, setActiveTab] = useState<MediaTab>('hero');
  const [toastMessage, setToastMessage] = useState('');

  // 1. Hero Form State
  const [heroForm, setHeroForm] = useState(heroConfig);
  const [isHeroPlaying, setIsHeroPlaying] = useState(true);
  const heroVideoRef = useRef<HTMLVideoElement>(null);

  // 2. Reel Modals
  const [isAddReelOpen, setIsAddReelOpen] = useState(false);
  const [editingReel, setEditingReel] = useState<Reel | null>(null);
  const [deletingReelId, setDeletingReelId] = useState<number | null>(null);
  const [playingReelId, setPlayingReelId] = useState<number | null>(null);

  const [newReelForm, setNewReelForm] = useState({
    title: '',
    videoUrl: '/videos/reels/reel-new-collection.mp4',
    thumbnailUrl: '/images/reels/thumb-new-collection.jpg',
    authorHandle: '@valjons',
    duration: '0:30',
    caption: 'Drop 001 architectural fit in motion #valjons',
    likesCount: 3200,
  });

  // 3. Detailed Image Studio State
  const [selectedPerspectiveIdx, setSelectedPerspectiveIdx] = useState(0);
  const selectedPerspective = perspectives[selectedPerspectiveIdx] || perspectives[0];
  const [isAddPerspectiveOpen, setIsAddPerspectiveOpen] = useState(false);
  const [editingHotspot, setEditingHotspot] = useState<PerspectiveHotspot | null>(null);
  const [isAddHotspotOpen, setIsAddHotspotOpen] = useState(false);
  const [pinDraftPos, setPinDraftPos] = useState({ x: 50, y: 50 });

  const [newHotspotForm, setNewHotspotForm] = useState({
    title: 'Reinforced Anchor Seam',
    tag: 'CONSTRUCTION',
    spec: 'Twin-needle high-tensile lockstitch for lifetime durability.',
  });

  const [newPerspectiveForm, setNewPerspectiveForm] = useState({
    tag: '05 // DRAPE & TEXTURE',
    title: 'French Terry Interior Structure',
    subtitle: 'Brushed Micro-Loops · Zero Knee Sag',
    description: 'Custom-milled 280 GSM poly-cotton loopback fleece.',
    imageUrl: '/images/products/valjons-heavyweight-fleece.jpg',
  });

  // 4. Lifestyle State
  const [lifestyleForm, setLifestyleForm] = useState(lifestyleConfig);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  // Handlers for Hero
  const handleSaveHero = (e: React.FormEvent) => {
    e.preventDefault();
    updateHeroConfig(heroForm);
    showToast('✓ Hero video & banner successfully updated on live storefront!');
  };

  // Handlers for Reels
  const handleSaveNewReel = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReelForm.title || !newReelForm.videoUrl) return;

    addReel(newReelForm);
    setIsAddReelOpen(false);
    showToast(`✓ Added reel "${newReelForm.title}" to carousel!`);
    setNewReelForm({
      title: '',
      videoUrl: '/videos/reels/reel-new-collection.mp4',
      thumbnailUrl: '/images/reels/thumb-new-collection.jpg',
      authorHandle: '@valjons',
      duration: '0:30',
      caption: '',
      likesCount: 2500,
    });
  };

  const handleSaveEditReel = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingReel) return;
    updateReel(editingReel.id, editingReel);
    setEditingReel(null);
    showToast(`✓ Updated reel "${editingReel.title}"!`);
  };

  const handleConfirmDeleteReel = () => {
    if (deletingReelId !== null) {
      deleteReel(deletingReelId);
      setDeletingReelId(null);
      showToast('✓ Reel removed from carousel.');
    }
  };

  // Handlers for Hotspot Canvas Click
  const handleImageCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round(((e.clientX - rect.left) / rect.width) * 100);
    const y = Math.round(((e.clientY - rect.top) / rect.height) * 100);
    setPinDraftPos({ x: Math.max(5, Math.min(95, x)), y: Math.max(5, Math.min(95, y)) });
    setIsAddHotspotOpen(true);
  };

  const handleSaveNewHotspot = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPerspective) return;
    addHotspot(selectedPerspective.id, {
      x: pinDraftPos.x,
      y: pinDraftPos.y,
      title: newHotspotForm.title,
      tag: newHotspotForm.tag,
      spec: newHotspotForm.spec,
    });
    setIsAddHotspotOpen(false);
    showToast(`✓ Hotspot pin "${newHotspotForm.title}" added to perspective!`);
  };

  const handleSaveEditHotspot = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPerspective || !editingHotspot) return;
    updateHotspot(selectedPerspective.id, editingHotspot.id, editingHotspot);
    setEditingHotspot(null);
    showToast(`✓ Hotspot pin updated!`);
  };

  // Handlers for Lifestyle
  const handleSaveLifestyle = (e: React.FormEvent) => {
    e.preventDefault();
    updateLifestyleConfig(lifestyleForm);
    showToast('✓ Editorial Lookbook campaign updated!');
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
            <Film className="w-3.5 h-3.5 text-black" />
            <span>COMMERCE & MEDIA STUDIO · DROP 001</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black font-poppins uppercase tracking-tight text-[#0A0A0A] mt-1">
            Visual Merchandising & Media Studio
          </h2>
          <p className="text-xs text-[#64748B]">
            Manage live homepage videos, reels carousel, interactive photography hotspots, and editorial lookbooks.
          </p>
        </div>

        <button
          onClick={() => {
            if (confirm('Reset all live media, video URLs, and hotspots to factory defaults?')) {
              resetMediaToDefaults();
              setHeroForm(heroConfig);
              showToast('✓ Reset all visuals to brand defaults.');
            }
          }}
          className="px-4 py-2.5 rounded-2xl neu-btn text-[#64748B] hover:text-black border border-white/80 text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Defaults</span>
        </button>
      </div>

      {/* Sub-Navigation Tabs in Neumorphism */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        {[
          { id: 'hero', label: '1. Hero Video & Banner', icon: Video },
          { id: 'reels', label: `2. Video Reels Carousel (${reels.length})`, icon: Film },
          { id: 'detailed', label: `3. Detailed Image & Hotspots (${perspectives.length})`, icon: Crosshair },
          { id: 'lifestyle', label: '4. Editorial Lookbook', icon: ImageIcon },
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as MediaTab)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                isActive
                  ? 'neu-btn-dark bg-[#0A0A0A] text-white shadow-md'
                  : 'neu-flat-sm text-[#475569] hover:text-[#0A0A0A] border border-white/80'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ============================================================== */}
      {/* TAB 1: HERO VIDEO & BANNER                                     */}
      {/* ============================================================== */}
      {activeTab === 'hero' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Live Preview Screen (7 cols) */}
          <div className="lg:col-span-7 neu-flat rounded-3xl p-6 sm:p-7 border border-white/80 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#64748B]">
                Live Storefront Hero Preview
              </span>
              <button
                type="button"
                onClick={() => {
                  if (heroVideoRef.current) {
                    if (isHeroPlaying) {
                      heroVideoRef.current.pause();
                      setIsHeroPlaying(false);
                    } else {
                      heroVideoRef.current.play();
                      setIsHeroPlaying(true);
                    }
                  }
                }}
                className="neu-btn px-3 py-1 rounded-xl text-[10px] font-mono font-bold uppercase border border-white/80 flex items-center gap-1.5 cursor-pointer text-[#0A0A0A]"
              >
                {isHeroPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                <span>{isHeroPlaying ? 'Pause Video' : 'Play Video'}</span>
              </button>
            </div>

            {/* Simulated Live Video Banner */}
            <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-black shadow-xl flex items-end">
              <video
                ref={heroVideoRef}
                key={heroForm.videoUrl}
                src={heroForm.videoUrl}
                poster={heroForm.posterUrl}
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/60 pointer-events-none" />

              <div className="relative z-10 p-5 sm:p-7 text-white space-y-2">
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-white/20 text-[9px] font-mono font-bold uppercase tracking-wider border border-white/30">
                  {heroForm.pillTag}
                </span>
                <h3 className="font-poppins font-black text-xl sm:text-2xl uppercase tracking-tight leading-tight whitespace-pre-line">
                  {heroForm.heading}
                </h3>
                <p className="text-[11px] text-neutral-300 font-montserrat line-clamp-2 max-w-md">
                  {heroForm.subheading}
                </p>
                <div className="pt-1">
                  <span className="inline-block px-4 py-1.5 rounded-lg bg-white text-black font-bold text-[10px] uppercase tracking-wider">
                    {heroForm.ctaText}
                  </span>
                </div>
              </div>
            </div>

            <p className="text-[11px] text-[#64748B] text-center">
              * Any change saved below immediately reflects for all store visitors on the homepage.
            </p>
          </div>

          {/* Configuration Form (5 cols) */}
          <div className="lg:col-span-5 neu-flat rounded-3xl p-6 sm:p-7 border border-white/80 space-y-5">
            <div>
              <h3 className="font-poppins font-black text-lg text-[#0A0A0A] uppercase">
                Hero Video Settings
              </h3>
              <p className="text-xs text-[#64748B]">Update media source files, overlays, and copy.</p>
            </div>

            <form onSubmit={handleSaveHero} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[11px] font-mono uppercase text-[#0A0A0A] font-bold">
                  Background Video URL (MP4 / WebM)
                </label>
                <input
                  type="text"
                  required
                  value={heroForm.videoUrl}
                  onChange={(e) => setHeroForm({ ...heroForm, videoUrl: e.target.value })}
                  placeholder="/videos/hero-drop-001.mp4"
                  className="w-full neu-inset rounded-2xl px-3.5 py-2.5 text-xs text-[#0A0A0A] font-mono border border-white/50 focus:outline-none"
                />
                <div className="flex items-center gap-1.5 pt-1 overflow-x-auto no-scrollbar">
                  <span className="text-[10px] font-mono text-[#64748B]">Presets:</span>
                  {[
                    { label: 'Drop 001 Loop', url: '/videos/hero-drop-001.mp4' },
                    { label: 'Denim Fit Check', url: '/videos/reels/reel-fit-check-denim.mp4' },
                    { label: 'Collection Motion', url: '/videos/reels/reel-streetwear-motion.mp4' },
                  ].map((p, pIdx) => (
                    <button
                      key={pIdx}
                      type="button"
                      onClick={() => setHeroForm({ ...heroForm, videoUrl: p.url })}
                      className="px-2 py-0.5 rounded-lg neu-flat-sm text-[9px] font-mono text-[#0A0A0A] hover:bg-black hover:text-white border border-white/80 cursor-pointer"
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono uppercase text-[#0A0A0A] font-bold">
                  Poster Image Fallback URL
                </label>
                <input
                  type="text"
                  value={heroForm.posterUrl}
                  onChange={(e) => setHeroForm({ ...heroForm, posterUrl: e.target.value })}
                  placeholder="/videos/hero-poster.jpg"
                  className="w-full neu-inset rounded-2xl px-3.5 py-2.5 text-xs text-[#0A0A0A] font-mono border border-white/50 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono uppercase text-[#0A0A0A] font-bold">
                  Pill Tagline Badge
                </label>
                <input
                  type="text"
                  value={heroForm.pillTag}
                  onChange={(e) => setHeroForm({ ...heroForm, pillTag: e.target.value })}
                  className="w-full neu-inset rounded-2xl px-3.5 py-2.5 text-xs text-[#0A0A0A] border border-white/50 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono uppercase text-[#0A0A0A] font-bold">
                  Main Headline
                </label>
                <textarea
                  rows={2}
                  value={heroForm.heading}
                  onChange={(e) => setHeroForm({ ...heroForm, heading: e.target.value })}
                  className="w-full neu-inset rounded-2xl px-3.5 py-2.5 text-xs text-[#0A0A0A] font-poppins font-black border border-white/50 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono uppercase text-[#0A0A0A] font-bold">
                  Subheading Description
                </label>
                <textarea
                  rows={3}
                  value={heroForm.subheading}
                  onChange={(e) => setHeroForm({ ...heroForm, subheading: e.target.value })}
                  className="w-full neu-inset rounded-2xl px-3.5 py-2.5 text-xs text-[#0A0A0A] border border-white/50 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-mono uppercase text-[#0A0A0A] font-bold">CTA Text</label>
                  <input
                    type="text"
                    value={heroForm.ctaText}
                    onChange={(e) => setHeroForm({ ...heroForm, ctaText: e.target.value })}
                    className="w-full neu-inset rounded-2xl px-3 py-2 text-xs text-[#0A0A0A] border border-white/50 focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-mono uppercase text-[#0A0A0A] font-bold">Destination</label>
                  <input
                    type="text"
                    value={heroForm.ctaLink}
                    onChange={(e) => setHeroForm({ ...heroForm, ctaLink: e.target.value })}
                    className="w-full neu-inset rounded-2xl px-3 py-2 text-xs text-[#0A0A0A] font-mono border border-white/50 focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl neu-btn-dark bg-[#0A0A0A] hover:bg-black text-white text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Hero Video & Banner</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 2: VIDEO REELS CAROUSEL                                    */}
      {/* ============================================================== */}
      {activeTab === 'reels' && (
        <div className="space-y-6">
          <div className="neu-flat rounded-3xl p-6 border border-white/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-poppins font-black text-lg text-[#0A0A0A] uppercase">
                Video Reels Carousel CRUD
              </h3>
              <p className="text-xs text-[#64748B]">
                Full management over vertical coverflow video reels ({reels.length} active reels).
              </p>
            </div>

            <button
              onClick={() => setIsAddReelOpen(true)}
              className="px-5 py-2.5 rounded-2xl neu-btn-dark bg-[#0A0A0A] hover:bg-black text-white text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-md"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Add New Reel</span>
            </button>
          </div>

          {/* Reels Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {reels.map((reel, idx) => (
              <div
                key={reel.id}
                className="neu-flat rounded-3xl p-4 border border-white/80 space-y-3 hover:scale-[1.01] transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  {/* Aspect Ratio 9:16 Video Box */}
                  <div className="relative w-full aspect-[9/16] rounded-2xl overflow-hidden bg-black shadow-md group">
                    {playingReelId === reel.id ? (
                      <video
                        src={reel.videoUrl}
                        autoPlay
                        loop
                        controls
                        playsInline
                        className="w-full h-full object-cover object-center"
                      />
                    ) : (
                      <>
                        <img
                          src={reel.thumbnailUrl}
                          alt={reel.title}
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform"
                        />
                        <button
                          type="button"
                          onClick={() => setPlayingReelId(reel.id)}
                          className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-black/60 text-white flex items-center justify-center backdrop-blur-sm hover:scale-110 transition-transform cursor-pointer border border-white/30"
                        >
                          <Play className="w-5 h-5 ml-0.5" />
                        </button>
                      </>
                    )}

                    <div className="absolute top-3 left-3 px-2 py-0.5 rounded-lg bg-black/60 text-white text-[10px] font-mono font-bold backdrop-blur-xs">
                      #{idx + 1}
                    </div>

                    <div className="absolute top-3 right-3 px-2 py-0.5 rounded-lg bg-black/60 text-white text-[10px] font-mono font-bold backdrop-blur-xs">
                      {reel.duration || '0:30'}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-poppins font-bold text-xs uppercase text-[#0A0A0A] line-clamp-1">
                      {reel.title}
                    </h4>
                    <p className="text-[11px] font-mono text-[#64748B]">{reel.authorHandle || '@valjons'}</p>
                    {reel.caption && (
                      <p className="text-[11px] text-[#475569] line-clamp-2 mt-1">{reel.caption}</p>
                    )}
                  </div>
                </div>

                {/* Reel Action Controls */}
                <div className="pt-3 border-t border-[#E2E8F0] flex items-center justify-between gap-1.5">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => reorderReels(idx, idx - 1)}
                      disabled={idx === 0}
                      title="Move Reel Left"
                      className="p-1.5 rounded-xl neu-btn text-[#64748B] hover:text-black disabled:opacity-30 border border-white/80 cursor-pointer"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => reorderReels(idx, idx + 1)}
                      disabled={idx === reels.length - 1}
                      title="Move Reel Right"
                      className="p-1.5 rounded-xl neu-btn text-[#64748B] hover:text-black disabled:opacity-30 border border-white/80 cursor-pointer"
                    >
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setEditingReel(reel)}
                      className="px-2.5 py-1.5 rounded-xl neu-btn hover:neu-btn-dark hover:text-white text-[#0A0A0A] text-[10px] font-bold uppercase transition-all border border-white/80 cursor-pointer"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => setDeletingReelId(reel.id)}
                      className="p-1.5 rounded-xl neu-btn text-rose-600 hover:bg-rose-600 hover:text-white border border-white/80 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ADD REEL MODAL */}
          {isAddReelOpen && (
            <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-md flex items-center justify-center p-4">
              <div className="w-full max-w-lg bg-[#F0F3F8] border border-white/90 rounded-3xl p-6 sm:p-8 space-y-6 animate-in zoom-in-95 duration-200 shadow-2xl neu-flat">
                <div className="flex items-center justify-between pb-4 border-b border-[#E2E8F0]">
                  <h3 className="font-poppins font-black text-base text-[#0A0A0A] uppercase">
                    Add New Video Reel
                  </h3>
                  <button
                    onClick={() => setIsAddReelOpen(false)}
                    className="p-2 rounded-xl neu-btn text-[#64748B] hover:text-black cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSaveNewReel} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[11px] font-mono uppercase text-[#0A0A0A] font-bold">
                      Reel Title
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Drop 001 Acid Wash Movement"
                      value={newReelForm.title}
                      onChange={(e) => setNewReelForm({ ...newReelForm, title: e.target.value })}
                      className="w-full neu-inset rounded-2xl px-3.5 py-2.5 text-xs text-[#0A0A0A] border border-white/50 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-mono uppercase text-[#0A0A0A] font-bold">
                      Video URL (MP4 / CDN link)
                    </label>
                    <input
                      type="text"
                      required
                      value={newReelForm.videoUrl}
                      onChange={(e) => setNewReelForm({ ...newReelForm, videoUrl: e.target.value })}
                      placeholder="/videos/reels/reel-xxx.mp4"
                      className="w-full neu-inset rounded-2xl px-3.5 py-2.5 text-xs text-[#0A0A0A] font-mono border border-white/50 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-mono uppercase text-[#0A0A0A] font-bold">
                      Thumbnail Poster URL
                    </label>
                    <input
                      type="text"
                      required
                      value={newReelForm.thumbnailUrl}
                      onChange={(e) => setNewReelForm({ ...newReelForm, thumbnailUrl: e.target.value })}
                      placeholder="/images/reels/thumb-xxx.jpg"
                      className="w-full neu-inset rounded-2xl px-3.5 py-2.5 text-xs text-[#0A0A0A] font-mono border border-white/50 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[11px] font-mono uppercase text-[#0A0A0A] font-bold">Author Handle</label>
                      <input
                        type="text"
                        value={newReelForm.authorHandle}
                        onChange={(e) => setNewReelForm({ ...newReelForm, authorHandle: e.target.value })}
                        className="w-full neu-inset rounded-2xl px-3 py-2 text-xs text-[#0A0A0A] border border-white/50 focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-mono uppercase text-[#0A0A0A] font-bold">Duration</label>
                      <input
                        type="text"
                        value={newReelForm.duration}
                        onChange={(e) => setNewReelForm({ ...newReelForm, duration: e.target.value })}
                        placeholder="0:30"
                        className="w-full neu-inset rounded-2xl px-3 py-2 text-xs text-[#0A0A0A] font-mono border border-white/50 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-mono uppercase text-[#0A0A0A] font-bold">Caption</label>
                    <textarea
                      rows={2}
                      value={newReelForm.caption}
                      onChange={(e) => setNewReelForm({ ...newReelForm, caption: e.target.value })}
                      placeholder="Caption text & hashtags..."
                      className="w-full neu-inset rounded-2xl px-3.5 py-2 text-xs text-[#0A0A0A] border border-white/50 focus:outline-none"
                    />
                  </div>

                  <div className="pt-4 border-t border-[#E2E8F0] flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setIsAddReelOpen(false)}
                      className="px-4 py-2 text-xs font-bold uppercase text-[#64748B] hover:text-black cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-2xl neu-btn-dark bg-[#0A0A0A] hover:bg-black text-white text-xs font-black uppercase tracking-wider cursor-pointer shadow-md"
                    >
                      Publish Reel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* EDIT REEL MODAL */}
          {editingReel && (
            <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-md flex items-center justify-center p-4">
              <div className="w-full max-w-lg bg-[#F0F3F8] border border-white/90 rounded-3xl p-6 sm:p-8 space-y-6 animate-in zoom-in-95 duration-200 shadow-2xl neu-flat">
                <div className="flex items-center justify-between pb-4 border-b border-[#E2E8F0]">
                  <h3 className="font-poppins font-black text-base text-[#0A0A0A] uppercase">
                    Edit Video Reel #{editingReel.id}
                  </h3>
                  <button
                    onClick={() => setEditingReel(null)}
                    className="p-2 rounded-xl neu-btn text-[#64748B] hover:text-black cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSaveEditReel} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[11px] font-mono uppercase text-[#0A0A0A] font-bold">Reel Title</label>
                    <input
                      type="text"
                      required
                      value={editingReel.title}
                      onChange={(e) => setEditingReel({ ...editingReel, title: e.target.value })}
                      className="w-full neu-inset rounded-2xl px-3.5 py-2.5 text-xs text-[#0A0A0A] border border-white/50 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-mono uppercase text-[#0A0A0A] font-bold">Video URL</label>
                    <input
                      type="text"
                      required
                      value={editingReel.videoUrl}
                      onChange={(e) => setEditingReel({ ...editingReel, videoUrl: e.target.value })}
                      className="w-full neu-inset rounded-2xl px-3.5 py-2.5 text-xs text-[#0A0A0A] font-mono border border-white/50 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-mono uppercase text-[#0A0A0A] font-bold">Thumbnail Poster URL</label>
                    <input
                      type="text"
                      required
                      value={editingReel.thumbnailUrl}
                      onChange={(e) => setEditingReel({ ...editingReel, thumbnailUrl: e.target.value })}
                      className="w-full neu-inset rounded-2xl px-3.5 py-2.5 text-xs text-[#0A0A0A] font-mono border border-white/50 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[11px] font-mono uppercase text-[#0A0A0A] font-bold">Author</label>
                      <input
                        type="text"
                        value={editingReel.authorHandle || ''}
                        onChange={(e) => setEditingReel({ ...editingReel, authorHandle: e.target.value })}
                        className="w-full neu-inset rounded-2xl px-3 py-2 text-xs text-[#0A0A0A] border border-white/50 focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-mono uppercase text-[#0A0A0A] font-bold">Duration</label>
                      <input
                        type="text"
                        value={editingReel.duration || ''}
                        onChange={(e) => setEditingReel({ ...editingReel, duration: e.target.value })}
                        className="w-full neu-inset rounded-2xl px-3 py-2 text-xs text-[#0A0A0A] font-mono border border-white/50 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-mono uppercase text-[#0A0A0A] font-bold">Caption</label>
                    <textarea
                      rows={2}
                      value={editingReel.caption || ''}
                      onChange={(e) => setEditingReel({ ...editingReel, caption: e.target.value })}
                      className="w-full neu-inset rounded-2xl px-3.5 py-2 text-xs text-[#0A0A0A] border border-white/50 focus:outline-none"
                    />
                  </div>

                  <div className="pt-4 border-t border-[#E2E8F0] flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setEditingReel(null)}
                      className="px-4 py-2 text-xs font-bold uppercase text-[#64748B] hover:text-black cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-2xl neu-btn-dark bg-[#0A0A0A] hover:bg-black text-white text-xs font-black uppercase tracking-wider cursor-pointer shadow-md"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* DELETE CONFIRMATION MODAL */}
          {deletingReelId !== null && (
            <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-md flex items-center justify-center p-4">
              <div className="w-full max-w-md bg-[#F0F3F8] border border-white/90 rounded-3xl p-6 space-y-4 animate-in zoom-in-95 duration-200 shadow-2xl neu-flat">
                <div className="flex items-center gap-3 text-rose-600">
                  <AlertCircle className="w-6 h-6" />
                  <h4 className="font-poppins font-bold text-base uppercase text-[#0A0A0A]">
                    Delete Video Reel?
                  </h4>
                </div>
                <p className="text-xs text-[#475569] leading-relaxed">
                  Are you sure you want to remove this reel from the homepage carousel?
                </p>
                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    onClick={() => setDeletingReelId(null)}
                    className="px-4 py-2 rounded-2xl neu-btn text-xs font-bold uppercase text-[#64748B] hover:text-black cursor-pointer border border-white/80"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmDeleteReel}
                    className="px-5 py-2.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-black uppercase tracking-wider shadow-lg cursor-pointer"
                  >
                    Confirm Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 3: DETAILED IMAGE & HOTSPOT STUDIO                         */}
      {/* ============================================================== */}
      {activeTab === 'detailed' && (
        <div className="space-y-6">
          {/* Perspectives Selector Pills */}
          <div className="neu-flat rounded-3xl p-5 border border-white/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
              {perspectives.map((p, pIdx) => (
                <button
                  key={p.id}
                  onClick={() => setSelectedPerspectiveIdx(pIdx)}
                  className={`px-4 py-2 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                    selectedPerspectiveIdx === pIdx
                      ? 'neu-btn-dark bg-[#0A0A0A] text-white shadow-md'
                      : 'neu-flat-sm text-[#475569] hover:text-[#0A0A0A] border border-white/80'
                  }`}
                >
                  {p.tag}
                </button>
              ))}
            </div>

            <button
              onClick={() => setIsAddPerspectiveOpen(true)}
              className="px-4 py-2 rounded-2xl neu-btn hover:neu-btn-dark hover:text-white text-[#0A0A0A] text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 border border-white/80 cursor-pointer self-start sm:self-auto"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Perspective</span>
            </button>
          </div>

          {selectedPerspective && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Interactive Hotspot Canvas (7 cols) */}
              <div className="lg:col-span-7 neu-flat rounded-3xl p-6 sm:p-7 border border-white/80 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#64748B]">
                      Interactive Hotspot Studio
                    </span>
                    <h4 className="font-poppins font-black text-lg text-[#0A0A0A] uppercase">
                      {selectedPerspective.title}
                    </h4>
                  </div>

                  <span className="text-[10px] font-mono text-[#0A0A0A] neu-inset px-3 py-1 rounded-full border border-white/60 font-bold">
                    Click Canvas to Pin Hotspot
                  </span>
                </div>

                {/* The Interactive Visual Canvas */}
                <div
                  onClick={handleImageCanvasClick}
                  className="relative w-full aspect-[4/5] sm:aspect-square rounded-2xl overflow-hidden bg-neutral-900 shadow-xl cursor-crosshair select-none group border border-white/80"
                >
                  <img
                    src={selectedPerspective.imageUrl}
                    alt={selectedPerspective.title}
                    className="w-full h-full object-cover object-center pointer-events-none"
                  />

                  {/* Render Existing Hotspot Pins */}
                  {selectedPerspective.hotspots.map((hs) => (
                    <div
                      key={hs.id}
                      style={{ left: `${hs.x}%`, top: `${hs.y}%` }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingHotspot(hs);
                      }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group/pin cursor-pointer"
                    >
                      <div className="relative flex items-center justify-center">
                        <span className="w-8 h-8 rounded-full bg-white/90 text-black border-2 border-black font-bold font-mono text-xs flex items-center justify-center shadow-2xl group-hover/pin:scale-125 transition-transform">
                          {hs.id}
                        </span>
                        <span className="absolute -inset-1 rounded-full bg-white/40 animate-ping pointer-events-none" />
                      </div>

                      {/* Tooltip on pin */}
                      <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 bg-[#0A0A0A] text-white text-[10px] font-mono py-1 px-2.5 rounded-xl shadow-2xl whitespace-nowrap opacity-0 group-hover/pin:opacity-100 transition-opacity pointer-events-none z-30">
                        {hs.title} ({hs.x}%, {hs.y}%)
                      </div>
                    </div>
                  ))}
                </div>

                <p className="text-[11px] text-[#64748B]">
                  💡 <strong>Tip:</strong> Click anywhere on the photograph to place a new technical hotspot pin. Click any numbered pin to edit its specifications.
                </p>
              </div>

              {/* Hotspots List & Perspective Details (5 cols) */}
              <div className="lg:col-span-5 neu-flat rounded-3xl p-6 sm:p-7 border border-white/80 space-y-6">
                <div>
                  <h4 className="font-poppins font-black text-base text-[#0A0A0A] uppercase">
                    Active Hotspots ({selectedPerspective.hotspots.length})
                  </h4>
                  <p className="text-xs text-[#64748B]">Manage technical pins and fabric specifications.</p>
                </div>

                <div className="space-y-3">
                  {selectedPerspective.hotspots.map((hs) => (
                    <div
                      key={hs.id}
                      className="p-3.5 rounded-2xl neu-flat-sm border border-white/80 flex items-start justify-between gap-3 hover:neu-flat transition-all"
                    >
                      <div className="flex items-start gap-3">
                        <span className="w-7 h-7 rounded-xl bg-[#0A0A0A] text-white font-mono font-bold text-xs flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                          {hs.id}
                        </span>
                        <div>
                          <div className="flex items-center gap-2">
                            <h5 className="font-poppins font-bold text-xs uppercase text-[#0A0A0A]">
                              {hs.title}
                            </h5>
                            <span className="text-[9px] font-mono text-[#64748B] neu-inset px-1.5 py-0.5 rounded-md">
                              {hs.tag}
                            </span>
                          </div>
                          <p className="text-[11px] text-[#475569] mt-0.5">{hs.spec}</p>
                          <span className="text-[9px] font-mono text-[#94A3B8] block mt-1">
                            Coordinates: X {hs.x}% · Y {hs.y}%
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={() => setEditingHotspot(hs)}
                          className="p-1.5 rounded-xl neu-btn text-[#0A0A0A] hover:bg-black hover:text-white border border-white/80 cursor-pointer"
                          title="Edit Hotspot"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => deleteHotspot(selectedPerspective.id, hs.id)}
                          className="p-1.5 rounded-xl neu-btn text-rose-600 hover:bg-rose-600 hover:text-white border border-white/80 cursor-pointer"
                          title="Delete Hotspot"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Perspective Metadata Form */}
                <div className="pt-4 border-t border-[#E2E8F0] space-y-3">
                  <h5 className="font-poppins font-bold text-xs uppercase text-[#0A0A0A]">
                    Perspective Details
                  </h5>
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase text-[#64748B] font-bold">Image URL</label>
                    <input
                      type="text"
                      value={selectedPerspective.imageUrl}
                      onChange={(e) =>
                        updatePerspective(selectedPerspective.id, { imageUrl: e.target.value })
                      }
                      className="w-full neu-inset rounded-xl px-3 py-1.5 text-xs text-[#0A0A0A] font-mono border border-white/50 focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase text-[#64748B] font-bold">Title</label>
                    <input
                      type="text"
                      value={selectedPerspective.title}
                      onChange={(e) =>
                        updatePerspective(selectedPerspective.id, { title: e.target.value })
                      }
                      className="w-full neu-inset rounded-xl px-3 py-1.5 text-xs text-[#0A0A0A] border border-white/50 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ADD HOTSPOT MODAL */}
          {isAddHotspotOpen && selectedPerspective && (
            <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-md flex items-center justify-center p-4">
              <div className="w-full max-w-md bg-[#F0F3F8] border border-white/90 rounded-3xl p-6 sm:p-8 space-y-5 animate-in zoom-in-95 duration-200 shadow-2xl neu-flat">
                <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
                  <div>
                    <h3 className="font-poppins font-black text-base text-[#0A0A0A] uppercase">
                      New Hotspot Pin
                    </h3>
                    <p className="text-[11px] font-mono text-[#64748B]">
                      Position: X {pinDraftPos.x}% · Y {pinDraftPos.y}%
                    </p>
                  </div>
                  <button
                    onClick={() => setIsAddHotspotOpen(false)}
                    className="p-2 rounded-xl neu-btn text-[#64748B] hover:text-black cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <form onSubmit={handleSaveNewHotspot} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[11px] font-mono uppercase text-[#0A0A0A] font-bold">Feature Title</label>
                    <input
                      type="text"
                      required
                      value={newHotspotForm.title}
                      onChange={(e) => setNewHotspotForm({ ...newHotspotForm, title: e.target.value })}
                      placeholder="e.g. Twin-Needle Flatlock Inseam"
                      className="w-full neu-inset rounded-2xl px-3.5 py-2 text-xs text-[#0A0A0A] border border-white/50 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-mono uppercase text-[#0A0A0A] font-bold">Category Tag</label>
                    <input
                      type="text"
                      value={newHotspotForm.tag}
                      onChange={(e) => setNewHotspotForm({ ...newHotspotForm, tag: e.target.value })}
                      placeholder="e.g. STRESS SEAM"
                      className="w-full neu-inset rounded-2xl px-3.5 py-2 text-xs text-[#0A0A0A] border border-white/50 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-mono uppercase text-[#0A0A0A] font-bold">Technical Spec</label>
                    <textarea
                      rows={3}
                      required
                      value={newHotspotForm.spec}
                      onChange={(e) => setNewHotspotForm({ ...newHotspotForm, spec: e.target.value })}
                      placeholder="Detailed engineering specification..."
                      className="w-full neu-inset rounded-2xl px-3.5 py-2 text-xs text-[#0A0A0A] border border-white/50 focus:outline-none"
                    />
                  </div>

                  <div className="pt-3 border-t border-[#E2E8F0] flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setIsAddHotspotOpen(false)}
                      className="px-4 py-2 text-xs font-bold uppercase text-[#64748B] hover:text-black cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-2xl neu-btn-dark bg-[#0A0A0A] hover:bg-black text-white text-xs font-black uppercase tracking-wider cursor-pointer shadow-md"
                    >
                      Place Pin
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* EDIT HOTSPOT MODAL */}
          {editingHotspot && selectedPerspective && (
            <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-md flex items-center justify-center p-4">
              <div className="w-full max-w-md bg-[#F0F3F8] border border-white/90 rounded-3xl p-6 sm:p-8 space-y-5 animate-in zoom-in-95 duration-200 shadow-2xl neu-flat">
                <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
                  <h3 className="font-poppins font-black text-base text-[#0A0A0A] uppercase">
                    Edit Hotspot #{editingHotspot.id}
                  </h3>
                  <button
                    onClick={() => setEditingHotspot(null)}
                    className="p-2 rounded-xl neu-btn text-[#64748B] hover:text-black cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <form onSubmit={handleSaveEditHotspot} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[11px] font-mono uppercase text-[#0A0A0A] font-bold">Feature Title</label>
                    <input
                      type="text"
                      required
                      value={editingHotspot.title}
                      onChange={(e) => setEditingHotspot({ ...editingHotspot, title: e.target.value })}
                      className="w-full neu-inset rounded-2xl px-3.5 py-2 text-xs text-[#0A0A0A] border border-white/50 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-mono uppercase text-[#0A0A0A] font-bold">Category Tag</label>
                    <input
                      type="text"
                      value={editingHotspot.tag}
                      onChange={(e) => setEditingHotspot({ ...editingHotspot, tag: e.target.value })}
                      className="w-full neu-inset rounded-2xl px-3.5 py-2 text-xs text-[#0A0A0A] border border-white/50 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[11px] font-mono uppercase text-[#0A0A0A] font-bold">X Position (%)</label>
                      <input
                        type="number"
                        min={0}
                        max={100}
                        value={editingHotspot.x}
                        onChange={(e) =>
                          setEditingHotspot({ ...editingHotspot, x: parseInt(e.target.value) || 0 })
                        }
                        className="w-full neu-inset rounded-2xl px-3 py-2 text-xs text-[#0A0A0A] font-mono border border-white/50 focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-mono uppercase text-[#0A0A0A] font-bold">Y Position (%)</label>
                      <input
                        type="number"
                        min={0}
                        max={100}
                        value={editingHotspot.y}
                        onChange={(e) =>
                          setEditingHotspot({ ...editingHotspot, y: parseInt(e.target.value) || 0 })
                        }
                        className="w-full neu-inset rounded-2xl px-3 py-2 text-xs text-[#0A0A0A] font-mono border border-white/50 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-mono uppercase text-[#0A0A0A] font-bold">Technical Spec</label>
                    <textarea
                      rows={3}
                      required
                      value={editingHotspot.spec}
                      onChange={(e) => setEditingHotspot({ ...editingHotspot, spec: e.target.value })}
                      className="w-full neu-inset rounded-2xl px-3.5 py-2 text-xs text-[#0A0A0A] border border-white/50 focus:outline-none"
                    />
                  </div>

                  <div className="pt-3 border-t border-[#E2E8F0] flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setEditingHotspot(null)}
                      className="px-4 py-2 text-xs font-bold uppercase text-[#64748B] hover:text-black cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-2xl neu-btn-dark bg-[#0A0A0A] hover:bg-black text-white text-xs font-black uppercase tracking-wider cursor-pointer shadow-md"
                    >
                      Save Hotspot
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 4: EDITORIAL LOOKBOOK                                      */}
      {/* ============================================================== */}
      {activeTab === 'lifestyle' && (
        <div className="neu-flat rounded-3xl p-6 sm:p-8 border border-white/80 space-y-6">
          <div>
            <h3 className="font-poppins font-black text-lg text-[#0A0A0A] uppercase">
              Editorial Lookbook Campaign
            </h3>
            <p className="text-xs text-[#64748B]">
              Update the asymmetrical editorial lookbook section on the live homepage.
            </p>
          </div>

          <form onSubmit={handleSaveLifestyle} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[11px] font-mono uppercase text-[#0A0A0A] font-bold">Section Tag</label>
                <input
                  type="text"
                  value={lifestyleForm.editorialTag}
                  onChange={(e) => setLifestyleForm({ ...lifestyleForm, editorialTag: e.target.value })}
                  className="w-full neu-inset rounded-2xl px-3.5 py-2.5 text-xs text-[#0A0A0A] border border-white/50 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono uppercase text-[#0A0A0A] font-bold">Section Heading</label>
                <input
                  type="text"
                  value={lifestyleForm.mainHeading}
                  onChange={(e) => setLifestyleForm({ ...lifestyleForm, mainHeading: e.target.value })}
                  className="w-full neu-inset rounded-2xl px-3.5 py-2.5 text-xs text-[#0A0A0A] border border-white/50 focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-mono uppercase text-[#0A0A0A] font-bold">Description</label>
              <textarea
                rows={2}
                value={lifestyleForm.description}
                onChange={(e) => setLifestyleForm({ ...lifestyleForm, description: e.target.value })}
                className="w-full neu-inset rounded-2xl px-3.5 py-2.5 text-xs text-[#0A0A0A] border border-white/50 focus:outline-none"
              />
            </div>

            {/* Primary Look (Large Visual) */}
            <div className="p-5 rounded-2xl neu-flat-sm border border-white/80 space-y-4">
              <h4 className="font-poppins font-bold text-sm uppercase text-[#0A0A0A]">
                Primary Feature Visual (7-Column Hero)
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-mono uppercase text-[#0A0A0A] font-bold">Image URL</label>
                  <input
                    type="text"
                    value={lifestyleForm.primaryLook.imageUrl}
                    onChange={(e) =>
                      setLifestyleForm({
                        ...lifestyleForm,
                        primaryLook: { ...lifestyleForm.primaryLook, imageUrl: e.target.value },
                      })
                    }
                    className="w-full neu-inset rounded-2xl px-3.5 py-2 text-xs text-[#0A0A0A] font-mono border border-white/50 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono uppercase text-[#0A0A0A] font-bold">Look Tag</label>
                  <input
                    type="text"
                    value={lifestyleForm.primaryLook.lookTag}
                    onChange={(e) =>
                      setLifestyleForm({
                        ...lifestyleForm,
                        primaryLook: { ...lifestyleForm.primaryLook, lookTag: e.target.value },
                      })
                    }
                    className="w-full neu-inset rounded-2xl px-3.5 py-2 text-xs text-[#0A0A0A] border border-white/50 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono uppercase text-[#0A0A0A] font-bold">Title</label>
                  <input
                    type="text"
                    value={lifestyleForm.primaryLook.title}
                    onChange={(e) =>
                      setLifestyleForm({
                        ...lifestyleForm,
                        primaryLook: { ...lifestyleForm.primaryLook, title: e.target.value },
                      })
                    }
                    className="w-full neu-inset rounded-2xl px-3.5 py-2 text-xs text-[#0A0A0A] border border-white/50 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono uppercase text-[#0A0A0A] font-bold">Button Link</label>
                  <input
                    type="text"
                    value={lifestyleForm.primaryLook.link}
                    onChange={(e) =>
                      setLifestyleForm({
                        ...lifestyleForm,
                        primaryLook: { ...lifestyleForm.primaryLook, link: e.target.value },
                      })
                    }
                    className="w-full neu-inset rounded-2xl px-3.5 py-2 text-xs text-[#0A0A0A] font-mono border border-white/50 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="px-6 py-3 rounded-2xl neu-btn-dark bg-[#0A0A0A] hover:bg-black text-white text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-md"
            >
              <Save className="w-4 h-4" />
              <span>Save Editorial Lookbook</span>
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
