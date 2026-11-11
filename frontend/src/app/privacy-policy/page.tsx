'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Shield, Lock, Eye, FileText, Mail } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <div className="w-full min-h-screen bg-white font-montserrat pt-20 sm:pt-24 pb-24 text-neutral-800">
      {/* Breadcrumb */}
      <div className="max-w-4xl mx-auto px-4 sm:px-8 py-4 border-b border-neutral-100 text-[11px] font-semibold uppercase tracking-wider text-neutral-400 flex items-center gap-2">
        <Link href="/" className="hover:text-black transition-colors flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" /> Home
        </Link>
        <span>/</span>
        <span className="text-black">Privacy Policy</span>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-8 pt-8 sm:pt-12 space-y-8">
        {/* Header */}
        <div className="space-y-3 pb-6 border-b border-neutral-200">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#801414]">
            LEGAL & COMPLIANCE
          </span>
          <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-neutral-900 font-poppins">
            PRIVACY POLICY
          </h1>
          <p className="text-xs text-neutral-500">
            Last Updated: November 2026 · Compliant with the Information Technology Act, 2000 & Digital Personal Data Protection Act (DPDPA).
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-8 text-xs sm:text-sm text-neutral-700 leading-relaxed font-normal">
          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-black uppercase tracking-wider text-neutral-900 font-poppins">
              1. INTRODUCTION & SCOPE
            </h2>
            <p>
              VALJONS ("we", "us", "our", operated by Resourzburg) respects your privacy and is committed to protecting your personal data. This Privacy Policy governs your visit to our website and details our practices regarding the collection, storage, use, and disclosure of information gathered during your interactions with our online catalog, drops, checkout systems, and concierge services.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-black uppercase tracking-wider text-neutral-900 font-poppins">
              2. INFORMATION WE COLLECT
            </h2>
            <p>We collect information necessary to fulfill orders, provide customer support, and personalize your experience:</p>
            <ul className="list-disc pl-5 space-y-1.5 pt-1">
              <li><strong className="text-black">Identity Data:</strong> Full name, title, date of birth (optional).</li>
              <li><strong className="text-black">Contact Data:</strong> Delivery address, billing address, email address, and mobile phone number for delivery coordination and WhatsApp status notifications.</li>
              <li><strong className="text-black">Transaction Data:</strong> Details of products ordered, payment status, order tracking numbers, and transaction reference IDs.</li>
              <li><strong className="text-black">Technical & Device Data:</strong> IP address, browser type and version, time zone setting, operating system, and platform used to navigate the site.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-black uppercase tracking-wider text-neutral-900 font-poppins">
              3. PAYMENT PROCESSING & ENCRYPTION
            </h2>
            <p>
              All online payments (UPI, Credit Cards, Debit Cards, NetBanking, Wallets) are securely processed through certified, PCI-DSS Level 1 compliant payment gateways (such as Razorpay). VALJONS does <strong>NOT</strong> store or have access to your full credit card numbers, CVV codes, or net banking passwords. Sensitive data is transmitted directly through encrypted 256-bit SSL tunnels.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-black uppercase tracking-wider text-neutral-900 font-poppins">
              4. SHARING WITH THIRD-PARTY SERVICE PROVIDERS
            </h2>
            <p>We do not sell, rent, or trade your personal information. We share data solely with trusted operational partners required to fulfill your purchases:</p>
            <ul className="list-disc pl-5 space-y-1.5 pt-1">
              <li><strong className="text-black">Logistics Partners:</strong> BlueDart, Delhivery, DTDC, and express courier networks to ensure doorstep delivery and reverse-pickup exchanges.</li>
              <li><strong className="text-black">SMS & Email Service Gateways:</strong> To transmit order confirmations, dispatch dispatches, and OTP verification codes.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-black uppercase tracking-wider text-neutral-900 font-poppins">
              5. COOKIES & TRACKING TECHNOLOGIES
            </h2>
            <p>
              We use session cookies and local storage tokens to retain items in your shopping bag, preserve your wishlist selections, and understand site traffic patterns. You may configure your browser to decline cookies, though certain aspects of checkout functionality may be hindered.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-black uppercase tracking-wider text-neutral-900 font-poppins">
              6. YOUR RIGHTS & GRIEVANCE REDRESSAL
            </h2>
            <p>
              Under Indian law, you have the right to review, update, or request the deletion of your personal information held in our records. For any inquiries, corrections, or grievance redressal, please contact our Grievance Officer:
            </p>
            <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-200 space-y-1 mt-2">
              <p className="font-bold text-black uppercase tracking-wider">VALJONS Concierge & Grievance Cell</p>
              <p>Email: <a href="mailto:privacy@valjons.com" className="text-[#801414] underline">privacy@valjons.com</a></p>
              <p>Hours: Monday to Saturday, 10:00 AM – 7:00 PM IST</p>
              <p>Location: New Delhi, India</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
