'use client';

import React, { useState } from 'react';
import { X, Mail, Phone, Clock, Send, CheckCircle2 } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export default function ContactModal() {
  const { isContactOpen, closeContact, addToast } = useStore();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: 'Order Inquiry', message: '' });

  if (!isContactOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    addToast('Your message has been sent to VALJONS Support');
    setTimeout(() => {
      setSubmitted(false);
      closeContact();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-xl bg-white text-black p-6 sm:p-10 rounded-2xl shadow-2xl border border-neutral-100 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={closeContact}
          aria-label="Close Contact"
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-neutral-100 transition-colors cursor-pointer text-black"
        >
          <X className="w-5 h-5 stroke-[2]" />
        </button>

        {/* Brand Header */}
        <div className="space-y-1 mb-6">
          <span className="text-xs uppercase tracking-[0.25em] text-neutral-400 font-bold font-montserrat">
            Customer Support & Concierge
          </span>
          <h2 className="text-3xl font-black uppercase tracking-tight font-poppins">
            CONTACT VALJONS
          </h2>
        </div>

        {submitted ? (
          <div className="py-12 text-center space-y-4">
            <CheckCircle2 className="w-16 h-16 text-emerald-600 mx-auto animate-bounce" />
            <h3 className="text-xl font-bold font-poppins">Message Received</h3>
            <p className="text-sm text-neutral-600 max-w-sm mx-auto font-montserrat">
              Thank you for reaching out. A VALJONS concierge representative will respond to your email within 4 hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 font-montserrat">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase font-bold tracking-wider text-neutral-600 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Aarav Sharma"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-neutral-200 text-sm focus:outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-bold tracking-wider text-neutral-600 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="aarav@example.com"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-neutral-200 text-sm focus:outline-none focus:border-black"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase font-bold tracking-wider text-neutral-600 mb-1">
                Subject
              </label>
              <select
                value={formData.subject}
                onChange={e => setFormData({ ...formData, subject: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-neutral-200 text-sm focus:outline-none focus:border-black bg-white"
              >
                <option value="Order Inquiry">Order Inquiry & Shipping</option>
                <option value="Size & Fit Consultation">Size & Fit Consultation (Drop 001)</option>
                <option value="Returns & Exchanges">Returns & Exchanges</option>
                <option value="Wholesale / Press">Wholesale / Press Collaboration</option>
              </select>
            </div>

            <div>
              <label className="block text-xs uppercase font-bold tracking-wider text-neutral-600 mb-1">
                Your Message
              </label>
              <textarea
                required
                rows={4}
                placeholder="How can we assist you with your VALJONS order?"
                value={formData.message}
                onChange={e => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-neutral-200 text-sm focus:outline-none focus:border-black resize-none"
              />
            </div>

            {/* Quick Info */}
            <div className="pt-2 pb-1 flex flex-wrap gap-4 text-xs text-neutral-500 border-t border-neutral-100">
              <div className="flex items-center gap-1.5">
                <Mail className="w-4 h-4 text-black" />
                <span>support@valjons.com</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-black" />
                <span>Mon–Sat 9AM–8PM IST</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-black text-white text-xs font-bold uppercase tracking-widest rounded-lg hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Send Message</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
