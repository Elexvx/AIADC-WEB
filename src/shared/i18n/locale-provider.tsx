'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { defaultLocale, localeLabels, locales, type Locale } from '@/shared/i18n/config';
import { cmsContent } from '@/shared/content/data';
import type { ArticleItem, CmsPageContent, NewsCategorySummary, PageKey, SiteShellContent } from '@/shared/content/types';

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  labels: typeof localeLabels;
  siteShell: SiteShellContent;
  pages: Record<PageKey, CmsPageContent>;
  news: {
    categories: NewsCategorySummary[];
    articles: ArticleItem[];
  };
};

const STORAGE_KEY = 'aiadc-locale';

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);

  useEffect(() => {
    const savedLocale = window.localStorage.getItem(STORAGE_KEY);
    if (savedLocale && locales.includes(savedLocale as Locale)) {
      setLocaleState(savedLocale as Locale);
      return;
    }

    const browserLocale = navigator.language.toLowerCase().startsWith('en') ? 'en' : defaultLocale;
    setLocaleState(browserLocale);
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale === 'en' ? 'en' : 'zh-CN';
    window.localStorage.setItem(STORAGE_KEY, locale);
  }, [locale]);

  const value = useMemo<LocaleContextValue>(
    () => ({
      locale,
      setLocale: setLocaleState,
      labels: localeLabels,
      siteShell: cmsContent[locale].siteShell,
      pages: cmsContent[locale].pages,
      news: cmsContent[locale].news,
    }),
    [locale],
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

export function usePageContent(pageKey: PageKey) {
  const { pages } = useLocale();
  return pages[pageKey];
}
