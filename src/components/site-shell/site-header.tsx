'use client';

import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useLocale } from '@/lib/i18n/locale-provider';
import { ROUTES } from '@/lib/config/routes';
import { Button, InternalLink } from '@/components/ui';
import { ThemeToggle } from '@/components/theme/theme-toggle';
import { SiteTopNoticeBar } from './site-top-notice-bar';

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

function isActive(href: string, pathname: string) {
  if (href === '/') return pathname === '/';
  if (href.startsWith('/#')) return false;
  if (href.includes('#')) return pathname === href.split('#')[0];
  return pathname === href;
}

export function SiteHeader() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { siteShell } = useLocale();
  const { brand, header } = siteShell;

  const centeredNavLabels = ['活动中心', '资料中心', '通知公告', '关于大赛', '联系方式'];
  const centeredNavItems = centeredNavLabels
    .map((label) => header.mainNavItems.find((item) => item.label === label))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

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
    <header className="site-header sticky top-0 z-50 transition-colors duration-300">
      <SiteTopNoticeBar />

      <div className="site-header-main transition-colors duration-300">
        <div className="section-shell relative flex h-[4.65rem] items-center justify-between gap-4">
          <InternalLink href="/" aria-label={`${brand.applicationName} ${brand.homeAria}`} className="min-w-0 flex-1 overflow-hidden">
            <BrandMark primary={brand.primary} secondary={brand.secondary} />
          </InternalLink>

          <nav
            className="absolute left-1/2 hidden -translate-x-1/2 items-center justify-center gap-2 lg:flex"
            aria-label="头部导航"
          >
            {centeredNavItems.map((item) => (
              <InternalLink
                key={item.label}
                href={item.href}
                className={`rounded-full px-3 py-2 text-[15px] font-medium transition-colors hover:text-[#0075de] dark:hover:text-white ${
                  isActive(item.href, pathname) ? 'site-header-nav-active' : 'site-header-nav-muted'
                }`}
              >
                {item.label}
              </InternalLink>
            ))}
          </nav>

          <div className="relative z-10 flex shrink-0 items-center gap-2 sm:gap-3">
            <ThemeToggle className="h-10 w-10 shrink-0" />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label={isMobileMenuOpen ? '关闭导航菜单' : '打开导航菜单'}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-site-navigation"
              className="site-theme-toggle h-10 w-10 shrink-0 rounded-full lg:hidden"
              onClick={() => setIsMobileMenuOpen((open) => !open)}
            >
              {isMobileMenuOpen ? <X aria-hidden="true" className="h-5 w-5" /> : <Menu aria-hidden="true" className="h-5 w-5" />}
            </Button>
            <Button
              asChild
              variant="secondary"
              className="hidden h-10 shrink-0 rounded-full border border-[#e6e6e6] bg-white px-5 text-[15px] font-medium !text-black shadow-[rgba(0,0,0,0.01)_0_0.175px_1.041px,rgba(0,0,0,0.02)_0_0.8px_2.925px,rgba(0,0,0,0.027)_0_2.025px_7.847px,rgba(0,0,0,0.04)_0_4px_18px] hover:bg-[#f6f5f4] md:inline-flex"
            >
              <InternalLink href={ROUTES.registration} className="!text-black">
                {header.loginLabel}
              </InternalLink>
            </Button>
          </div>

          {isMobileMenuOpen ? (
            <nav
              id="mobile-site-navigation"
              aria-label="移动端导航"
              className="absolute inset-x-3 top-[calc(100%+0.75rem)] z-20 overflow-hidden rounded-[24px] border border-[#e6e6e6] bg-white/96 p-3 shadow-[0_23px_52px_rgba(0,0,0,0.08)] backdrop-blur dark:border-white/15 dark:bg-slate-950/96 lg:hidden"
            >
              <div className="grid grid-cols-2 gap-2">
                {header.mainNavItems.map((item) => (
                  <InternalLink
                    key={`${item.href}-${item.label}`}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex min-h-11 items-center rounded-xl px-3 text-[14px] font-semibold transition-colors ${
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
                  className="col-span-2 mt-1 flex min-h-11 items-center justify-center rounded-full bg-[#0075de] px-3 text-center text-[15px] font-semibold !text-white transition-colors hover:bg-[#005bab]"
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
