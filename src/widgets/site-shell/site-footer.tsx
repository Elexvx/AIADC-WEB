import { siteContent } from '@/entities/site';

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-white">
      <div className="border-t border-white/10 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.18),transparent_30%),linear-gradient(180deg,#0c1830_0%,#09111f_100%)] text-white">
        <div className="section-shell grid gap-10 py-14 sm:gap-12 sm:py-16 lg:grid-cols-4 lg:gap-20">
          {siteContent.footer.columns.map((column) => (
            <div key={column.title} className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold tracking-[-0.03em] text-white/92 sm:text-[1.9rem]">{column.title}</h2>
                <div className="h-px w-16 bg-blue-200/38" />
              </div>

              <nav aria-label={`${column.title}栏目`} className="space-y-3 text-base leading-8 text-slate-300 sm:text-lg">
                {column.links.map((link) => (
                  <a
                    key={link}
                    href="/#signup"
                    className="block transition-colors duration-200 hover:text-white"
                  >
                    {link}
                  </a>
                ))}
              </nav>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-slate-200 bg-white">
        <div className="section-shell flex flex-col gap-4 py-5 text-sm text-slate-500 sm:py-6 md:flex-row md:items-center md:justify-between">
          <span className="leading-6">{siteContent.footer.copyright}</span>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-slate-600">
            {siteContent.footer.legalLinks.map((link) => (
              <a key={link} href="/#signup" className="transition-colors hover:text-slate-900">
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
