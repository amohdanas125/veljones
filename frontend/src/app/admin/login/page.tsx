'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Lock, ArrowRight, ShieldCheck, Sparkles, ArrowLeft, Flame } from 'lucide-react';
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
    <div className="min-h-screen w-full bg-[#080607] text-white flex items-center justify-center p-4 relative overflow-hidden font-montserrat">
      {/* Radiant VALJONS Crimson Glow Orbs */}
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-[#801414]/20 rounded-full blur-[170px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-[500px] h-[500px] bg-[#991B1B]/15 rounded-full blur-[170px] pointer-events-none" />

      <div className="w-full max-w-md bg-[#140D0F]/90 backdrop-blur-2xl border border-[#801414]/40 rounded-3xl p-8 sm:p-10 shadow-[0_16px_64px_rgba(0,0,0,0.8)] relative z-10 space-y-8 animate-in fade-in zoom-in-95 duration-300">
        {/* Brand Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex p-3.5 rounded-2xl bg-black/80 border border-[#801414]/40 shadow-[0_0_25px_rgba(128,20,20,0.35)] mx-auto mb-1">
            <ValjonsLogo theme="dark" size="md" showMonogram={true} showWordmark={false} />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#801414]/30 border border-[#801414]/60 text-[#FFA4A4] text-[10px] font-mono font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-[#E83D4D]" />
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
            <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#A87178]">
              Master Atelier Passkey
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#A87178] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                placeholder="Enter passkey (default: valjons2026)"
                value={passcode}
                onChange={(e) => {
                  setPasscode(e.target.value);
                  setError('');
                }}
                className="w-full bg-[#1C1215] border border-[#801414]/30 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#E83D4D] focus:ring-1 focus:ring-[#801414] transition-all font-mono"
              />
            </div>
            {error && <p className="text-xs text-[#FFA4A4] font-medium pt-1">{error}</p>}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 bg-gradient-to-r from-[#801414] via-[#991B1B] to-[#C1272D] hover:from-[#991B1B] hover:to-[#E83D4D] text-white font-poppins font-black text-xs uppercase tracking-widest rounded-xl transition-all shadow-[0_0_25px_rgba(128,20,20,0.6)] flex items-center justify-center gap-2 cursor-pointer active:scale-98 disabled:opacity-50"
          >
            <span>{isLoading ? 'Decrypting Clearance...' : 'Authenticate & Enter'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Quick Demo Button */}
          <button
            type="button"
            onClick={handleQuickDemo}
            className="w-full py-2.5 bg-[#1A1013] hover:bg-[#25151A] text-[#FFA4A4] hover:text-white border border-[#801414]/40 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#E83D4D]" />
            <span>1-Click Director Demo Login</span>
          </button>
        </form>

        {/* Back to public store */}
        <div className="pt-4 border-t border-[#801414]/20 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs text-neutral-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#FFA4A4]" />
            <span>Return to Public Atelier Storefront</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
