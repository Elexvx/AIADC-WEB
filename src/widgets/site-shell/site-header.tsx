'use client';

import { useState } from 'react';
import { ChevronDown, Languages, Menu } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { siteContent } from '@/entities/site';
import { ROUTES } from '@/shared/config/routes';
import { useLocale } from '@/shared/i18n/locale-provider';
import { Button, InternalLink } from '@/shared/ui';

function BrandMark({ primary, secondary }: { primary: string; secondary: string }) {
  return (
    <span className="flex items-center gap-3">
      <span className="relative grid h-11 w-11 place-items-center overflow-hidden rounded-lg bg-gradient-to-br from-cyan-300 via-blue-500 to-blue-700 text-lg font-black text-white shadow-[0_16px_36px_rgba(37,99,235,0.35)]">
        A
        <span className="absolute bottom-1 right-1 h-2 w-2 rounded-full bg-emerald-300" />
      </span>
      <span className="leading-tight">
        <strong className="block text-base font-bold tracking-[-0.04em] text-slate-950">{primary}</strong>
        <small className="block text-sm font-semibold text-slate-600">{secondary}</small>
      </span>
    </span>
  );
}

function isActive(href: string, pathname: string) {
  if (href === '/') return pathname === '/';
  if (href.startsWith('/#')) return pathname === ROUTES.home;
  if (href.includes('#')) return pathname === href.split('#')[0];
  return pathname === href;
}

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [localeMenuOpen, setLocaleMenuOpen] = useState(false);
  const pathname = usePathname();
  const { locale, setLocale, labels, messages } = useLocale();
  const { brand, header } = messages;
  const currentLocaleLabel = locale === 'zh' ? '中' : 'EN';

  return (
    <header className="sticky top-0 z-50 bg-[rgba(255,255,255,0.88)] text-slate-950 shadow-[0_10px_34px_rgba(15,23,42,0.12)] backdrop-blur">
      <div className="section-shell flex h-14 items-center gap-5 sm:h-16">
        <InternalLink href="/" aria-label={`${siteContent.brand.cnName} ${brand.homeAria}`} className="shrink-0">
          <BrandMark primary={brand.primary} secondary={brand.secondary} />
        </InternalLink>

        <nav className="hidden flex-1 items-center justify-center gap-8 xl:flex" aria-label="主导航">
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
                className={`relative whitespace-nowrap text-sm font-semibold transition-colors hover:text-blue-500 ${
                  isActive(item.href, pathname) || (index === 0 && pathname === '/') ? 'text-slate-950' : 'text-slate-700'
                }`}
              >
                {item.label}
              </InternalLink>
            ),
          )}
        </nav>

        <div className="ml-auto flex items-center gap-3">
          <div className="relative hidden sm:block">
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
          <Button asChild variant="outline" className="hidden h-10 rounded-full border-slate-200 bg-white px-5 text-slate-900 hover:bg-slate-50 sm:inline-flex">
            <InternalLink href="/login">{header.login}</InternalLink>
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
