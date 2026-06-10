import { ArrowRight, BriefcaseBusiness, CalendarDays, Search, Sparkles, Trophy } from 'lucide-react';
import { Badge, Button, InternalLink, PageHero, SectionHeading } from '@/shared/ui';
import { SiteFooter, SiteHeader } from '@/widgets/site-shell';

const projectFilters = ['全部项目', '智能制造', '医疗健康', '教育服务', '城市治理', '创意应用'];

const projects = [
  {
    title: '校园科研助手智能体平台',
    category: '教育服务',
    track: '创意赛道',
    stage: '复赛项目',
    date: '2026.05.18',
    summary: '围绕选题、文献梳理、实验计划与成果归档构建多角色科研助手，帮助师生完成从研究准备到项目管理的协同闭环。',
    highlight: '支持实验记录自动结构化与阶段进度追踪',
  },
  {
    title: '工业设备异常预警与维保决策系统',
    category: '智能制造',
    track: 'OPC 轻创赛道',
    stage: '重点展示',
    date: '2026.05.12',
    summary: '基于边缘采集与时序信号分析，对关键设备进行异常识别、工单联动与维保建议输出，提升产线稳定性与巡检效率。',
    highlight: '聚焦制造场景的故障预测与处理优先级决策',
  },
  {
    title: '多模态康复训练陪伴应用',
    category: '医疗健康',
    track: '萌芽赛道',
    stage: '优秀作品',
    date: '2026.04.28',
    summary: '面向居家康复与基层随访场景，结合语音、动作反馈与训练计划推荐，为患者与康复师提供更轻量的数字化支持工具。',
    highlight: '强化康复依从性与个性化训练建议',
  },
  {
    title: '面向社区治理的事件智能分发平台',
    category: '城市治理',
    track: '创意赛道',
    stage: '优秀作品',
    date: '2026.04.21',
    summary: '围绕社区报事、问题分类、责任单位协同与处理反馈构建统一工作台，缩短事件流转路径并提升基层治理响应效率。',
    highlight: '适合多部门协同的智能派单场景',
  },
  {
    title: 'AIGC 展陈内容策划工作流',
    category: '创意应用',
    track: '萌芽赛道',
    stage: '入围项目',
    date: '2026.04.16',
    summary: '针对展馆讲解、交互脚本与视觉内容生成，提供从策展主题拆解到内容编排的辅助工作流，提升创意落地效率。',
    highlight: '适合展陈、科普与品牌展示场景',
  },
  {
    title: '高校后勤能耗优化决策平台',
    category: '智能制造',
    track: 'OPC 轻创赛道',
    stage: '入围项目',
    date: '2026.04.10',
    summary: '通过用能数据监测、设备画像与策略推荐，辅助校园后勤团队识别高耗能环节并制定节能优化方案。',
    highlight: '兼顾校园管理与低碳运营目标',
  },
];

const featuredProject = projects[0];
const projectStats = [
  { value: '24+', label: '优秀项目展示' },
  { value: '6', label: '重点应用方向' },
  { value: '3', label: '赛道联合推荐' },
];

export const metadata = {
  title: '优秀项目',
  description: '浏览全国大学生智能应用开发大赛中的优秀项目与重点展示作品。',
};

export default function ProjectsPage() {
  return (
    <main className="page-shell bg-white">
      <SiteHeader />
      <PageHero
        eyebrow="优秀项目"
        title="重点作品与应用成果集中展示"
        description="聚焦大赛中的代表性作品，展示青年团队在真实场景、产品设计与应用落地方面的探索成果，帮助院校、评审与合作伙伴快速了解项目方向。"
      />

      <section className="bg-white -mt-2 pb-2">
        <div className="section-shell">
          <div className="mx-auto flex max-w-3xl items-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-5 py-4 text-slate-500 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]">
            <Search className="h-4 w-4 shrink-0 text-blue-600" />
            <span className="text-sm sm:text-base">搜索项目名称、应用方向或场景关键词</span>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            {projectFilters.map((filter, index) => (
              <button
                key={filter}
                type="button"
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  index === 0
                    ? 'bg-blue-600 text-white shadow-[0_10px_24px_rgba(37,99,235,0.22)]'
                    : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white pb-12 sm:pb-14">
        <div className="section-shell">
          <SectionHeading
            centered
            eyebrow="项目精选"
            title="优先查看代表性成果"
            description="突出展示在应用场景、技术实现与答辩表现上更具代表性的参赛作品，并延伸浏览更多项目。"
            className="mx-auto max-w-4xl"
          />

          <div className="mt-8 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
            <article className="rounded-lg border border-white bg-white/96 p-6 shadow-[0_16px_42px_rgba(15,23,42,0.07)] sm:p-7">
              <div className="flex flex-wrap items-center gap-3">
                <Badge className="border border-blue-100 bg-blue-50 text-blue-700">{featuredProject.category}</Badge>
                <Badge className="border border-slate-200 bg-slate-50 text-slate-700">{featuredProject.track}</Badge>
                <span className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-3 py-1 text-xs font-bold tracking-[0.12em] text-white">
                  <Sparkles className="h-3.5 w-3.5" />
                  重点推荐
                </span>
              </div>

              <h2 className="mt-5 text-balance text-3xl font-black tracking-[-0.05em] text-slate-950 sm:text-4xl">
                {featuredProject.title}
              </h2>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                {featuredProject.summary}
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {projectStats.map((item) => (
                  <div key={item.label} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                    <div className="text-2xl font-black tracking-[-0.05em] text-blue-700">{item.value}</div>
                    <div className="mt-1 text-sm font-semibold text-slate-500">{item.label}</div>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 px-4 py-4 text-sm leading-7 text-slate-700">
                <span className="font-bold text-blue-700">项目亮点：</span>
                {featuredProject.highlight}
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400">
                  <CalendarDays className="h-4 w-4" />
                  最近更新于 {featuredProject.date}
                </div>
                <Button asChild className="rounded-xl bg-blue-600 text-white hover:bg-blue-700">
                  <InternalLink href="/login">
                    查看项目详情
                    <ArrowRight className="h-4 w-4" />
                  </InternalLink>
                </Button>
              </div>
            </article>

            <div className="grid gap-4">
              {projects.slice(1, 4).map((project) => (
                <article
                  key={project.title}
                  className="rounded-lg border border-white bg-white/96 p-5 shadow-[0_16px_42px_rgba(15,23,42,0.07)]"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge className="border border-blue-100 bg-blue-50 text-blue-700">{project.category}</Badge>
                    <span className="text-sm font-semibold text-slate-400">{project.date}</span>
                  </div>
                  <h3 className="mt-4 text-lg font-black leading-snug tracking-[-0.04em] text-slate-950">{project.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{project.summary}</p>
                  <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-slate-500">
                    <Trophy className="h-4 w-4 text-blue-600" />
                    {project.stage}
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project) => (
              <article
                key={`${project.title}-${project.date}`}
                className="flex h-full flex-col rounded-lg border border-white bg-white/96 p-6 shadow-[0_16px_42px_rgba(15,23,42,0.07)]"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <Badge className="border border-blue-100 bg-blue-50 text-blue-700">{project.category}</Badge>
                  <Badge className="border border-slate-200 bg-white text-slate-600">{project.track}</Badge>
                </div>

                <h3 className="mt-4 text-xl font-black tracking-[-0.04em] text-slate-950">{project.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{project.summary}</p>

                <div className="mt-5 space-y-2 text-sm font-semibold text-slate-500">
                  <div className="inline-flex items-center gap-2">
                    <BriefcaseBusiness className="h-4 w-4 text-blue-600" />
                    {project.stage}
                  </div>
                  <div className="inline-flex items-center gap-2">
                    <CalendarDays className="h-4 w-4 text-blue-600" />
                    {project.date}
                  </div>
                </div>

                <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-600">
                  {project.highlight}
                </div>

                <InternalLink
                  href="/login"
                  className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-bold text-blue-700 transition-colors hover:text-blue-800"
                >
                  查看详情
                  <ArrowRight className="h-4 w-4" />
                </InternalLink>
              </article>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
