'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Mail, Phone, MessageSquare, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export default function ContactPage() {
  const { addToast } = useStore();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'order_inquiry',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    addToast('Message sent! Our concierge will reply within 4 hours.');
  };

  return (
    <div className="w-full min-h-screen bg-white font-montserrat pt-20 sm:pt-24 pb-24 text-neutral-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-8 py-4 border-b border-neutral-100 text-[11px] font-semibold uppercase tracking-wider text-neutral-400 flex items-center gap-2">
        <Link href="/" className="hover:text-black transition-colors flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" /> Home
        </Link>
        <span>/</span>
        <span className="text-black">Contact Concierge</span>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-8 pt-8 sm:pt-12 space-y-10">
        <div className="space-y-3 pb-6 border-b border-neutral-200">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#801414]">
            CONCIERGE & CARE
          </span>
          <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-neutral-900 font-poppins">
            CUSTOMER SUPPORT
          </h1>
          <p className="text-xs text-neutral-500">
            Reach out regarding size sizing, order updates, returns, or private atelier bookings.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Contact Details (5 cols) */}
          <div className="md:col-span-5 space-y-6">
            <div className="p-6 bg-[#FAF9F7] rounded-2xl border border-neutral-200 space-y-6">
              <h2 className="text-xs font-black uppercase tracking-[0.2em] text-black font-poppins">
                DIRECT CHANNELS
              </h2>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-neutral-700 mt-0.5 shrink-0" />
                  <div>
                    <span className="font-bold text-black block">Email Support</span>
                    <a href="mailto:concierge@valjons.com" className="text-neutral-600 hover:text-black transition-colors">
                      concierge@valjons.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MessageSquare className="w-4 h-4 text-neutral-700 mt-0.5 shrink-0" />
                  <div>
                    <span className="font-bold text-black block">WhatsApp Concierge</span>
                    <span className="text-neutral-600">+91 98110 22400 (Instant Chat)</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-neutral-700 mt-0.5 shrink-0" />
                  <div>
                    <span className="font-bold text-black block">Atelier Location</span>
                    <span className="text-neutral-600">
                      VALJONS Studio, Connaught Place, New Delhi 110001, India
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-neutral-200 text-[11px] text-neutral-500">
                Operating Hours: Mon – Sat, 10:00 AM – 7:00 PM IST.
              </div>
            </div>
          </div>

          {/* Contact Form (7 cols) */}
          <div className="md:col-span-7">
            {submitted ? (
              <div className="p-8 bg-[#FAF9F7] rounded-2xl border border-emerald-200 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h3 className="text-base font-bold uppercase text-black font-poppins">
                  MESSAGE RECEIVED
                </h3>
                <p className="text-xs text-neutral-600 max-w-sm mx-auto">
                  Thank you for contacting VALJONS. A member of our concierge team will reach out to you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-700 block">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-neutral-50 border border-neutral-300 text-xs text-black focus:outline-none focus:border-black rounded-lg"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-700 block">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-neutral-50 border border-neutral-300 text-xs text-black focus:outline-none focus:border-black rounded-lg"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-700 block">
                      Mobile Number
                    </label>
                    <input
                      type="tel"
                      maxLength={10}
                      placeholder="10-digit number"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '') })
                      }
                      className="w-full px-4 py-3 bg-neutral-50 border border-neutral-300 text-xs text-black focus:outline-none focus:border-black rounded-lg"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-700 block">
                    Topic
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 bg-neutral-50 border border-neutral-300 text-xs text-black focus:outline-none focus:border-black rounded-lg"
                  >
                    <option value="order_inquiry">Order Status / Delivery</option>
                    <option value="exchange">Size Exchange / Return</option>
                    <option value="product_question">Fabric & Silhouette Question</option>
                    <option value="collaboration">Press & Collaborations</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-700 block">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="How may our concierge assist you today?"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 bg-neutral-50 border border-neutral-300 text-xs text-black focus:outline-none focus:border-black rounded-lg resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#801414] hover:bg-[#6D1111] text-white text-xs font-black uppercase tracking-[0.2em] transition-all rounded-lg flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <Send className="w-4 h-4" />
                  <span>TRANSMIT MESSAGE</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
