'use client';

import { useEffect, useRef } from 'react';

export function ArticlePageEffects() {
  const pageRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const page = document.querySelector('.article-page') as HTMLElement | null;
    if (!page) return;

    const progressBar = document.querySelector('.article-progress') as HTMLElement | null;
    const heroImage = document.querySelector('.article-hero-image') as HTMLElement | null;

    // Reading progress & scroll detection
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;

      // Update progress bar
      if (progressBar) {
        progressBar.style.setProperty('--reading-progress', String(progress));
        if (progress > 0.01) {
          page.classList.add('is-reading');
        } else {
          page.classList.remove('is-reading');
        }
      }

      // Hero image subtle zoom after scrolling past hero
      if (scrollTop > 80) {
        page.classList.add('is-scrolled');
      } else {
        page.classList.remove('is-scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return null;
}
