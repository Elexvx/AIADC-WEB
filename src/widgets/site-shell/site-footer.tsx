'use client';

import { useLocale } from '@/shared/i18n/locale-provider';
import { InternalLink } from '@/shared/ui';

export function SiteFooter() {
  const { siteShell } = useLocale();
  const { footer, brand } = siteShell;

  return (
    <footer className="mt-auto border-t border-slate-200 bg-white">
      <div className="bg-white text-slate-950">
        <div className="section-shell py-8 sm:py-10 lg:py-12">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] lg:items-start lg:gap-12">
            <div className="max-w-md">
              <h2 className="heading-2 text-slate-950">
                {brand.primary}{brand.secondary}
              </h2>
              <p className="mt-3 max-w-[34rem] text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                {footer.description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-x-6 gap-y-8 border-t border-blue-100 pt-6 text-right sm:grid-cols-3 sm:gap-x-8 sm:pt-7 lg:ml-auto lg:w-fit lg:border-t-0 lg:pt-0">
              {footer.columns.map((column) => (
                <div key={column.title} className="space-y-3">
                  <div className="flex flex-col items-end gap-2">
                    <h3 className="heading-3 text-slate-950">{column.title}</h3>
                    <div className="h-px w-10 bg-blue-200" />
                  </div>

                  <nav aria-label={`${column.title}栏目`} className="space-y-2 text-sm leading-6 text-slate-600 sm:text-[15px]">
                    {column.links.map((link) => (
                      <InternalLink
                        key={link.label}
                        href={link.href}
                        className="block transition-colors duration-200 hover:text-blue-700"
                      >
                        {link.label}
                      </InternalLink>
                    ))}
                  </nav>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-200 bg-white">
        <div className="section-shell flex flex-col gap-3 py-4 text-sm text-slate-500 sm:py-5 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 leading-6">
            <span>{footer.copyright}</span>
            {footer.filings.map((filing) => (
              <a
                key={filing.label}
                href={filing.href}
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-slate-900"
              >
                {filing.label}
              </a>
            ))}
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-slate-600">
            {footer.legalLinks.map((link) => (
              <InternalLink key={link.label} href={link.href} className="transition-colors hover:text-slate-900">
                {link.label}
              </InternalLink>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
