'use client';

import { usePathname } from 'next/navigation';
import { useLocale } from '@/lib/i18n/locale-provider';
import { Button, InternalLink } from '@/components/ui';
import { ThemeToggle } from '@/components/theme/theme-toggle';
import { SiteTopNoticeBar } from './site-top-notice-bar';

function BrandMark({ primary, secondary }: { primary: string; secondary: string }) {
  return (
    <span className="flex items-center gap-2.5">
      <span className="grid h-10 w-10 shrink-0 place-items-center overflow-hidden">
        <img src="/assets/aiadc-logo.png" alt="" width={40} height={40} className="h-10 w-10 object-contain" />
      </span>
      <span className="leading-none">
        <strong className="site-header-brand block whitespace-nowrap text-[1.125rem] font-semibold tracking-[-0.01em] transition-colors duration-300">
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
  const { siteShell } = useLocale();
  const { brand, header } = siteShell;

  const centeredNavLabels = ['大赛介绍', '资料中心', '通知公告', '常见问题', '关于我们'];
  const centeredNavItems = centeredNavLabels
    .map((label) => header.mainNavItems.find((item) => item.label === label))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  return (
    <header className="site-header sticky top-0 z-50 transition-colors duration-300">
      <SiteTopNoticeBar />

      <div className="site-header-main transition-colors duration-300">
        <div className="section-shell relative flex h-16 items-center justify-between gap-4">
          <InternalLink href="/" aria-label={`${brand.applicationName} ${brand.homeAria}`} className="min-w-0 shrink-0">
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

          <div className="flex items-center gap-3">
            <ThemeToggle className="h-10 w-10 shrink-0" />
            <Button asChild className="hidden h-10 shrink-0 rounded-md px-5 text-[15px] font-medium !text-white md:inline-flex">
              <InternalLink href="/login" className="!text-white">
                {header.loginLabel}
              </InternalLink>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
