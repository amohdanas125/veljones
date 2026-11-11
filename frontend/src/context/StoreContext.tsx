'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { Product, CartResponse, Reel } from '@/types';
import { api } from '@/lib/api';

interface Toast {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'error';
}

interface StoreContextType {
  sessionId: string;
  cart: CartResponse;
  wishlistIds: Set<number>;
  wishlistProducts: Product[];
  isCartOpen: boolean;
  isWishlistOpen: boolean;
  isMenuOpen: boolean;
  isSearchOpen: boolean;
  isOurStoryOpen: boolean;
  isContactOpen: boolean;
  activeQuickView: Product | null;
  activeVideoReel: Reel | null;
  toasts: Toast[];

  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  openWishlist: () => void;
  closeWishlist: () => void;
  openMenu: () => void;
  closeMenu: () => void;
  openSearch: () => void;
  closeSearch: () => void;
  openOurStory: () => void;
  closeOurStory: () => void;
  openContact: () => void;
  closeContact: () => void;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;
  openVideoReel: (reel: Reel) => void;
  closeVideoReel: () => void;

  addToCart: (productId: number, size: string, quantity?: number) => Promise<void>;
  updateCartQuantity: (itemId: string | number, quantity: number) => Promise<void>;
  removeFromCart: (itemId: string | number) => Promise<void>;
  clearCart: () => Promise<void>;
  toggleWishlist: (productId: number) => Promise<void>;
  isInWishlist: (productId: number) => boolean;
  addToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;
}

const defaultCart: CartResponse = {
  items: [],
  itemCount: 0,
  subtotal: 0,
  shipping: 0,
  freeShippingThreshold: 1500,
  qualifiesForFreeShipping: false,
  amountNeededForFreeShipping: 1500,
  total: 0,
  currency: 'INR',
};

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [sessionId, setSessionId] = useState<string>('guest_session');
  const [cart, setCart] = useState<CartResponse>(defaultCart);
  const [wishlistIds, setWishlistIds] = useState<Set<number>>(new Set());
  const [wishlistProducts, setWishlistProducts] = useState<Product[]>([]);
  
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isOurStoryOpen, setIsOurStoryOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [activeQuickView, setActiveQuickView] = useState<Product | null>(null);
  const [activeVideoReel, setActiveVideoReel] = useState<Reel | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Init session ID
  useEffect(() => {
    let sid = localStorage.getItem('valjons_session_id') || localStorage.getItem('224_session_id');
    if (!sid) {
      sid = `sess_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      localStorage.setItem('valjons_session_id', sid);
    }
    setSessionId(sid);
  }, []);

  const addToast = useCallback((message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Math.random().toString(36).substring(2);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3200);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  // Sync cart & wishlist on mount
  useEffect(() => {
    if (!sessionId) return;

    api.getCart(sessionId)
      .then(setCart)
      .catch(err => console.warn('Could not fetch cart:', err.message));

    api.getWishlist(sessionId)
      .then(res => {
        setWishlistIds(new Set(res.productIds || []));
        setWishlistProducts(res.items || []);
      })
      .catch(err => console.warn('Could not fetch wishlist:', err.message));
  }, [sessionId]);

  const addToCart = async (productId: number, size: string, quantity = 1) => {
    try {
      const updated = await api.addToCart(sessionId, productId, size, quantity);
      setCart(updated);
      setIsCartOpen(true);
      addToast(`Added to your bag (${size.toUpperCase()})`);
    } catch (e: any) {
      console.error(e);
      addToast('Could not add to bag', 'error');
    }
  };

  const updateCartQuantity = async (itemId: string | number, quantity: number) => {
    try {
      const updated = await api.updateCartQuantity(sessionId, itemId, quantity);
      setCart(updated);
    } catch (e: any) {
      console.error(e);
      addToast('Could not update quantity', 'error');
    }
  };

  const removeFromCart = async (itemId: string | number) => {
    try {
      const updated = await api.removeFromCart(sessionId, itemId);
      setCart(updated);
      addToast('Item removed from bag', 'info');
    } catch (e: any) {
      console.error(e);
    }
  };

  const clearCart = async () => {
    try {
      const updated = await api.clearCart(sessionId);
      setCart(updated);
    } catch (e: any) {
      console.error(e);
    }
  };

  const toggleWishlist = async (productId: number) => {
    try {
      const res = await api.toggleWishlist(sessionId, productId);
      setWishlistIds(prev => {
        const next = new Set(prev);
        if (res.inWishlist) {
          next.add(productId);
          addToast('Saved to wishlist');
        } else {
          next.delete(productId);
          addToast('Removed from wishlist', 'info');
        }
        return next;
      });

      // Refresh products in wishlist
      api.getWishlist(sessionId).then(w => {
        setWishlistProducts(w.items || []);
      });
    } catch (e: any) {
      console.error(e);
    }
  };

  const isInWishlist = useCallback((productId: number) => {
    return wishlistIds.has(productId);
  }, [wishlistIds]);

  return (
    <StoreContext.Provider
      value={{
        sessionId,
        cart,
        wishlistIds,
        wishlistProducts,
        isCartOpen,
        isWishlistOpen,
        isMenuOpen,
        isSearchOpen,
        isOurStoryOpen,
        isContactOpen,
        activeQuickView,
        activeVideoReel,
        toasts,

        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false),
        toggleCart: () => setIsCartOpen(prev => !prev),
        openWishlist: () => setIsWishlistOpen(true),
        closeWishlist: () => setIsWishlistOpen(false),
        openMenu: () => setIsMenuOpen(true),
        closeMenu: () => setIsMenuOpen(false),
        openSearch: () => setIsSearchOpen(true),
        closeSearch: () => setIsSearchOpen(false),
        openOurStory: () => setIsOurStoryOpen(true),
        closeOurStory: () => setIsOurStoryOpen(false),
        openContact: () => setIsContactOpen(true),
        closeContact: () => setIsContactOpen(false),
        openQuickView: (product) => setActiveQuickView(product),
        closeQuickView: () => setActiveQuickView(null),
        openVideoReel: (reel) => setActiveVideoReel(reel),
        closeVideoReel: () => setActiveVideoReel(null),

        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        toggleWishlist,
        isInWishlist,
        addToast,
        removeToast,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return ctx;
}
