'use client';

import { ArrowUp, MessageCircle } from 'lucide-react';

const CUSTOMER_SERVICE_URL = '/contact/';

export function FloatingActions() {
  return (
    <div className="fixed bottom-24 right-4 z-40 flex flex-col gap-3 sm:bottom-28 sm:right-6">
      <a
        href={CUSTOMER_SERVICE_URL}
        aria-label="在线客服"
        title="在线客服"
        className="grid h-11 w-11 place-items-center rounded-full border border-[#e6e6e6] bg-[#0075de] text-white outline-none transition-colors hover:bg-[#005bab] focus-visible:ring-2 focus-visible:ring-[#0075de] focus-visible:ring-offset-2 dark:border-white/18 dark:focus-visible:ring-offset-[#213183] sm:h-12 sm:w-12"
      >
        <MessageCircle className="h-[18px] w-[18px] text-white sm:h-5 sm:w-5" />
      </a>
      <button
        type="button"
        aria-label="回到顶部"
        title="回到顶部"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="grid h-11 w-11 place-items-center rounded-full border border-border bg-card text-card-foreground shadow-[rgba(0,0,0,0.01)_0_0.175px_1.041px,rgba(0,0,0,0.02)_0_0.8px_2.925px,rgba(0,0,0,0.027)_0_2.025px_7.847px,rgba(0,0,0,0.04)_0_4px_18px] outline-none transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-[#0075de] focus-visible:ring-offset-2 sm:h-12 sm:w-12"
      >
        <ArrowUp className="h-[18px] w-[18px] sm:h-5 sm:w-5" />
      </button>
    </div>
  );
}
