import { ArrowRight, Download } from 'lucide-react';
import { Button, Card, InternalLink, PageHero } from '@/shared/ui';
import { SiteFooter, SiteHeader } from '@/widgets/site-shell';

const materialItems = [
  {
    title: '大赛执行方案',
    description: '赛事章程、组织架构、赛程节点与联系方式。',
    format: 'PDF',
    audience: '院校组织者 / 指导老师',
    action: '下载',
  },
  {
    title: '报名信息模板',
    description: '团队成员、指导老师、单位信息与承诺书模板。',
    format: 'DOCX',
    audience: '参赛团队',
    action: '下载',
  },
  {
    title: '作品说明书模板',
    description: '项目背景、技术方案、演示说明与创新价值。',
    format: 'DOCX',
    audience: '参赛团队',
    action: '下载',
  },
  {
    title: '评审标准说明',
    description: '创新性、技术可行性、用户体验与路演表现评分细则。',
    format: 'PDF',
    audience: '全体参赛者',
    action: '查看标准',
  },
];

export const metadata = {
  title: '材料下载',
  description: '全国大学生智能应用开发大赛材料下载、报名模板、作品说明书模板与评审标准。',
};

export default function MaterialsPage() {
  return (
    <main className="page-shell bg-white">
      <SiteHeader />
      <PageHero
        eyebrow="材料下载"
        title="参赛文件集中获取"
        description="大赛执行方案、报名信息模板、作品说明书模板与评审标准统一整理，方便院校、指导老师与参赛团队快速查找。"
      />

      <section className="relative z-10 -mt-10 pb-14 sm:-mt-12 sm:pb-16">
        <div className="section-shell">
          <Card className="overflow-hidden rounded-2xl border-white/80 bg-white/96 shadow-[0_22px_70px_rgba(15,23,42,0.16)] backdrop-blur">
            <div className="border-b border-slate-200 px-6 py-5 sm:px-8">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h2 className="text-2xl font-black tracking-[-0.05em] text-slate-950">资料清单</h2>
                  <p className="mt-2 text-sm leading-7 text-slate-600 sm:text-base">
                    统一查看文件用途、适用对象与下载入口，避免在多个模块之间来回查找。
                  </p>
                </div>
                <div className="text-sm font-semibold text-slate-500">共 {materialItems.length} 份资料</div>
              </div>
            </div>

            <div className="hidden md:block">
              <table className="w-full table-fixed">
                <thead className="bg-slate-50">
                  <tr className="text-left text-sm font-bold text-slate-500">
                    <th className="px-8 py-4">文件名称</th>
                    <th className="px-6 py-4">内容说明</th>
                    <th className="px-6 py-4">格式</th>
                    <th className="px-8 py-4 text-right">操作</th>
                  </tr>
                </thead>
                <tbody>
                  {materialItems.map((item, index) => (
                    <tr key={item.title} className={index < materialItems.length - 1 ? 'border-b border-slate-200' : ''}>
                      <td className="px-8 py-6 align-top">
                        <div>
                          <div className="text-lg font-black tracking-[-0.04em] text-slate-950">{item.title}</div>
                        </div>
                      </td>
                      <td className="px-6 py-6 align-top text-sm leading-7 text-slate-600 sm:text-base">{item.description}</td>
                      <td className="px-6 py-6 align-top">
                        <span className="inline-flex rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-bold tracking-[0.12em] text-blue-700">
                          {item.format}
                        </span>
                      </td>
                      <td className="px-8 py-6 align-top text-right">
                        <Button asChild variant="outline" className="rounded-md border-blue-200 text-blue-700 hover:bg-blue-50">
                          <InternalLink href="/" className="inline-flex items-center gap-2">
                            <Download className="h-4 w-4" />
                            {item.action}
                          </InternalLink>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="md:hidden">
              {materialItems.map((item, index) => (
                <div key={item.title} className={`px-6 py-6 ${index < materialItems.length - 1 ? 'border-b border-slate-200' : ''}`}>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-lg font-black tracking-[-0.04em] text-slate-950">{item.title}</h3>
                      <span className="inline-flex rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-bold tracking-[0.12em] text-blue-700">
                        {item.format}
                      </span>
                    </div>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
                    <Button asChild variant="outline" className="mt-5 rounded-md border-blue-200 text-blue-700 hover:bg-blue-50">
                        <InternalLink href="/" className="inline-flex items-center gap-2">
                          <Download className="h-4 w-4" />
                          {item.action}
                        </InternalLink>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <div className="mt-8 flex items-center justify-between gap-4 rounded-2xl bg-slate-50 px-6 py-5 ring-1 ring-slate-200/80 sm:px-8">
            <div>
              <div className="text-base font-black tracking-[-0.03em] text-slate-950">需要更多报名支持？</div>
              <p className="mt-1 text-sm leading-7 text-slate-600 sm:text-base">如需院校组织说明、赛事咨询或材料补充，请联系组委会服务入口。</p>
            </div>
            <InternalLink href="/intro" className="inline-flex shrink-0 items-center gap-2 text-sm font-bold text-blue-700">
              查看赛事介绍
              <ArrowRight className="h-4 w-4" />
            </InternalLink>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
