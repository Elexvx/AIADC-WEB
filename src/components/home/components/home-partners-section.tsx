import { getSectionItems } from '@/lib/content/utils';
import { usePageContent } from '@/lib/i18n/locale-provider';
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
    <section id="partners" className="bg-white py-11 transition-colors duration-300 sm:py-14">
      <div className="section-shell">
        <HomeSectionTitle title="合作支持" description="展示协同高校、产业机构与技术平台标识。" />

        <div className="mt-9 grid grid-cols-2 gap-x-8 gap-y-5 transition-colors duration-300 sm:grid-cols-3 lg:grid-cols-4">
          {partners.map((partner) => (
            <div key={partner.id} className="min-h-20 transition-colors duration-300">
              <div className="flex h-full items-center justify-center text-center">
                <div className="grid min-h-16 w-full max-w-full place-items-center">
                  {partner.imageUrl ? (
                    <img src={partner.imageUrl} alt={`${partner.title} logo`} className="h-auto max-h-20 w-auto max-w-full object-contain" loading="lazy" decoding="async" />
                  ) : (
                    <span aria-label={`${partner.title} logo`} className="text-base font-semibold tracking-[0] text-[#0075de] transition-colors duration-300">
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
