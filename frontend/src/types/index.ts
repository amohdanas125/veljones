export interface ProductVariant {
  id?: number;
  size: string;
  color?: string;
  colorCode?: string;
  stock?: number;
  sku?: string;
}

export interface Product {
  id: number;
  title: string;
  slug: string;
  description: string;
  details?: string[];
  price: string;
  originalPrice?: string;
  discountPercent?: number;
  badge?: string;
  categorySlug?: string;
  collectionSlug: string;
  gender?: 'unisex' | 'men' | 'women';
  isFeatured?: boolean;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  isOnSale?: boolean;
  thumbnail: string;
  images?: string[];
  variants?: ProductVariant[];
}

export interface Collection {
  id: number;
  name: string;
  slug: string;
  subtitle?: string;
  bannerImage?: string;
  displayOrder?: number;
  products?: Product[];
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
}

export interface Reel {
  id: number;
  title: string;
  videoUrl: string;
  thumbnailUrl: string;
  caption?: string;
  authorHandle?: string;
  likesCount?: number;
  duration?: string;
}

export interface CartItem {
  id: string | number;
  productId: number;
  product: Product;
  size: string;
  quantity: number;
  price: number;
  total: number;
}

export interface CartResponse {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  shipping: number;
  freeShippingThreshold: number;
  qualifiesForFreeShipping: boolean;
  amountNeededForFreeShipping: number;
  total: number;
  currency: string;
}
