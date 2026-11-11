'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { ZoomIn, ZoomOut, X, ChevronLeft, ChevronRight, RotateCcw, Maximize2 } from 'lucide-react';

interface PhotoItem {
  title: string;
  caption: string;
  tag: string;
  imageUrl: string;
  specDetails: string;
}

export default function DetailedPhotographySection() {
  const photos: PhotoItem[] = [
    {
      title: 'Macro Knit & Loopback Texture',
      caption: '280 GSM poly-cotton loopback knit weave engineered for supreme breathability, structural drape, and zero surface pilling.',
      tag: '01 / TEXTURE',
      imageUrl: '/images/products/valjons-drop001-minimal-silhouette.jpg',
      specDetails: '70% Combed Cotton / 30% Structural Poly · Custom Milled Loopback Knit',
    },
    {
      title: 'Encased Waistband & Cord Aglets',
      caption: 'Heavy gauge ribbed elastic waistband fitted with custom internal drawstrings, reinforced bar-tacks, and debossed matte hardware.',
      tag: '02 / HARDWARE',
      imageUrl: '/images/products/valjons-drop001-denim-street.jpg',
      specDetails: 'Reinforced 4-Row Waistband Stitching · Custom Gunmetal Hardware',
    },
    {
      title: 'Concealed Slash Pockets',
      caption: 'Deep jersey-lined pockets anchored with structural bar-tack stitching engineered to hold large smartphones securely without sagging.',
      tag: '03 / UTILITY',
      imageUrl: '/images/products/valjons-drop001-relaxed-vibe.jpg',
      specDetails: 'Dual Deep Side Welt Pockets · Anti-Slip Pocket Liner',
    },
    {
      title: 'Straight Cut Sneaker Pooling',
      caption: 'Architectural straight-leg opening calibrated to stack and pool effortlessly over chunky sneakers without dragging on the pavement.',
      tag: '04 / SILHOUETTE',
      imageUrl: '/images/products/valjons-drop001-cargo-fleece.jpg',
      specDetails: '22cm Tailored Leg Opening · Raw Edge Reinforced Pooling Hem',
    },
  ];

  // Lightbox & Zoom State
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [zoomScale, setZoomScale] = useState<number>(1);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const openLightbox = (idx: number) => {
    setActiveIdx(idx);
    setZoomScale(1);
    setMousePos({ x: 50, y: 50 });
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }
  };

  const closeLightbox = useCallback(() => {
    setActiveIdx(null);
    setZoomScale(1);
    if (typeof document !== 'undefined') {
      document.body.style.overflow = '';
    }
  }, []);

  const nextPhoto = useCallback(() => {
    if (activeIdx !== null) {
      setActiveIdx((prev) => (prev! + 1) % photos.length);
      setZoomScale(1);
    }
  }, [activeIdx, photos.length]);

  const prevPhoto = useCallback(() => {
    if (activeIdx !== null) {
      setActiveIdx((prev) => (prev! - 1 + photos.length) % photos.length);
      setZoomScale(1);
    }
  }, [activeIdx, photos.length]);

  const toggleZoom = () => {
    setZoomScale((prev) => (prev === 1 ? 2 : prev === 2 ? 2.8 : 1));
  };

  // Keyboard Navigation
  useEffect(() => {
    if (activeIdx === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextPhoto();
      if (e.key === 'ArrowLeft') prevPhoto();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIdx, closeLightbox, nextPhoto, prevPhoto]);

  // Handle Mouse Move for Pan when Zoomed
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (zoomScale <= 1) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  return (
    <section id="detailed-photography" className="w-full py-12 sm:py-24 bg-white text-black scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-3 sm:gap-4">
          <div className="space-y-1 sm:space-y-2">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] sm:tracking-[0.25em] text-neutral-400 font-montserrat">
              Macro Craftsmanship
            </span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight font-poppins">
              DETAILED PHOTOGRAPHY
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-neutral-500 font-montserrat max-w-md">
            Click any frame to inspect high-resolution macro details — fabric weave, structural bar-tack stitching, and hardware crafted to outlast ordinary basics.
          </p>
        </div>

        {/* 4-Image Editorial Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {photos.map((photo, idx) => (
            <div
              key={idx}
              onClick={() => openLightbox(idx)}
              className="group relative flex flex-col bg-neutral-50 rounded-2xl overflow-hidden border border-neutral-200/80 shadow-xs hover:shadow-2xl transition-all duration-300 cursor-pointer"
            >
              {/* Image Frame */}
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-neutral-100">
                <img
                  src={photo.imageUrl}
                  alt={photo.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out cursor-zoom-in"
                />

                {/* Tag Badge */}
                <div className="absolute top-2.5 left-2.5 bg-white/95 backdrop-blur-xs text-black text-[9px] sm:text-[10px] font-bold font-montserrat uppercase px-2.5 py-1 rounded shadow-xs z-10 select-none">
                  {photo.tag}
                </div>

                {/* Working Zoom Icon Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    openLightbox(idx);
                  }}
                  aria-label={`Zoom in on ${photo.title}`}
                  className="absolute bottom-2.5 right-2.5 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/75 hover:bg-black active:scale-95 text-white flex items-center justify-center shadow-lg transition-all duration-200 z-10 cursor-pointer hover:scale-110"
                >
                  <ZoomIn className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2.2]" />
                </button>
              </div>

              {/* Caption & Specs */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-2">
                <div>
                  <h4 className="font-poppins font-black text-xs sm:text-sm uppercase tracking-tight text-neutral-900 group-hover:text-black transition-colors">
                    {photo.title}
                  </h4>
                  <p className="text-[11px] sm:text-xs text-neutral-500 leading-relaxed font-montserrat mt-1">
                    {photo.caption}
                  </p>
                </div>
                <div className="pt-2 border-t border-neutral-200/60 flex items-center justify-between text-[10px] font-mono text-neutral-400">
                  <span>INSPECT MACRO</span>
                  <span className="text-black font-bold">CLICK TO ZOOM →</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FULLSCREEN MACRO LIGHTBOX MODAL */}
      {activeIdx !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="High Resolution Macro Photography Viewer"
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col select-none animate-in fade-in duration-200"
        >
          {/* Top Bar: Info + Controls */}
          <div className="flex items-center justify-between px-4 sm:px-8 py-4 border-b border-white/10 text-white z-20">
            <div className="flex items-center gap-3">
              <span className="bg-white/15 text-white text-[10px] sm:text-xs font-mono font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                {photos[activeIdx].tag}
              </span>
              <span className="text-xs sm:text-sm font-poppins font-bold tracking-tight text-white/90 hidden sm:inline">
                {photos[activeIdx].title}
              </span>
              <span className="text-xs text-white/40 font-mono">
                {activeIdx + 1} / {photos.length}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={toggleZoom}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-xs font-mono text-white transition-all cursor-pointer"
                title="Toggle Zoom level (1x / 2x / 2.8x)"
              >
                {zoomScale > 1 ? (
                  <>
                    <ZoomOut className="w-3.5 h-3.5" />
                    <span>{zoomScale}x</span>
                  </>
                ) : (
                  <>
                    <ZoomIn className="w-3.5 h-3.5" />
                    <span>ZOOM IN</span>
                  </>
                )}
              </button>

              {zoomScale > 1 && (
                <button
                  type="button"
                  onClick={() => setZoomScale(1)}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
                  title="Reset zoom"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              )}

              <button
                type="button"
                onClick={closeLightbox}
                aria-label="Close modal"
                className="w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 active:scale-90 text-white flex items-center justify-center transition-all cursor-pointer ml-2"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Center Stage: Interactive Image Frame with Pan on Zoom */}
          <div
            className="flex-1 relative flex items-center justify-center overflow-hidden p-4 sm:p-8 cursor-grab active:cursor-grabbing"
            onMouseMove={handleMouseMove}
            onClick={toggleZoom}
          >
            {/* Previous Photo Arrow */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prevPhoto();
              }}
              aria-label="Previous photo"
              className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/25 active:scale-90 text-white flex items-center justify-center shadow-2xl transition-all z-20 cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
            </button>

            {/* Next Photo Arrow */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                nextPhoto();
              }}
              aria-label="Next photo"
              className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/25 active:scale-90 text-white flex items-center justify-center shadow-2xl transition-all z-20 cursor-pointer"
            >
              <ChevronRight className="w-6 h-6 stroke-[2.5]" />
            </button>

            {/* The Main Image with Smooth Dynamic Transform */}
            <div className="relative max-w-full max-h-[70vh] sm:max-h-[75vh] flex items-center justify-center overflow-hidden rounded-xl shadow-2xl">
              <img
                src={photos[activeIdx].imageUrl}
                alt={photos[activeIdx].title}
                style={{
                  transform: `scale(${zoomScale})`,
                  transformOrigin: zoomScale > 1 ? `${mousePos.x}% ${mousePos.y}%` : 'center center',
                  transition: zoomScale === 1 ? 'transform 300ms ease-out' : 'transform 100ms ease-out',
                }}
                className="max-h-[70vh] sm:max-h-[75vh] w-auto object-contain rounded-lg pointer-events-none select-none"
              />
            </div>
          </div>

          {/* Bottom Bar: Detailed Craftsmanship Specs + Thumbnail Strip */}
          <div className="border-t border-white/10 bg-black/60 px-4 sm:px-8 py-3.5 sm:py-4 z-20 flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4">
            <div className="text-center md:text-left space-y-0.5 max-w-xl">
              <h3 className="text-white font-poppins font-black text-xs sm:text-sm uppercase tracking-tight">
                {photos[activeIdx].title}
              </h3>
              <p className="text-white/70 text-[11px] sm:text-xs font-montserrat leading-relaxed">
                {photos[activeIdx].caption}
              </p>
              <div className="text-[10px] font-mono text-[#E52E2E] font-bold pt-0.5">
                {photos[activeIdx].specDetails}
              </div>
            </div>

            {/* Thumbnail Strip */}
            <div className="flex items-center gap-2 overflow-x-auto max-w-full py-1">
              {photos.map((p, thumbIdx) => (
                <button
                  key={thumbIdx}
                  type="button"
                  onClick={() => {
                    setActiveIdx(thumbIdx);
                    setZoomScale(1);
                  }}
                  className={`relative w-11 h-14 sm:w-14 sm:h-16 rounded-md overflow-hidden border-2 transition-all cursor-pointer flex-shrink-0 ${
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
