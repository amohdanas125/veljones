'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Lock, ArrowRight, ShieldCheck, Sparkles, ArrowLeft } from 'lucide-react';
import { useAdmin } from '@/context/AdminContext';
import ValjonsLogo from '@/components/ValjonsLogo';

export default function AdminLoginPage() {
  const router = useRouter();
  const { loginAdmin } = useAdmin();
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      const ok = loginAdmin(passcode);
      if (ok) {
        router.push('/admin/dashboard');
      } else {
        setError('Invalid Atelier Master Passkey. Try: valjons2026');
        setIsLoading(false);
      }
    }, 400);
  };

  const handleQuickDemo = () => {
    loginAdmin('valjons2026');
    router.push('/admin/dashboard');
  };

  return (
    <div className="min-h-screen w-full bg-[#0B0F17] text-white flex items-center justify-center p-4 relative overflow-hidden font-montserrat">
      {/* Glow Orbs */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-cyan-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-rose-600/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-md bg-slate-900/70 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 sm:p-10 shadow-2xl relative z-10 space-y-8 animate-in fade-in zoom-in-95 duration-300">
        {/* Brand Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex p-3 rounded-2xl bg-black border border-white/20 shadow-lg mx-auto mb-1">
            <ValjonsLogo theme="dark" size="md" showMonogram={true} />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[10px] font-mono font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Atelier Security Clearance</span>
          </div>

          <h2 className="text-2xl font-black font-poppins uppercase tracking-tight text-white">
            ADMIN GATEWAY
          </h2>
          <p className="text-xs text-neutral-400 font-montserrat max-w-xs mx-auto">
            Authorized access to VALJONS Drop 001 inventory, live sales analytics, and customer fulfillment.
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-300">
              Master Atelier Passkey
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                placeholder="Enter passkey (default: valjons2026)"
                value={passcode}
                onChange={(e) => {
                  setPasscode(e.target.value);
                  setError('');
                }}
                className="w-full bg-slate-800/80 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all font-mono"
              />
            </div>
            {error && <p className="text-xs text-rose-400 font-medium pt-1">{error}</p>}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-black font-poppins font-black text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer active:scale-98 disabled:opacity-50"
          >
            <span>{isLoading ? 'Decrypting Clearance...' : 'Authenticate & Enter'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Quick Demo Button */}
          <button
            type="button"
            onClick={handleQuickDemo}
            className="w-full py-2.5 bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white border border-white/10 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-2"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>1-Click Director Demo Login</span>
          </button>
        </form>

        {/* Back to public store */}
        <div className="pt-4 border-t border-white/10 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs text-neutral-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Public Atelier Storefront</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
