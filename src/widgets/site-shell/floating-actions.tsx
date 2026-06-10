'use client';

import { ArrowUp } from 'lucide-react';

export function FloatingActions() {
  return (
    <div className="fixed bottom-6 right-5 z-40 sm:bottom-8 sm:right-8">
      <button
        type="button"
        aria-label="置顶"
        title="置顶"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="grid h-14 w-14 place-items-center rounded-full border border-white/80 bg-blue-600 text-white shadow-[0_18px_44px_rgba(37,99,235,0.34)] outline-none transition-colors hover:bg-blue-500 focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 sm:h-16 sm:w-16"
      >
        <ArrowUp className="h-6 w-6" />
      </button>
    </div>
  );
}
