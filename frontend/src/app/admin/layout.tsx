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
  Flame,
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
      <div className="min-h-screen bg-[#080607] flex items-center justify-center text-white font-montserrat">
        <div className="p-8 text-center space-y-4">
          <div className="w-10 h-10 border-2 border-[#801414] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs uppercase tracking-widest text-neutral-400">Verifying Atelier Credentials...</p>
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
          badgeColor: 'bg-[#801414]/30 text-[#FFA4A4] border-[#801414]/50',
        },
        { label: 'Inventory Matrix', href: '/admin/inventory', icon: Layers },
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
    <div className="min-h-screen bg-[#080607] text-white flex flex-col font-montserrat antialiased selection:bg-[#801414] selection:text-white">
      {/* VALJONS Radiant Ambient Crimson Glow Orbs */}
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-[#801414]/20 rounded-full blur-[170px] pointer-events-none -z-10" />
      <div className="fixed bottom-0 right-1/4 w-[500px] h-[500px] bg-[#991B1B]/15 rounded-full blur-[170px] pointer-events-none -z-10" />
      <div className="fixed top-1/2 right-1/10 w-80 h-80 bg-[#C1272D]/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="flex-1 flex w-full">
        {/* Desktop Sidebar (Left) */}
        <aside className="hidden lg:flex w-72 flex-col justify-between bg-[#120B0D]/85 backdrop-blur-2xl border-r border-[#801414]/25 shrink-0 z-30 sticky top-0 h-screen p-5 shadow-[8px_0_32px_rgba(0,0,0,0.5)]">
          <div className="space-y-6">
            {/* Atelier Branding */}
            <div className="flex items-center justify-between pb-4 border-b border-[#801414]/20">
              <Link href="/admin/dashboard" className="flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#801414] via-[#520B0B] to-black border border-[#801414]/50 flex items-center justify-center p-1.5 shadow-[0_0_15px_rgba(128,20,20,0.4)] group-hover:border-[#E83D4D] transition-all">
                  <ValjonsLogo theme="dark" size="sm" showMonogram={true} showWordmark={false} />
                </div>
                <div>
                  <h1 className="font-poppins font-black text-sm tracking-[0.22em] text-white uppercase group-hover:text-[#FFA4A4] transition-colors">
                    VALJONS
                  </h1>
                  <span className="text-[10px] font-mono tracking-wider text-[#E83D4D] uppercase font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E83D4D] animate-pulse" />
                    Atelier Control v2
                  </span>
                </div>
              </Link>

              <span className="px-2 py-0.5 rounded-full bg-[#801414]/30 border border-[#801414]/60 text-[#FFA4A4] text-[9px] font-mono font-bold uppercase shadow-xs">
                Live
              </span>
            </div>

            {/* Navigation Menus */}
            <div className="space-y-5">
              {navItems.map((group, gIdx) => (
                <div key={gIdx} className="space-y-1">
                  <p className="text-[10px] font-mono font-bold tracking-[0.2em] text-[#A87178] px-3 uppercase">
                    {group.group}
                  </p>
                  <div className="space-y-1 pt-1">
                    {group.items.map((item) => {
                      const isActive = pathname === item.href;
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold tracking-wider uppercase transition-all duration-200 group ${
                            isActive
                              ? 'bg-gradient-to-r from-[#801414]/50 via-[#801414]/25 to-transparent text-white border-l-2 border-[#E83D4D] shadow-[0_0_20px_rgba(128,20,20,0.35)]'
                              : 'text-neutral-400 hover:text-white hover:bg-white/5 border border-transparent'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <Icon
                              className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                                isActive ? 'text-[#E83D4D]' : 'text-neutral-400 group-hover:text-white'
                              }`}
                            />
                            <span>{item.label}</span>
                          </div>

                          {item.badge && (
                            <span
                              className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-full border ${
                                item.badgeColor || 'bg-white/10 text-white/80 border-white/10'
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
          <div className="pt-4 border-t border-[#801414]/20 space-y-3">
            <Link
              href="/"
              target="_blank"
              className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-neutral-400 hover:text-white hover:bg-white/5 transition-colors group border border-white/5"
            >
              <div className="flex items-center gap-2">
                <ExternalLink className="w-3.5 h-3.5 text-neutral-400 group-hover:text-[#E83D4D]" />
                <span>Public Atelier Store</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 opacity-50 group-hover:translate-x-1 transition-transform" />
            </Link>

            {/* Admin Profile */}
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-gradient-to-r from-[#801414]/20 to-transparent border border-[#801414]/30">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#801414] to-[#C1272D] flex items-center justify-center font-bold text-xs text-white uppercase shadow-[0_0_12px_rgba(128,20,20,0.6)]">
                  AM
                </div>
                <div className="leading-tight">
                  <p className="text-xs font-bold text-white truncate max-w-[110px]">{adminUser.name}</p>
                  <p className="text-[10px] text-[#FFA4A4] font-mono">{adminUser.role}</p>
                </div>
              </div>

              <button
                onClick={logoutAdmin}
                title="Log Out of Admin"
                className="p-1.5 rounded-lg text-neutral-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </aside>

        {/* Mobile Header Bar & Drawer */}
        <div className="flex-1 flex flex-col min-w-0">
          <header className="sticky top-0 z-20 w-full bg-[#120B0D]/85 backdrop-blur-xl border-b border-[#801414]/20 px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4 shadow-md">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
                className="p-2 -ml-2 rounded-lg text-neutral-300 hover:text-white hover:bg-white/5 lg:hidden cursor-pointer"
                aria-label="Toggle mobile admin menu"
              >
                {isMobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>

              {/* Global Search Bar */}
              <div className="relative max-w-md w-48 sm:w-80">
                <Search className="w-3.5 h-3.5 text-[#A87178] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search orders, garments, members..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#1A1013]/90 border border-[#801414]/30 rounded-xl pl-9 pr-12 py-1.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#E83D4D] focus:ring-1 focus:ring-[#E83D4D] transition-all font-montserrat"
                />
                <span className="hidden sm:inline-block absolute right-2.5 top-1/2 -translate-y-1/2 px-1.5 py-0.5 rounded bg-white/10 text-[9px] font-mono text-neutral-400">
                  ⌘K
                </span>
              </div>
            </div>

            {/* Quick Actions & Storefront Link */}
            <div className="flex items-center gap-2 sm:gap-3">
              <Link
                href="/admin/products?action=new"
                className="px-3.5 sm:px-4 py-2 rounded-xl bg-gradient-to-r from-[#801414] via-[#991B1B] to-[#C1272D] hover:from-[#991B1B] hover:to-[#E83D4D] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(128,20,20,0.45)] flex items-center gap-1.5 cursor-pointer active:scale-95"
              >
                <Plus className="w-3.5 h-3.5 stroke-[3]" />
                <span className="hidden sm:inline">Add Garment</span>
              </Link>

              <div className="relative">
                <button
                  aria-label="Notifications"
                  className="p-2 rounded-xl bg-[#1A1013]/90 border border-[#801414]/30 text-neutral-300 hover:text-white transition-colors cursor-pointer"
                >
                  <Bell className="w-4 h-4" />
                </button>
                {stats.pendingOrdersCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#E83D4D] rounded-full ring-2 ring-[#080607] animate-pulse" />
                )}
              </div>
            </div>
          </header>

          {/* Mobile Drawer Navigation */}
          {isMobileNavOpen && (
            <div className="lg:hidden fixed inset-0 z-40 bg-black/85 backdrop-blur-md flex flex-col p-6 animate-in fade-in duration-200">
              <div className="flex items-center justify-between pb-4 border-b border-[#801414]/30">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-black border border-[#801414]/50 flex items-center justify-center p-1">
                    <ValjonsLogo theme="dark" size="sm" showMonogram={true} showWordmark={false} />
                  </div>
                  <span className="font-poppins font-black text-sm text-white">VALJONS ATELIER</span>
                </div>
                <button
                  onClick={() => setIsMobileNavOpen(false)}
                  className="p-2 text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 py-6 flex-1 overflow-y-auto">
                {navItems.map((group, idx) => (
                  <div key={idx} className="space-y-1">
                    <p className="text-[10px] font-mono font-bold text-[#A87178] px-2 uppercase">
                      {group.group}
                    </p>
                    <div className="space-y-1 pt-1">
                      {group.items.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setIsMobileNavOpen(false)}
                          className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold uppercase ${
                            pathname === item.href
                              ? 'bg-[#801414]/40 text-white border-l-2 border-[#E83D4D]'
                              : 'text-neutral-300 hover:bg-white/5'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <item.icon className="w-4 h-4 text-[#E83D4D]" />
                            <span>{item.label}</span>
                          </div>
                          {item.badge && (
                            <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-white">
                              {item.badge}
                            </span>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-[#801414]/30 flex items-center justify-between">
                <Link
                  href="/"
                  target="_blank"
                  className="text-xs font-bold uppercase text-[#FFA4A4] flex items-center gap-1.5"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Public Store</span>
                </Link>

                <button
                  onClick={logoutAdmin}
                  className="text-xs font-bold uppercase text-rose-400 flex items-center gap-1.5 cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}

          {/* Main Dynamic View Area */}
          <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto">{children}</main>
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
