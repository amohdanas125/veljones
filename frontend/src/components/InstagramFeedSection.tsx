'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { useMedia } from '@/context/MediaContext';
import { Reel } from '@/types';

interface CoverflowReelCardProps {
  reel: Reel;
  isCenter: boolean;
  translateX: number;
  scale: number;
  zIndex: number;
  opacity: number;
  brightness: number;
  dragOffset: number;
  onClick: () => void;
}

// Sub-component: Ensures ONLY the single front/center video plays, memoized for buttery 60/120 FPS
const CoverflowReelCard = React.memo(function CoverflowReelCard({
  reel,
  isCenter,
  translateX,
  scale,
  zIndex,
  opacity,
  brightness,
  dragOffset,
  onClick,
}: CoverflowReelCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isCenter) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [isCenter]);

  // Real-time gesture translation for ultra-smooth responsiveness
  const totalX = translateX + dragOffset;

  return (
    <div
      onClick={onClick}
      className="absolute cursor-pointer will-change-transform select-none"
      style={{
        transform: `translate3d(${totalX}px, 0, 0) scale(${scale})`,
        zIndex,
        opacity,
        transition:
          dragOffset !== 0
            ? 'none'
            : 'transform 500ms cubic-bezier(0.16, 1, 0.3, 1), opacity 500ms cubic-bezier(0.16, 1, 0.3, 1)',
        WebkitBackfaceVisibility: 'hidden',
        backfaceVisibility: 'hidden',
      }}
    >
      {/* Card Container - Enlarged to match reference screenshot */}
      <div
        className={`relative w-[270px] sm:w-[315px] md:w-[350px] lg:w-[380px] aspect-[9/16] rounded-[26px] sm:rounded-[34px] overflow-hidden bg-neutral-900 border transition-all duration-300 ${
          isCenter
            ? 'border-white/35 shadow-[0_30px_70px_rgba(0,0,0,0.98)] ring-1 ring-white/20'
            : 'border-white/10 shadow-[0_15px_40px_rgba(0,0,0,0.75)]'
        }`}
      >
        {isCenter ? (
          <video
            ref={videoRef}
            src={reel.videoUrl}
            poster={reel.thumbnailUrl}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="w-full h-full object-cover object-center select-none pointer-events-none"
          />
        ) : (
          <img
            src={reel.thumbnailUrl}
            alt={reel.title}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover object-center select-none pointer-events-none"
          />
        )}

        {/* High performance hardware-accelerated dark scrim (eliminates GPU shader filter lag) */}
        <div
          className="absolute inset-0 bg-black pointer-events-none transition-opacity duration-300"
          style={{ opacity: 1 - brightness }}
        />

        {/* Subtle Scrim for Depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/15 pointer-events-none" />
      </div>
    </div>
  );
});

export default function InstagramFeedSection() {
  const { openVideoReel } = useStore();
  const { reels: instaReels } = useMedia();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);

  // High-performance Touch & Gesture tracking with Directional Locking
  const touchStartRef = useRef<{ x: number; y: number; time: number }>({ x: 0, y: 0, time: 0 });
  const isSwipingHorizontalRef = useRef<boolean | null>(null);
  const isDraggingRef = useRef<boolean>(false);
  const rafIdRef = useRef<number | null>(null);

  const total = instaReels.length;

  // Responsive device detection
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // AUTO-SCROLL: ONLY on large devices (desktop / screens >= 768px).
  // On small devices, auto-scrolling is disabled (100% smooth scroll/gesture-driven).
  useEffect(() => {
    if (isMobile || isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % total);
    }, 3800);

    return () => clearInterval(interval);
  }, [isMobile, isPaused, total]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // TOUCH GESTURES: Designed with Directional Locking and Velocity Detection for Small Devices
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    touchStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now(),
    };
    isSwipingHorizontalRef.current = null;
    isDraggingRef.current = true;
    setIsPaused(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDraggingRef.current) return;
    const touch = e.touches[0];
    const deltaX = touch.clientX - touchStartRef.current.x;
    const deltaY = touch.clientY - touchStartRef.current.y;

    // Directional locking: Don't hijack vertical page scrolling
    if (isSwipingHorizontalRef.current === null) {
      if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > 8) {
        // User intends to scroll the page vertically
        isSwipingHorizontalRef.current = false;
        return;
      } else if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 8) {
        // User intends to swipe the coverflow horizontally
        isSwipingHorizontalRef.current = true;
      }
    }

    if (isSwipingHorizontalRef.current) {
      // Throttle with requestAnimationFrame for 60/120 FPS buttery smoothness
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = requestAnimationFrame(() => {
        setDragOffset(deltaX * 0.72);
      });
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;

    if (isSwipingHorizontalRef.current) {
      const touch = e.changedTouches[0];
      const deltaX = touch.clientX - touchStartRef.current.x;
      const deltaTime = Math.max(1, Date.now() - touchStartRef.current.time);
      const velocityX = deltaX / deltaTime; // px per ms

      // Fast flick (velocity > 0.3 px/ms) or drag distance > 35px triggers transition
      if (deltaX > 35 || velocityX > 0.3) {
        handlePrev();
      } else if (deltaX < -35 || velocityX < -0.3) {
        handleNext();
      }
    }

    isSwipingHorizontalRef.current = null;
    setDragOffset(0);
  };

  // MOUSE DRAG (Desktop)
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsPaused(true);
    touchStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      time: Date.now(),
    };
    isDraggingRef.current = true;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - touchStartRef.current.x;
    if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    rafIdRef.current = requestAnimationFrame(() => {
      setDragOffset(deltaX * 0.65);
    });
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    const deltaX = e.clientX - touchStartRef.current.x;
    if (deltaX > 40) {
      handlePrev();
    } else if (deltaX < -40) {
      handleNext();
    }
    setDragOffset(0);
  };

  return (
    <section
      id="instagram-feed"
      className="relative isolate w-full py-14 sm:py-24 bg-black text-white overflow-hidden select-none border-t border-neutral-900 scroll-mt-20 font-montserrat"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Top Header Matching reference screenshot:
            Outlined COMMUNITY title, Subhead tag, and Dashed Waypoint Line */}
        <div className="text-center sm:text-left mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
            <h2
              className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white font-poppins"
              style={{
                WebkitTextStroke: '1.5px rgba(255, 255, 255, 0.45)',
                color: 'transparent',
              }}
            >
              COMMUNITY
            </h2>
            <span className="text-[11px] sm:text-xs font-mono font-bold tracking-[0.25em] text-[#DC2626] uppercase">
              {String(currentIndex + 1).padStart(2, '0')} COMMUNITY
            </span>
          </div>

          {/* Dashed Line across the screen with Circular Waypoint Indicator */}
          <div className="relative w-full flex items-center my-4 sm:my-6">
            <div className="w-full border-t border-dashed border-white/20" />
            <div
              className="absolute -translate-x-1/2 w-5 h-5 rounded-full border border-white/60 bg-black flex items-center justify-center shadow-lg transition-all duration-500 ease-out"
              style={{
                left: `${15 + (currentIndex / (total - 1)) * 70}%`,
              }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-white" />
            </div>
          </div>
        </div>

        {/* 3D Stacked Coverflow Stage Container - Expanded Height for Large Cards */}
        <div
          className="relative w-full h-[510px] sm:h-[590px] md:h-[660px] lg:h-[710px] flex items-center justify-center my-4 sm:my-6 touch-pan-y"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {/* Previous Arrow Button (Desktop) */}
          <button
            onClick={handlePrev}
            aria-label="Previous reel slide"
            className="hidden md:flex absolute left-4 lg:left-12 z-30 w-12 h-12 rounded-full bg-black/60 hover:bg-white hover:text-black text-white border border-white/25 backdrop-blur-md items-center justify-center transition-all cursor-pointer shadow-xl active:scale-95"
          >
            <ChevronLeft className="w-5 h-5 stroke-[2]" />
          </button>

          {/* Next Arrow Button (Desktop) */}
          <button
            onClick={handleNext}
            aria-label="Next reel slide"
            className="hidden md:flex absolute right-4 lg:right-12 z-30 w-12 h-12 rounded-full bg-black/60 hover:bg-white hover:text-black text-white border border-white/25 backdrop-blur-md items-center justify-center transition-all cursor-pointer shadow-xl active:scale-95"
          >
            <ChevronRight className="w-5 h-5 stroke-[2]" />
          </button>

          {/* Fanned 3D Cards */}
          <div className="relative w-full h-full flex items-center justify-center">
            {instaReels.map((reel, idx) => {
              // Calculate circular signed offset relative to active card
              let diff = (idx - currentIndex) % total;
              if (diff > total / 2) diff -= total;
              if (diff < -total / 2) diff += total;

              const isCenter = diff === 0;
              const absDiff = Math.abs(diff);

              // Don't render cards that are far away
              if (absDiff > 3) return null;

              // Compute smooth coverflow transforms matching reference screenshot
              let translateX = 0;
              let scale = 1;
              let zIndex = 30;
              let opacity = 1;
              let brightness = 1;

              if (diff === 0) {
                translateX = 0;
                scale = 1;
                zIndex = 30;
                opacity = 1;
                brightness = 1;
              } else if (diff === 1) {
                translateX = isMobile ? 85 : 210;
                scale = isMobile ? 0.90 : 0.89;
                zIndex = 20;
                opacity = 0.82;
                brightness = 0.68;
              } else if (diff === -1) {
                translateX = isMobile ? -85 : -210;
                scale = isMobile ? 0.90 : 0.89;
                zIndex = 20;
                opacity = 0.82;
                brightness = 0.68;
              } else if (diff === 2) {
                translateX = isMobile ? 150 : 380;
                scale = isMobile ? 0.80 : 0.78;
                zIndex = 10;
                opacity = 0.50;
                brightness = 0.45;
              } else if (diff === -2) {
                translateX = isMobile ? -150 : -380;
                scale = isMobile ? 0.80 : 0.78;
                zIndex = 10;
                opacity = 0.50;
                brightness = 0.45;
              } else if (diff === 3) {
                translateX = isMobile ? 195 : 510;
                scale = 0.68;
                zIndex = 5;
                opacity = 0.22;
                brightness = 0.35;
              } else if (diff === -3) {
                translateX = isMobile ? -195 : -510;
                scale = 0.68;
                zIndex = 5;
                opacity = 0.22;
                brightness = 0.35;
              }

              return (
                <CoverflowReelCard
                  key={reel.id}
                  reel={reel}
                  isCenter={isCenter}
                  translateX={translateX}
                  scale={scale}
                  zIndex={zIndex}
                  opacity={opacity}
                  brightness={brightness}
                  dragOffset={dragOffset}
                  onClick={() => {
                    if (isCenter) {
                      openVideoReel(reel);
                    } else {
                      setCurrentIndex(idx);
                    }
                  }}
                />
              );
            })}
          </div>
        </div>

        {/* Footer Area Matching Reference Screenshot:
            Slide index counter (04 / 08) + Segmented dash indicators */}
        <div className="mt-6 sm:mt-8 flex flex-col items-center justify-center gap-3">
          {/* Monospace slide counter */}
          <div className="text-xs sm:text-sm font-mono tracking-widest text-neutral-400 font-bold">
            {String(currentIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </div>

          {/* Segmented Dash Indicator Bars matching user screenshot */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {instaReels.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                aria-label={`Jump to reel ${i + 1}`}
                className={`h-1 sm:h-1.5 rounded-full transition-all duration-400 cursor-pointer ${
                  currentIndex === i
                    ? 'w-8 sm:w-12 bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]'
                    : 'w-4 sm:w-6 bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
