'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
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

function CoverflowReelCard({
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

  const totalX = translateX + dragOffset;

  return (
    <div
      onClick={onClick}
      className="absolute cursor-pointer will-change-transform"
      style={{
        transform: `translate3d(${totalX}px, 0, 0) scale(${scale})`,
        zIndex,
        opacity,
        filter: `brightness(${brightness})`,
        transition:
          dragOffset !== 0
            ? 'none'
            : 'transform 700ms cubic-bezier(0.16, 1, 0.3, 1), opacity 700ms cubic-bezier(0.16, 1, 0.3, 1), filter 700ms cubic-bezier(0.16, 1, 0.3, 1)',
        WebkitBackfaceVisibility: 'hidden',
        backfaceVisibility: 'hidden',
      }}
    >
      <div
        className={`relative w-[270px] sm:w-[315px] md:w-[350px] lg:w-[380px] aspect-[9/16] rounded-[26px] sm:rounded-[34px] overflow-hidden bg-neutral-900 border transition-all duration-300 ${
          isCenter
            ? 'border-white/35 shadow-[0_30px_70px_rgba(0,0,0,0.98)] ring-1 ring-white/20'
            : 'border-white/10 shadow-[0_15px_40px_rgba(0,0,0,0.75)]'
        }`}
      >
        <video
          ref={videoRef}
          src={reel.videoUrl}
          poster={reel.thumbnailUrl}
          muted
          loop
          playsInline
          preload="metadata"
          className="w-full h-full object-cover object-center select-none pointer-events-none"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/10 pointer-events-none" />
      </div>
    </div>
  );
}

interface ReelsSectionProps {
  reels?: Reel[];
}

export default function ReelsSection({ reels = [] }: ReelsSectionProps) {
  const { openVideoReel } = useStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);

  const touchStartXRef = useRef<number>(0);
  const isDraggingRef = useRef<boolean>(false);

  const total = reels.length;

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-scroll ONLY on large devices. Small devices are scroll/swipe driven.
  useEffect(() => {
    if (isMobile || isPaused || total === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % total);
    }, 3400);
    return () => clearInterval(interval);
  }, [isMobile, isPaused, total]);

  const handleNext = useCallback(() => {
    if (total === 0) return;
    setCurrentIndex(prev => (prev + 1) % total);
  }, [total]);

  const handlePrev = useCallback(() => {
    if (total === 0) return;
    setCurrentIndex(prev => (prev - 1 + total) % total);
  }, [total]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    isDraggingRef.current = true;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDraggingRef.current) return;
    const delta = e.touches[0].clientX - touchStartXRef.current;
    setDragOffset(delta * 0.7);
  };

  const handleTouchEnd = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    if (dragOffset > 35) {
      handlePrev();
    } else if (dragOffset < -35) {
      handleNext();
    }
    setDragOffset(0);
  };

  if (!reels || reels.length === 0) return null;

  return (
    <section
      className="relative isolate w-full py-14 sm:py-24 bg-black text-white overflow-hidden select-none border-t border-neutral-900 scroll-mt-20 font-montserrat"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
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
              {String(total).padStart(2, '0')} COMMUNITY
            </span>
          </div>

          <div className="relative w-full flex items-center my-4 sm:my-6">
            <div className="w-full border-t border-dashed border-white/20" />
            <div className="absolute left-1/4 sm:left-1/3 -translate-x-1/2 w-5 h-5 rounded-full border border-white/60 bg-black flex items-center justify-center shadow-lg">
              <div className="w-1.5 h-1.5 rounded-full bg-white" />
            </div>
          </div>
        </div>

        <div
          className="relative w-full h-[510px] sm:h-[590px] md:h-[660px] lg:h-[710px] flex items-center justify-center my-4 sm:my-6 touch-pan-y"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <button
            onClick={handlePrev}
            aria-label="Previous reel"
            className="hidden md:flex absolute left-4 lg:left-12 z-30 w-11 h-11 rounded-full bg-black/60 hover:bg-white hover:text-black text-white border border-white/25 backdrop-blur-md items-center justify-center transition-all cursor-pointer shadow-xl"
          >
            <ChevronLeft className="w-5 h-5 stroke-[2]" />
          </button>

          <button
            onClick={handleNext}
            aria-label="Next reel"
            className="hidden md:flex absolute right-4 lg:right-12 z-30 w-11 h-11 rounded-full bg-black/60 hover:bg-white hover:text-black text-white border border-white/25 backdrop-blur-md items-center justify-center transition-all cursor-pointer shadow-xl"
          >
            <ChevronRight className="w-5 h-5 stroke-[2]" />
          </button>

          <div className="relative w-full h-full flex items-center justify-center">
            {reels.map((reel, idx) => {
              let diff = (idx - currentIndex) % total;
              if (diff > total / 2) diff -= total;
              if (diff < -total / 2) diff += total;

              const isCenter = diff === 0;
              const absDiff = Math.abs(diff);
              if (absDiff > 3) return null;

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
                    if (isCenter) openVideoReel(reel);
                    else setCurrentIndex(idx);
                  }}
                />
              );
            })}
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-center gap-3">
          <div className="text-xs sm:text-sm font-mono tracking-widest text-neutral-400 font-bold">
            {String(currentIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </div>
          <div className="w-40 sm:w-64 h-1 sm:h-1.5 bg-neutral-800 rounded-full relative overflow-hidden">
            <div
              className="absolute top-0 bottom-0 bg-white rounded-full transition-all duration-500 ease-out"
              style={{
                width: `${100 / total}%`,
                left: `${(currentIndex / total) * 100}%`,
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
