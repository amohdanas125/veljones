'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  ShoppingBag,
  PackageCheck,
  TrendingUp,
  Users,
  Layers,
  Search,
  Bell,
  Plus,
  ExternalLink,
  LogOut,
  Menu,
  X,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  Video,
  Film,
} from 'lucide-react';
import { AdminProvider, useAdmin } from '@/context/AdminContext';
import ValjonsLogo from '@/components/ValjonsLogo';

function AdminShell({ children }: { children: React.ReactNode }) {
  const { isAdminAuthenticated, adminUser, logoutAdmin, stats } = useAdmin();
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    if (!isAdminAuthenticated && !isLoginPage) {
      router.push('/admin/login');
    }
  }, [isAdminAuthenticated, isLoginPage, router]);

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (!isAdminAuthenticated) {
    return (
      <div className="min-h-screen bg-[#F0F3F8] flex items-center justify-center text-[#111827] font-montserrat">
        <div className="p-8 text-center space-y-4 neu-flat rounded-3xl border border-white/80">
          <div className="w-10 h-10 border-3 border-black border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs uppercase tracking-widest text-[#64748B] font-bold">Verifying Atelier Credentials...</p>
        </div>
      </div>
    );
  }

  const navItems = [
    {
      group: 'ATELIER INTELLIGENCE',
      items: [
        { label: 'Overview', href: '/admin/dashboard', icon: LayoutDashboard },
        { label: 'Sales & Revenue', href: '/admin/sales', icon: TrendingUp },
      ],
    },
    {
      group: 'DROP 001 COMMERCE',
      items: [
        { label: 'Products (CRUD)', href: '/admin/products', icon: ShoppingBag, badge: 'Drop 001' },
        {
          label: 'Orders Pipeline',
          href: '/admin/orders',
          icon: PackageCheck,
          badge: stats.pendingOrdersCount > 0 ? `${stats.pendingOrdersCount}` : undefined,
          badgeColor: 'bg-black text-white',
        },
        { label: 'Inventory Matrix', href: '/admin/inventory', icon: Layers },
        { label: 'Media & Studio', href: '/admin/media', icon: Video, badge: 'Reels & Videos' },
      ],
    },
    {
      group: 'ATELIER COMMUNITY',
      items: [
        { label: 'Members & VIPs', href: '/admin/customers', icon: Users },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#F0F3F8] text-[#111827] flex flex-col font-montserrat antialiased selection:bg-black selection:text-white">
      <div className="flex-1 flex w-full">
        {/* Desktop Neumorphic Sidebar (Left) */}
        <aside className="hidden lg:flex w-72 flex-col justify-between bg-[#F0F3F8] border-r border-[#E2E8F0]/80 shadow-[6px_0_24px_rgba(209,217,230,0.6)] shrink-0 z-30 sticky top-0 h-screen p-5">
          <div className="space-y-6">
            {/* Atelier Branding */}
            <div className="flex items-center justify-between pb-4 border-b border-[#E2E8F0]">
              <Link href="/admin/dashboard" className="flex items-center gap-3 group">
                <div className="w-11 h-11 rounded-2xl neu-flat flex items-center justify-center p-2 border border-white/80 group-hover:shadow-[inset_2px_2px_5px_#d1d9e6,inset_-2px_-2px_5px_#ffffff] transition-all">
                  <ValjonsLogo theme="light" size="sm" showMonogram={true} showWordmark={false} />
                </div>
                <div>
                  <h1 className="font-poppins font-black text-sm tracking-[0.22em] text-[#0A0A0A] uppercase transition-colors">
                    VALJONS
                  </h1>
                  <span className="text-[10px] font-mono tracking-wider text-[#64748B] uppercase font-bold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Atelier Control v2
                  </span>
                </div>
              </Link>

              <span className="px-2.5 py-1 rounded-full neu-flat-sm text-[#0A0A0A] text-[9px] font-mono font-bold uppercase border border-white/80">
                Live
              </span>
            </div>

            {/* Navigation Menus */}
            <div className="space-y-6">
              {navItems.map((group, gIdx) => (
                <div key={gIdx} className="space-y-1.5">
                  <p className="text-[10px] font-mono font-bold tracking-[0.2em] text-[#94A3B8] px-3 uppercase">
                    {group.group}
                  </p>
                  <div className="space-y-1.5 pt-1">
                    {group.items.map((item) => {
                      const isActive = pathname === item.href;
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={`flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-bold tracking-wider uppercase transition-all duration-200 group ${
                            isActive
                              ? 'neu-btn-dark bg-[#0A0A0A] text-white shadow-[4px_4px_12px_rgba(10,10,10,0.25)]'
                              : 'text-[#475569] hover:text-[#0A0A0A] neu-flat-sm hover:neu-flat border border-white/60'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <Icon
                              className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                                isActive ? 'text-white' : 'text-[#64748B] group-hover:text-black'
                              }`}
                            />
                            <span>{item.label}</span>
                          </div>

                          {item.badge && (
                            <span
                              className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-full ${
                                isActive
                                  ? 'bg-white/20 text-white'
                                  : 'neu-inset text-black border border-white/40'
                              }`}
                            >
                              {item.badge}
                            </span>
                          )}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer User & Store Link */}
          <div className="pt-4 border-t border-[#E2E8F0] space-y-3">
            <Link
              href="/"
              target="_blank"
              className="flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-bold text-[#475569] hover:text-black neu-flat-sm hover:neu-flat transition-all group border border-white/60"
            >
              <div className="flex items-center gap-2">
                <ExternalLink className="w-3.5 h-3.5 text-[#64748B] group-hover:text-black" />
                <span>Public Atelier Store</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 opacity-50 group-hover:translate-x-1 transition-transform" />
            </Link>

            {/* Admin Profile */}
            <div className="flex items-center justify-between p-2.5 rounded-2xl neu-flat border border-white/80">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#0A0A0A] text-white flex items-center justify-center font-bold text-xs uppercase shadow-md">
                  AM
                </div>
                <div className="leading-tight">
                  <p className="text-xs font-bold text-[#0A0A0A] truncate max-w-[110px]">{adminUser.name}</p>
                  <p className="text-[10px] text-[#64748B] font-mono font-medium">{adminUser.role}</p>
                </div>
              </div>

              <button
                onClick={logoutAdmin}
                title="Log Out of Admin"
                className="p-2 rounded-xl neu-btn text-[#64748B] hover:text-rose-600 transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </aside>

        {/* Header Bar & Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          <header className="sticky top-0 z-20 w-full bg-[#F0F3F8]/90 backdrop-blur-xl border-b border-[#E2E8F0] px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4 shadow-[0_4px_16px_rgba(209,217,230,0.4)]">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
                className="p-2.5 rounded-2xl neu-btn text-[#0A0A0A] lg:hidden cursor-pointer"
                aria-label="Toggle mobile admin menu"
              >
                {isMobileNavOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>

              {/* Global Search Bar (Neumorphic Inset) */}
              <div className="relative max-w-md w-48 sm:w-80">
                <Search className="w-3.5 h-3.5 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search orders, garments, members..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full neu-inset rounded-2xl pl-10 pr-12 py-2 text-xs text-[#0A0A0A] placeholder-[#94A3B8] border border-white/50 focus:outline-none focus:ring-2 focus:ring-black/10 transition-all font-montserrat"
                />
                <span className="hidden sm:inline-block absolute right-2.5 top-1/2 -translate-y-1/2 px-1.5 py-0.5 rounded-lg neu-flat-sm text-[9px] font-mono font-bold text-[#64748B] border border-white/80">
                  ⌘K
                </span>
              </div>
            </div>

            {/* Quick Actions & Storefront Link */}
            <div className="flex items-center gap-2 sm:gap-3">
              <Link
                href="/admin/products?action=new"
                className="px-4 py-2.5 rounded-2xl neu-btn-dark bg-[#0A0A0A] hover:bg-black text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
              >
                <Plus className="w-3.5 h-3.5 stroke-[3]" />
                <span className="hidden sm:inline">Add Garment</span>
              </Link>

              <div className="relative">
                <button
                  aria-label="Notifications"
                  className="p-2.5 rounded-2xl neu-btn border border-white/80 text-[#0A0A0A] hover:text-black transition-colors cursor-pointer"
                >
                  <Bell className="w-4 h-4" />
                </button>
                {stats.pendingOrdersCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-rose-500 rounded-full ring-2 ring-[#F0F3F8] animate-pulse" />
                )}
              </div>
            </div>
          </header>

          {/* Mobile Drawer Navigation */}
          {isMobileNavOpen && (
            <div className="lg:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-md flex flex-col p-6 animate-in fade-in duration-200">
              <div className="w-full max-w-xs bg-[#F0F3F8] rounded-3xl p-6 neu-flat shadow-2xl h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-[#E2E8F0]">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-2xl neu-flat flex items-center justify-center p-1.5 border border-white/80">
                        <ValjonsLogo theme="light" size="sm" showMonogram={true} showWordmark={false} />
                      </div>
                      <span className="font-poppins font-black text-sm text-[#0A0A0A]">VALJONS ATELIER</span>
                    </div>
                    <button
                      onClick={() => setIsMobileNavOpen(false)}
                      className="p-2 rounded-xl neu-btn text-black cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-4 py-6 overflow-y-auto">
                    {navItems.map((group, idx) => (
                      <div key={idx} className="space-y-1">
                        <p className="text-[10px] font-mono font-bold text-[#94A3B8] px-2 uppercase">
                          {group.group}
                        </p>
                        <div className="space-y-1.5 pt-1">
                          {group.items.map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              onClick={() => setIsMobileNavOpen(false)}
                              className={`flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-bold uppercase ${
                                pathname === item.href
                                  ? 'neu-btn-dark bg-[#0A0A0A] text-white'
                                  : 'text-[#475569] neu-flat-sm'
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <item.icon className="w-4 h-4" />
                                <span>{item.label}</span>
                              </div>
                              {item.badge && (
                                <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-full bg-white/20 text-white">
                                  {item.badge}
                                </span>
                              )}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E2E8F0] flex items-center justify-between">
                  <Link
                    href="/"
                    target="_blank"
                    className="text-xs font-bold uppercase text-[#0A0A0A] flex items-center gap-1.5"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Public Store</span>
                  </Link>

                  <button
                    onClick={logoutAdmin}
                    className="text-xs font-bold uppercase text-rose-600 flex items-center gap-1.5"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Exit</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Main Dynamic Viewport */}
          <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto animate-fade-in">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminProvider>
      <AdminShell>{children}</AdminShell>
    </AdminProvider>
  );
}
