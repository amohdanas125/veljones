'use client';

import React, { useRef, useState, useEffect } from 'react';
import { X, Volume2, VolumeX, Play } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export default function VideoReelModal() {
  const { activeVideoReel, closeVideoReel } = useStore();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (activeVideoReel) {
      setIsPlaying(true);
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(() => {});
      }
    }
  }, [activeVideoReel]);

  if (!activeVideoReel) return null;

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/90 backdrop-blur-md animate-fade-in">
      {/* Close Button - Top Right */}
      <button
        onClick={closeVideoReel}
        aria-label="Close video reel"
        className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2.5 rounded-full bg-white/20 hover:bg-white text-white hover:text-black transition-colors cursor-pointer z-30"
      >
        <X className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Reel Frame (Mobile Aspect Ratio 9:16) - Clean and unobstructed video */}
      <div
        onClick={togglePlay}
        className="relative w-full max-w-[340px] sm:max-w-sm aspect-[9/16] max-h-[85vh] bg-black rounded-2xl overflow-hidden shadow-2xl cursor-pointer select-none"
      >
        <video
          ref={videoRef}
          src={activeVideoReel.videoUrl}
          poster={activeVideoReel.thumbnailUrl}
          autoPlay
          loop
          playsInline
          muted={isMuted}
          className="w-full h-full object-cover"
        />

        {/* Play/Pause Overlay Indicator on click */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 pointer-events-none">
            <div className="w-16 h-16 rounded-full bg-black/70 backdrop-blur-xs border border-white/40 flex items-center justify-center text-white">
              <Play className="w-8 h-8 fill-white translate-x-0.5" />
            </div>
          </div>
        )}

        {/* Clean Controls Overlay - Pure Sound Toggle in top corner, zero obstructing text */}
        <div className="absolute top-4 right-4 z-20 pointer-events-auto">
          <button
            onClick={toggleMute}
            aria-label={isMuted ? 'Unmute' : 'Mute'}
            className="p-2.5 rounded-full bg-black/50 backdrop-blur-xs hover:bg-black text-white transition-colors cursor-pointer border border-white/20 shadow-md"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}
