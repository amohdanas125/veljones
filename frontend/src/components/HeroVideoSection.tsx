'use client';

import React, { useRef, useState, useEffect } from 'react';
import { ArrowDown } from 'lucide-react';
import { useMedia } from '@/context/MediaContext';

export default function HeroVideoSection() {
  const { heroConfig } = useMedia();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {
        // Autoplay policy fallback
      });
    }
  }, [heroConfig.videoUrl]);

  return (
    <section className="relative w-full h-[92vh] min-h-[560px] max-h-[880px] bg-black overflow-hidden flex items-end">
      {/* Background Video starting at absolute inset-0 (full bleed under transparent header, permanently muted) */}
      <video
        ref={videoRef}
        key={heroConfig.videoUrl}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        poster={heroConfig.posterUrl}
        onLoadedData={() => setVideoLoaded(true)}
        className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000"
        style={{ opacity: videoLoaded ? 1 : 0.85 }}
      >
        <source src={heroConfig.videoUrl} type="video/mp4" />
      </video>

      {/* Cinematic Vignette Overlays: ensures text readability on all screen sizes */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/60 pointer-events-none" />
      <div className="absolute inset-0 bg-black/15 pointer-events-none" />

      {/* Hero Content - Cleanly positioned with top clearance for fixed header */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-8 pt-24 sm:pt-28 pb-10 sm:pb-16 text-white">
        <div className="max-w-2xl space-y-3.5 sm:space-y-5">
          {/* Pill Tag */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] sm:text-xs uppercase tracking-[0.18em] sm:tracking-[0.22em] text-neutral-200 font-semibold font-montserrat shadow-sm">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            {heroConfig.pillTag}
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-black uppercase tracking-tight leading-[1.05] font-poppins drop-shadow-md whitespace-pre-line">
            {heroConfig.heading}
          </h1>

          {/* Subheading */}
          <p className="text-xs sm:text-sm md:text-base text-neutral-200 font-normal leading-relaxed max-w-lg font-montserrat pr-4">
            {heroConfig.subheading}
          </p>

          {/* Action Buttons - Stacked on Mobile, Row on Desktop */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 max-w-md sm:max-w-none">
            <a
              href={heroConfig.ctaLink}
              className="w-full sm:w-auto px-7 py-3.5 sm:py-4 bg-white text-black font-bold text-xs uppercase tracking-[0.18em] hover:bg-neutral-200 hover:scale-[1.02] active:scale-[0.98] transition-all font-montserrat inline-flex items-center justify-center gap-2 shadow-xl rounded-xl"
            >
              <span>{heroConfig.ctaText}</span>
              <ArrowDown className="w-4 h-4" />
            </a>

            <a
              href="#product-features"
              className="w-full sm:w-auto px-6 py-3.5 sm:py-4 border border-white/80 text-white font-semibold text-xs uppercase tracking-[0.18em] hover:bg-white hover:text-black transition-all font-montserrat backdrop-blur-xs inline-flex items-center justify-center rounded-xl"
            >
              Fabric Specs
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
