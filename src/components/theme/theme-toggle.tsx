'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState, type ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type ThemeToggleProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function ThemeToggle({ className, ...props }: ThemeToggleProps) {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = mounted && resolvedTheme === 'dark';

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <button
      type="button"
      aria-label={isDark ? '切换到日间模式' : '切换到夜间模式'}
      aria-pressed={isDark}
      className={cn(
        'site-header-action site-theme-toggle inline-flex shrink-0 items-center justify-center transition-colors duration-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0075de]',
        className,
      )}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      {...props}
    >
      {mounted ? (
        isDark ? (
          <Moon aria-hidden="true" className="h-[18px] w-[18px]" />
        ) : (
          <Sun aria-hidden="true" className="h-[18px] w-[18px]" />
        )
      ) : (
        <Sun aria-hidden="true" className="h-[18px] w-[18px] opacity-0" />
      )}
      <span className="sr-only">{isDark ? '当前为夜间模式' : '当前为日间模式'}</span>
    </button>
  );
}
