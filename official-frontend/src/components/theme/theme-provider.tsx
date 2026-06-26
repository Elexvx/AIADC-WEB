'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

type Theme = 'light' | 'dark';

type ThemeContextValue = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

const STORAGE_KEY = 'aiadc-theme';

const ThemeContext = createContext<ThemeContextValue | null>(null);

function resolveSystemTheme(): Theme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.toggle('dark', theme === 'dark');
  root.dataset.theme = theme;
  document.body?.setAttribute('data-theme', theme);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('light');

  const syncTheme = useCallback((nextTheme: Theme) => {
    applyTheme(nextTheme);
  }, []);

  const syncThemeFromSystem = useCallback((matches: boolean) => {
    if (window.localStorage.getItem(STORAGE_KEY)) {
      return;
    }

    setThemeState(matches ? 'dark' : 'light');
  }, []);

  useEffect(() => {
    const storedTheme = window.localStorage.getItem(STORAGE_KEY);
    const initialTheme =
      storedTheme === 'light' || storedTheme === 'dark'
        ? storedTheme
        : document.documentElement.classList.contains('dark')
          ? 'dark'
          : resolveSystemTheme();

    setThemeState(initialTheme);
    syncTheme(initialTheme);

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (event: MediaQueryListEvent) => {
      syncThemeFromSystem(event.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [syncTheme, syncThemeFromSystem]);

  useEffect(() => {
    syncTheme(theme);
  }, [theme, syncTheme]);

  const setTheme = useCallback((nextTheme: Theme) => {
    window.localStorage.setItem(STORAGE_KEY, nextTheme);
    setThemeState(nextTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }, [setTheme, theme]);

  const value = useMemo(
    () => ({
      theme,
      setTheme,
      toggleTheme,
    }),
    [setTheme, theme, toggleTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }

  return context;
}
