import { getPageContent } from '@/lib/content';
import { getPageMetadata } from '@/lib/metadata';
import { PageHero } from '@/components/ui';

export async function generateMetadata() {
  return getPageMetadata('terms', '/terms');
}

export default async function TermsPage() {
  const page = await getPageContent('terms', 'zh');

  return (
    <main className="bg-white">

      <PageHero
        eyebrow={page.hero?.eyebrow ?? '服务条款'}
        title={page.hero?.title ?? ''}
        description={page.hero?.description ?? ''}
      />

      <section className="bg-white pb-12 sm:pb-14">
        <div className="section-shell rounded-lg border border-slate-200 bg-white p-6 sm:p-8">
          {page.richTextBlocks?.map((block) => (
            <p key={block.id} className="text-sm leading-8 text-slate-600 sm:text-base">
              {block.content}
            </p>
          ))}
        </div>
      </section>

    </main>
  );
}
