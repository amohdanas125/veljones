'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  ZoomIn,
  ZoomOut,
  X,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Sparkles,
  Maximize2,
} from 'lucide-react';

interface PhotoItem {
  id: number;
  title: string;
  caption: string;
  tag: string;
  imageUrl: string;
  specDetails: string;
}

export default function DetailedPhotographySection() {
  // 4 Curated High-Resolution Pieces from genuine client assets
  const photos: PhotoItem[] = [
    {
      id: 1,
      title: 'Engineered Heavyweight Drape',
      caption:
        '280 GSM custom-milled structure. Relaxed architectural drape built for natural pooling and zero surface pilling over lifetime wear.',
      tag: '01 / SILHOUETTE',
      imageUrl: '/images/products/valjons-heavyweight-fleece.jpg',
      specDetails: '100% Combed Compact Cotton · 280 GSM Gauge · Bio-Washed & Pre-Shrunk',
    },
    {
      id: 2,
      title: 'Articulated Cut & Pocket Detailing',
      caption:
        'Deep reinforced welt pockets with concealed bar-tack anchoring and ergonomic seam lines engineered for fluid daily movement.',
      tag: '02 / UTILITY',
      imageUrl: '/images/products/valjons-cargo-fleece.jpg',
      specDetails: 'Reinforced Pocket Welts · Heavy-Duty Structural Stitching · Smartphone Depth',
    },
    {
      id: 3,
      title: 'Clean Ankle Stacking & Proportions',
      caption:
        'Calibrated hem width designed to stack naturally over low-profile sneakers, skate shoes, and chunky runners without heel drag.',
      tag: '03 / PROPORTIONS',
      imageUrl: '/images/products/valjons-denim-street.jpg',
      specDetails: '22cm True Straight Leg Opening · Anti-Drag Reinforced Bottom Hem',
    },
    {
      id: 4,
      title: 'Textured Handfeel & Ribbed Trims',
      caption:
        'Subtle tactile micro-knit texture with robust double-needle flatlock collar and cuff trims that retain shape after every wash cycle.',
      tag: '04 / TEXTURE',
      imageUrl: '/images/products/valjons-henver-polo.jpg',
      specDetails: 'High-Gauge Combed Interloop Knit · Shape-Retention Lycra Trims',
    },
  ];

  // Mobile Carousel Active Card Tracking
  const [mobileActiveIdx, setMobileActiveIdx] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Lightbox & Pan/Zoom State
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [zoomScale, setZoomScale] = useState<number>(1);
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);

  // Touch and Drag tracking refs
  const dragStartRef = useRef<{ x: number; y: number; originPanX: number; originPanY: number }>({
    x: 0,
    y: 0,
    originPanX: 0,
    originPanY: 0,
  });
  const touchSwipeRef = useRef<{ x: number; y: number; time: number }>({ x: 0, y: 0, time: 0 });
  const lastTapRef = useRef<number>(0);

  // Open Lightbox
  const openLightbox = (idx: number) => {
    setActiveIdx(idx);
    setZoomScale(1);
    setPanOffset({ x: 0, y: 0 });
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }
  };

  // Close Lightbox
  const closeLightbox = useCallback(() => {
    setActiveIdx(null);
    setZoomScale(1);
    setPanOffset({ x: 0, y: 0 });
    if (typeof document !== 'undefined') {
      document.body.style.overflow = '';
    }
  }, []);

  // Slide Navigation
  const nextPhoto = useCallback(() => {
    if (activeIdx !== null) {
      setActiveIdx((prev) => (prev! + 1) % photos.length);
      setZoomScale(1);
      setPanOffset({ x: 0, y: 0 });
    }
  }, [activeIdx, photos.length]);

  const prevPhoto = useCallback(() => {
    if (activeIdx !== null) {
      setActiveIdx((prev) => (prev! - 1 + photos.length) % photos.length);
      setZoomScale(1);
      setPanOffset({ x: 0, y: 0 });
    }
  }, [activeIdx, photos.length]);

  // Zoom Helpers
  const zoomIn = () => {
    setZoomScale((prev) => {
      const next = prev >= 2.5 ? 3 : prev >= 1.75 ? 2.5 : prev >= 1 ? 1.75 : 1;
      return next;
    });
  };

  const zoomOut = () => {
    setZoomScale((prev) => {
      const next = prev <= 1.75 ? 1 : prev <= 2.5 ? 1.75 : 2.5;
      if (next === 1) setPanOffset({ x: 0, y: 0 });
      return next;
    });
  };

  const resetZoom = () => {
    setZoomScale(1);
    setPanOffset({ x: 0, y: 0 });
  };

  const toggleDoubleTapZoom = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    if (zoomScale > 1) {
      resetZoom();
    } else {
      setZoomScale(2);
      setPanOffset({ x: 0, y: 0 });
    }
  };

  // Keyboard Navigation
  useEffect(() => {
    if (activeIdx === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextPhoto();
      if (e.key === 'ArrowLeft') prevPhoto();
      if (e.key === '+' || e.key === '=') zoomIn();
      if (e.key === '-') zoomOut();
      if (e.key === '0') resetZoom();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIdx, closeLightbox, nextPhoto, prevPhoto]);

  // Mobile Carousel Scroll Listener
  const handleCarouselScroll = () => {
    const el = carouselRef.current;
    if (!el) return;
    const cardWidth = el.offsetWidth * 0.82;
    const scrollLeft = el.scrollLeft;
    const current = Math.round(scrollLeft / cardWidth);
    setMobileActiveIdx(Math.min(photos.length - 1, Math.max(0, current)));
  };

  // Scroll to index on indicator tap
  const scrollCarouselTo = (idx: number) => {
    const el = carouselRef.current;
    if (!el) return;
    const cardWidth = el.offsetWidth * 0.82;
    el.scrollTo({ left: idx * cardWidth, behavior: 'smooth' });
    setMobileActiveIdx(idx);
  };

  // Mouse Pan Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomScale <= 1) return;
    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      originPanX: panOffset.x,
      originPanY: panOffset.y,
    };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || zoomScale <= 1) return;
    const deltaX = e.clientX - dragStartRef.current.x;
    const deltaY = e.clientY - dragStartRef.current.y;
    // Limit panning bounds
    const maxBound = (zoomScale - 1) * 220;
    const nextX = Math.max(-maxBound, Math.min(maxBound, dragStartRef.current.originPanX + deltaX));
    const nextY = Math.max(-maxBound, Math.min(maxBound, dragStartRef.current.originPanY + deltaY));
    setPanOffset({ x: nextX, y: nextY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch Pan and Swipe Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    touchSwipeRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now(),
    };

    if (zoomScale > 1) {
      dragStartRef.current = {
        x: touch.clientX,
        y: touch.clientY,
        originPanX: panOffset.x,
        originPanY: panOffset.y,
      };
      setIsDragging(true);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    if (zoomScale > 1 && isDragging) {
      const deltaX = touch.clientX - dragStartRef.current.x;
      const deltaY = touch.clientY - dragStartRef.current.y;
      const maxBound = (zoomScale - 1) * 240;
      const nextX = Math.max(-maxBound, Math.min(maxBound, dragStartRef.current.originPanX + deltaX));
      const nextY = Math.max(-maxBound, Math.min(maxBound, dragStartRef.current.originPanY + deltaY));
      setPanOffset({ x: nextX, y: nextY });
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    setIsDragging(false);
    const now = Date.now();
    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - touchSwipeRef.current.x;
    const deltaY = touch.clientY - touchSwipeRef.current.y;
    const deltaTime = now - touchSwipeRef.current.time;

    // Detect Double Tap on Mobile
    if (Math.abs(deltaX) < 10 && Math.abs(deltaY) < 10) {
      if (now - lastTapRef.current < 300) {
        toggleDoubleTapZoom(e);
        lastTapRef.current = 0;
        return;
      }
      lastTapRef.current = now;
    }

    // Swipe navigation when at standard 1x zoom
    if (zoomScale === 1 && deltaTime < 400) {
      // Horizontal swipe between photos
      if (Math.abs(deltaX) > 45 && Math.abs(deltaX) > Math.abs(deltaY) * 1.5) {
        if (deltaX < 0) {
          nextPhoto();
        } else {
          prevPhoto();
        }
      }
      // Swipe down to dismiss lightbox
      else if (deltaY > 80 && Math.abs(deltaY) > Math.abs(deltaX) * 1.5) {
        closeLightbox();
      }
    }
  };

  return (
    <section id="detailed-photography" className="w-full py-12 sm:py-24 bg-white text-black scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-14 gap-3 sm:gap-6">
          <div className="space-y-1.5 sm:space-y-2">
            <div className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-bold uppercase tracking-[0.22em] text-neutral-400 font-montserrat">
              <Sparkles className="w-3.5 h-3.5 text-black" />
              <span>Craftsmanship & Fit Lookbook</span>
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight font-poppins">
              DETAILED PHOTOGRAPHY
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-neutral-500 font-montserrat max-w-md leading-relaxed">
            Inspect high-resolution fabric textures, structural stitching, and engineered silhouettes crafted to outlast ordinary basics.
          </p>
        </div>

        {/* 1. MOBILE VIEW: Smooth Horizontal Swipeable Snap Carousel */}
        <div className="block sm:hidden">
          <div
            ref={carouselRef}
            onScroll={handleCarouselScroll}
            className="flex gap-4 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory scroll-smooth no-scrollbar -mx-4 px-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {photos.map((photo, idx) => (
              <div
                key={photo.id}
                onClick={() => openLightbox(idx)}
                className="w-[80vw] max-w-[310px] flex-shrink-0 snap-center group flex flex-col bg-neutral-50 rounded-2xl overflow-hidden border border-neutral-200/90 shadow-md active:scale-[0.98] transition-transform duration-200 cursor-pointer"
              >
                {/* Photo Frame */}
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-100">
                  <img
                    src={photo.imageUrl}
                    alt={photo.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-center"
                  />

                  {/* Tag Pill */}
                  <div className="absolute top-2.5 left-2.5 bg-black/80 backdrop-blur-sm text-white text-[9px] font-bold font-montserrat uppercase px-2.5 py-1 rounded shadow-xs z-10 select-none">
                    {photo.tag}
                  </div>

                  {/* Tap to Zoom Badge */}
                  <div className="absolute bottom-2.5 right-2.5 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 text-black text-[10px] font-bold uppercase tracking-wider font-montserrat shadow-md z-10">
                    <ZoomIn className="w-3.5 h-3.5" />
                    <span>Inspect</span>
                  </div>
                </div>

                {/* Card Info */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
                  <div>
                    <h3 className="font-poppins font-black text-sm uppercase tracking-tight text-neutral-900">
                      {photo.title}
                    </h3>
                    <p className="text-[11px] text-neutral-500 leading-relaxed font-montserrat mt-1 line-clamp-2">
                      {photo.caption}
                    </p>
                  </div>
                  <div className="pt-2 border-t border-neutral-200/60 flex items-center justify-between text-[10px] font-mono text-neutral-400">
                    <span className="text-[#DC2626] font-bold">VALJONS DROP 001</span>
                    <span className="text-black font-bold">TAP TO VIEW →</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Carousel Swipe Indicator Dots */}
          <div className="flex items-center justify-center gap-2 pt-2 pb-2">
            {photos.map((_, dotIdx) => (
              <button
                key={dotIdx}
                type="button"
                onClick={() => scrollCarouselTo(dotIdx)}
                aria-label={`Go to detailed image ${dotIdx + 1}`}
                className={`transition-all duration-300 rounded-full ${
                  dotIdx === mobileActiveIdx
                    ? 'w-6 h-2 bg-black'
                    : 'w-2 h-2 bg-neutral-300 hover:bg-neutral-400'
                }`}
              />
            ))}
          </div>
        </div>

        {/* 2. DESKTOP VIEW: High-Impact 4-Column Editorial Grid */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {photos.map((photo, idx) => (
            <div
              key={photo.id}
              onClick={() => openLightbox(idx)}
              className="group relative flex flex-col bg-neutral-50 rounded-2xl overflow-hidden border border-neutral-200/80 shadow-xs hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer"
            >
              {/* Image Frame */}
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-neutral-100">
                <img
                  src={photo.imageUrl}
                  alt={photo.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-center group-hover:scale-106 transition-transform duration-700 ease-out cursor-zoom-in"
                />

                {/* Tag Badge */}
                <div className="absolute top-2.5 left-2.5 bg-white/95 backdrop-blur-xs text-black text-[10px] font-bold font-montserrat uppercase px-2.5 py-1 rounded shadow-xs z-10 select-none">
                  {photo.tag}
                </div>

                {/* Interactive Zoom Button on Hover */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    openLightbox(idx);
                  }}
                  aria-label={`Inspect ${photo.title}`}
                  className="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-black/80 hover:bg-black active:scale-95 text-white flex items-center justify-center shadow-lg transition-all duration-200 z-10 cursor-pointer hover:scale-110"
                >
                  <ZoomIn className="w-4.5 h-4.5 stroke-[2.2]" />
                </button>
              </div>

              {/* Caption & Specs */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-2.5">
                <div>
                  <h3 className="font-poppins font-black text-sm uppercase tracking-tight text-neutral-900 group-hover:text-black transition-colors">
                    {photo.title}
                  </h3>
                  <p className="text-xs text-neutral-500 leading-relaxed font-montserrat mt-1.5">
                    {photo.caption}
                  </p>
                </div>
                <div className="pt-2.5 border-t border-neutral-200/60 flex items-center justify-between text-[10px] font-mono text-neutral-400">
                  <span className="font-bold text-neutral-500">INSPECT HIGH-RES</span>
                  <span className="text-black font-bold">CLICK TO ZOOM →</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. FULLSCREEN HIGH-PERFORMANCE LIGHTBOX MODAL */}
      {activeIdx !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="High Resolution Photography Viewer"
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col select-none animate-in fade-in duration-200"
          onClick={(e) => {
            // Click outside the image stage closes the modal
            if (e.target === e.currentTarget) closeLightbox();
          }}
        >
          {/* Top Bar: Title & Granular Zoom Controls */}
          <div className="flex items-center justify-between px-3 sm:px-8 py-3 sm:py-4 border-b border-white/10 text-white z-30 bg-black/40">
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="bg-white/15 text-white text-[9px] sm:text-xs font-mono font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                {photos[activeIdx].tag}
              </span>
              <span className="text-xs sm:text-sm font-poppins font-bold tracking-tight text-white/90 truncate max-w-[150px] sm:max-w-xs">
                {photos[activeIdx].title}
              </span>
              <span className="text-[11px] sm:text-xs text-white/40 font-mono">
                {activeIdx + 1} / {photos.length}
              </span>
            </div>

            {/* Top Right Zoom Controls & Close Button */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {/* Zoom Out Button */}
              <button
                type="button"
                onClick={zoomOut}
                disabled={zoomScale <= 1}
                aria-label="Zoom out"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed text-white flex items-center justify-center transition-all cursor-pointer"
                title="Zoom out (-)"
              >
                <ZoomOut className="w-4 h-4" />
              </button>

              {/* Zoom Percentage Indicator */}
              <button
                type="button"
                onClick={toggleDoubleTapZoom}
                className="px-2.5 sm:px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-[10px] sm:text-xs font-mono text-white transition-all cursor-pointer"
                title="Click to toggle 1x / 2x zoom"
              >
                {Math.round(zoomScale * 100)}%
              </button>

              {/* Zoom In Button */}
              <button
                type="button"
                onClick={zoomIn}
                disabled={zoomScale >= 3}
                aria-label="Zoom in"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed text-white flex items-center justify-center transition-all cursor-pointer"
                title="Zoom in (+)"
              >
                <ZoomIn className="w-4 h-4" />
              </button>

              {/* Reset Zoom Button */}
              {zoomScale > 1 && (
                <button
                  type="button"
                  onClick={resetZoom}
                  aria-label="Reset zoom to 100%"
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer"
                  title="Reset zoom to default"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              )}

              {/* Close Button */}
              <button
                type="button"
                onClick={closeLightbox}
                aria-label="Close viewer"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/20 hover:bg-white/30 active:scale-90 text-white flex items-center justify-center transition-all cursor-pointer ml-1 sm:ml-2"
                title="Close (Esc)"
              >
                <X className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>

          {/* Center Stage: Interactive Image Frame with Smooth Drag & Touch Navigation */}
          <div
            className={`flex-1 relative flex items-center justify-center overflow-hidden p-2 sm:p-6 select-none ${
              zoomScale > 1 ? (isDragging ? 'cursor-grabbing' : 'cursor-grab') : 'cursor-default'
            }`}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onDoubleClick={toggleDoubleTapZoom}
          >
            {/* Previous Photo Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prevPhoto();
              }}
              aria-label="Previous photo"
              className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-white/20 active:scale-90 text-white flex items-center justify-center shadow-2xl transition-all z-20 cursor-pointer border border-white/10 backdrop-blur-xs"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
            </button>

            {/* Next Photo Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                nextPhoto();
              }}
              aria-label="Next photo"
              className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-white/20 active:scale-90 text-white flex items-center justify-center shadow-2xl transition-all z-20 cursor-pointer border border-white/10 backdrop-blur-xs"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
            </button>

            {/* The Main High-Resolution Photo */}
            <div className="relative max-w-full max-h-[68vh] sm:max-h-[76vh] flex items-center justify-center overflow-hidden rounded-xl">
              <img
                src={photos[activeIdx].imageUrl}
                alt={photos[activeIdx].title}
                style={{
                  transform: `translate3d(${panOffset.x}px, ${panOffset.y}px, 0) scale(${zoomScale})`,
                  transition: isDragging ? 'none' : 'transform 250ms cubic-bezier(0.16, 1, 0.3, 1)',
                }}
                className="max-h-[68vh] sm:max-h-[76vh] w-auto max-w-full object-contain rounded-lg pointer-events-none select-none shadow-2xl"
              />
            </div>

            {/* Mobile Helpful Hint Badge */}
            {zoomScale === 1 ? (
              <div className="absolute bottom-2 inset-x-0 sm:hidden pointer-events-none flex justify-center">
                <span className="text-[10px] text-white/50 bg-black/60 backdrop-blur-xs px-3 py-1 rounded-full font-montserrat">
                  Swipe left/right to browse · Double tap to zoom
                </span>
              </div>
            ) : (
              <div className="absolute bottom-2 inset-x-0 sm:hidden pointer-events-none flex justify-center">
                <span className="text-[10px] text-white/80 bg-black/75 backdrop-blur-xs px-3 py-1 rounded-full font-montserrat border border-white/20">
                  Drag with finger to explore details
                </span>
              </div>
            )}
          </div>

          {/* Bottom HUD: Specifications + Thumbnail Selector Strip */}
          <div className="border-t border-white/10 bg-black/80 px-3 sm:px-8 py-2.5 sm:py-3.5 z-30 flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-4">
            <div className="text-center sm:text-left space-y-0.5 max-w-xl">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <h4 className="text-white font-poppins font-black text-xs sm:text-sm uppercase tracking-tight">
                  {photos[activeIdx].title}
                </h4>
                <span className="text-[9px] font-mono text-[#DC2626] font-bold">
                  {photos[activeIdx].specDetails}
                </span>
              </div>
              <p className="text-white/70 text-[10px] sm:text-xs font-montserrat leading-relaxed hidden sm:block">
                {photos[activeIdx].caption}
              </p>
            </div>

            {/* Thumbnail Strip */}
            <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto max-w-full py-0.5">
              {photos.map((p, thumbIdx) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => {
                    setActiveIdx(thumbIdx);
                    setZoomScale(1);
                    setPanOffset({ x: 0, y: 0 });
                  }}
                  className={`relative w-10 h-13 sm:w-12 sm:h-15 rounded-md overflow-hidden border-2 transition-all cursor-pointer flex-shrink-0 ${
                    thumbIdx === activeIdx
                      ? 'border-white scale-105 shadow-md'
                      : 'border-white/20 opacity-50 hover:opacity-100 hover:border-white/60'
                  }`}
                >
                  <img src={p.imageUrl} alt={p.title} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
