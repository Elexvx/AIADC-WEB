'use client';

import {
  Bell,
  BookOpenText,
  CalendarDays,
  ChevronDown,
  Handshake,
  Home,
  Info,
  Mail,
  SquareArrowOutUpRight,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { SearchTrigger } from 'fumadocs-ui/layouts/shared/slots/search-trigger';
import { ThemeSwitch } from 'fumadocs-ui/layouts/shared/slots/theme-switch';
import { useLocale } from '@/lib/i18n/locale-provider';
import { ROUTES, SITE_NAV_ITEMS } from '@/lib/config/routes';
import { Button, InternalLink } from '@/components/ui';
import { ThemeToggle } from '@/components/theme/theme-toggle';
import { SiteTopNoticeBar } from './site-top-notice-bar';

const MOBILE_NAV_ITEMS = [
  { label: '首页', href: ROUTES.home, icon: Home },
  { ...SITE_NAV_ITEMS[0], icon: CalendarDays },
  { ...SITE_NAV_ITEMS[1], icon: BookOpenText },
  { ...SITE_NAV_ITEMS[2], icon: Bell },
  { ...SITE_NAV_ITEMS[3], icon: Info },
  { ...SITE_NAV_ITEMS[4], icon: Handshake },
  { ...SITE_NAV_ITEMS[5], icon: Mail },
  { label: '报名参赛', href: ROUTES.registration, icon: SquareArrowOutUpRight },
] as const;

function BrandMark({ primary, secondary }: { primary: string; secondary: string }) {
  return (
    <span className="flex min-w-0 items-center gap-3">
      <span className="grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-2xl border border-[#ece7e1] bg-white shadow-[rgba(0,0,0,0.02)_0_0.8px_2.925px,rgba(0,0,0,0.04)_0_4px_18px]">
        <img src="/assets/aiadc-logo.png" alt="" width={40} height={40} className="h-9 w-9 object-contain" />
      </span>
      <span className="min-w-0 leading-none">
        <strong className="site-header-brand block max-w-[min(68vw,26rem)] truncate text-[1.125rem] font-semibold tracking-[-0.02em] transition-colors duration-300 sm:max-w-none sm:text-[1.25rem]">
          {primary}
          {secondary}
        </strong>
      </span>
    </span>
  );
}

function MobileBrandMark({ primary, secondary }: { primary: string; secondary: string }) {
  return (
    <span className="flex min-w-0 items-center gap-2.5">
      <img
        src="/assets/aiadc-logo.png"
        alt=""
        width={28}
        height={28}
        className="h-7 w-7 shrink-0 rounded-full object-contain"
      />
      <strong className="site-header-brand min-w-0 truncate text-base font-semibold tracking-[-0.015em]">
        {primary}
        {secondary}
      </strong>
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

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    }

    window.addEventListener('keydown', closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [isMobileMenuOpen]);

  return (
    <header className="site-header sticky top-0 z-50 transition-colors duration-200">
      <SiteTopNoticeBar />

      <div
        className={`site-header-main transition-colors duration-200 ${
          isMobileMenuOpen ? 'is-mobile-menu-open' : ''
        }`}
      >
        <div className="section-shell relative flex h-14 items-center justify-between gap-4 lg:h-[4.65rem]">
          <InternalLink
            href="/"
            aria-label={`${brand.applicationName} ${brand.homeAria}`}
            className="min-w-0 flex-1 overflow-hidden"
          >
            <span className="lg:hidden">
              <MobileBrandMark primary={brand.primary} secondary={brand.secondary} />
            </span>
            <span className="hidden lg:inline-flex">
              <BrandMark primary={brand.primary} secondary={brand.secondary} />
            </span>
          </InternalLink>

          <nav
            className="absolute left-1/2 hidden -translate-x-1/2 items-center justify-center gap-2 lg:flex"
            aria-label="头部导航"
          >
            {SITE_NAV_ITEMS.map((item) => (
              <InternalLink
                key={item.label}
                href={item.href}
                className={`inline-flex h-9 items-center rounded-md px-2 text-sm font-normal transition-colors ${
                  isActive(item.href, pathname)
                    ? 'site-header-nav-active text-foreground'
                    : 'site-header-nav-muted hover:bg-fd-accent hover:text-fd-accent-foreground'
                }`}
              >
                {item.label}
              </InternalLink>
            ))}
          </nav>

          <div className="relative z-10 flex shrink-0 items-center gap-2 sm:gap-3">
            <ThemeToggle className="hidden h-10 w-10 rounded-md p-0 focus-visible:ring-offset-2 lg:inline-flex" />
            <SearchTrigger
              hideIfDisabled
              aria-label="搜索赛事文档"
              className="site-mobile-search-trigger h-10 w-10 rounded-md p-2 lg:hidden"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label={isMobileMenuOpen ? '关闭导航菜单' : '打开导航菜单'}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-site-navigation"
              className="site-header-icon-button group h-10 w-10 shrink-0 rounded-md p-0 transition-colors duration-100 focus-visible:ring-[#0075de] focus-visible:ring-offset-2 lg:hidden"
              onClick={() => setIsMobileMenuOpen((open) => !open)}
            >
              <ChevronDown
                aria-hidden="true"
                className={`h-[22px] w-[22px] transition-transform duration-300 ${
                  isMobileMenuOpen ? 'rotate-180' : ''
                }`}
              />
            </Button>
            <Button
              asChild
              variant="default"
              className="site-header-action hidden h-10 shrink-0 rounded-full bg-[#0075de] px-5 py-2 text-sm font-semibold !text-white shadow-none transition-colors duration-100 hover:bg-[#0075de]/80 focus-visible:ring-[#0075de] focus-visible:ring-offset-2 md:inline-flex"
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
              className="site-mobile-navigation absolute top-full z-20 flex flex-col px-5 pb-4 pt-3 lg:hidden"
            >
              <p className="mb-1 text-sm text-fd-muted-foreground">赛事导航</p>
              <div className="flex flex-col">
                {MOBILE_NAV_ITEMS.map((item) => (
                  <InternalLink
                    key={`${item.href}-${item.label}`}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    aria-current={isActive(item.href, pathname) ? 'page' : undefined}
                    className={`site-mobile-navigation-link inline-flex min-h-11 items-center gap-3 py-2 text-[15px] transition-colors ${
                      isActive(item.href, pathname) ? 'is-active' : ''
                    }`}
                  >
                    <item.icon aria-hidden="true" className="h-[18px] w-[18px] shrink-0" strokeWidth={1.8} />
                    {item.label}
                  </InternalLink>
                ))}
              </div>

              <div className="site-mobile-navigation-footer mt-3 flex items-center pt-2">
                <a
                  href="https://github.com/Elexvx/AIADC-WEB"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="在 GitHub 查看 AIADC-WEB"
                  className="site-mobile-navigation-github inline-flex h-10 w-10 items-center justify-center rounded-md transition-colors"
                >
                  <img
                    src="https://github.githubassets.com/favicons/favicon.svg"
                    alt=""
                    width={22}
                    height={22}
                    className="h-[22px] w-[22px] dark:invert"
                  />
                </a>
                <span className="flex-1" aria-hidden="true" />
                <ThemeSwitch mode="light-dark" className="site-mobile-theme-switch" />
              </div>
            </nav>
          ) : null}
        </div>
      </div>
    </header>
  );
}
