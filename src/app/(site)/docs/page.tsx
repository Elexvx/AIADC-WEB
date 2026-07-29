import type { Metadata } from 'next';
import { ArrowRight, BookOpenText, ClipboardList, ListChecks } from 'lucide-react';
import { Button, InternalLink, PageHero, ScrollReveal } from '@/components/ui';
import { ROUTES } from '@/lib/config/routes';

export const metadata: Metadata = {
  title: 'AIADC 赛事文档中心',
  description: '集中查阅全国大学生智能应用开发大赛参赛说明与评分标准。',
  alternates: {
    canonical: ROUTES.docs,
  },
};

const documents = [
  {
    order: '01',
    title: '参赛说明',
    description: '查看参赛组别、三类赛道、报名与组队要求、项目方向、2026 赛程和评审方式。',
    scope: '参赛资格与赛程',
    href: ROUTES.docsParticipation,
    icon: ClipboardList,
  },
  {
    order: '02',
    title: '评分标准',
    description: '查阅萌芽、创意、OPC 轻创三赛道的完整百分制评分指标、评审口径和扣分规则。',
    scope: '评审规则与分值',
    href: ROUTES.docsReview,
    icon: ListChecks,
  },
] as const;

export default function DocumentationCenterPage() {
  return (
    <main className="bg-background">
      <PageHero
        eyebrow="参赛指南"
        title="AIADC 赛事文档中心"
        description="两份核心参赛文件集中展示。先了解参赛要求，再核对评分标准。"
      />

      <ScrollReveal as="section" className="bg-white pt-8 pb-14 dark:bg-background sm:pt-10 sm:pb-18" delay={40}>
        <div className="section-shell">
          <div className="mb-7 flex flex-col gap-3 sm:mb-9 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="section-kicker">2026 赛季</div>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[#111111] dark:text-white sm:text-3xl">
                参赛文档
              </h2>
              <p className="mt-3 max-w-2xl text-[15px] leading-7 text-[#615d59] dark:text-white/65">
                内容依据组委会正式通知、执行方案、材料模板和评审规则整理。
              </p>
            </div>
            <div className="inline-flex items-center gap-2 text-sm text-[#615d59] dark:text-white/65">
              <BookOpenText className="size-4" aria-hidden="true" />
              共 2 份核心文件
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-[#e6e6e6] bg-white dark:border-white/10 dark:bg-white/5">
            <div className="md:hidden">
              {documents.map((document, index) => {
                const Icon = document.icon;

                return (
                  <article
                    key={document.href}
                    className={[
                      'border-b border-[#e6e6e6] px-5 py-6 last:border-b-0 dark:border-white/10',
                      index % 2 === 0 ? 'bg-white dark:bg-transparent' : 'bg-[#fbfaf9] dark:bg-white/[0.025]',
                    ].join(' ')}
                  >
                    <div className="flex items-start gap-4">
                      <span className="min-w-8 pt-2 text-[16px] font-semibold text-[#111111] dark:text-white">
                        {document.order}
                      </span>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-3">
                          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#f4ead2] text-[#b47a00] dark:bg-[#b47a00]/15 dark:text-[#e1a92b]">
                            <Icon className="size-5" aria-hidden="true" />
                          </span>
                          <h3 className="text-[17px] font-semibold leading-7 text-[#111111] dark:text-white">
                            {document.title}
                          </h3>
                        </div>

                        <span className="mt-4 inline-flex rounded-full bg-[#f1efeb] px-3 py-1.5 text-[12px] font-medium text-[#615d59] dark:bg-white/10 dark:text-white/70">
                          {document.scope}
                        </span>

                        <p className="mt-4 text-[15px] leading-7 text-[#615d59] dark:text-white/65">
                          {document.description}
                        </p>

                        <Button asChild variant="outline" className="mt-5 min-h-11 w-full bg-white dark:bg-transparent">
                          <InternalLink href={document.href}>
                            查看文档
                            <ArrowRight className="size-4" aria-hidden="true" />
                          </InternalLink>
                        </Button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            <div className="hidden overflow-x-auto md:block">
              <table className="w-full min-w-[760px] border-collapse">
                <colgroup>
                  <col className="w-[7rem]" />
                  <col className="w-[22%]" />
                  <col />
                  <col className="w-[13rem]" />
                  <col className="w-[10rem]" />
                </colgroup>
                <thead>
                  <tr className="border-b border-[#e6e6e6] bg-[#f6f5f4] text-left text-[12px] font-semibold tracking-[0.12em] text-[#615d59] dark:border-white/10 dark:bg-white/5 dark:text-white/60">
                    <th className="px-6 py-5 sm:px-8">序号</th>
                    <th className="px-6 py-5 sm:px-8">文档名称</th>
                    <th className="px-6 py-5 sm:px-8">内容说明</th>
                    <th className="px-6 py-5 sm:px-8">适用范围</th>
                    <th className="px-6 py-5 sm:px-8">操作</th>
                  </tr>
                </thead>
                <tbody>
                  {documents.map((document, index) => {
                    const Icon = document.icon;

                    return (
                      <tr
                        key={document.href}
                        className={[
                          'border-b border-[#e6e6e6] last:border-b-0 dark:border-white/10',
                          index % 2 === 0 ? 'bg-white dark:bg-transparent' : 'bg-[#fbfaf9] dark:bg-white/[0.025]',
                        ].join(' ')}
                      >
                        <td className="px-6 py-7 align-middle sm:px-8">
                          <span className="text-[17px] font-semibold text-[#111111] dark:text-white">{document.order}</span>
                        </td>
                        <td className="px-6 py-7 align-middle sm:px-8">
                          <div className="flex items-center gap-3">
                            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#f4ead2] text-[#b47a00] dark:bg-[#b47a00]/15 dark:text-[#e1a92b]">
                              <Icon className="size-5" aria-hidden="true" />
                            </span>
                            <span className="text-[16px] font-semibold text-[#111111] dark:text-white">{document.title}</span>
                          </div>
                        </td>
                        <td className="px-6 py-7 align-middle sm:px-8">
                          <p className="max-w-2xl text-[15px] leading-7 text-[#615d59] dark:text-white/65">
                            {document.description}
                          </p>
                        </td>
                        <td className="px-6 py-7 align-middle sm:px-8">
                          <span className="inline-flex rounded-full bg-[#f1efeb] px-3 py-1.5 text-[12px] font-medium text-[#615d59] dark:bg-white/10 dark:text-white/70">
                            {document.scope}
                          </span>
                        </td>
                        <td className="px-6 py-7 align-middle sm:px-8">
                          <Button asChild variant="outline" className="min-h-11 bg-white dark:bg-transparent">
                            <InternalLink href={document.href}>
                              查看文档
                              <ArrowRight className="size-4" aria-hidden="true" />
                            </InternalLink>
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="border-t border-[#e6e6e6] bg-[#f6f5f4] px-6 py-5 text-[14px] leading-7 text-[#615d59] dark:border-white/10 dark:bg-white/5 dark:text-white/60 sm:px-8">
              文档中心用于改善赛事信息的查找和阅读体验；具体时点、线下安排及补充要求，以报名系统和组委会最新通知为准。
            </div>
          </div>
        </div>
      </ScrollReveal>
    </main>
  );
}
