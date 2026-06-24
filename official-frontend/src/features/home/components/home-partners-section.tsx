import { getSectionItems } from '@/shared/content';
import { usePageContent } from '@/shared/i18n/locale-provider';
import { HomeSectionTitle } from './home-section-title';

function initials(title: string) {
  return title
    .replace(/[（(].*?[）)]/g, '')
    .split('')
    .filter((char) => /[\u4e00-\u9fa5A-Za-z0-9]/.test(char))
    .slice(0, 4)
    .join('');
}

export function HomePartnersSection() {
  const page = usePageContent('home');
  const partners = getSectionItems(page, 'partners');

  return (
    <section id="partners" className="bg-white py-10 sm:py-12">
      <div className="section-shell">
        <HomeSectionTitle title="合作支持" description="展示协同高校、产业机构与技术平台标识。" />

        <div className="mt-9 grid grid-cols-2 overflow-hidden rounded-lg border border-slate-200 bg-white sm:grid-cols-3 lg:grid-cols-6">
          {partners.map((partner) => (
            <div key={partner.id} className="min-h-24 border-b border-r border-slate-200 p-4 last:border-r-0">
              <div className="flex h-full items-center justify-center text-center">
                <div className="grid h-16 w-full max-w-32 place-items-center overflow-hidden rounded-md bg-white p-2">
                  {partner.imageUrl ? (
                    <img src={partner.imageUrl} alt={`${partner.title} logo`} className="h-full w-full object-contain" loading="lazy" />
                  ) : (
                    <span aria-label={`${partner.title} logo`} className="text-base font-semibold tracking-wide text-blue-700">
                      {String(partner.extra?.initials ?? initials(partner.title))}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
