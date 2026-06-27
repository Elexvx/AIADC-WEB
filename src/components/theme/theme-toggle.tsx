'use client';

import { Moon, SunMedium } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from './theme-provider';

type ThemeToggleProps = {
  className?: string;
};

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const nextThemeLabel = theme === 'dark' ? '日间模式' : '夜间模式';

  return (
    <button
      type="button"
      aria-label={`切换到${nextThemeLabel}`}
      aria-pressed={theme === 'dark'}
      data-theme-toggle
      title={`切换到${nextThemeLabel}`}
      onClick={toggleTheme}
      className={cn(
        'site-theme-toggle group relative z-20 grid h-11 w-11 touch-manipulation place-items-center overflow-hidden rounded-md backdrop-blur-md outline-none transition-colors duration-200 hover:border-[#0075de] hover:text-[#0075de] focus-visible:ring-2 focus-visible:ring-[#0075de] focus-visible:ring-offset-2 dark:hover:border-[#0075de] dark:hover:text-[#0075de]',
        className,
      )}
    >
      <SunMedium className="absolute h-[18px] w-[18px] rotate-0 scale-100 text-[#0075de] transition-all duration-300 dark:rotate-90 dark:scale-0" />
      <Moon className="absolute h-[18px] w-[18px] -rotate-90 scale-0 text-[#0075de] transition-all duration-300 dark:rotate-0 dark:scale-100" />
      <span className="sr-only">{nextThemeLabel}</span>
    </button>
  );
}
