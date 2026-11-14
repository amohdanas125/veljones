'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import {
  HeroConfig,
  Reel,
  PerspectiveItem,
  PerspectiveHotspot,
  PerspectiveSpec,
  LifestyleConfig,
} from '@/types';

const STORAGE_KEYS = {
  HERO: 'valjons_media_hero_v2',
  REELS: 'valjons_media_reels_v2',
  PERSPECTIVES: 'valjons_media_perspectives_v2',
  LIFESTYLE: 'valjons_media_lifestyle_v2',
};

export const DEFAULT_HERO_CONFIG: HeroConfig = {
  videoUrl: '/videos/hero-drop-001.mp4',
  posterUrl: '/videos/hero-poster.jpg',
  pillTag: 'VALJONS DROP 001 · NOW LIVE',
  heading: 'VALJONS\nDROP 001.',
  subheading:
    'Engineered straight-fit silhouettes tailored in custom 280 GSM PC Fleece. Built for architectural pooling and endless longevity.',
  ctaText: 'Shop Drop 001',
  ctaLink: '#shop-collection',
};

export const DEFAULT_REELS: Reel[] = [
  {
    id: 1,
    title: 'VALJONS DROP 001 Haul',
    videoUrl: '/videos/reels/reel-new-collection.mp4',
    thumbnailUrl: '/images/reels/thumb-new-collection.jpg',
    authorHandle: '@valjons',
    duration: '0:30',
    likesCount: 2480,
    caption: 'Unboxing the new SS26 drops with our community #valjons #streetwear',
  },
  {
    id: 2,
    title: 'Vintage Wash Zip Denim Fit Check',
    videoUrl: '/videos/reels/reel-fit-check-denim.mp4',
    thumbnailUrl: '/images/reels/thumb-fit-check-denim.jpg',
    authorHandle: '@valjons',
    duration: '0:45',
    likesCount: 5340,
    caption: 'Engineered raw-cut armholes with heavyweight combed cotton.',
  },
  {
    id: 3,
    title: 'Pants Rotation — Drop 001',
    videoUrl: '/videos/reels/reel-streetwear-motion.mp4',
    thumbnailUrl: '/images/reels/thumb-streetwear-motion.jpg',
    authorHandle: '@valjons',
    duration: '0:28',
    likesCount: 4120,
    caption: 'Why standard tees fail after 3 washes vs 224 280GSM combed cotton #qualityfirst',
  },
  {
    id: 4,
    title: 'Summer Refined · Tailored Streetwear',
    videoUrl: '/videos/reels/reel-summer-refined.mp4',
    thumbnailUrl: '/images/reels/thumb-summer-refined.jpg',
    authorHandle: '@valjons',
    duration: '0:35',
    likesCount: 3890,
    caption: 'How to style the black wide-leg sweatpants 3 different ways',
  },
  {
    id: 5,
    title: 'Atelier Tailored Transformation',
    videoUrl: '/videos/reels/reel-suit-transformation.mp4',
    thumbnailUrl: '/images/reels/thumb-suit-transformation.jpg',
    authorHandle: '@valjons',
    duration: '0:38',
    likesCount: 6180,
    caption: 'Behind the scenes at our pattern making room #atelier',
  },
  {
    id: 6,
    title: 'Il Lago Edit Collection',
    videoUrl: '/videos/reels/reel-lago-collection.mp4',
    thumbnailUrl: '/images/reels/thumb-lago-collection.jpg',
    authorHandle: '@valjons',
    duration: '0:40',
    likesCount: 4720,
    caption: 'Editorial shoot on location #editorial',
  },
  {
    id: 7,
    title: 'Drop 001 Architectural Drape',
    videoUrl: '/videos/hero-drop-001.mp4',
    thumbnailUrl: '/videos/hero-poster.jpg',
    authorHandle: '@valjons',
    duration: '0:32',
    likesCount: 8940,
    caption: 'Zero bunching. Natural straight drape cascade.',
  },
  {
    id: 8,
    title: 'Minimal Silhouette · 280 GSM',
    videoUrl: '/videos/reels/reel-fit-check-denim.mp4',
    thumbnailUrl: '/images/products/valjons-drop001-lifestyle-fit.jpg',
    authorHandle: '@valjons',
    duration: '0:36',
    likesCount: 3410,
    caption: 'Heavyweight loopback fleece testing in real life.',
  },
];

export const DEFAULT_PERSPECTIVES: PerspectiveItem[] = [
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
        spec: 'Uncuffed perimeter maintains columnar lines rather than ballooning into jogger cuffs.',
      },
    ],
    specs: [
      { label: 'Ankle Fall Angle', value: 'Straight 90° Fall' },
      { label: 'Heel Drag Clearance', value: '1.8cm Above Insole Ground' },
      { label: 'Sneaker Stacking', value: 'Compatible with Lows & Highs' },
      { label: 'Hem Reinforcement', value: 'Double-Fold Blindstitch' },
    ],
  },
];

export const DEFAULT_LIFESTYLE_CONFIG: LifestyleConfig = {
  editorialTag: 'Editorial Lookbook',
  mainHeading: 'LIFESTYLE CAMPAIGN',
  description:
    'Shot on location. Observing the natural drape, weight, and pooling of VALJONS DROP 001 in motion.',
  primaryLook: {
    lookTag: 'Look 01 · Concrete Minimalist',
    title: 'Straight Fit in Motion',
    description:
      'Paired with vintage boxy tees. The 280 GSM fleece creates an effortless silhouette that never clings or slouches.',
    imageUrl: '/images/products/valjons-drop001-lifestyle-fit.jpg',
    link: '#shop-collection',
  },
  secondaryLooks: [
    {
      id: 1,
      title: 'Heather Melange Contour',
      tag: 'Look 02 · Tailored Neutral',
      imageUrl: '/images/products/valjons-drop001-straight-fit-polo.jpg',
      link: '#shop-collection',
    },
    {
      id: 2,
      title: 'Obsidian Structural Drape',
      tag: 'Look 03 · Monochromatic Core',
      imageUrl: '/images/products/valjons-drop001-cargo-pant-look.jpg',
      link: '#shop-collection',
    },
  ],
};

interface MediaContextType {
  heroConfig: HeroConfig;
  updateHeroConfig: (partial: Partial<HeroConfig>) => void;

  reels: Reel[];
  addReel: (reel: Omit<Reel, 'id'>) => void;
  updateReel: (id: number, partial: Partial<Reel>) => void;
  deleteReel: (id: number) => void;
  reorderReels: (fromIndex: number, toIndex: number) => void;

  perspectives: PerspectiveItem[];
  addPerspective: (perspective: Omit<PerspectiveItem, 'id'>) => void;
  updatePerspective: (id: number, partial: Partial<PerspectiveItem>) => void;
  deletePerspective: (id: number) => void;
  addHotspot: (perspectiveId: number, hotspot: Omit<PerspectiveHotspot, 'id'>) => void;
  updateHotspot: (perspectiveId: number, hotspotId: number, partial: Partial<PerspectiveHotspot>) => void;
  deleteHotspot: (perspectiveId: number, hotspotId: number) => void;

  lifestyleConfig: LifestyleConfig;
  updateLifestyleConfig: (partial: Partial<LifestyleConfig>) => void;

  resetMediaToDefaults: () => void;
}

const MediaContext = createContext<MediaContextType | undefined>(undefined);

export function MediaProvider({ children }: { children: ReactNode }) {
  const [heroConfig, setHeroConfig] = useState<HeroConfig>(DEFAULT_HERO_CONFIG);
  const [reels, setReels] = useState<Reel[]>(DEFAULT_REELS);
  const [perspectives, setPerspectives] = useState<PerspectiveItem[]>(DEFAULT_PERSPECTIVES);
  const [lifestyleConfig, setLifestyleConfig] = useState<LifestyleConfig>(DEFAULT_LIFESTYLE_CONFIG);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize from LocalStorage
  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const savedHero = localStorage.getItem(STORAGE_KEYS.HERO);
      if (savedHero) setHeroConfig(JSON.parse(savedHero));

      const savedReels = localStorage.getItem(STORAGE_KEYS.REELS);
      if (savedReels) setReels(JSON.parse(savedReels));

      const savedPerspectives = localStorage.getItem(STORAGE_KEYS.PERSPECTIVES);
      if (savedPerspectives) setPerspectives(JSON.parse(savedPerspectives));

      const savedLifestyle = localStorage.getItem(STORAGE_KEYS.LIFESTYLE);
      if (savedLifestyle) setLifestyleConfig(JSON.parse(savedLifestyle));
    } catch (err) {
      console.warn('Failed to parse saved media state:', err);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  // Save changes to LocalStorage
  useEffect(() => {
    if (!isInitialized || typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEYS.HERO, JSON.stringify(heroConfig));
    } catch {}
  }, [heroConfig, isInitialized]);

  useEffect(() => {
    if (!isInitialized || typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEYS.REELS, JSON.stringify(reels));
    } catch {}
  }, [reels, isInitialized]);

  useEffect(() => {
    if (!isInitialized || typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEYS.PERSPECTIVES, JSON.stringify(perspectives));
    } catch {}
  }, [perspectives, isInitialized]);

  useEffect(() => {
    if (!isInitialized || typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEYS.LIFESTYLE, JSON.stringify(lifestyleConfig));
    } catch {}
  }, [lifestyleConfig, isInitialized]);

  // 1. Hero CRUD
  const updateHeroConfig = useCallback((partial: Partial<HeroConfig>) => {
    setHeroConfig((prev) => ({ ...prev, ...partial }));
  }, []);

  // 2. Reels CRUD
  const addReel = useCallback((reelData: Omit<Reel, 'id'>) => {
    setReels((prev) => {
      const nextId = prev.length > 0 ? Math.max(...prev.map((r) => r.id)) + 1 : 1;
      return [...prev, { ...reelData, id: nextId }];
    });
  }, []);

  const updateReel = useCallback((id: number, partial: Partial<Reel>) => {
    setReels((prev) => prev.map((r) => (r.id === id ? { ...r, ...partial } : r)));
  }, []);

  const deleteReel = useCallback((id: number) => {
    setReels((prev) => prev.filter((r) => r.id !== id));
  }, []);

  const reorderReels = useCallback((fromIndex: number, toIndex: number) => {
    setReels((prev) => {
      if (fromIndex < 0 || toIndex < 0 || fromIndex >= prev.length || toIndex >= prev.length) {
        return prev;
      }
      const cloned = [...prev];
      const [moved] = cloned.splice(fromIndex, 1);
      cloned.splice(toIndex, 0, moved);
      return cloned;
    });
  }, []);

  // 3. Perspectives CRUD
  const addPerspective = useCallback((pData: Omit<PerspectiveItem, 'id'>) => {
    setPerspectives((prev) => {
      const nextId = prev.length > 0 ? Math.max(...prev.map((p) => p.id)) + 1 : 0;
      return [...prev, { ...pData, id: nextId }];
    });
  }, []);

  const updatePerspective = useCallback((id: number, partial: Partial<PerspectiveItem>) => {
    setPerspectives((prev) => prev.map((p) => (p.id === id ? { ...p, ...partial } : p)));
  }, []);

  const deletePerspective = useCallback((id: number) => {
    setPerspectives((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const addHotspot = useCallback(
    (perspectiveId: number, hotspotData: Omit<PerspectiveHotspot, 'id'>) => {
      setPerspectives((prev) =>
        prev.map((p) => {
          if (p.id !== perspectiveId) return p;
          const nextHotspotId =
            p.hotspots.length > 0 ? Math.max(...p.hotspots.map((h) => h.id)) + 1 : 1;
          return {
            ...p,
            hotspots: [...p.hotspots, { ...hotspotData, id: nextHotspotId }],
          };
        })
      );
    },
    []
  );

  const updateHotspot = useCallback(
    (perspectiveId: number, hotspotId: number, partial: Partial<PerspectiveHotspot>) => {
      setPerspectives((prev) =>
        prev.map((p) => {
          if (p.id !== perspectiveId) return p;
          return {
            ...p,
            hotspots: p.hotspots.map((h) => (h.id === hotspotId ? { ...h, ...partial } : h)),
          };
        })
      );
    },
    []
  );

  const deleteHotspot = useCallback((perspectiveId: number, hotspotId: number) => {
    setPerspectives((prev) =>
      prev.map((p) => {
        if (p.id !== perspectiveId) return p;
        return {
          ...p,
          hotspots: p.hotspots.filter((h) => h.id !== hotspotId),
        };
      })
    );
  }, []);

  // 4. Lifestyle CRUD
  const updateLifestyleConfig = useCallback((partial: Partial<LifestyleConfig>) => {
    setLifestyleConfig((prev) => ({ ...prev, ...partial }));
  }, []);

  // 5. Reset to Brand Factory Defaults
  const resetMediaToDefaults = useCallback(() => {
    setHeroConfig(DEFAULT_HERO_CONFIG);
    setReels(DEFAULT_REELS);
    setPerspectives(DEFAULT_PERSPECTIVES);
    setLifestyleConfig(DEFAULT_LIFESTYLE_CONFIG);

    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEYS.HERO);
      localStorage.removeItem(STORAGE_KEYS.REELS);
      localStorage.removeItem(STORAGE_KEYS.PERSPECTIVES);
      localStorage.removeItem(STORAGE_KEYS.LIFESTYLE);
    }
  }, []);

  return (
    <MediaContext.Provider
      value={{
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
      }}
    >
      {children}
    </MediaContext.Provider>
  );
}

export function useMedia() {
  const context = useContext(MediaContext);
  if (!context) {
    throw new Error('useMedia must be used within a MediaProvider');
  }
  return context;
}
