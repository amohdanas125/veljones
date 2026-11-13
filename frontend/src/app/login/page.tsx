'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Mail,
  Lock,
  ArrowRight,
  ShieldCheck,
  Eye,
  EyeOff,
  User,
  LogOut,
  Sparkles,
  ShoppingBag,
  Heart,
  Compass,
} from 'lucide-react';
import ValjonsLogo from '@/components/ValjonsLogo';
import { useStore } from '@/context/StoreContext';

export default function LoginPage() {
  const router = useRouter();
  const { user, loginUser, registerUser, logoutUser, addToast } = useStore();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (isLogin) {
      if (!email.trim() || !email.includes('@')) {
        setErrorMsg('Please enter a valid email address.');
        return;
      }
      setLoading(true);
      setTimeout(() => {
        const res = loginUser(email, password);
        setLoading(false);
        if (!res.success) {
          setErrorMsg(res.message || 'Unable to sign in. Please try again.');
        }
      }, 400);
    } else {
      if (fullName.trim().length < 2) {
        setErrorMsg('Please enter your full name (minimum 2 characters).');
        return;
      }
      if (phone.length !== 10) {
        setErrorMsg('Please enter a valid 10-digit Indian mobile number.');
        return;
      }
      if (!email.includes('@') || !email.includes('.')) {
        setErrorMsg('Please enter a valid email address.');
        return;
      }
      if (password.length < 6) {
        setErrorMsg('Password must be at least 6 characters.');
        return;
      }

      setLoading(true);
      setTimeout(() => {
        const res = registerUser({ fullName, phone, email, password });
        setLoading(false);
        if (!res.success) {
          setErrorMsg(res.message || 'Registration failed. Please try again.');
        }
      }, 400);
    }
  };

  // If user is logged in, show Atelier Member Dashboard
  if (user) {
    return (
      <div className="w-full min-h-screen bg-[#F6F5F2] font-montserrat flex items-center justify-center px-4 py-28 selection:bg-black selection:text-white">
        <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl border border-neutral-200 overflow-hidden">
          {/* Header */}
          <div className="bg-[#EAE6E2] py-8 px-6 text-center border-b border-neutral-300/80">
            <div className="flex justify-center mb-2">
              <ValjonsLogo theme="light" size="lg" />
            </div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-600 font-montserrat">
              ATELIER MEMBER PORTAL
            </p>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            {/* User Profile Card */}
            <div className="p-5 bg-neutral-50 rounded-xl border border-neutral-200/80 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center font-poppins font-black text-lg">
                    {user.fullName.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h2 className="font-poppins font-black text-base uppercase text-black">
                      {user.fullName}
                    </h2>
                    <p className="text-xs text-neutral-500 font-montserrat lowercase">
                      {user.email}
                    </p>
                  </div>
                </div>
                <span className="px-2.5 py-1 bg-[#801414] text-white text-[10px] font-bold uppercase tracking-wider rounded-md">
                  {user.tier}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-neutral-200 text-xs text-neutral-600">
                <div>
                  <span className="text-[10px] font-bold uppercase text-neutral-400 block tracking-wider">
                    Mobile
                  </span>
                  <span className="font-semibold text-black">+91 {user.phone || '9876543210'}</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase text-neutral-400 block tracking-wider">
                    Member Since
                  </span>
                  <span className="font-semibold text-black">{user.joinedDate}</span>
                </div>
              </div>
            </div>

            {/* Exclusive Atelier Benefits */}
            <div className="space-y-2.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block">
                Privileges Active
              </span>
              <div className="p-3.5 bg-emerald-50/80 border border-emerald-200 rounded-lg flex items-center gap-2.5 text-xs text-emerald-800 font-medium">
                <Sparkles className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Drop 001 Priority Checkout & Free Express Courier Active</span>
              </div>
            </div>

            {/* Member Quick Links */}
            <div className="space-y-2 pt-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block">
                Quick Navigation
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <Link
                  href="/#shop-collection"
                  className="p-3 border border-neutral-200 hover:border-black rounded-lg text-xs font-bold uppercase tracking-wider text-black flex items-center justify-between group transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4 text-neutral-500 group-hover:text-black" />
                    Drop 001 Shop
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-black" />
                </Link>

                <Link
                  href="/wishlist"
                  className="p-3 border border-neutral-200 hover:border-black rounded-lg text-xs font-bold uppercase tracking-wider text-black flex items-center justify-between group transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-neutral-500 group-hover:text-black" />
                    My Wishlist
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-black" />
                </Link>

                <Link
                  href="/why-valjons"
                  className="p-3 border border-neutral-200 hover:border-black rounded-lg text-xs font-bold uppercase tracking-wider text-black flex items-center justify-between group transition-colors sm:col-span-2"
                >
                  <span className="flex items-center gap-2">
                    <Compass className="w-4 h-4 text-neutral-500 group-hover:text-black" />
                    Why VALJONS · 4 Pillars
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-black" />
                </Link>
              </div>
            </div>

            {/* Logout CTA */}
            <div className="pt-4 border-t border-neutral-200">
              <button
                onClick={logoutUser}
                className="w-full py-3.5 border border-neutral-300 hover:border-red-600 hover:bg-red-50 text-neutral-700 hover:text-red-700 text-xs font-bold uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out of Atelier</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If not logged in, show Form with Tabs
  return (
    <div className="w-full min-h-screen bg-[#F6F5F2] font-montserrat flex items-center justify-center px-4 py-28 selection:bg-black selection:text-white">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-neutral-200 overflow-hidden">
        {/* Top Brand Banner */}
        <div className="bg-[#EAE6E2] py-8 px-6 text-center border-b border-neutral-300/80">
          <div className="flex justify-center mb-2">
            <ValjonsLogo theme="light" size="lg" />
          </div>
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-600 font-montserrat">
            ATELIER MEMBER PORTAL
          </p>
        </div>

        {/* Tab Switcher: Sign In vs Create Account */}
        <div className="grid grid-cols-2 border-b border-neutral-200 text-xs font-bold uppercase tracking-wider font-poppins">
          <button
            onClick={() => {
              setIsLogin(true);
              setErrorMsg('');
            }}
            className={`py-4 text-center transition-colors cursor-pointer ${
              isLogin
                ? 'text-black border-b-2 border-black bg-white'
                : 'text-neutral-400 bg-neutral-50 hover:text-neutral-700'
            }`}
          >
            SIGN IN
          </button>
          <button
            onClick={() => {
              setIsLogin(false);
              setErrorMsg('');
            }}
            className={`py-4 text-center transition-colors cursor-pointer ${
              !isLogin
                ? 'text-black border-b-2 border-black bg-white'
                : 'text-neutral-400 bg-neutral-50 hover:text-neutral-700'
            }`}
          >
            CREATE ACCOUNT
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-4">
          {!isLogin && (
            <>
              {/* Full Name */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-700 block">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-neutral-50 border border-neutral-300 text-xs text-black placeholder:text-neutral-400 focus:outline-none focus:border-black rounded-lg transition-colors"
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-700 block">
                  Mobile Number (India)
                </label>
                <div className="relative flex">
                  <span className="inline-flex items-center px-3 text-xs font-bold text-neutral-600 bg-neutral-100 border border-r-0 border-neutral-300 rounded-l-lg">
                    +91
                  </span>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    placeholder="10-digit number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                    className="w-full px-3.5 py-3 bg-neutral-50 border border-neutral-300 text-xs text-black placeholder:text-neutral-400 focus:outline-none focus:border-black rounded-r-lg transition-colors"
                  />
                </div>
              </div>
            </>
          )}

          {/* Email */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-700 block">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-neutral-50 border border-neutral-300 text-xs text-black placeholder:text-neutral-400 focus:outline-none focus:border-black rounded-lg transition-colors"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-700">
                Password
              </label>
              {isLogin && (
                <button
                  type="button"
                  onClick={() => addToast('Reset link sent to your email')}
                  className="text-[10px] uppercase font-bold tracking-wider text-neutral-500 hover:text-black transition-colors"
                >
                  Forgot?
                </button>
              )}
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-3 bg-neutral-50 border border-neutral-300 text-xs text-black placeholder:text-neutral-400 focus:outline-none focus:border-black rounded-lg transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-black"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {errorMsg && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg font-medium">
              {errorMsg}
            </div>
          )}

          {/* Submit CTA Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-[#801414] hover:bg-[#6D1111] active:scale-[0.99] text-white text-xs font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg rounded-lg"
            >
              {loading ? (
                <span>AUTHENTICATING...</span>
              ) : (
                <>
                  <span>{isLogin ? 'SIGN IN TO ATELIER' : 'REGISTER ACCOUNT'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

          {/* Social Sign-in Divider */}
          <div className="relative py-2 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-neutral-200" />
            </div>
            <span className="relative px-3 bg-white text-[10px] font-bold uppercase tracking-wider text-neutral-400">
              Or continue with
            </span>
          </div>

          {/* Google / Quick Login Mockup */}
          <button
            type="button"
            onClick={() => {
              loginUser('guest.member@valjons.com');
              addToast('Signed in with Google');
            }}
            className="w-full py-3 border border-neutral-300 bg-white hover:bg-neutral-50 text-xs font-bold text-neutral-800 uppercase tracking-wider flex items-center justify-center gap-2.5 rounded-lg transition-colors cursor-pointer"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
              />
            </svg>
            <span>Google Account</span>
          </button>

          {/* Privacy Note */}
          <p className="text-[10px] text-neutral-400 text-center pt-2 leading-relaxed">
            By accessing your VALJONS account, you agree to our{' '}
            <Link href="/terms" className="underline text-black">
              Terms & Conditions
            </Link>{' '}
            and{' '}
            <Link href="/privacy-policy" className="underline text-black">
              Privacy Policy
            </Link>
            .
          </p>
        </form>
      </div>
    </div>
  );
}
