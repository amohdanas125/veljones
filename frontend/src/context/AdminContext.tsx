'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, AdminOrder, CustomerRecord, OrderStatus } from '@/types';
import { INITIAL_PRODUCTS } from '@/lib/catalog-data';

const STORAGE_KEYS = {
  ADMIN_AUTH: 'valjons_admin_auth_v1',
  PRODUCTS: 'valjons_admin_products_v1',
  ORDERS: 'valjons_admin_orders_v1',
  CUSTOMERS: 'valjons_admin_customers_v1',
};

const INITIAL_SEED_ORDERS: AdminOrder[] = [
  {
    id: 'ord-101',
    orderNumber: 'VJ-892401',
    customerName: 'Anas Mohd',
    customerEmail: 'amohdanas125@gmail.com',
    customerPhone: '+91 9876543210',
    shippingAddress: 'Plot 42, Civil Lines, Near Jubilee Post',
    city: 'Gorakhpur',
    state: 'Uttar Pradesh',
    pincode: '276306',
    items: [
      {
        productId: 1,
        title: 'VALJONS STRAIGHT FIT PC FLEECE (ONYX BLACK)',
        size: 'L',
        quantity: 1,
        price: 2499,
        thumbnail: '/images/products/valjons-heavyweight-fleece.jpg',
      },
      {
        productId: 2,
        title: 'CARGO WIDE LEG PANTS (VINTAGE PINE)',
        size: 'L',
        quantity: 1,
        price: 2499,
        thumbnail: '/images/products/valjons-cargo-fleece.jpg',
      },
    ],
    totalAmount: 4998,
    paymentMethod: 'COD',
    paymentStatus: 'Pending',
    orderStatus: 'Confirmed',
    carrier: 'BlueDart Express Air',
    trackingNumber: 'BD784920194IN',
    createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(), // 45 mins ago
  },
  {
    id: 'ord-102',
    orderNumber: 'VJ-892398',
    customerName: 'Kabir Singhania',
    customerEmail: 'kabir.s@gmail.com',
    customerPhone: '+91 9988776655',
    shippingAddress: 'Tower B-1402, Lodha Bellissimo, Mahalaxmi',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400011',
    items: [
      {
        productId: 3,
        title: 'VALJONS STRAIGHT FIT PC FLEECE (HEATHER OAT)',
        size: 'M',
        quantity: 2,
        price: 2499,
        thumbnail: '/images/products/valjons-henver-polo.jpg',
      },
    ],
    totalAmount: 4998,
    paymentMethod: 'UPI',
    paymentStatus: 'Paid',
    orderStatus: 'Shipped',
    carrier: 'BlueDart Express Air',
    trackingNumber: 'BD784918442IN',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(), // 6 hours ago
  },
  {
    id: 'ord-103',
    orderNumber: 'VJ-892385',
    customerName: 'Rhea Oberoi',
    customerEmail: 'rhea.oberoi@atelier.design',
    customerPhone: '+91 9811223344',
    shippingAddress: 'Villa 18, Amaltas Avenue, DLF Phase 5',
    city: 'Gurugram',
    state: 'Haryana',
    pincode: '122002',
    items: [
      {
        productId: 5,
        title: 'DEMON SLAYER TANJIRO TEE (FOREST GREEN)',
        size: 'S',
        quantity: 1,
        price: 1299,
        thumbnail: '/images/products/valjons-drop001-minimal-silhouette.jpg',
      },
    ],
    totalAmount: 1299,
    paymentMethod: 'Card',
    paymentStatus: 'Paid',
    orderStatus: 'Delivered',
    carrier: 'BlueDart Express Air',
    trackingNumber: 'BD784905189IN',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 28).toISOString(), // Yesterday
  },
  {
    id: 'ord-104',
    orderNumber: 'VJ-892372',
    customerName: 'Devansh Verma',
    customerEmail: 'dev.verma@outlook.com',
    customerPhone: '+91 9765432109',
    shippingAddress: 'Flat 401, Silver Oak Residency, Koramangala',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560034',
    items: [
      {
        productId: 1,
        title: 'VALJONS STRAIGHT FIT PC FLEECE (ONYX BLACK)',
        size: 'XL',
        quantity: 1,
        price: 2499,
        thumbnail: '/images/products/valjons-heavyweight-fleece.jpg',
      },
    ],
    totalAmount: 2499,
    paymentMethod: 'UPI',
    paymentStatus: 'Paid',
    orderStatus: 'Processing',
    carrier: 'BlueDart Express Air',
    trackingNumber: 'BD784931200IN',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 36).toISOString(),
  },
  {
    id: 'ord-105',
    orderNumber: 'VJ-892360',
    customerName: 'Aarav Mehta',
    customerEmail: 'aarav.mehta@yahoo.com',
    customerPhone: '+91 9822334455',
    shippingAddress: '12-C, Judges Bungalow Road, Bodakdev',
    city: 'Ahmedabad',
    state: 'Gujarat',
    pincode: '380054',
    items: [
      {
        productId: 2,
        title: 'CARGO WIDE LEG PANTS (VINTAGE PINE)',
        size: 'M',
        quantity: 1,
        price: 2499,
        thumbnail: '/images/products/valjons-cargo-fleece.jpg',
      },
    ],
    totalAmount: 2499,
    paymentMethod: 'COD',
    paymentStatus: 'Pending',
    orderStatus: 'Pending',
    createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
  },
];

const INITIAL_SEED_CUSTOMERS: CustomerRecord[] = [
  {
    id: 'cust-1',
    fullName: 'Anas Mohd',
    email: 'amohdanas125@gmail.com',
    phone: '+91 9876543210',
    tier: 'Atelier Founding Member',
    totalOrders: 3,
    totalSpent: 9996,
    joinedDate: 'Nov 2026',
    lastOrderDate: 'Today',
  },
  {
    id: 'cust-2',
    fullName: 'Kabir Singhania',
    email: 'kabir.s@gmail.com',
    phone: '+91 9988776655',
    tier: 'VIP Collector',
    totalOrders: 2,
    totalSpent: 7497,
    joinedDate: 'Oct 2026',
    lastOrderDate: 'Today',
  },
  {
    id: 'cust-3',
    fullName: 'Rhea Oberoi',
    email: 'rhea.oberoi@atelier.design',
    phone: '+91 9811223344',
    tier: 'Atelier Member',
    totalOrders: 4,
    totalSpent: 12495,
    joinedDate: 'Sep 2026',
    lastOrderDate: 'Yesterday',
  },
  {
    id: 'cust-4',
    fullName: 'Devansh Verma',
    email: 'dev.verma@outlook.com',
    phone: '+91 9765432109',
    tier: 'Atelier Member',
    totalOrders: 1,
    totalSpent: 2499,
    joinedDate: 'Nov 2026',
    lastOrderDate: '2 days ago',
  },
  {
    id: 'cust-5',
    fullName: 'Aarav Mehta',
    email: 'aarav.mehta@yahoo.com',
    phone: '+91 9822334455',
    tier: 'First Time Buyer',
    totalOrders: 1,
    totalSpent: 2499,
    joinedDate: 'Nov 2026',
    lastOrderDate: 'Just now',
  },
];

interface AdminContextType {
  isAdminAuthenticated: boolean;
  adminUser: {
    name: string;
    email: string;
    role: string;
    avatar: string;
  };
  loginAdmin: (passcode: string) => boolean;
  logoutAdmin: () => void;

  // Products CRUD
  products: Product[];
  addProduct: (newProd: Omit<Product, 'id'>) => Product;
  updateProduct: (id: number, updates: Partial<Product>) => void;
  deleteProduct: (id: number) => void;

  // Orders Management
  orders: AdminOrder[];
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  updateOrderTracking: (orderId: string, carrier: string, trackingNumber: string) => void;
  createOrder: (order: Omit<AdminOrder, 'id' | 'orderNumber' | 'createdAt'>) => AdminOrder;

  // Customers
  customers: CustomerRecord[];
  addCustomer: (cust: Omit<CustomerRecord, 'id'>) => void;

  // Computed Analytics
  stats: {
    totalRevenue: number;
    totalOrders: number;
    aov: number;
    conversionRate: string;
    pendingOrdersCount: number;
    shippedOrdersCount: number;
    deliveredOrdersCount: number;
    paymentSplit: { cod: number; upi: number; card: number };
  };
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(true);
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [orders, setOrders] = useState<AdminOrder[]>(INITIAL_SEED_ORDERS);
  const [customers, setCustomers] = useState<CustomerRecord[]>(INITIAL_SEED_CUSTOMERS);

  const adminUser = {
    name: 'Andriy Melnyk',
    email: 'admin@valjons.com',
    role: 'Atelier Director',
    avatar: '/images/valjons-monogram-black.png',
  };

  // Load from LocalStorage on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const storedAuth = localStorage.getItem(STORAGE_KEYS.ADMIN_AUTH);
      if (storedAuth !== null) {
        setIsAdminAuthenticated(storedAuth === 'true');
      }

      const storedProds = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      if (storedProds) {
        setProducts(JSON.parse(storedProds));
      }

      const storedOrders = localStorage.getItem(STORAGE_KEYS.ORDERS);
      if (storedOrders) {
        setOrders(JSON.parse(storedOrders));
      }

      const storedCustomers = localStorage.getItem(STORAGE_KEYS.CUSTOMERS);
      if (storedCustomers) {
        setCustomers(JSON.parse(storedCustomers));
      }
    } catch (e) {
      console.warn('Failed to load admin storage', e);
    }
  }, []);

  // Save changes
  const saveProducts = (prods: Product[]) => {
    setProducts(prods);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(prods));
    }
  };

  const saveOrders = (ords: AdminOrder[]) => {
    setOrders(ords);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(ords));
    }
  };

  const saveCustomers = (custs: CustomerRecord[]) => {
    setCustomers(custs);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.CUSTOMERS, JSON.stringify(custs));
    }
  };

  // Auth Methods
  const loginAdmin = (passcode: string): boolean => {
    const valid = passcode === 'valjons2026' || passcode === 'admin' || passcode === '123456';
    if (valid) {
      setIsAdminAuthenticated(true);
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, 'true');
      }
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, 'false');
    }
  };

  // Products CRUD
  const addProduct = (newProd: Omit<Product, 'id'>): Product => {
    const nextId = Math.max(0, ...products.map((p) => p.id)) + 1;
    const created: Product = { ...newProd, id: nextId };
    const updated = [created, ...products];
    saveProducts(updated);
    return created;
  };

  const updateProduct = (id: number, updates: Partial<Product>) => {
    const updated = products.map((p) => (p.id === id ? { ...p, ...updates } : p));
    saveProducts(updated);
  };

  const deleteProduct = (id: number) => {
    const updated = products.filter((p) => p.id !== id);
    saveProducts(updated);
  };

  // Orders Management
  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    const updated = orders.map((o) => (o.id === orderId ? { ...o, orderStatus: status } : o));
    saveOrders(updated);
  };

  const updateOrderTracking = (orderId: string, carrier: string, trackingNumber: string) => {
    const updated = orders.map((o) =>
      o.id === orderId ? { ...o, carrier, trackingNumber, orderStatus: 'Shipped' as OrderStatus } : o
    );
    saveOrders(updated);
  };

  const createOrder = (orderData: Omit<AdminOrder, 'id' | 'orderNumber' | 'createdAt'>): AdminOrder => {
    const newOrder: AdminOrder = {
      ...orderData,
      id: `ord-${Date.now()}`,
      orderNumber: `VJ-${Math.floor(100000 + Math.random() * 900000)}`,
      createdAt: new Date().toISOString(),
    };
    const updated = [newOrder, ...orders];
    saveOrders(updated);
    return newOrder;
  };

  // Customers Management
  const addCustomer = (custData: Omit<CustomerRecord, 'id'>) => {
    const newCustomer: CustomerRecord = {
      ...custData,
      id: `cust-${Date.now()}`,
    };
    const updated = [newCustomer, ...customers];
    saveCustomers(updated);
  };

  // Computed Stats
  const totalRevenue = orders.reduce((sum, o) => (o.orderStatus !== 'Cancelled' ? sum + o.totalAmount : sum), 0);
  const totalOrders = orders.length;
  const aov = totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0;
  const conversionRate = '3.8%';
  const pendingOrdersCount = orders.filter((o) => o.orderStatus === 'Pending' || o.orderStatus === 'Confirmed').length;
  const shippedOrdersCount = orders.filter((o) => o.orderStatus === 'Shipped').length;
  const deliveredOrdersCount = orders.filter((o) => o.orderStatus === 'Delivered').length;

  const paymentSplit = orders.reduce(
    (acc, o) => {
      if (o.paymentMethod === 'COD') acc.cod += 1;
      else if (o.paymentMethod === 'UPI') acc.upi += 1;
      else acc.card += 1;
      return acc;
    },
    { cod: 0, upi: 0, card: 0 }
  );

  return (
    <AdminContext.Provider
      value={{
        isAdminAuthenticated,
        adminUser,
        loginAdmin,
        logoutAdmin,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        orders,
        updateOrderStatus,
        updateOrderTracking,
        createOrder,
        customers,
        addCustomer,
        stats: {
          totalRevenue,
          totalOrders,
          aov,
          conversionRate,
          pendingOrdersCount,
          shippedOrdersCount,
          deliveredOrdersCount,
          paymentSplit,
        },
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}
