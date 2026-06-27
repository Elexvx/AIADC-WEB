'use client';

import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useLocale } from '@/lib/i18n/locale-provider';
import { Button, InternalLink } from '@/components/ui';
import { ThemeToggle } from '@/components/theme/theme-toggle';
import { SiteTopNoticeBar } from './site-top-notice-bar';

function BrandMark({ primary, secondary }: { primary: string; secondary: string }) {
  return (
    <span className="flex min-w-0 items-center gap-2.5">
      <span className="grid h-10 w-10 shrink-0 place-items-center overflow-hidden">
        <img src="/assets/aiadc-logo.png" alt="" width={40} height={40} className="h-10 w-10 object-contain" />
      </span>
      <span className="min-w-0 leading-none">
        <strong className="site-header-brand block max-w-[min(62vw,22rem)] truncate text-[1rem] font-semibold tracking-[-0.01em] transition-colors duration-300 sm:max-w-none sm:text-[1.125rem]">
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

  const centeredNavLabels = ['大赛介绍', '活动中心', '资料中心', '通知公告', '常见问题', '关于我们'];
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
        <div className="section-shell relative flex h-16 items-center justify-between gap-4">
          <InternalLink href="/" aria-label={`${brand.applicationName} ${brand.homeAria}`} className="min-w-0 flex-1 overflow-hidden">
            <BrandMark primary={brand.primary} secondary={brand.secondary} />
          </InternalLink>

          <nav
            className="absolute left-1/2 hidden -translate-x-1/2 items-center justify-center gap-6 lg:flex xl:gap-8"
            aria-label="头部导航"
          >
            {centeredNavItems.map((item) => (
              <InternalLink
                key={item.label}
                href={item.href}
                className={`whitespace-nowrap text-[15px] font-medium transition-colors hover:text-[#0075de] dark:hover:text-white ${
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
              className="site-theme-toggle h-10 w-10 shrink-0 rounded-md lg:hidden"
              onClick={() => setIsMobileMenuOpen((open) => !open)}
            >
              {isMobileMenuOpen ? <X aria-hidden="true" className="h-5 w-5" /> : <Menu aria-hidden="true" className="h-5 w-5" />}
            </Button>
            <Button asChild className="hidden h-10 shrink-0 rounded-md px-5 text-[15px] font-medium !text-white md:inline-flex">
              <InternalLink href="/login" className="!text-white">
                {header.loginLabel}
              </InternalLink>
            </Button>
          </div>

          {isMobileMenuOpen ? (
            <nav
              id="mobile-site-navigation"
              aria-label="移动端导航"
              className="absolute inset-x-4 top-[calc(100%+0.5rem)] z-20 overflow-hidden rounded-lg border border-[#111111]/10 bg-white shadow-[0_18px_48px_rgba(15,23,42,0.18)] dark:border-white/15 dark:bg-slate-950 lg:hidden"
            >
              <div className="grid gap-1 p-2">
                {header.mainNavItems.map((item) => (
                  <InternalLink
                    key={`${item.href}-${item.label}`}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`rounded-md px-3 py-3 text-[15px] font-medium transition-colors ${
                      isActive(item.href, pathname)
                        ? 'bg-[#0075de] text-white'
                        : 'text-slate-800 hover:bg-slate-100 dark:text-slate-100 dark:hover:bg-white/10'
                    }`}
                  >
                    {item.label}
                  </InternalLink>
                ))}
                <InternalLink
                  href="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="mt-1 rounded-md bg-[#0075de] px-3 py-3 text-center text-[15px] font-semibold text-white transition-colors hover:bg-[#005bab]"
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
