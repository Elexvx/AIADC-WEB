import { ArrowLeft, ArrowRight, CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react';
import { notFound } from 'next/navigation';
import { ArticleMarkdown } from '@/components/news/components/article-markdown';
import { InternalLink } from '@/components/ui';
import { getNewsArticleBySlug, getNewsArticles, getNewsCategories } from '@/lib/content';
import { getCanonicalPath } from '@/lib/metadata';
import { ArticlePageEffects } from './article-page-effects';

type NewsDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const articles = await getNewsArticles('zh');
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: NewsDetailPageProps) {
  const { slug } = await params;
  const article = await getNewsArticleBySlug(slug, 'zh');

  if (!article) {
    return {
      robots: {
        index: false,
        follow: false,
      },
      title: '资讯详情',
    };
  }

  const canonical = getCanonicalPath(`/news/${article.slug}`);

  return {
    title: article.title,
    description: article.excerpt,
    alternates: {
      canonical,
      languages: {
        'zh-CN': canonical,
      },
    },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url: canonical,
      type: 'article',
      publishedTime: article.date,
      tags: article.tags,
      images: [
        {
          url: article.image.url,
          alt: article.image.alt,
        },
      ],
    },
    twitter: {
      title: article.title,
      description: article.excerpt,
      images: [article.image.url],
    },
  };
}

function getSharedTagScore(leftTags: string[] | undefined, rightTags: string[] | undefined) {
  if (!leftTags?.length || !rightTags?.length) {
    return 0;
  }
  const right = new Set(rightTags);
  return leftTags.filter((tag) => right.has(tag)).length;
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const { slug } = await params;
  const [allArticles, categories] = await Promise.all([
    getNewsArticles('zh'),
    getNewsCategories('zh'),
  ]);
  const article = allArticles.find((item) => item.slug === slug);

  if (!article) {
    notFound();
  }

  const categoryLabel = categories.find((category) => category.value === article.category)?.label ?? article.category;
  const currentIndex = allArticles.findIndex((item) => item.slug === slug);
  const prevArticle = currentIndex > 0 ? allArticles[currentIndex - 1] : null;
  const nextArticle = currentIndex < allArticles.length - 1 ? allArticles[currentIndex + 1] : null;
  const relatedArticles = allArticles
    .filter((item) => item.slug !== slug)
    .map((item) => ({
      item,
      score: (item.category === article.category ? 10 : 0) + getSharedTagScore(article.tags, item.tags),
    }))
    .sort((left, right) => right.score - left.score || left.item.sort - right.item.sort)
    .slice(0, 3)
    .map(({ item }) => item);
  const hasMarkdown = article.contentFormat === 'markdown' && Boolean(article.bodyMarkdown?.trim());

  return (
    <main className="article-page min-h-screen bg-[#f7f5f0]">
      <ArticlePageEffects />
      <div className="article-progress fixed inset-x-0 top-0 z-50 h-[2px] origin-left scale-x-0 bg-[#111111]" />

      <article className="article-body relative px-5 pb-14 pt-12 sm:px-8 sm:pb-20 sm:pt-16 lg:px-12">
        <div className="mx-auto max-w-[760px]">
          <InternalLink
            href="/news"
            className="article-back-btn group inline-flex items-center gap-1.5 text-sm font-medium text-[#5f5b54] transition-colors duration-200 hover:text-[#111111]"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            返回新闻中心
          </InternalLink>

          <header className="article-header mx-auto mt-8 text-center">
            <p className="article-meta justify-center text-sm font-semibold text-[#38342f]">{categoryLabel}</p>
            <h1 className="article-title mx-auto mt-5 max-w-[680px] text-balance text-[2rem] font-bold leading-[1.18] text-[#111111] sm:text-[2.75rem]">
              {article.title}
            </h1>
            <p className="article-date mt-5 inline-flex items-center justify-center gap-2 text-sm text-[#6c675f]">
              <CalendarDays className="h-3.5 w-3.5" />
              <time dateTime={article.date}>{article.date}</time>
            </p>
            {article.tags?.length ? (
              <div className="mt-5 flex flex-wrap justify-center gap-2">
                {article.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-[#5f5b54] ring-1 ring-[#e6e6e6]">
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}
          </header>

          <figure className="article-cover mt-8 overflow-hidden rounded-[14px] bg-[#111111] sm:mt-10">
            <img
              src={article.image.url}
              alt={article.image.alt}
              loading="eager"
              decoding="async"
              fetchPriority="high"
              className="article-hero-image aspect-[16/9] w-full object-cover"
            />
          </figure>

          <aside className="article-excerpt mx-auto mt-8 max-w-[640px] border-l border-[#111111]/25 pl-5 sm:mt-10">
            <p className="text-[1.0625rem] leading-8 text-[#4e4942]">{article.excerpt}</p>
          </aside>

          {hasMarkdown ? (
            <ArticleMarkdown markdown={article.bodyMarkdown ?? ''} />
          ) : (
            <div className="article-content mx-auto mt-9 max-w-[640px] space-y-6">
              {article.body.map((paragraph, index) => (
                <p
                  key={paragraph}
                  className={`article-paragraph text-[1rem] leading-[2.05] text-[#38342f] sm:text-[1.0625rem] ${
                    index === 0 ? 'article-drop-cap' : ''
                  }`}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          )}

          <nav className="article-footer-divider mx-auto mt-14 flex max-w-[760px] items-center justify-between gap-4 border-t border-[#111111]/25 pt-6">
            {prevArticle ? (
              <InternalLink
                href={`/news/${prevArticle.slug}`}
                className="group inline-flex min-w-0 max-w-[45%] items-center gap-2 text-sm text-[#5f5b54] transition-colors hover:text-[#111111]"
              >
                <ChevronLeft className="h-4 w-4 shrink-0" />
                <span className="truncate">上一篇：{prevArticle.title}</span>
              </InternalLink>
            ) : <span />}
            {nextArticle ? (
              <InternalLink
                href={`/news/${nextArticle.slug}`}
                className="group inline-flex min-w-0 max-w-[45%] items-center justify-end gap-2 text-sm text-[#5f5b54] transition-colors hover:text-[#111111]"
              >
                <span className="truncate">下一篇：{nextArticle.title}</span>
                <ChevronRight className="h-4 w-4 shrink-0" />
              </InternalLink>
            ) : <span />}
          </nav>
        </div>

        {relatedArticles.length > 0 ? (
          <section className="article-related mx-auto mt-14 max-w-[980px] border-t border-[#111111]/25 pt-10 sm:mt-20 sm:pt-12">
            <h2 className="text-2xl font-bold text-[#111111]">相关内容</h2>
            <div className="mt-7 grid gap-8 md:grid-cols-3">
              {relatedArticles.map((relatedArticle) => (
                <InternalLink
                  key={relatedArticle.slug}
                  href={`/news/${relatedArticle.slug}`}
                  className="group block"
                >
                  <p className="text-sm font-semibold leading-6 text-[#111111] transition-colors group-hover:text-[#005bab]">
                    {relatedArticle.title}
                  </p>
                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#5f5b54]">{relatedArticle.excerpt}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm text-[#6c675f] transition-colors group-hover:text-[#111111]">
                    阅读更多
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </InternalLink>
              ))}
            </div>
          </section>
        ) : null}
      </article>
    </main>
  );
}
