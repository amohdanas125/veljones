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
    <div className="min-h-screen w-full bg-[#F0F3F8] text-[#111827] flex items-center justify-center p-4 relative overflow-hidden font-montserrat">
      <div className="w-full max-w-md neu-flat rounded-3xl p-8 sm:p-10 border border-white/90 shadow-2xl relative z-10 space-y-8 animate-in fade-in zoom-in-95 duration-300">
        {/* Brand Header */}
        <div className="text-center space-y-3">
          <div className="w-14 h-14 rounded-3xl neu-flat flex items-center justify-center p-3 border border-white/80 mx-auto shadow-md">
            <ValjonsLogo theme="light" size="md" showMonogram={true} showWordmark={false} />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full neu-inset text-[#0A0A0A] text-[10px] font-mono font-bold uppercase tracking-wider border border-white/60">
            <ShieldCheck className="w-3.5 h-3.5 text-black" />
            <span>Atelier Security Clearance</span>
          </div>

          <h2 className="text-2xl font-black font-poppins uppercase tracking-tight text-[#0A0A0A]">
            ADMIN GATEWAY
          </h2>
          <p className="text-xs text-[#64748B] font-montserrat max-w-xs mx-auto">
            Authorized access to VALJONS Drop 001 inventory, live sales analytics, and customer fulfillment.
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#64748B]">
              Master Atelier Passkey
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                placeholder="Enter passkey (default: valjons2026)"
                value={passcode}
                onChange={(e) => {
                  setPasscode(e.target.value);
                  setError('');
                }}
                className="w-full neu-inset rounded-2xl pl-10 pr-4 py-3 text-sm text-[#0A0A0A] placeholder-[#94A3B8] border border-white/50 focus:outline-none focus:ring-2 focus:ring-black/10 transition-all font-mono"
              />
            </div>
            {error && <p className="text-xs text-rose-600 font-medium pt-1">{error}</p>}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 neu-btn-dark bg-[#0A0A0A] hover:bg-black text-white font-poppins font-black text-xs uppercase tracking-widest rounded-2xl transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer active:scale-98 disabled:opacity-50"
          >
            <span>{isLoading ? 'Decrypting Clearance...' : 'Authenticate & Enter'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Quick Demo Button */}
          <button
            type="button"
            onClick={handleQuickDemo}
            className="w-full py-3 neu-btn text-[#0A0A0A] hover:text-black border border-white/80 rounded-2xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-2"
          >
            <Sparkles className="w-3.5 h-3.5 text-black" />
            <span>1-Click Director Demo Login</span>
          </button>
        </form>

        {/* Back to public store */}
        <div className="pt-4 border-t border-[#E2E8F0] text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#64748B] hover:text-black transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-black" />
            <span>Return to Public Atelier Storefront</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
