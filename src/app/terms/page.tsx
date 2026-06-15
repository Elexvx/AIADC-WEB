import { getPageContent, getSiteMeta } from '@/shared/content';
import { PageHero } from '@/shared/ui';
import { SiteFooter, SiteHeader } from '@/widgets/site-shell';

export const metadata = {
  ...getSiteMeta('terms', 'zh'),
};

export default function TermsPage() {
  const page = getPageContent('terms', 'zh');

  return (
    <main className="page-shell bg-white">
      <SiteHeader />
      <PageHero
        eyebrow={page.hero?.eyebrow ?? '服务条款'}
        title={page.hero?.title ?? ''}
        description={page.hero?.description ?? ''}
      />

      <section className="bg-white pb-12 sm:pb-14">
        <div className="section-shell rounded-lg border border-white bg-white/96 p-6 shadow-[0_16px_42px_rgba(15,23,42,0.07)] sm:p-8">
          {page.richTextBlocks?.map((block) => (
            <p key={block.id} className="text-sm leading-8 text-slate-600 sm:text-base">
              {block.content}
            </p>
          ))}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
