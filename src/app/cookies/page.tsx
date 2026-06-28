import { getPageContent } from '@/lib/content';
import { getPageMetadata } from '@/lib/metadata';
import { ArticleMarkdown } from '@/components/news/components/article-markdown';
import { PageHero } from '@/components/ui';

export async function generateMetadata() {
  return getPageMetadata('cookies', '/cookies');
}

export default async function CookiesPage() {
  const page = await getPageContent('cookies', 'zh');

  return (
    <main className="bg-white">
      <PageHero
        eyebrow={page.hero?.eyebrow ?? 'Cookies政策'}
        title={page.hero?.title ?? ''}
        description={page.hero?.description ?? ''}
      />

      <section className="bg-white pb-12 sm:pb-14">
        <div className="section-shell">
          {page.richTextBlocks?.map((block) =>
            block.type === 'markdown' ? (
              <ArticleMarkdown key={block.id} markdown={block.content} />
            ) : (
              <p key={block.id} className="text-sm leading-8 text-slate-600 sm:text-base">
                {block.content}
              </p>
            ),
          )}
        </div>
      </section>
    </main>
  );
}
