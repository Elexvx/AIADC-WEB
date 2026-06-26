'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    const resetScroll = () => {
      if (window.location.hash) {
        return;
      }

      const root = document.documentElement;
      const previousScrollBehavior = root.style.scrollBehavior;

      root.style.scrollBehavior = 'auto';
      window.scrollTo(0, 0);
      root.style.scrollBehavior = previousScrollBehavior;
    };

    resetScroll();

    const frame = window.requestAnimationFrame(() => {
      resetScroll();
      setIsVisible(true);
    });
    const timeout = window.setTimeout(resetScroll, 120);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timeout);
    };
  }, [pathname]);

  return (
    <div className={`page-transition${isVisible ? ' page-transition-entered' : ''}`} data-route={pathname}>
      {children}
    </div>
  );
}
