import { Product, Collection, Reel, CartResponse } from '@/types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

async function fetchJson<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    ...options,
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
}

export const api = {
  async getProducts(params?: {
    collection?: string;
    category?: string;
    gender?: string;
    search?: string;
    limit?: number;
  }): Promise<Product[]> {
    const query = new URLSearchParams();
    if (params?.collection) query.append('collection', params.collection);
    if (params?.category) query.append('category', params.category);
    if (params?.gender) query.append('gender', params.gender);
    if (params?.search) query.append('search', params.search);
    if (params?.limit) query.append('limit', params.limit.toString());

    return fetchJson<Product[]>(`${API_BASE}/products?${query.toString()}`);
  },

  async getSections(): Promise<Collection[]> {
    return fetchJson<Collection[]>(`${API_BASE}/products/sections`);
  },

  async getCollections(): Promise<Collection[]> {
    return fetchJson<Collection[]>(`${API_BASE}/products/collections`);
  },

  async getProductBySlug(slug: string): Promise<Product | null> {
    return fetchJson<Product | null>(`${API_BASE}/products/slug/${encodeURIComponent(slug)}`);
  },

  async getReels(): Promise<Reel[]> {
    return fetchJson<Reel[]>(`${API_BASE}/products/reels`);
  },

  // Cart
  async getCart(sessionId: string): Promise<CartResponse> {
    return fetchJson<CartResponse>(`${API_BASE}/cart?sessionId=${encodeURIComponent(sessionId)}`);
  },

  async addToCart(sessionId: string, productId: number, size: string, quantity = 1): Promise<CartResponse> {
    return fetchJson<CartResponse>(`${API_BASE}/cart`, {
      method: 'POST',
      body: JSON.stringify({ sessionId, productId, size, quantity }),
    });
  },

  async updateCartQuantity(sessionId: string, itemId: string | number, quantity: number): Promise<CartResponse> {
    return fetchJson<CartResponse>(`${API_BASE}/cart/${itemId}`, {
      method: 'PATCH',
      body: JSON.stringify({ sessionId, quantity }),
    });
  },

  async removeFromCart(sessionId: string, itemId: string | number): Promise<CartResponse> {
    return fetchJson<CartResponse>(`${API_BASE}/cart/${itemId}?sessionId=${encodeURIComponent(sessionId)}`, {
      method: 'DELETE',
    });
  },

  async clearCart(sessionId: string): Promise<CartResponse> {
    return fetchJson<CartResponse>(`${API_BASE}/cart/clear?sessionId=${encodeURIComponent(sessionId)}`, {
      method: 'DELETE',
    });
  },

  // Wishlist
  async getWishlist(sessionId: string): Promise<{ items: Product[]; count: number; productIds: number[] }> {
    return fetchJson<{ items: Product[]; count: number; productIds: number[] }>(
      `${API_BASE}/wishlist?sessionId=${encodeURIComponent(sessionId)}`,
    );
  },

  async toggleWishlist(sessionId: string, productId: number): Promise<{ inWishlist: boolean; productId: number }> {
    return fetchJson<{ inWishlist: boolean; productId: number }>(`${API_BASE}/wishlist/toggle`, {
      method: 'POST',
      body: JSON.stringify({ sessionId, productId }),
    });
  },

  // Checkout
  async checkout(payload: {
    sessionId: string;
    customerName: string;
    customerEmail: string;
    customerPhone?: string;
    shippingAddress: {
      street: string;
      city: string;
      state: string;
      postalCode: string;
      country: string;
    };
  }): Promise<any> {
    return fetchJson<any>(`${API_BASE}/orders/checkout`, {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },
};
