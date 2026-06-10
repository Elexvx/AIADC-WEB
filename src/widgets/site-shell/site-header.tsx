'use client';

import { useState } from 'react';
import { ChevronDown, Languages, Menu } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { mainNavItems, pageSwitchItems, eventPageItems, siteContent } from '@/entities/site';
import { Button } from '@/shared/ui';

function BrandMark() {
  return (
    <span className="flex items-center gap-3">
      <span className="relative grid h-11 w-11 place-items-center overflow-hidden rounded-lg bg-gradient-to-br from-cyan-300 via-blue-500 to-blue-700 text-lg font-black text-white shadow-[0_16px_36px_rgba(37,99,235,0.35)]">
        A
        <span className="absolute bottom-1 right-1 h-2 w-2 rounded-full bg-emerald-300" />
      </span>
      <span className="leading-tight">
        <strong className="block text-base font-bold tracking-[-0.04em] text-white">全国大学生</strong>
        <small className="block text-sm font-semibold text-white/84">智能应用开发大赛</small>
      </span>
    </span>
  );
}

function isActive(href: string, pathname: string) {
  if (href === '/') return pathname === '/';
  return pathname === href;
}

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-[#070707] text-white shadow-[0_10px_34px_rgba(0,0,0,0.22)]">
      <div className="section-shell flex h-14 items-center gap-5 sm:h-16">
        <a href="/" aria-label={`${siteContent.brand.cnName} 首页`} className="shrink-0">
          <BrandMark />
        </a>

        <nav className="hidden flex-1 items-center justify-center gap-8 xl:flex" aria-label="主导航">
          {mainNavItems.map((item, index) =>
            item.dropdown ? (
              <div key={item.label} className="group relative">
                <a
                  href={item.href}
                  className={`relative inline-flex items-center whitespace-nowrap text-sm font-semibold transition-colors hover:text-orange-200 ${
                    eventPageItems.some((eventItem) => eventItem.href === pathname) ? 'text-white' : 'text-white/86'
                  }`}
                >
                  {item.label}
                  <ChevronDown className="ml-1 h-3.5 w-3.5" />
                </a>
                <div className="invisible absolute left-1/2 top-[calc(100%+1.1rem)] z-50 w-64 -translate-x-1/2 rounded-lg border border-slate-200 bg-white p-2 text-slate-950 opacity-0 shadow-[0_24px_70px_rgba(15,23,42,0.16)] transition-all group-hover:visible group-hover:opacity-100">
                  {eventPageItems.map((eventItem) => (
                    <a
                      key={eventItem.href}
                      href={eventItem.href}
                      className={`block rounded-md p-3 transition-colors hover:bg-blue-50 ${
                        isActive(eventItem.href, pathname) ? 'bg-blue-50' : ''
                      }`}
                    >
                      <span className="block text-sm font-bold text-slate-950">{eventItem.label}</span>
                      <span className="mt-1 block text-xs leading-5 text-slate-500">{eventItem.description}</span>
                    </a>
                  ))}
                </div>
              </div>
            ) : (
              <a
                key={`${item.label}-${item.href}`}
                href={item.href}
                className={`relative whitespace-nowrap text-sm font-semibold transition-colors hover:text-orange-200 ${
                  isActive(item.href, pathname) || (index === 0 && pathname === '/') ? 'text-white' : 'text-white/86'
                }`}
              >
                {item.label}
                {item.label === '关于我们' ? <ChevronDown className="ml-1 inline h-3.5 w-3.5" /> : null}
              </a>
            ),
          )}
        </nav>

        <div className="ml-auto flex items-center gap-3">
          <button
            type="button"
            className="hidden h-10 w-10 place-items-center rounded-full border border-white/20 text-white transition-colors hover:bg-white/10 sm:grid"
            aria-label="切换语言"
          >
            <Languages className="h-4 w-4" />
          </button>
          <Button asChild variant="outline" className="hidden h-10 rounded-full border-white/25 bg-transparent px-5 text-white hover:bg-white/10 sm:inline-flex">
            <a href="/#signup">登录</a>
          </Button>
          <div className="relative">
            <button
              type="button"
              aria-expanded={menuOpen}
              aria-haspopup="menu"
              onClick={() => setMenuOpen((open) => !open)}
              className="flex h-10 w-10 items-center justify-center rounded-md text-white transition-colors hover:bg-white/10 xl:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
            {menuOpen ? (
              <div className="fixed left-4 right-4 top-16 rounded-lg border border-slate-200 bg-white p-2 text-slate-950 shadow-[0_24px_70px_rgba(15,23,42,0.16)] sm:absolute sm:left-auto sm:right-0 sm:top-[calc(100%+0.75rem)] sm:w-[min(23rem,calc(100vw-2rem))]">
                <div className="grid gap-1 sm:grid-cols-2">
                  {pageSwitchItems.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className={`rounded-md p-3 transition-colors hover:bg-blue-50 ${isActive(item.href, pathname) ? 'bg-blue-50' : ''}`}
                    >
                      <span className="block text-sm font-bold text-slate-950">{item.label}</span>
                      <span className="mt-1 block text-xs leading-5 text-slate-500">{item.description}</span>
                    </a>
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
