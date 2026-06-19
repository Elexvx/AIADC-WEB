import { ArrowLeft, CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react';
import { notFound } from 'next/navigation';
import { getNewsArticleBySlug, getNewsArticles, getNewsCategories } from '@/shared/content';
import { InternalLink } from '@/shared/ui';
import { SiteFooter, SiteHeader } from '@/widgets/site-shell';
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
      title: '璧勮璇︽儏',
    };
  }

  return {
    title: article.title,
    description: article.excerpt,
  };
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const { slug } = await params;
  const article = await getNewsArticleBySlug(slug, 'zh');

  if (!article) {
    notFound();
  }

  const categories = await getNewsCategories('zh');
  const categoryLabel = categories.find((category) => category.value === article.category)?.label ?? '新闻动态';

  const allArticles = await getNewsArticles('zh');
  const currentIndex = allArticles.findIndex((item) => item.slug === slug);
  const prevArticle = currentIndex > 0 ? allArticles[currentIndex - 1] : null;
  const nextArticle = currentIndex < allArticles.length - 1 ? allArticles[currentIndex + 1] : null;

  return (
    <main className="article-page min-h-screen bg-[#faf9f7]">
      <ArticlePageEffects />
      {/* Reading Progress Bar */}
      <div className="article-progress fixed inset-x-0 top-0 z-50 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-[#1a365d] via-[#2c5282] to-[#3182ce]" />

      <SiteHeader />

      {/* 鈹€鈹€ Hero Section: Full-bleed Editorial Image 鈹€鈹€ */}
      <section className="article-hero relative overflow-hidden">
        {/* Decorative top accent line */}
        <div className="absolute left-0 right-0 top-0 z-10 h-[4px] bg-gradient-to-r from-transparent via-[#1a365d] to-transparent" />

        <div className="relative h-[320px] overflow-hidden sm:h-[380px]">
          {/* Image with refined treatment */}
          <img
            src={article.image.url}
            alt={article.image.alt}
            className="article-hero-image h-full w-full object-cover"
          />
          {/* Gradient overlay - matches image for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/50 to-black/80" />

          {/* Content overlay */}
          <div className="absolute inset-x-0 bottom-0 z-10 px-6 pb-10 pt-20 sm:px-12 sm:pb-14 sm:pt-24 lg:px-20">
            <div className="mx-auto max-w-4xl">
              {/* Meta row */}
              <div className="article-meta flex flex-wrap items-center gap-3">
                <span className="article-category inline-flex items-center rounded-full border border-white/30 bg-white/15 px-4 py-1.5 text-xs font-semibold tracking-wide text-white/95 backdrop-blur-md">
                  {categoryLabel}
                </span>
                <span className="inline-flex items-center gap-2 text-sm text-white/60">
                  <CalendarDays className="h-3.5 w-3.5" />
                  <time dateTime={article.date}>{article.date}</time>
                </span>
              </div>

              {/* Title */}
              <h1 className="article-title mt-6 max-w-3xl text-balance text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
                {article.title}
              </h1>
            </div>
          </div>
        </div>

        {/* Bottom wave separator */}
        <svg
          className="absolute -bottom-1 left-0 right-0 h-8 w-full text-[#faf9f7]"
          preserveAspectRatio="none"
          viewBox="0 0 1440 32"
          fill="currentColor"
        >
          <path d="M0 32L48 29.3C96 27 192 21 288 18.7C384 16 480 16 576 18.7C672 21 768 27 864 28C960 29 1056 24 1152 21.3C1248 19 1344 19 1392 19L1440 19V32H1392C1344 32 1248 32 1152 32C1056 32 960 32 864 32C768 32 672 32 576 32C480 32 384 32 288 32C192 32 96 32 48 32H0Z" />
        </svg>
      </section>

      {/* 鈹€鈹€ Article Body: Editorial Reading Experience 鈹€鈹€ */}
      <article className="article-body relative">
        {/* Match hero content alignment: same padding + same max-width */}
        <div className="px-6 py-14 sm:px-12 sm:py-20 lg:px-20">
          <div className="mx-auto max-w-4xl">
          {/* Back navigation */}
          <InternalLink
            href="/news"
            className="group inline-flex items-center gap-1.5 text-sm text-slate-400 transition-colors duration-200 hover:text-slate-600"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-x-0.5" />
            杩斿洖鏂伴椈涓績
          </InternalLink>

          {/* Lead / Excerpt - styled as pull quote area */}
          <aside className="mt-10 border-l-2 border-blue-500/30 pl-6">
            <p className="text-lg leading-relaxed text-slate-600 sm:text-xl sm:leading-loose">
              {article.excerpt}
            </p>
          </aside>

          {/* Main content paragraphs */}
          <div className="article-content mt-10 space-y-7">
            {article.body.map((paragraph, index) => (
              <p
                key={paragraph}
                className={`article-paragraph text-base leading-[2] text-slate-700 sm:text-[17px] ${
                  index === 0 ? 'article-drop-cap' : ''
                }`}
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* 涓婁竴绡?/ 涓嬩竴绡?瀵艰埅 */}
          <nav className="mt-12 flex items-center justify-between gap-4 border-t border-slate-200 pt-8">
            {prevArticle ? (
              <InternalLink
                href={`/news/${prevArticle.slug}`}
                className="group inline-flex max-w-[45%] items-center gap-2 text-sm text-slate-500 transition-colors hover:text-blue-600"
              >
                <ChevronLeft className="h-4 w-4 shrink-0 transition-transform group-hover:-translate-x-0.5" />
                <span className="truncate">涓婁竴绡囷細{prevArticle.title}</span>
              </InternalLink>
            ) : <span />}
            {nextArticle ? (
              <InternalLink
                href={`/news/${nextArticle.slug}`}
                className="group inline-flex max-w-[45%] items-center justify-end gap-2 text-sm text-slate-500 transition-colors hover:text-blue-600"
              >
                <span className="truncate">涓嬩竴绡囷細{nextArticle.title}</span>
                <ChevronRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
              </InternalLink>
            ) : <span />}
          </nav>
          </div>
        </div>
      </article>

      <SiteFooter />
    </main>
  );
}
