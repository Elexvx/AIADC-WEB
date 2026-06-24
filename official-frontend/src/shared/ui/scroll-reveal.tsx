'use client';

import { type CSSProperties, type ComponentPropsWithoutRef, type ElementType, useEffect, useRef, useState } from 'react';

type ScrollRevealProps<T extends ElementType = 'div'> = {
  as?: T;
  children: React.ReactNode;
  className?: string;
  delay?: number;
  distance?: number;
  threshold?: number;
  once?: boolean;
  staggerChildren?: boolean;
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'children' | 'className'>;

export function ScrollReveal<T extends ElementType = 'div'>({
  as,
  children,
  className,
  delay = 0,
  distance = 14,
  threshold = 0.12,
  once = true,
  staggerChildren = false,
  ...props
}: ScrollRevealProps<T>) {
  const Component = (as ?? 'div') as ElementType;
  const ref = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const node = ref.current;

    if (!node || typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);

          if (once) {
            observer.disconnect();
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -6% 0px',
      },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [once, threshold]);

  return (
    <Component
      ref={ref}
      className={[
        'scroll-reveal',
        staggerChildren ? 'scroll-reveal-stagger' : '',
        isVisible ? 'is-visible' : '',
        className ?? '',
      ]
        .filter(Boolean)
        .join(' ')}
      style={
        {
          '--reveal-delay': `${delay}ms`,
          '--reveal-distance': `${distance}px`,
        } as CSSProperties
      }
      {...props}
    >
      {children}
    </Component>
  );
}
