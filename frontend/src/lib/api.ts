import { Product, Collection, Reel, CartResponse, CartItem } from '@/types';
import { INITIAL_PRODUCTS, INITIAL_COLLECTIONS, INITIAL_REELS } from './catalog-data';

const CONFIGURED_API = process.env.NEXT_PUBLIC_API_URL;
const isBrowser = typeof window !== 'undefined';
// In production deployment (e.g. Netlify) with no explicit API backend URL, don't attempt to ping localhost:4000
const isRemoteSiteWithoutBackend =
  isBrowser &&
  !CONFIGURED_API &&
  window.location.hostname !== 'localhost' &&
  window.location.hostname !== '127.0.0.1';

const API_BASE = CONFIGURED_API || (isRemoteSiteWithoutBackend ? '' : 'http://localhost:4000/api');

async function fetchJson<T>(url: string, options?: RequestInit): Promise<T> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 2000); // Max 2s timeout so the UI never freezes

  try {
    const res = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      cache: 'no-store',
    });

    if (!res.ok) {
      const errorText = await res.text().catch(() => '');
      throw new Error(`API error ${res.status}: ${errorText || res.statusText}`);
    }

    return res.json();
  } finally {
    clearTimeout(timeoutId);
  }
}

// Client-side LocalStorage Cart Engine for instantaneous 0ms responses on Netlify
const CART_STORAGE_KEY = 'valjons_cart_v1';
const WISHLIST_STORAGE_KEY = 'valjons_wishlist_v1';

function getLocalCart(): CartResponse {
  if (!isBrowser) {
    return {
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
  }

  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) throw new Error('empty');
    const parsed = JSON.parse(raw);
    return computeCartTotals(parsed.items || []);
  } catch {
    return computeCartTotals([]);
  }
}

function saveLocalCart(items: CartItem[]): CartResponse {
  const cart = computeCartTotals(items);
  if (isBrowser) {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // storage quota or private mode
    }
  }
  return cart;
}

function computeCartTotals(items: CartItem[]): CartResponse {
  const subtotal = items.reduce((acc, it) => acc + (it.price * it.quantity), 0);
  const itemCount = items.reduce((acc, it) => acc + it.quantity, 0);
  const threshold = 1500;
  const qualifies = subtotal >= threshold;
  const shipping = qualifies || itemCount === 0 ? 0 : 150;
  const needed = Math.max(0, threshold - subtotal);
  const total = subtotal + shipping;

  return {
    items,
    itemCount,
    subtotal,
    shipping,
    freeShippingThreshold: threshold,
    qualifiesForFreeShipping: qualifies,
    amountNeededForFreeShipping: needed,
    total,
    currency: 'INR',
  };
}

function getLocalWishlist(): number[] {
  if (!isBrowser) return [];
  try {
    const raw = localStorage.getItem(WISHLIST_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveLocalWishlist(ids: number[]) {
  if (isBrowser) {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(ids));
    } catch {}
  }
}

export const api = {
  async getProducts(params?: {
    collection?: string;
    category?: string;
    gender?: string;
    search?: string;
    limit?: number;
  }): Promise<Product[]> {
    if (API_BASE) {
      try {
        const query = new URLSearchParams();
        if (params?.collection) query.append('collection', params.collection);
        if (params?.category) query.append('category', params.category);
        if (params?.gender) query.append('gender', params.gender);
        if (params?.search) query.append('search', params.search);
        if (params?.limit) query.append('limit', params.limit.toString());
        return await fetchJson<Product[]>(`${API_BASE}/products?${query.toString()}`);
      } catch (err) {
        console.warn('Network API fetch failed, serving instant local catalog:', err);
      }
    }

    // Instant static catalog filter
    let items = [...INITIAL_PRODUCTS];

    if (params?.collection) {
      const c = params.collection.toLowerCase();
      items = items.filter((p) => p.collectionSlug.toLowerCase() === c);
    }
    if (params?.category) {
      const cat = params.category.toLowerCase();
      items = items.filter((p) => p.categorySlug?.toLowerCase() === cat);
    }
    if (params?.gender) {
      items = items.filter((p) => p.gender === 'unisex' || p.gender === params.gender);
    }
    if (params?.search) {
      const q = params.search.toLowerCase();
      items = items.filter(
        (p) => p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q),
      );
    }
    if (params?.limit) {
      items = items.slice(0, params.limit);
    }
    return items;
  },

  async getSections(): Promise<Collection[]> {
    if (API_BASE) {
      try {
        return await fetchJson<Collection[]>(`${API_BASE}/products/sections`);
      } catch {}
    }
    return INITIAL_COLLECTIONS.slice(0, 4);
  },

  async getCollections(): Promise<Collection[]> {
    if (API_BASE) {
      try {
        return await fetchJson<Collection[]>(`${API_BASE}/products/collections`);
      } catch {}
    }
    return INITIAL_COLLECTIONS;
  },

  async getProductBySlug(slug: string): Promise<Product | null> {
    if (API_BASE) {
      try {
        const item = await fetchJson<Product | null>(`${API_BASE}/products/slug/${encodeURIComponent(slug)}`);
        if (item) return item;
      } catch {}
    }
    const found = INITIAL_PRODUCTS.find((p) => p.slug === slug);
    return found || null;
  },

  async getReels(): Promise<Reel[]> {
    if (API_BASE) {
      try {
        return await fetchJson<Reel[]>(`${API_BASE}/products/reels`);
      } catch {}
    }
    return INITIAL_REELS;
  },

  // Cart (Client-accelerated)
  async getCart(sessionId: string): Promise<CartResponse> {
    if (API_BASE) {
      try {
        return await fetchJson<CartResponse>(`${API_BASE}/cart?sessionId=${encodeURIComponent(sessionId)}`);
      } catch {}
    }
    return getLocalCart();
  },

  async addToCart(
    sessionId: string,
    productId: number,
    size: string,
    quantity = 1,
  ): Promise<CartResponse> {
    if (API_BASE) {
      try {
        return await fetchJson<CartResponse>(`${API_BASE}/cart`, {
          method: 'POST',
          body: JSON.stringify({ sessionId, productId, size, quantity }),
        });
      } catch {}
    }

    const current = getLocalCart();
    const product = INITIAL_PRODUCTS.find((p) => p.id === productId);
    if (!product) return current;

    const existingIdx = current.items.findIndex(
      (it) => it.productId === productId && it.size.toLowerCase() === size.toLowerCase(),
    );

    let updatedItems = [...current.items];
    const unitPrice = parseFloat(product.price) || 0;

    if (existingIdx >= 0) {
      const existing = updatedItems[existingIdx];
      const newQty = existing.quantity + quantity;
      updatedItems[existingIdx] = {
        ...existing,
        quantity: newQty,
        total: newQty * unitPrice,
      };
    } else {
      updatedItems.push({
        id: `local_${productId}_${size}_${Date.now()}`,
        productId,
        product,
        size,
        quantity,
        price: unitPrice,
        total: quantity * unitPrice,
      });
    }

    return saveLocalCart(updatedItems);
  },

  async updateCartQuantity(
    sessionId: string,
    itemId: string | number,
    quantity: number,
  ): Promise<CartResponse> {
    if (API_BASE) {
      try {
        return await fetchJson<CartResponse>(`${API_BASE}/cart/${itemId}`, {
          method: 'PATCH',
          body: JSON.stringify({ sessionId, quantity }),
        });
      } catch {}
    }

    const current = getLocalCart();
    let updatedItems = current.items
      .map((it) => {
        if (it.id === itemId) {
          const qty = Math.max(0, quantity);
          return { ...it, quantity: qty, total: qty * it.price };
        }
        return it;
      })
      .filter((it) => it.quantity > 0);

    return saveLocalCart(updatedItems);
  },

  async removeFromCart(sessionId: string, itemId: string | number): Promise<CartResponse> {
    if (API_BASE) {
      try {
        return await fetchJson<CartResponse>(
          `${API_BASE}/cart/${itemId}?sessionId=${encodeURIComponent(sessionId)}`,
          { method: 'DELETE' },
        );
      } catch {}
    }

    const current = getLocalCart();
    const updatedItems = current.items.filter((it) => it.id !== itemId);
    return saveLocalCart(updatedItems);
  },

  async clearCart(sessionId: string): Promise<CartResponse> {
    if (API_BASE) {
      try {
        return await fetchJson<CartResponse>(
          `${API_BASE}/cart/clear?sessionId=${encodeURIComponent(sessionId)}`,
          { method: 'DELETE' },
        );
      } catch {}
    }
    return saveLocalCart([]);
  },

  // Wishlist (Client-accelerated)
  async getWishlist(
    sessionId: string,
  ): Promise<{ items: Product[]; count: number; productIds: number[] }> {
    if (API_BASE) {
      try {
        return await fetchJson<{ items: Product[]; count: number; productIds: number[] }>(
          `${API_BASE}/wishlist?sessionId=${encodeURIComponent(sessionId)}`,
        );
      } catch {}
    }

    const ids = getLocalWishlist();
    const items = INITIAL_PRODUCTS.filter((p) => ids.includes(p.id));
    return { items, count: items.length, productIds: ids };
  },

  async toggleWishlist(
    sessionId: string,
    productId: number,
  ): Promise<{ inWishlist: boolean; productId: number }> {
    if (API_BASE) {
      try {
        return await fetchJson<{ inWishlist: boolean; productId: number }>(
          `${API_BASE}/wishlist/toggle`,
          {
            method: 'POST',
            body: JSON.stringify({ sessionId, productId }),
          },
        );
      } catch {}
    }

    const ids = getLocalWishlist();
    let nextIds: number[];
    let inWishlist: boolean;

    if (ids.includes(productId)) {
      nextIds = ids.filter((id) => id !== productId);
      inWishlist = false;
    } else {
      nextIds = [...ids, productId];
      inWishlist = true;
    }

    saveLocalWishlist(nextIds);
    return { inWishlist, productId };
  },

  async checkout(orderData: any): Promise<any> {
    if (API_BASE) {
      try {
        return await fetchJson<any>(`${API_BASE}/orders`, {
          method: 'POST',
          body: JSON.stringify(orderData),
        });
      } catch {}
    }

    // Instant local order confirmation for high-converting demo checkout
    return {
      orderId: `VJ-${Date.now().toString().slice(-6)}`,
      success: true,
      message: 'Order placed successfully',
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    };
  },
};
