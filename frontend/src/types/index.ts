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

export interface AdminOrderItem {
  productId: number;
  title: string;
  size: string;
  quantity: number;
  price: number;
  thumbnail: string;
}

export type OrderStatus = 'Pending' | 'Confirmed' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';

export interface AdminOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: string;
  city: string;
  state: string;
  pincode: string;
  items: AdminOrderItem[];
  totalAmount: number;
  paymentMethod: 'COD' | 'UPI' | 'Card' | 'NetBanking';
  paymentStatus: 'Paid' | 'Pending' | 'Refunded';
  orderStatus: OrderStatus;
  carrier?: string;
  trackingNumber?: string;
  createdAt: string;
}

export interface CustomerRecord {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  tier: string;
  totalOrders: number;
  totalSpent: number;
  joinedDate: string;
  lastOrderDate: string;
}

export interface HeroConfig {
  videoUrl: string;
  posterUrl: string;
  pillTag: string;
  heading: string;
  subheading: string;
  ctaText: string;
  ctaLink: string;
}

export interface PerspectiveHotspot {
  id: number;
  x: number;
  y: number;
  title: string;
  tag: string;
  spec: string;
}

export interface PerspectiveSpec {
  label: string;
  value: string;
}

export interface PerspectiveItem {
  id: number;
  tag: string;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  hotspots: PerspectiveHotspot[];
  specs: PerspectiveSpec[];
}

export interface LifestyleConfig {
  editorialTag: string;
  mainHeading: string;
  description: string;
  primaryLook: {
    lookTag: string;
    title: string;
    description: string;
    imageUrl: string;
    link: string;
  };
  secondaryLooks: {
    id: number;
    title: string;
    tag: string;
    imageUrl: string;
    link: string;
  }[];
}

