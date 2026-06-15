import { Sparkles } from 'lucide-react';
import { getPageContent, getSectionItems, getSiteMeta, resolveIcon } from '@/shared/content';
import { PageHero } from '@/shared/ui';
import { SiteFooter, SiteHeader } from '@/widgets/site-shell';

export const metadata = {
  ...getSiteMeta('about', 'zh'),
};

export default function AboutPage() {
  const page = getPageContent('about', 'zh');
  const aboutItems = getSectionItems(page, 'aboutItems');

  return (
    <main className="page-shell bg-white">
      <SiteHeader />
      <PageHero
        eyebrow={page.hero?.eyebrow ?? '关于我们'}
        title={page.hero?.title ?? ''}
        description={page.hero?.description ?? ''}
        backgroundImage={page.hero?.backgroundImage}
        dark={page.hero?.dark}
        fullBleedBackground
      />

      <section className="bg-white pt-8 pb-12 sm:pt-10 sm:pb-14">
        <div className="section-shell grid gap-5 md:grid-cols-3">
          {aboutItems.map((item) => {
            const Icon = resolveIcon(item.iconKey, Sparkles);
            return (
              <div key={item.id} className="rounded-lg border border-white bg-white/96 p-6 shadow-[0_16px_42px_rgba(15,23,42,0.07)]">
                <Icon className="h-6 w-6 text-blue-600" />
                <h2 className="mt-4 text-xl font-black tracking-[-0.04em] text-slate-950">{item.title}</h2>
                <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">{item.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
