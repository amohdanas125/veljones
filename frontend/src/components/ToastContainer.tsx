'use client';

import React from 'react';
import { Check, Info, AlertTriangle, X } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export default function ToastContainer() {
  const { toasts, removeToast } = useStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto bg-black text-white px-4 py-3 rounded-none shadow-xl flex items-center justify-between gap-3 text-xs font-semibold uppercase tracking-wider animate-slide-up border-l-4 border-[#DC2626]"
        >
          <div className="flex items-center gap-2">
            {toast.type === 'error' ? (
              <AlertTriangle className="w-4 h-4 text-red-500 shrink-0" />
            ) : toast.type === 'info' ? (
              <Info className="w-4 h-4 text-neutral-300 shrink-0" />
            ) : (
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
            )}
            <span>{toast.message}</span>
          </div>

          <button
            onClick={() => removeToast(toast.id)}
            className="text-neutral-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
}
