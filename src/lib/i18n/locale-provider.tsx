'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { defaultLocale, localeLabels, type Locale } from '@/lib/i18n/config';
import type { SiteShellContent } from '@/lib/content/types';

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  labels: typeof localeLabels;
  siteShell: SiteShellContent;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

type LocaleProviderProps = {
  children: React.ReactNode;
  siteShell: SiteShellContent;
};

export function LocaleProvider({ children, siteShell }: LocaleProviderProps) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);

  useEffect(() => {
    document.documentElement.lang = 'zh-CN';
  }, []);

  const value = useMemo<LocaleContextValue>(
    () => ({
      locale,
      setLocale: setLocaleState,
      labels: localeLabels,
      siteShell,
    }),
    [locale, siteShell],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const context = useContext(LocaleContext);

  if (!context) {
    throw new Error('useLocale must be used within LocaleProvider');
  }

  return context;
}
