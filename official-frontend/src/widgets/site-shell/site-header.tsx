'use client';

import { useState } from 'react';
import { ChevronDown, Languages, Menu } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { ROUTES } from '@/shared/config/routes';
import { useLocale } from '@/shared/i18n/locale-provider';
import { Button, InternalLink } from '@/shared/ui';

function BrandMark({ primary, secondary }: { primary: string; secondary: string }) {
  return (
    <span className="flex items-center gap-2.5">
      <span className="grid h-9 w-9 place-items-center overflow-hidden bg-white p-0.5">
        <img src="/assets/aiadc-logo.png" alt="" className="h-full w-full object-contain" />
      </span>
      <span className="leading-none">
        <strong className="block whitespace-nowrap text-lg font-bold tracking-wide text-[#082656]">{primary}{secondary}</strong>
      </span>
    </span>
  );
}

function isActive(href: string, pathname: string) {
  if (href === '/') return pathname === '/';
  if (href.startsWith('/#')) return false;
  if (href.includes('#')) return pathname === href.split('#')[0];
  return pathname === href;
}

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [localeMenuOpen, setLocaleMenuOpen] = useState(false);
  const pathname = usePathname();
  const { locale, setLocale, labels, siteShell } = useLocale();
  const { brand, header } = siteShell;
  const currentLocaleLabel = locale === 'zh' ? '中' : 'EN';

  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-[rgba(255,255,255,0.92)] text-slate-950 backdrop-blur">
      <div className="section-shell flex h-16 items-center gap-5">
        <InternalLink href="/" aria-label={`${brand.applicationName} ${brand.homeAria}`} className="shrink-0">
          <BrandMark primary={brand.primary} secondary={brand.secondary} />
        </InternalLink>

        <nav className="hidden flex-1 items-center justify-center gap-7 xl:flex" aria-label="主导航">
          {header.mainNavItems.map((item, index) =>
            item.dropdown ? (
              <div key={item.label} className="group relative">
                <InternalLink
                  href={item.href}
                  className={`relative inline-flex items-center whitespace-nowrap text-sm font-semibold transition-colors hover:text-blue-500 ${
                    header.eventPageItems.some((eventItem) => isActive(eventItem.href, pathname)) ? 'text-slate-950' : 'text-slate-700'
                  }`}
                >
                  {item.label}
                  <ChevronDown className="ml-1 h-3.5 w-3.5" />
                </InternalLink>
                <div className="invisible absolute left-1/2 top-[calc(100%+1.1rem)] z-50 w-64 -translate-x-1/2 rounded-lg border border-slate-200 bg-white p-2 text-slate-950 opacity-0 shadow-[0_24px_70px_rgba(15,23,42,0.16)] transition-all group-hover:visible group-hover:opacity-100">
                  {header.eventPageItems.map((eventItem) => (
                    <InternalLink
                      key={eventItem.href}
                      href={eventItem.href}
                      className={`block rounded-md p-3 transition-colors hover:bg-blue-50 ${
                        isActive(eventItem.href, pathname) ? 'bg-blue-50' : ''
                      }`}
                    >
                      <span className="block text-sm font-bold text-slate-950">{eventItem.label}</span>
                      <span className="mt-1 block text-xs leading-5 text-slate-500">{eventItem.description}</span>
                    </InternalLink>
                  ))}
                </div>
              </div>
            ) : (
              <InternalLink
                key={`${item.label}-${item.href}`}
                href={item.href}
                className={`relative flex h-16 items-center whitespace-nowrap text-sm font-semibold transition-colors after:absolute after:bottom-0 after:left-1/2 after:h-0.5 after:w-0 after:-translate-x-1/2 after:bg-[#0b55b7] after:transition-all hover:text-[#082f6f] ${
                  isActive(item.href, pathname) || (index === 0 && pathname === '/') ? 'text-slate-950' : 'text-slate-700'
                } ${isActive(item.href, pathname) || (index === 0 && pathname === '/') ? 'after:w-10' : 'hover:after:w-6'}`}
              >
                {item.label}
              </InternalLink>
            ),
          )}
        </nav>

        <div className="ml-auto flex items-center gap-3">
          <div className="relative hidden">
            <button
              type="button"
              aria-label={header.languageAria}
              aria-expanded={localeMenuOpen}
              aria-haspopup="menu"
              onClick={() => setLocaleMenuOpen((open) => !open)}
              className="inline-flex h-10 items-center gap-2 rounded-full border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
            >
              <Languages className="h-4 w-4" />
              <span>{currentLocaleLabel}</span>
            </button>
            {localeMenuOpen ? (
              <div className="absolute right-0 top-[calc(100%+0.75rem)] z-50 min-w-40 rounded-xl border border-slate-200 bg-white p-1.5 shadow-[0_24px_70px_rgba(15,23,42,0.16)]">
                {Object.entries(labels).map(([value, label]) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => {
                      setLocale(value as 'zh' | 'en');
                      setLocaleMenuOpen(false);
                    }}
                    className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                      locale === value ? 'bg-blue-50 font-semibold text-blue-700' : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>{label}</span>
                    <span className="text-xs uppercase text-slate-400">{value}</span>
                  </button>
                ))}
              </div>
            ) : null}
          </div>
          <Button asChild className="hidden h-10 rounded-md bg-[#082f6f] px-5 text-sm font-bold !text-white shadow-[0_10px_20px_rgba(8,47,111,0.18)] hover:bg-[#06275d] sm:inline-flex">
            <InternalLink href="/login" className="!text-white">{header.loginLabel}</InternalLink>
          </Button>
          <div className="relative">
            <button
              type="button"
              aria-expanded={menuOpen}
              aria-haspopup="menu"
              onClick={() => setMenuOpen((open) => !open)}
              className="flex h-10 w-10 items-center justify-center rounded-md text-slate-900 transition-colors hover:bg-slate-100 xl:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
            {menuOpen ? (
              <div className="fixed left-4 right-4 top-16 rounded-lg border border-slate-200 bg-white p-2 text-slate-950 shadow-[0_24px_70px_rgba(15,23,42,0.16)] sm:absolute sm:left-auto sm:right-0 sm:top-[calc(100%+0.75rem)] sm:w-[min(23rem,calc(100vw-2rem))]">
                <div className="mb-2 flex items-center justify-between rounded-md border border-slate-200 bg-slate-50 px-3 py-2 sm:hidden">
                  <span className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">{header.languageAria}</span>
                  <div className="flex gap-2">
                    {Object.entries(labels).map(([value, label]) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => setLocale(value as 'zh' | 'en')}
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          locale === value ? 'bg-blue-600 text-white' : 'bg-white text-slate-700 ring-1 ring-slate-200'
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="grid gap-1 sm:grid-cols-2">
                  {header.pageSwitchItems.map((item) => (
                    <InternalLink
                      key={item.label}
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className={`rounded-md p-3 transition-colors hover:bg-blue-50 ${isActive(item.href, pathname) ? 'bg-blue-50' : ''}`}
                    >
                      <span className="block text-sm font-bold text-slate-950">{item.label}</span>
                      <span className="mt-1 block text-xs leading-5 text-slate-500">{item.description}</span>
                    </InternalLink>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
}
