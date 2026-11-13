'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { Product, CartResponse, Reel } from '@/types';
import { api } from '@/lib/api';

interface Toast {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'error';
}

export interface UserAccount {
  fullName: string;
  email: string;
  phone: string;
  joinedDate: string;
  tier: string;
  isLoggedIn: boolean;
}

interface StoreContextType {
  sessionId: string;
  cart: CartResponse;
  wishlistIds: Set<number>;
  wishlistProducts: Product[];
  user: UserAccount | null;
  isCartOpen: boolean;
  isWishlistOpen: boolean;
  isMenuOpen: boolean;
  isSearchOpen: boolean;
  isOurStoryOpen: boolean;
  isContactOpen: boolean;
  activeQuickView: Product | null;
  activeVideoReel: Reel | null;
  toasts: Toast[];

  registerUser: (data: { fullName: string; phone: string; email: string; password?: string }) => { success: boolean; message?: string };
  loginUser: (email: string, password?: string) => { success: boolean; isNew?: boolean; notRegistered?: boolean; message?: string };
  updateUserProfile: (data: { fullName?: string; phone?: string }) => { success: boolean; message?: string };
  logoutUser: () => void;

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
  const [user, setUser] = useState<UserAccount | null>(null);
  
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isOurStoryOpen, setIsOurStoryOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [activeQuickView, setActiveQuickView] = useState<Product | null>(null);
  const [activeVideoReel, setActiveVideoReel] = useState<Reel | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Init session ID & Hydrate member state
  useEffect(() => {
    let sid = localStorage.getItem('valjons_session_id') || localStorage.getItem('224_session_id');
    if (!sid) {
      sid = `sess_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      localStorage.setItem('valjons_session_id', sid);
    }
    setSessionId(sid);

    try {
      const storedUser = localStorage.getItem('valjons_current_user_v1');
      if (storedUser) {
        const parsed = JSON.parse(storedUser);
        // Clear out placeholder phone number from previous session
        if (parsed.phone === '9876543210') {
          parsed.phone = '';
          localStorage.setItem('valjons_current_user_v1', JSON.stringify(parsed));
        }
        setUser(parsed);
      }
    } catch (e) {
      console.warn('Could not parse stored user:', e);
    }
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
    // 1. Instant optimistic state update (0ms immediate feedback)
    const willBeInWishlist = !wishlistIds.has(productId);
    setWishlistIds(prev => {
      const next = new Set(prev);
      if (willBeInWishlist) {
        next.add(productId);
        addToast('Saved to wishlist');
      } else {
        next.delete(productId);
        addToast('Removed from wishlist', 'info');
      }
      return next;
    });

    try {
      const res = await api.toggleWishlist(sessionId, productId);
      const w = await api.getWishlist(sessionId);
      setWishlistProducts(w.items || []);
    } catch (e: any) {
      console.warn('Wishlist sync fallback:', e);
    }
  };

  const isInWishlist = useCallback((productId: number) => {
    return wishlistIds.has(productId);
  }, [wishlistIds]);

  const registerUser = useCallback((data: { fullName: string; phone: string; email: string; password?: string }) => {
    try {
      const cleanEmail = data.email.trim().toLowerCase();
      const accountsRaw = localStorage.getItem('valjons_registered_users_v1');
      const accounts = accountsRaw ? JSON.parse(accountsRaw) : {};

      const now = new Date();
      const joinedDate = now.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

      const newAccount: UserAccount = {
        fullName: data.fullName.trim(),
        email: cleanEmail,
        phone: data.phone.trim(),
        joinedDate,
        tier: 'Atelier Circle',
        isLoggedIn: true,
      };

      accounts[cleanEmail] = {
        ...newAccount,
        password: data.password || '',
      };

      localStorage.setItem('valjons_registered_users_v1', JSON.stringify(accounts));
      localStorage.setItem('valjons_current_user_v1', JSON.stringify(newAccount));
      setUser(newAccount);
      addToast(`Welcome to VALJONS Atelier, ${newAccount.fullName.split(' ')[0]}!`);
      return { success: true };
    } catch (e: any) {
      console.error('Registration failed:', e);
      addToast('Registration error, please try again', 'error');
      return { success: false, message: e.message };
    }
  }, [addToast]);

  const loginUser = useCallback((email: string, password?: string) => {
    try {
      const cleanEmail = email.trim().toLowerCase();
      const accountsRaw = localStorage.getItem('valjons_registered_users_v1');
      const accounts = accountsRaw ? JSON.parse(accountsRaw) : {};

      let account = accounts[cleanEmail];
      let isNew = false;
      if (!account) {
        // Create active atelier profile on-the-fly without fake dummy phone
        isNew = true;
        const defaultName = cleanEmail.split('@')[0];
        const formattedName = defaultName.charAt(0).toUpperCase() + defaultName.slice(1);
        const newAccount: UserAccount = {
          fullName: formattedName,
          email: cleanEmail,
          phone: '',
          joinedDate: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
          tier: 'Atelier Member',
          isLoggedIn: true,
        };
        accounts[cleanEmail] = { ...newAccount, password: password || '' };
        localStorage.setItem('valjons_registered_users_v1', JSON.stringify(accounts));
        account = newAccount;
      }

      const activeUser: UserAccount = {
        fullName: account.fullName,
        email: account.email,
        phone: account.phone || '',
        joinedDate: account.joinedDate || 'Nov 2026',
        tier: account.tier || 'Atelier Member',
        isLoggedIn: true,
      };

      localStorage.setItem('valjons_current_user_v1', JSON.stringify(activeUser));
      setUser(activeUser);
      addToast(`Welcome back, ${activeUser.fullName.split(' ')[0]}!`);
      return { success: true, isNew };
    } catch (e: any) {
      console.error('Login failed:', e);
      addToast('Login error, please try again', 'error');
      return { success: false, message: e.message };
    }
  }, [addToast]);

  const updateUserProfile = useCallback((data: { fullName?: string; phone?: string }) => {
    try {
      if (!user) return { success: false, message: 'Not logged in' };

      const updatedUser: UserAccount = {
        ...user,
        fullName: data.fullName !== undefined ? data.fullName.trim() : user.fullName,
        phone: data.phone !== undefined ? data.phone.trim() : user.phone,
      };

      const cleanEmail = user.email.trim().toLowerCase();
      const accountsRaw = localStorage.getItem('valjons_registered_users_v1');
      const accounts = accountsRaw ? JSON.parse(accountsRaw) : {};
      if (accounts[cleanEmail]) {
        accounts[cleanEmail] = {
          ...accounts[cleanEmail],
          fullName: updatedUser.fullName,
          phone: updatedUser.phone,
        };
        localStorage.setItem('valjons_registered_users_v1', JSON.stringify(accounts));
      }

      localStorage.setItem('valjons_current_user_v1', JSON.stringify(updatedUser));
      setUser(updatedUser);
      addToast('Profile updated successfully!');
      return { success: true };
    } catch (e: any) {
      console.error('Update profile error:', e);
      addToast('Could not update profile', 'error');
      return { success: false, message: e.message };
    }
  }, [user, addToast]);

  const logoutUser = useCallback(() => {
    localStorage.removeItem('valjons_current_user_v1');
    setUser(null);
    addToast('Signed out of Atelier Member Portal', 'info');
  }, [addToast]);

  return (
    <StoreContext.Provider
      value={{
        sessionId,
        cart,
        wishlistIds,
        wishlistProducts,
        user,
        isCartOpen,
        isWishlistOpen,
        isMenuOpen,
        isSearchOpen,
        isOurStoryOpen,
        isContactOpen,
        activeQuickView,
        activeVideoReel,
        toasts,

        registerUser,
        loginUser,
        updateUserProfile,
        logoutUser,

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
