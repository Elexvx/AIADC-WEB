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

const logoScaleByCode: Record<string, string> = {
  mca: 'scale-[1.06]',
  aieiri: 'scale-[1.02]',
  harmonyos: 'scale-[1.04]',
  'yutian-edu': 'scale-[1.04]',
  'jishu-financial': 'scale-[1.02]',
  'elexvx-ai': 'scale-[1.04]',
  elexvx: 'scale-[1.1]',
  aliyun: 'scale-[0.92]',
  tencent: 'scale-[0.94]',
  baidu: 'scale-[0.9]',
  deepseek: 'scale-[0.98]',
  bytedance: 'scale-[1.22]',
  alipay: 'scale-[1.18]',
  jadeisle: 'scale-[1.12]',
};

export function HomePartnersSection() {
  const page = usePageContent('home');
  const partners = getSectionItems(page, 'partners');

  return (
    <section id="partners" className="bg-white py-11 transition-colors duration-300 sm:py-14">
      <div className="section-shell">
        <HomeSectionTitle title="合作支持" description="展示协同高校、产业机构与技术平台标识。" />

        <div className="mt-8 grid grid-cols-2 gap-4 transition-colors duration-300 sm:mt-9 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 xl:grid-cols-5">
          {partners.map((partner) => (
            <div
              key={partner.id}
              className="grid h-24 place-items-center bg-white px-6 py-5 transition-colors duration-300 sm:h-28"
            >
              {partner.imageUrl ? (
                <img
                  src={partner.imageUrl}
                  alt={`${partner.title} logo`}
                  className={`h-12 w-[172px] object-contain sm:h-14 sm:w-[190px] ${logoScaleByCode[partner.code] ?? ''}`}
                  loading="lazy"
                  decoding="async"
                />
              ) : (
                <span aria-label={`${partner.title} logo`} className="text-base font-semibold tracking-[0] text-[#0075de] transition-colors duration-300">
                  {String(partner.extra?.initials ?? initials(partner.title))}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
