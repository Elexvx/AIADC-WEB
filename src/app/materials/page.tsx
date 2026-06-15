import { ArrowRight, Download } from 'lucide-react';
import { getPageContent, getSectionItems, getSiteMeta } from '@/shared/content';
import { Button, Card, InternalLink, PageHero, ScrollReveal } from '@/shared/ui';
import { SiteFooter, SiteHeader } from '@/widgets/site-shell';

export const metadata = {
  ...getSiteMeta('materials', 'zh'),
};

export default function MaterialsPage() {
  const page = getPageContent('materials', 'zh');
  const materialItems = getSectionItems(page, 'materials');

  return (
    <main className="page-shell bg-white">
      <SiteHeader />
      <PageHero
        eyebrow={page.hero?.eyebrow ?? '材料下载'}
        title={page.hero?.title ?? ''}
        description={page.hero?.description ?? ''}
        backgroundImage={page.hero?.backgroundImage}
        dark={page.hero?.dark}
        fullBleedBackground
      />

      <ScrollReveal as="section" className="relative z-10 bg-white pt-8 pb-14 sm:pt-10 sm:pb-16" delay={40}>
        <div className="section-shell">
          <Card className="overflow-hidden rounded-2xl border-white/80 bg-white/96 shadow-[0_22px_70px_rgba(15,23,42,0.16)] backdrop-blur">
            <div className="hidden md:block">
              <table className="w-full table-fixed">
                <thead className="bg-slate-50">
                  <tr className="text-left text-sm font-bold text-slate-500">
                    <th className="px-8 py-4">文件名称</th>
                    <th className="px-6 py-4">内容说明</th>
                    <th className="px-8 py-4 text-right">操作</th>
                  </tr>
                </thead>
                <tbody>
                  {materialItems.map((item, index) => (
                    <tr key={item.id} className={index < materialItems.length - 1 ? 'border-b border-slate-200' : ''}>
                      <td className="px-8 py-6 align-top">
                        <div className="text-lg font-black tracking-[-0.04em] text-slate-950">{item.title}</div>
                      </td>
                      <td className="px-6 py-6 align-top text-sm leading-7 text-slate-600 sm:text-base">{item.description}</td>
                      <td className="px-8 py-6 align-top text-right">
                        <Button asChild variant="outline" className="rounded-md border-blue-200 text-blue-700 hover:bg-blue-50">
                          <InternalLink href={item.fileUrl} className="inline-flex items-center gap-2">
                            <Download className="h-4 w-4" />
                            {item.actionLabel}
                          </InternalLink>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <ScrollReveal className="md:hidden" staggerChildren>
              {materialItems.map((item, index) => (
                <div key={item.id} className={`px-6 py-6 ${index < materialItems.length - 1 ? 'border-b border-slate-200' : ''}`}>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-lg font-black tracking-[-0.04em] text-slate-950">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
                    <Button asChild variant="outline" className="mt-5 rounded-md border-blue-200 text-blue-700 hover:bg-blue-50">
                      <InternalLink href={item.fileUrl} className="inline-flex items-center gap-2">
                        <Download className="h-4 w-4" />
                        {item.actionLabel}
                      </InternalLink>
                    </Button>
                  </div>
                </div>
              ))}
            </ScrollReveal>
          </Card>

          <div className="mt-8 flex items-center justify-between gap-4 rounded-2xl bg-slate-50 px-6 py-5 ring-1 ring-slate-200/80 sm:px-8">
            <div>
              <div className="text-base font-black tracking-[-0.03em] text-slate-950">{page.ctaBanner?.title}</div>
              <p className="mt-1 text-sm leading-7 text-slate-600 sm:text-base">{page.ctaBanner?.description}</p>
            </div>
            <InternalLink href={page.ctaBanner?.link?.href ?? '/intro'} className="inline-flex shrink-0 items-center gap-2 text-sm font-bold text-blue-700">
              {page.ctaBanner?.link?.label ?? '查看赛事介绍'}
              <ArrowRight className="h-4 w-4" />
            </InternalLink>
          </div>
        </div>
      </ScrollReveal>

      <SiteFooter />
    </main>
  );
}
