'use client';

import { useLocale } from '@/lib/i18n/locale-provider';
import { SITE_NAV_ITEMS } from '@/lib/config/routes';
import { InternalLink } from '@/components/ui';

const footerHeadingClass = 'text-xl font-bold leading-7 text-slate-950';
function PlaceholderQrCode() {
  return (
    <div
      className="flex h-24 w-24 items-center justify-center rounded-md border border-dashed border-slate-300 bg-slate-50 p-2 text-center text-xs font-semibold leading-5 text-slate-500 shadow-sm"
      aria-hidden="true"
    >
      未上传
    </div>
  );
}

export function SiteFooter() {
  const { siteShell } = useLocale();
  const { footer } = siteShell;
  const showFooterColumns = true;
  const visibleFooterColumns = [
    {
      title: '导航',
      links: SITE_NAV_ITEMS,
    },
  ];

  return (
    <footer className="mt-auto border-t border-slate-200 bg-white">
      <div className="bg-white text-slate-950">
        <div className="section-shell py-8 sm:py-10 lg:py-12">
          <div className={showFooterColumns ? 'grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] lg:items-start lg:gap-12' : ''}>
            <div className="max-w-md">
              <h3 className={`${footerHeadingClass} max-w-sm text-balance`}>全国大学生智能应用开发大赛</h3>
              <p className="mt-3 max-w-[34rem] text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                {footer.description}
              </p>
              {footer.contactPanel?.qrCodes?.length ? (
                <div className="mt-5 flex flex-wrap gap-4">
                  {footer.contactPanel.qrCodes.map((qrCode) => (
                    <div key={qrCode.label} className="flex flex-col items-center gap-2">
                      {qrCode.imageUrl ? (
                        <img
                          src={qrCode.imageUrl}
                          alt={qrCode.label}
                          loading="eager"
                          decoding="async"
                          className="h-24 w-24 rounded-md border border-slate-200 bg-white object-cover p-1 shadow-sm"
                        />
                      ) : (
                        <PlaceholderQrCode />
                      )}
                      <span className="text-xs font-medium leading-5 text-slate-600">{qrCode.label}</span>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>

            {showFooterColumns ? (
              <div className="grid grid-cols-2 gap-x-6 gap-y-8 border-t border-blue-100 pt-6 text-left sm:grid-cols-3 sm:gap-x-8 sm:pt-7 lg:ml-auto lg:w-fit lg:grid-cols-1 lg:border-t-0 lg:pt-0 lg:text-right">
                {visibleFooterColumns.map((column) => (
                  <div key={column.title} className="space-y-3">
                    <div className="flex flex-col items-start gap-2 lg:items-end">
                      <h3 className={footerHeadingClass}>{column.title}</h3>
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
            ) : null}
          </div>
        </div>
      </div>

      <div className="border-t border-slate-200 bg-white">
        <div className="section-shell flex flex-col gap-3 py-4 text-sm text-slate-500 sm:py-5 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 leading-6">
            <span>{footer.copyright}</span>
            {footer.filings.map((filing) => {
              const isPublicSecurityFiling = filing.href.includes('beian.mps.gov.cn') || filing.label.includes('公网安备');

              return (
                <a
                  key={filing.label}
                  href={filing.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 transition-colors hover:text-slate-900"
                >
                  {isPublicSecurityFiling ? (
                    <img src="/assets/beian-icon.png" alt="" aria-hidden="true" className="h-4 w-4 shrink-0 object-contain" />
                  ) : null}
                  <span>{filing.label}</span>
                </a>
              );
            })}
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
