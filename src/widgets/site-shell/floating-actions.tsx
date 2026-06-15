'use client';

import { ArrowUp, MessageCircle } from 'lucide-react';

const CUSTOMER_SERVICE_URL = '/about';

export function FloatingActions() {
  return (
    <div className="fixed bottom-5 right-4 z-40 flex flex-col gap-3 sm:bottom-6 sm:right-6">
      <a
        href={CUSTOMER_SERVICE_URL}
        aria-label="在线客服"
        title="在线客服"
        className="grid h-11 w-11 place-items-center rounded-full border border-white/80 bg-emerald-500 text-white shadow-[0_12px_28px_rgba(16,185,129,0.28)] outline-none transition-colors hover:bg-emerald-400 focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 sm:h-12 sm:w-12"
      >
        <MessageCircle className="h-[18px] w-[18px] sm:h-5 sm:w-5 text-white" />
      </a>
      <button
        type="button"
        aria-label="置顶"
        title="置顶"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="grid h-11 w-11 place-items-center rounded-full border border-white/80 bg-blue-600 text-white shadow-[0_12px_28px_rgba(37,99,235,0.28)] outline-none transition-colors hover:bg-blue-500 focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 sm:h-12 sm:w-12"
      >
        <ArrowUp className="h-[18px] w-[18px] sm:h-5 sm:w-5" />
      </button>
    </div>
  );
}
