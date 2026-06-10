'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { defaultLocale, localeLabels, locales, type Locale } from '@/shared/i18n/config';
import { localeMessages } from '@/shared/i18n/messages';

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  labels: typeof localeLabels;
  messages: (typeof localeMessages)[Locale];
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
      messages: localeMessages[locale],
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
