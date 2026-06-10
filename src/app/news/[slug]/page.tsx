import { ArrowLeft, CalendarDays } from 'lucide-react';
import { notFound } from 'next/navigation';
import { siteContent } from '@/entities/site';
import { Badge, InternalLink } from '@/shared/ui';
import { SiteFooter, SiteHeader } from '@/widgets/site-shell';

type NewsDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return siteContent.newsArticles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: NewsDetailPageProps) {
  const { slug } = await params;
  const article = siteContent.newsArticles.find((item) => item.slug === slug);

  if (!article) {
    return {
      title: '资讯详情',
    };
  }

  return {
    title: article.title,
    description: article.excerpt,
  };
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const { slug } = await params;
  const article = siteContent.newsArticles.find((item) => item.slug === slug);

  if (!article) {
    notFound();
  }

  const categoryLabel = siteContent.newsCategories.find((category) => category.value === article.category)?.label ?? '新闻动态';

  return (
    <main className="page-shell bg-white">
      <SiteHeader />

      <article className="bg-white py-12 sm:py-16">
        <div className="section-shell">
          <InternalLink href="/news" className="inline-flex items-center gap-2 rounded-md bg-white px-4 py-2 text-sm font-bold text-blue-700 shadow-[0_10px_24px_rgba(15,23,42,0.06)] transition-colors hover:bg-blue-50">
            <ArrowLeft className="h-4 w-4" />
            返回新闻中心
          </InternalLink>

          <div className="mt-8 overflow-hidden rounded-lg border border-white bg-white shadow-[0_18px_54px_rgba(15,23,42,0.08)]">
            <div className="relative aspect-[16/7] min-h-72 overflow-hidden bg-slate-900">
              <img src={article.imageUrl} alt={article.title} className="h-full w-full object-cover opacity-82" />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,7,18,0.12)_0%,rgba(3,7,18,0.78)_100%)]" />
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10">
                <div className="flex flex-wrap items-center gap-3">
                  <Badge className="border border-blue-100 bg-blue-50 text-blue-700">{categoryLabel}</Badge>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-slate-200">
                    <CalendarDays className="h-4 w-4" />
                    {article.date}
                  </span>
                </div>
                <h1 className="mt-5 max-w-5xl text-balance text-3xl font-black leading-tight tracking-[-0.05em] text-white sm:text-5xl">{article.title}</h1>
              </div>
            </div>

            <div className="mx-auto max-w-4xl px-6 py-8 sm:px-10 sm:py-12">
              <p className="border-l-4 border-blue-600 pl-5 text-lg font-semibold leading-9 text-slate-700">{article.excerpt}</p>
              <div className="mt-8 space-y-6 text-base leading-9 text-slate-700">
                {article.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </article>

      <SiteFooter />
    </main>
  );
}
