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

        <div className="mt-8 grid grid-cols-2 gap-x-3 gap-y-4 transition-colors duration-300 sm:mt-9 sm:grid-cols-3 sm:gap-x-4 sm:gap-y-5 lg:grid-cols-4 xl:grid-cols-5 xl:gap-x-5">
          {partners.map((partner) => (
            <div key={partner.id} className="min-h-14 transition-colors duration-300 sm:min-h-20">
              <div className="flex h-full items-center justify-center text-center">
                <div className="grid h-14 w-32 place-items-center sm:h-20 sm:w-40">
                  {partner.imageUrl ? (
                    <img src={partner.imageUrl} alt={`${partner.title} logo`} className="h-14 w-32 object-contain sm:h-20 sm:w-40" loading="lazy" decoding="async" />
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
