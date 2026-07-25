'use client';

import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useLocale } from '@/lib/i18n/locale-provider';
import { DOCS_NAV_ITEMS, DOCS_PRIMARY_NAV_ITEMS, ROUTES } from '@/lib/config/routes';
import { Button, InternalLink } from '@/components/ui';
import { ThemeToggle } from '@/components/theme/theme-toggle';
import { SiteTopNoticeBar } from './site-top-notice-bar';

function BrandMark({ primary, secondary }: { primary: string; secondary: string }) {
  return (
    <span className="flex min-w-0 items-center gap-2.5">
      <span className="grid h-8 w-8 shrink-0 place-items-center overflow-hidden rounded-lg border border-[#e6e6e6] bg-white">
        <img src="/assets/aiadc-logo.png" alt="" width={28} height={28} className="h-7 w-7 object-contain" />
      </span>
      <span className="min-w-0 leading-none">
        <strong className="site-header-brand block max-w-[min(68vw,24rem)] truncate text-[15px] font-semibold tracking-[-0.015em] transition-colors sm:max-w-none">
          {primary}
          {secondary}
        </strong>
      </span>
    </span>
  );
}

function isActive(href: string, pathname: string) {
  if (href === '/') return pathname === '/';
  if (href.startsWith('/#')) return false;
  if (href.includes('#')) return pathname === href.split('#')[0];
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { siteShell } = useLocale();
  const { brand, header } = siteShell;

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    }

    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [isMobileMenuOpen]);

  return (
    <header className="site-header sticky top-0 z-50 transition-colors duration-200">
      <SiteTopNoticeBar />

      <div className="site-header-main transition-colors duration-200">
        <div className="section-shell relative flex h-14 items-center justify-between gap-4">
          <InternalLink href="/" aria-label={`${brand.applicationName} ${brand.homeAria}`} className="min-w-0 flex-1 overflow-hidden">
            <BrandMark primary={brand.primary} secondary={brand.secondary} />
          </InternalLink>

          <nav
            className="absolute left-1/2 hidden -translate-x-1/2 items-center justify-center gap-2 lg:flex"
            aria-label="头部导航"
          >
            {DOCS_PRIMARY_NAV_ITEMS.map((item) => (
              <InternalLink
                key={item.label}
                href={item.href}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActive(item.href, pathname)
                    ? 'site-header-nav-active bg-[#eef6ff] text-[#005bab] dark:bg-white/10 dark:text-white'
                    : 'site-header-nav-muted hover:bg-black/[0.04] hover:text-[#005bab] dark:hover:bg-white/10 dark:hover:text-white'
                }`}
              >
                {item.label}
              </InternalLink>
            ))}
          </nav>

          <div className="relative z-10 flex shrink-0 items-center gap-2 sm:gap-3">
            <ThemeToggle className="h-9 shrink-0" />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label={isMobileMenuOpen ? '关闭导航菜单' : '打开导航菜单'}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-site-navigation"
              className="site-header-action site-theme-toggle h-9 w-9 shrink-0 rounded-md p-0 transition-colors duration-100 hover:border-[#0075de] hover:bg-black/[0.04] hover:text-[#0075de] focus-visible:ring-[#0075de] focus-visible:ring-offset-0 dark:hover:bg-white/10 lg:hidden"
              onClick={() => setIsMobileMenuOpen((open) => !open)}
            >
              {isMobileMenuOpen ? <X aria-hidden="true" className="h-5 w-5" /> : <Menu aria-hidden="true" className="h-5 w-5" />}
            </Button>
            <Button
              asChild
              variant="default"
              className="site-header-action hidden h-9 shrink-0 rounded-md bg-[#0075de] px-4 py-2 text-sm font-medium !text-white shadow-none transition-colors duration-100 hover:bg-[#0075de]/80 focus-visible:ring-[#0075de] focus-visible:ring-offset-0 md:inline-flex"
            >
              <InternalLink href={ROUTES.registration} className="!text-white">
                {header.loginLabel}
              </InternalLink>
            </Button>
          </div>

          {isMobileMenuOpen ? (
            <nav
              id="mobile-site-navigation"
              aria-label="移动端导航"
              className="absolute inset-x-3 top-[calc(100%+0.5rem)] z-20 overflow-hidden rounded-xl border border-[#e6e6e6] bg-white/96 p-2 shadow-lg backdrop-blur dark:border-white/15 dark:bg-slate-950/96 lg:hidden"
            >
              <div className="grid grid-cols-2 gap-2">
                {DOCS_NAV_ITEMS.map((item) => (
                  <InternalLink
                    key={`${item.href}-${item.label}`}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex min-h-10 items-center rounded-lg px-3 text-[14px] font-medium transition-colors ${
                      isActive(item.href, pathname)
                        ? 'bg-[#eef6ff] text-[#0075de] ring-1 ring-[#d7ebff]'
                        : 'text-slate-800 hover:bg-[#f6f5f4] hover:text-[#0075de] dark:text-slate-100 dark:hover:bg-white/10'
                    }`}
                  >
                    {item.label}
                  </InternalLink>
                ))}
                <InternalLink
                  href={ROUTES.registration}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="site-header-action col-span-2 mt-1 flex min-h-10 items-center justify-center rounded-md bg-[#0075de] px-3 text-center text-[14px] font-medium !text-white transition-colors duration-100 hover:bg-[#0075de]/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0075de] focus-visible:ring-offset-2"
                >
                  {header.loginLabel}
                </InternalLink>
              </div>
            </nav>
          ) : null}
        </div>
      </div>
    </header>
  );
}
