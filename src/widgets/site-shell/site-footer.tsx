import { footerSwitchLinks, siteContent } from '@/entities/site';

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-white">
      <div className="section-shell py-5 text-sm text-slate-500 sm:py-6">
        <nav aria-label="底部页面切换" className="mb-4 flex flex-wrap gap-x-5 gap-y-2 border-b border-slate-200 pb-4 text-sm font-semibold text-slate-600">
          {footerSwitchLinks.map((item) => (
            <a key={item.href} href={item.href} className="transition-colors hover:text-blue-700">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <span className="leading-6">{siteContent.footer.copyright}</span>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {siteContent.footer.legalLinks.map((link) => (
              <a key={link} href="/#signup" className="transition-colors hover:text-blue-700">
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
