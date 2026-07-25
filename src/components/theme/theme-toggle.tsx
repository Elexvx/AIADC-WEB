'use client';

import type { ComponentProps } from 'react';
import { ThemeSwitch } from 'fumadocs-ui/layouts/shared/slots/theme-switch';
import { cn } from '@/lib/utils';

type ThemeToggleProps = ComponentProps<typeof ThemeSwitch>;

export function ThemeToggle({ className, ...props }: ThemeToggleProps) {
  return (
    <ThemeSwitch
      mode="light-dark"
      className={cn(
        'site-header-action site-theme-toggle shrink-0 transition-colors duration-100 focus-visible:ring-2 focus-visible:ring-[#0075de]',
        className,
      )}
      {...props}
    />
  );
}
