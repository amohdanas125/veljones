'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import Link from 'next/link';
import {
  ZoomIn,
  ZoomOut,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  RotateCcw,
  Layers,
  ShieldCheck,
  Check,
  Ruler,
  Crosshair,
  ArrowRight,
  Eye,
} from 'lucide-react';

interface Hotspot {
  id: number;
  x: number; // percentage from left
  y: number; // percentage from top
  title: string;
  tag: string;
  spec: string;
}

interface Perspective {
  id: number;
  tag: string;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  hotspots: Hotspot[];
  specs: { label: string; value: string }[];
}

export default function DetailedPhotographySection() {
  const perspectives: Perspective[] = [
    {
      id: 0,
      tag: '01 // SILHOUETTE',
      title: 'Architectural Straight-Fit Drape',
      subtitle: 'Zero Pre-Made Blanks · Calibrated Footwear Break',
      description:
        'Engineered from the ground up with proprietary pattern drafting. The relaxed rise angle and thigh room cascade straight down to the ankle, creating effortless fabric pooling over sneakers without awkward taper or knee bunching.',
      imageUrl: '/images/products/valjons-heavyweight-fleece.jpg',
      hotspots: [
        {
          id: 1,
          x: 48,
          y: 16,
          title: 'Encased Ribbed Waistband',
          tag: 'ELASTIC CORE',
          spec: 'High-density internal elastic core with reinforced drawcord channel & gunmetal zinc aglets.',
        },
        {
          id: 2,
          x: 43,
          y: 44,
          title: 'Engineered Thigh Volume',
          tag: 'ERGONOMICS',
          spec: 'Generous rise proportioning allows unhindered walking cadence while maintaining vertical drape.',
        },
        {
          id: 3,
          x: 56,
          y: 86,
          title: '22cm Straight Hem Opening',
          tag: 'FOOTWEAR POOLING',
          spec: 'Precision leg opening engineered to stack naturally over low-tops, retrowear, and bulky sneakers.',
        },
      ],
      specs: [
        { label: 'Grammage', value: '280 GSM Heavyweight Fleece' },
        { label: 'Blend Ratio', value: '70% Cotton / 30% Structural Poly' },
        { label: 'Silhouette Cut', value: 'True Straight Leg (Non-Tapered)' },
        { label: 'Shrinkage Wash', value: '< 1.5% Dimensional Stability' },
      ],
    },
    {
      id: 1,
      tag: '02 // UTILITY',
      title: 'Bar-Tack Pockets & Seam Architecture',
      subtitle: 'Reinforced Anchor Points · Concealed Storage',
      description:
        'Dual ergonomic welt pockets cut deep enough to securely shelter modern smartphones without bulging. Multi-stitch bar-tack anchoring at high-stress mouth corners withstands multi-year daily use.',
      imageUrl: '/images/products/valjons-cargo-fleece.jpg',
      hotspots: [
        {
          id: 1,
          x: 36,
          y: 28,
          title: 'Reinforced Pocket Welts',
          tag: 'SMARTPHONE DEPTH',
          spec: 'Deep 26cm drop with concealed poly-cotton lining to keep essentials secure when seated.',
        },
        {
          id: 2,
          x: 64,
          y: 46,
          title: 'Twin-Needle Flatlock Inseam',
          tag: 'STRESS SEAM',
          spec: 'Industrial 4-thread flatlock stitch creates a flush internal seam that prevents chaffing.',
        },
        {
          id: 3,
          x: 48,
          y: 72,
          title: 'Anti-Abrasion Flap Pockets',
          tag: 'CARGO SYSTEM',
          spec: 'Low-profile bellowed cargo pockets positioned for balanced weight distribution.',
        },
      ],
      specs: [
        { label: 'Pocket Storage', value: '26cm Smartphone Capacity' },
        { label: 'Seam Construction', value: 'Twin-Needle 4-Thread Flatlock' },
        { label: 'Stress Reinforcement', value: '6-Point Bar-Tack Stitching' },
        { label: 'Hardware Finish', value: 'Matte Gunmetal Zinc Alloy' },
      ],
    },
    {
      id: 2,
      tag: '03 // PROPORTIONS',
      title: 'Footwear Stacking & Hem Clearance',
      subtitle: 'Calibrated Ankle Fall · Zero Heel Drag',
      description:
        'The hem circumference was calibrated against low-profile canvas sneakers, retro basketball kicks, and chunky runners. It breaks naturally across the shoe collar with zero floor drag or rear heel abrasion.',
      imageUrl: '/images/products/valjons-denim-street.jpg',
      hotspots: [
        {
          id: 1,
          x: 50,
          y: 84,
          title: 'Non-Elastic Straight Drop',
          tag: 'HEM BREAK',
          spec: 'No elastic bunching or sweatpant cuffs. True architectural trousers drape with streetwear attitude.',
        },
        {
          id: 2,
          x: 46,
          y: 35,
          title: 'Relaxed Hip-to-Knee Transition',
          tag: 'CADENCE DRAFTING',
          spec: 'Calculated drape axis prevents horizontal creasing across knees when in motion.',
        },
      ],
      specs: [
        { label: 'Hem Opening', value: '22cm Calibrated Stacking Circumference' },
        { label: 'Cuff Style', value: 'Clean Open Hem (Zero Elastic Cuffs)' },
        { label: 'Footwear Pairing', value: 'Low-Tops, Retros & Chunky Trainers' },
        { label: 'Ground Clearance', value: 'Engineered Anti-Heel-Drag Rise' },
      ],
    },
    {
      id: 3,
      tag: '04 // WEAVE & TEXTURE',
      title: 'Custom-Milled 280 GSM Fleece Weave',
      subtitle: 'Cloud-Soft Interior · Pill-Resistant Face',
      description:
        'Knit using long-staple combed cotton on the face and a brushed loopback fleece interior. The 30% poly reinforcement locks in dye vibrancy through dozens of washes while preventing knee-bagging and sagging.',
      imageUrl: '/images/products/valjons-henver-polo.jpg',
      hotspots: [
        {
          id: 1,
          x: 52,
          y: 32,
          title: 'Combed Compact Cotton Face',
          tag: 'SURFACE WEAVE',
          spec: 'Bio-washed to singe loose micro-fibers, ensuring an ultra-smooth, lint-resistant exterior.',
        },
        {
          id: 2,
          x: 42,
          y: 62,
          title: 'Brushed Micro-Fleece Interior',
          tag: 'TOUCHFEEL',
          spec: 'Inward cloud-soft texture that traps insulating warmth without overheating indoors.',
        },
      ],
      specs: [
        { label: 'Fabric Face', value: '100% Combed Compact Cotton' },
        { label: 'Reverse Loop', value: 'Brushed Thermal Poly-Cotton Fleece' },
        { label: 'Pilling Grade', value: 'Grade 4.5 ISO Standard Tested' },
        { label: 'Dye Process', value: 'Reactive Deep Dye Anti-Fading' },
      ],
    },
  ];

  const [activeIdx, setActiveIdx] = useState(0);
  const [activeHotspotId, setActiveHotspotId] = useState<number | null>(null);
  const [isLoupeEnabled, setIsLoupeEnabled] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, percentX: 50, percentY: 50 });

  // Lightbox Modal State
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [zoomScale, setZoomScale] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0, originX: 0, originY: 0 });
  const stageRef = useRef<HTMLDivElement>(null);

  const active = perspectives[activeIdx];

  // Mouse Move on Stage for Precision Loupe
  const handleStageMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const percentX = Math.max(0, Math.min(100, (x / rect.width) * 100));
    const percentY = Math.max(0, Math.min(100, (y / rect.height) * 100));

    setMousePos({ x, y, percentX, percentY });
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isLightboxOpen) {
        setIsLightboxOpen(false);
      } else if (e.key === 'ArrowRight' && isLightboxOpen) {
        setActiveIdx((prev) => (prev + 1) % perspectives.length);
      } else if (e.key === 'ArrowLeft' && isLightboxOpen) {
        setActiveIdx((prev) => (prev - 1 + perspectives.length) % perspectives.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, perspectives.length]);

  return (
    <section
      id="detailed-photography"
      className="relative isolate w-full py-16 sm:py-24 bg-[#FAF8F5] text-neutral-900 border-t border-neutral-200/80 font-montserrat select-none"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 sm:pb-12 border-b border-neutral-200/90 gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-mono font-bold uppercase tracking-[0.22em] text-[#801414]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>VALJONS ATELIER ARCHIVE · DROP 001</span>
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight font-poppins text-black">
              DETAILED PHOTOGRAPHY & ANATOMY
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-neutral-600 max-w-md leading-relaxed">
            Move your cursor over the fabric to activate the 2.5x macro inspection loupe, or click anatomical hotspots to inspect pattern drafting and seam engineering.
          </p>
        </div>

        {/* Perspective Selector Pills */}
        <div className="pt-6 pb-8 flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto no-scrollbar py-1">
            {perspectives.map((p, idx) => (
              <button
                key={p.id}
                onClick={() => {
                  setActiveIdx(idx);
                  setActiveHotspotId(null);
                }}
                className={`px-3.5 sm:px-4 py-2 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-2 shrink-0 ${
                  activeIdx === idx
                    ? 'bg-black text-white shadow-md'
                    : 'bg-white text-neutral-600 hover:text-black border border-neutral-200 hover:border-neutral-400'
                }`}
              >
                <span className="font-mono text-[10px] opacity-70">0{idx + 1}</span>
                <span>{p.tag.split('// ')[1] || p.tag}</span>
              </button>
            ))}
          </div>

          {/* Quick Loupe Toggle & Fullscreen Button */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => setIsLoupeEnabled(!isLoupeEnabled)}
              className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-1.5 border ${
                isLoupeEnabled
                  ? 'bg-neutral-900 text-white border-neutral-900'
                  : 'bg-white text-neutral-600 border-neutral-200 hover:bg-neutral-100'
              }`}
            >
              <Crosshair className="w-3 h-3" />
              <span>{isLoupeEnabled ? 'Loupe: Active' : 'Loupe: Off'}</span>
            </button>

            <button
              onClick={() => {
                setIsLightboxOpen(true);
                setZoomScale(1);
                setPanOffset({ x: 0, y: 0 });
              }}
              className="px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white text-neutral-700 hover:text-black border border-neutral-200 hover:border-neutral-400 transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
            >
              <Maximize2 className="w-3 h-3" />
              <span>Fullscreen</span>
            </button>
          </div>
        </div>

        {/* Main Split-Stage Layout: Interactive Stage (Left) & Technical Dossier (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* LEFT: Cinematic Garment Stage with Loupe & Hotspots (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div
              ref={stageRef}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => {
                setIsHovering(false);
                setActiveHotspotId(null);
              }}
              onMouseMove={handleStageMouseMove}
              className="relative aspect-[4/5] sm:aspect-[4/5] w-full rounded-2xl overflow-hidden bg-white border border-neutral-200/90 shadow-lg cursor-crosshair group select-none"
            >
              {/* Primary High-Resolution Garment Photo */}
              <img
                src={active.imageUrl}
                alt={active.title}
                className="w-full h-full object-cover object-center transition-transform duration-300 pointer-events-none"
                loading="eager"
              />

              {/* Perspective Index & Title Pill */}
              <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
                <span className="bg-black/85 backdrop-blur-md text-white text-[10px] font-mono font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                  {active.tag}
                </span>
                <span className="hidden sm:inline-block bg-white/90 backdrop-blur-md text-neutral-800 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-xs">
                  280 GSM FLEECE
                </span>
              </div>

              {/* Bottom Instructions / Hint */}
              <div className="absolute bottom-4 left-4 z-20 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 text-black text-[10px] font-bold uppercase tracking-wider shadow-md backdrop-blur-xs">
                <Crosshair className="w-3.5 h-3.5 text-[#801414]" />
                <span className="hidden sm:inline">Hover to Zoom Weave · Click Pins</span>
                <span className="sm:hidden">Tap Pins to Inspect</span>
              </div>

              {/* Fullscreen Trigger */}
              <button
                type="button"
                onClick={() => {
                  setIsLightboxOpen(true);
                  setZoomScale(1);
                  setPanOffset({ x: 0, y: 0 });
                }}
                aria-label="Open Fullscreen Cinema"
                className="absolute bottom-4 right-4 z-20 w-9 h-9 rounded-full bg-black/80 hover:bg-black text-white flex items-center justify-center shadow-lg transition-transform hover:scale-110 active:scale-95 cursor-pointer"
              >
                <Maximize2 className="w-4 h-4 stroke-[2]" />
              </button>

              {/* Pulsing Interactive Hotspots [⊕] */}
              {active.hotspots.map((hs) => {
                const isSelected = activeHotspotId === hs.id;
                return (
                  <div
                    key={hs.id}
                    style={{ left: `${hs.x}%`, top: `${hs.y}%` }}
                    className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
                  >
                    {/* Pulsing Beacon Ring */}
                    <div className="relative">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveHotspotId(isSelected ? null : hs.id);
                        }}
                        onMouseEnter={() => setActiveHotspotId(hs.id)}
                        aria-label={`Inspect ${hs.title}`}
                        className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all duration-300 shadow-xl cursor-pointer ${
                          isSelected
                            ? 'bg-[#801414] text-white scale-110 ring-4 ring-[#801414]/30'
                            : 'bg-white/95 hover:bg-white text-black hover:scale-110'
                        }`}
                      >
                        <span className="font-bold text-sm leading-none">{isSelected ? '✕' : '+'}</span>
                      </button>

                      {/* Ping ring animation when idle */}
                      {!isSelected && (
                        <span className="absolute inset-0 rounded-full bg-white opacity-40 animate-ping pointer-events-none" />
                      )}
                    </div>

                    {/* Floating Hotspot Glass Tooltip Card */}
                    {isSelected && (
                      <div
                        onClick={(e) => e.stopPropagation()}
                        className={`absolute left-1/2 -translate-x-1/2 w-64 sm:w-72 p-3.5 bg-black/95 text-white backdrop-blur-md rounded-xl shadow-2xl border border-white/15 z-30 animate-in fade-in zoom-in-95 duration-200 ${
                          hs.y < 30 ? 'top-full mt-3' : 'bottom-full mb-3'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-1.5 mb-2">
                          <span className="text-[9px] font-mono font-bold tracking-widest text-[#F87171] uppercase">
                            {hs.tag}
                          </span>
                          <span className="text-[9px] text-neutral-400 font-mono">SPEC PIN 0{hs.id}</span>
                        </div>
                        <h4 className="font-poppins font-bold text-xs uppercase tracking-tight text-white mb-1">
                          {hs.title}
                        </h4>
                        <p className="text-[11px] text-neutral-300 font-montserrat leading-relaxed">
                          {hs.spec}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Interactive In-Situ Magnifier Loupe Lens (Desktop only) */}
              {isLoupeEnabled && isHovering && (
                <div
                  className="hidden sm:block absolute pointer-events-none z-30 w-36 h-36 rounded-full border-2 border-white shadow-2xl overflow-hidden -translate-x-1/2 -translate-y-1/2 bg-neutral-900"
                  style={{
                    left: `${mousePos.x}px`,
                    top: `${mousePos.y}px`,
                    backgroundImage: `url(${active.imageUrl})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '280%',
                    backgroundPosition: `${mousePos.percentX}% ${mousePos.percentY}%`,
                  }}
                >
                  {/* Loupe Reticle Crosshair */}
                  <div className="w-full h-full relative flex items-center justify-center opacity-40">
                    <div className="w-full h-[1px] bg-white/70" />
                    <div className="h-full w-[1px] bg-white/70 absolute" />
                    <div className="w-4 h-4 rounded-full border border-white/80 absolute" />
                  </div>

                  {/* Magnification Badge */}
                  <div className="absolute bottom-2 inset-x-0 flex justify-center">
                    <span className="bg-black/80 text-white font-mono text-[9px] font-bold px-2 py-0.5 rounded-full shadow-xs">
                      2.5X WEAVE
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Thumbnail Strip for Rapid Switching */}
            <div className="grid grid-cols-4 gap-2.5 sm:gap-4 pt-1">
              {perspectives.map((p, idx) => (
                <button
                  key={p.id}
                  onClick={() => {
                    setActiveIdx(idx);
                    setActiveHotspotId(null);
                  }}
                  className={`relative aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all duration-200 cursor-pointer bg-white group ${
                    activeIdx === idx
                      ? 'border-black shadow-md scale-[1.02]'
                      : 'border-transparent opacity-60 hover:opacity-100 hover:border-neutral-300'
                  }`}
                >
                  <img
                    src={p.imageUrl}
                    alt={p.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-1 bg-gradient-to-t from-black/80 to-transparent text-[9px] font-bold text-white text-center font-mono">
                    0{idx + 1}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT: Technical Atelier Dossier & Garment Specifications (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6 bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200/90 shadow-sm">
            {/* Header / Numeral Badge */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono font-bold tracking-[0.25em] text-[#801414] uppercase">
                  {active.tag}
                </span>
                <span className="text-3xl font-poppins font-black text-neutral-300">
                  0{activeIdx + 1}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black font-poppins uppercase tracking-tight text-neutral-900 leading-tight">
                {active.title}
              </h3>

              <p className="text-xs font-semibold text-neutral-600 uppercase tracking-wider">
                {active.subtitle}
              </p>

              <p className="text-xs sm:text-sm text-neutral-700 font-montserrat leading-relaxed pt-1">
                {active.description}
              </p>
            </div>

            {/* Technical Specifications Grid */}
            <div className="space-y-2.5 pt-4 border-t border-neutral-200">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-black mb-3">
                <Ruler className="w-4 h-4 text-[#801414]" />
                <span>Atelier Technical Specifications</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {active.specs.map((spec, sIdx) => (
                  <div
                    key={sIdx}
                    className="p-3 bg-neutral-50 rounded-xl border border-neutral-200/70 flex flex-col justify-between"
                  >
                    <span className="text-[10px] font-mono font-semibold uppercase text-neutral-500">
                      {spec.label}
                    </span>
                    <span className="text-xs font-bold text-neutral-900 mt-1 font-montserrat">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Drop 001 Palette Selector */}
            <div className="pt-4 border-t border-neutral-200 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold uppercase tracking-wider text-black">Available Colorways</span>
                <span className="text-[11px] text-neutral-500 font-medium">Drop 001 Archive</span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <Link
                  href="/product/valjons-straight-fit-pc-fleece-onyx-black"
                  className="p-2 rounded-xl border border-neutral-200 hover:border-black transition-colors flex items-center gap-2 text-[10px] font-bold uppercase"
                >
                  <span className="w-3.5 h-3.5 rounded-full bg-[#111111] shrink-0 border border-black/20" />
                  <span className="truncate">Onyx Black</span>
                </Link>

                <Link
                  href="/product/valjons-straight-fit-pc-fleece-heather-oat"
                  className="p-2 rounded-xl border border-neutral-200 hover:border-black transition-colors flex items-center gap-2 text-[10px] font-bold uppercase"
                >
                  <span className="w-3.5 h-3.5 rounded-full bg-[#DCD6CD] shrink-0 border border-neutral-300" />
                  <span className="truncate">Heather Oat</span>
                </Link>

                <Link
                  href="/product/valjons-straight-fit-pc-fleece-vintage-pine"
                  className="p-2 rounded-xl border border-neutral-200 hover:border-black transition-colors flex items-center gap-2 text-[10px] font-bold uppercase"
                >
                  <span className="w-3.5 h-3.5 rounded-full bg-[#39483B] shrink-0 border border-neutral-400" />
                  <span className="truncate">Vintage Pine</span>
                </Link>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-center gap-3">
              <Link
                href="/product/valjons-straight-fit-pc-fleece-onyx-black"
                className="w-full sm:flex-1 py-3 px-5 bg-black hover:bg-neutral-800 text-white font-poppins font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-md flex items-center justify-center gap-2 group cursor-pointer active:scale-98"
              >
                <span>Shop Drop 001 — ₹2,499</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <button
                type="button"
                onClick={() => {
                  setIsLightboxOpen(true);
                  setZoomScale(1);
                  setPanOffset({ x: 0, y: 0 });
                }}
                className="w-full sm:w-auto py-3 px-4 bg-neutral-100 hover:bg-neutral-200 text-black font-bold text-xs uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Eye className="w-4 h-4" />
                <span>Inspect High-Res</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* FULLSCREEN CINEMATIC LIGHTBOX MODAL */}
      {isLightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="High-Resolution Atelier Viewer"
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col select-none animate-in fade-in duration-200"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsLightboxOpen(false);
          }}
        >
          {/* Top Bar: Title & Controls */}
          <div className="flex items-center justify-between px-4 sm:px-8 py-3.5 border-b border-white/10 text-white z-30 bg-black/40">
            <div className="flex items-center gap-3">
              <span className="bg-white/15 text-white text-[10px] sm:text-xs font-mono font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                {active.tag}
              </span>
              <span className="text-xs sm:text-sm font-poppins font-bold text-white/90 truncate max-w-[200px] sm:max-w-md">
                {active.title}
              </span>
            </div>

            <div className="flex items-center gap-2 sm:gap-4">
              {/* Zoom Out */}
              <button
                onClick={() => setZoomScale((prev) => Math.max(1, prev - 0.5))}
                disabled={zoomScale <= 1}
                aria-label="Zoom out"
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer text-white"
              >
                <ZoomOut className="w-4 h-4" />
              </button>

              <span className="text-[11px] font-mono text-white/80 min-w-[45px] text-center font-bold">
                {Math.round(zoomScale * 100)}%
              </span>

              {/* Zoom In */}
              <button
                onClick={() => setZoomScale((prev) => Math.min(3.5, prev + 0.5))}
                disabled={zoomScale >= 3.5}
                aria-label="Zoom in"
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer text-white"
              >
                <ZoomIn className="w-4 h-4" />
              </button>

              {/* Reset Zoom */}
              <button
                onClick={() => {
                  setZoomScale(1);
                  setPanOffset({ x: 0, y: 0 });
                }}
                disabled={zoomScale === 1}
                aria-label="Reset zoom scale"
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer text-white"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              {/* Close Modal */}
              <button
                onClick={() => setIsLightboxOpen(false)}
                aria-label="Close fullscreen modal"
                className="p-2 rounded-lg bg-white/15 hover:bg-white text-white hover:text-black transition-all cursor-pointer ml-2"
              >
                <X className="w-5 h-5 stroke-[2.5]" />
              </button>
            </div>
          </div>

          {/* Interactive Lightbox Canvas */}
          <div
            className="flex-1 relative flex items-center justify-center overflow-hidden p-4 sm:p-8 cursor-grab active:cursor-grabbing"
            onMouseDown={(e) => {
              if (zoomScale <= 1) return;
              setIsDragging(true);
              dragStartRef.current = {
                x: e.clientX,
                y: e.clientY,
                originX: panOffset.x,
                originY: panOffset.y,
              };
            }}
            onMouseMove={(e) => {
              if (!isDragging || zoomScale <= 1) return;
              const deltaX = e.clientX - dragStartRef.current.x;
              const deltaY = e.clientY - dragStartRef.current.y;
              const maxBound = (zoomScale - 1) * 250;
              setPanOffset({
                x: Math.max(-maxBound, Math.min(maxBound, dragStartRef.current.originX + deltaX)),
                y: Math.max(-maxBound, Math.min(maxBound, dragStartRef.current.originY + deltaY)),
              });
            }}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
          >
            <img
              src={active.imageUrl}
              alt={active.title}
              style={{
                transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoomScale})`,
                transition: isDragging ? 'none' : 'transform 0.2s cubic-bezier(0.2, 0, 0, 1)',
              }}
              className="max-h-[82vh] max-w-[90vw] object-contain rounded-lg shadow-2xl select-none"
              draggable={false}
            />

            {/* Left Carousel Arrow */}
            <button
              onClick={() => {
                setActiveIdx((prev) => (prev - 1 + perspectives.length) % perspectives.length);
                setZoomScale(1);
                setPanOffset({ x: 0, y: 0 });
              }}
              aria-label="Previous photo"
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 hover:bg-white hover:text-black text-white border border-white/20 backdrop-blur-md flex items-center justify-center transition-all cursor-pointer shadow-xl z-20 active:scale-95"
            >
              <ChevronLeft className="w-6 h-6 stroke-[2]" />
            </button>

            {/* Right Carousel Arrow */}
            <button
              onClick={() => {
                setActiveIdx((prev) => (prev + 1) % perspectives.length);
                setZoomScale(1);
                setPanOffset({ x: 0, y: 0 });
              }}
              aria-label="Next photo"
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 hover:bg-white hover:text-black text-white border border-white/20 backdrop-blur-md flex items-center justify-center transition-all cursor-pointer shadow-xl z-20 active:scale-95"
            >
              <ChevronRight className="w-6 h-6 stroke-[2]" />
            </button>
          </div>

          {/* Bottom Bar: Thumbnails & Specs */}
          <div className="px-4 sm:px-8 py-3 bg-black/60 border-t border-white/10 flex items-center justify-between text-xs text-white/80">
            <span className="font-mono text-[11px] text-neutral-400">
              PERSPECTIVE 0{activeIdx + 1} OF 0{perspectives.length}
            </span>

            <div className="flex items-center gap-2">
              {perspectives.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setActiveIdx(i);
                    setZoomScale(1);
                    setPanOffset({ x: 0, y: 0 });
                  }}
                  className={`transition-all rounded-full ${
                    i === activeIdx ? 'w-6 h-2 bg-white' : 'w-2 h-2 bg-white/40 hover:bg-white/70'
                  }`}
                  aria-label={`Jump to photo ${i + 1}`}
                />
              ))}
            </div>

            <span className="hidden sm:inline font-mono text-[11px] text-neutral-400">
              USE ARROWS OR DRAG TO PAN
            </span>
          </div>
        </div>
      )}
    </section>
  );
}
