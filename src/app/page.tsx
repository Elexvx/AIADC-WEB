'use client';

import { ArrowRight, ChevronRight, Download, HelpCircle, Users } from 'lucide-react';
import { siteContent } from '@/entities/site';
import {
  homeFaqItems,
  homeGroupIcons,
  homeHighlightItems,
  homePartnerLogos,
  HomeHero,
  HomeStatsGrid,
} from '@/features/home';
import { NewsArticleCard } from '@/features/news';
import { Button, Card, CardContent, SectionHeading } from '@/shared/ui';
import { SiteFooter, SiteHeader } from '@/widgets/site-shell';

export default function HomePage() {
  const newsArticles = siteContent.newsArticles.filter((article) => article.category === 'news');
  const notices = siteContent.newsArticles.filter((article) => article.category !== 'news');

  return (
    <main className="page-shell bg-white">
      <SiteHeader />
      <HomeHero />
      <HomeStatsGrid />

      <section id="groups" className="bg-white py-10 sm:py-12">
        <div className="section-shell">
          <div className="mx-auto max-w-4xl text-center">
            <SectionHeading centered eyebrow="参赛对象" title="覆盖多元青年创新团队" description="以团队形式参赛，每队 1-5 人，可跨校组队，按照组别选择对应赛道。" />
          </div>

          <div className="mt-9 grid gap-5 md:grid-cols-3">
            {siteContent.groups.map((group, index) => {
              const Icon = homeGroupIcons[index] ?? Users;
              return (
                <Card key={group.title} className="rounded-lg border-white bg-white/96 shadow-[0_16px_42px_rgba(15,23,42,0.07)]">
                  <CardContent className="flex h-full min-h-72 flex-col p-5 sm:p-6">
                    <div className="grid h-12 w-12 place-items-center rounded-lg bg-gradient-to-br from-blue-50 to-cyan-50 text-blue-600 ring-1 ring-blue-100">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="mt-5 min-w-0">
                      <h3 className="text-lg font-bold tracking-[-0.04em] text-slate-950">{group.title}</h3>
                      <p className="mt-2 text-sm leading-7 text-slate-600">{group.description}</p>
                    </div>
                    <a href="#signup" className="mt-auto inline-flex h-9 w-fit shrink-0 items-center gap-2 rounded-md bg-blue-50 px-3 text-sm font-semibold text-blue-700 transition-colors hover:bg-blue-100">
                      {group.cta}
                      <ChevronRight className="h-4 w-4" />
                    </a>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white pb-10 sm:pb-12">
        <div className="section-shell">
          <div className="mx-auto max-w-4xl text-center">
            <SectionHeading
              centered
              eyebrow="赛事亮点"
              title="让智能应用，从想法走向验证"
              description="赛事围绕组别、赛道、时间线与作品评审构建一体化体验，让每个团队都能快速找到适合自己的成长路径。"
            />
          </div>

          <div className="mt-9 grid gap-5 md:grid-cols-4">
            {homeHighlightItems.map((item) => {
              const Icon = item.icon;
              return (
                <Card key={item.title} className="rounded-lg border-white bg-white/96 shadow-[0_16px_42px_rgba(15,23,42,0.07)]">
                  <CardContent className="flex min-h-56 flex-col p-5 sm:p-6">
                    <div className="grid h-12 w-12 place-items-center rounded-lg bg-gradient-to-br from-blue-50 to-cyan-50 text-blue-600 ring-1 ring-blue-100">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-5 text-lg font-bold tracking-[-0.04em] text-slate-950">{item.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-slate-600">{item.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section id="partners" className="bg-white pb-10 sm:pb-12">
        <div className="section-shell">
          <div className="mx-auto max-w-4xl text-center">
            <SectionHeading centered eyebrow="合作伙伴" title="共建智能应用创新生态" description="联合高校、产业机构与技术平台，为参赛团队提供命题、评审、资源与生态支持。" />
          </div>
          <div className="mt-9 grid grid-cols-2 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-[0_16px_42px_rgba(15,23,42,0.06)] sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
            {homePartnerLogos.map((partner) => (
              <Card key={partner} className="rounded-none border-0 border-r border-b border-slate-200 bg-white shadow-none">
                <CardContent className="grid min-h-24 place-items-center !p-5 text-center">
                  <span className="text-balance text-sm font-black tracking-[-0.03em] text-slate-500 sm:text-base">{partner}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="news" className="bg-white pb-10 sm:pb-12">
        <div className="section-shell">
          <SectionHeading centered eyebrow="新闻动态" title="赛事资讯实时更新" description="聚焦赛事进展、赛道发布与评审动态，帮助参赛团队快速获取重要信息。" />
          <div className="mt-9 grid gap-5 md:grid-cols-3">
            {newsArticles.map((article) => (
              <NewsArticleCard key={article.slug} article={article} categoryLabel="新闻动态" />
            ))}
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {notices.map((article) => (
              <NewsArticleCard key={article.slug} article={article} variant="compact" />
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="bg-white py-10 sm:py-12">
        <div className="section-shell">
          <SectionHeading centered eyebrow="常见问题" title="报名与作品提交问题速查" description="把高频问题前置到官网，提升移动端与桌面端的信息查找效率。" />
          <div className="mx-auto mt-9 grid max-w-5xl gap-4 md:grid-cols-2">
            {homeFaqItems.map((item) => (
              <Card key={item.question} className="rounded-lg border-slate-200 bg-white shadow-[0_14px_36px_rgba(15,23,42,0.06)]">
                <CardContent className="flex min-h-36 items-start gap-4 !p-6">
                  <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-blue-50 text-blue-600 ring-1 ring-blue-100">
                    <HelpCircle className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 pt-0.5">
                    <h3 className="text-base font-black leading-6 tracking-[-0.03em] text-slate-950">{item.question}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{item.answer}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="signup" className="bg-white py-10 sm:py-12">
        <div className="section-shell grid gap-8 rounded-lg border border-white bg-white/96 p-6 shadow-[0_16px_42px_rgba(15,23,42,0.07)] sm:p-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <div className="section-kicker text-blue-600">报名参赛</div>
            <h2 className="mt-4 max-w-2xl text-balance text-4xl font-black tracking-[-0.06em] text-slate-950 sm:text-5xl">{siteContent.cta.title}</h2>
            <p className="mt-5 max-w-2xl text-lg leading-9 text-slate-600">{siteContent.cta.description}</p>
          </div>
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <Button asChild size="lg" className="rounded-md bg-blue-600 text-white hover:bg-blue-500">
                <a href="#top" className="inline-flex items-center gap-2">
                  {siteContent.cta.action}
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-md border-blue-200 bg-white text-blue-700 hover:bg-blue-50">
                <a href="/materials" className="inline-flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  下载执行方案
                </a>
              </Button>
            </div>
            <p className="text-sm leading-7 text-slate-600">报名材料、赛道说明、作品模板与评审规则将在报名系统中同步开放。</p>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
