import type { Metadata } from 'next';
import {
  ArrowLeftRight,
  ArrowRight,
  Building2,
  CheckCircle2,
  CloudCog,
  FileCheck2,
  GraduationCap,
  Handshake,
  Mail,
  Scale,
  ShieldCheck,
  Users,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Button, InternalLink, PageHero, ScrollReveal, SectionHeading } from '@/components/ui';
import { ROUTES } from '@/lib/config/routes';

export const metadata: Metadata = {
  title: '商务合作',
  description: '了解全国大学生智能应用开发大赛的赛事共建、场景命题、技术资源、院校协同与成果对接合作方式。',
  alternates: {
    canonical: '/cooperation/',
    languages: {
      'zh-CN': '/cooperation/',
    },
  },
};

type PartnershipItem = {
  title: string;
  eyebrow: string;
  description: string;
  partnerProvides: readonly string[];
  partnerReceives: readonly string[];
  deliverables: readonly string[];
  icon: LucideIcon;
};

const partnershipItems = [
  {
    title: '政府与园区',
    eyebrow: '区域协同',
    description: '连接青年创新、产业需求与区域场景。',
    partnerProvides: ['赛事支持或联合传播', '活动场地与基础会务', '不涉密的真实场景需求', '明确的业务对接人'],
    partnerReceives: ['支持单位公开展示', '面向当地团队的赛事宣讲', '场景命题整理与发布', '优秀项目及赛后成果对接'],
    deliverables: ['合作确认函', '场地确认单', '场景需求说明', '活动与成果简报'],
    icon: Building2,
  },
  {
    title: '产业合作伙伴',
    eyebrow: '赛事共建',
    description: '以赛事资源、专业能力和产业场景支持项目成长。',
    partnerProvides: ['赛事资金、奖品或等值资源', '行业专家与技术分享', '实习、岗位或产业场景', '经确认的品牌物料'],
    partnerReceives: ['约定范围内的品牌展示', '线上分享或决赛参与机会', '优秀项目与青年人才交流', '合作执行与成果总结'],
    deliverables: ['合作协议', '权益与资源清单', '资源到位记录', '执行验收总结'],
    icon: Handshake,
  },
  {
    title: '高校与职业院校',
    eyebrow: '协同育人',
    description: '协同开展赛事动员、项目辅导与实践育人。',
    partnerProvides: ['校内赛事通知与组织联络', '线上或线下宣讲机会', '参赛团队推荐与日常指导', '真实的报名与组织反馈'],
    partnerReceives: ['报名指南与申报模板', '线上宣讲和集中答疑', '参赛项目汇总与进度反馈', '教师及组织荣誉申报机会'],
    deliverables: ['院校合作确认', '宣讲与通知记录', '报名项目清单', '院校参赛汇总'],
    icon: GraduationCap,
  },
  {
    title: '技术与服务平台',
    eyebrow: '技术赋能',
    description: '为参赛团队提供真实可用的开发资源。',
    partnerProvides: ['账号、接口、算力或软件授权', '明确的额度、期限与申请方式', '使用文档与技术支持联系人', '培训课程或技术答疑'],
    partnerReceives: ['技术支持伙伴公开展示', '面向参赛团队的技术说明会', '经授权的匿名使用反馈', '优秀应用案例与项目交流'],
    deliverables: ['资源说明书', '账号发放记录', '培训与答疑记录', '资源使用总结'],
    icon: CloudCog,
  },
] as const satisfies readonly PartnershipItem[];

const cooperationSteps = [
  { step: '01', title: '沟通意向', description: '明确方向、资源与目标。' },
  { step: '02', title: '确认方案', description: '约定交付、时间与边界。' },
  { step: '03', title: '执行复盘', description: '推进合作并确认成果。' },
] as const;

const complianceItems = [
  {
    title: '评审独立',
    description: '合作伙伴不干预参赛资格、评审标准、专家评分与奖项结果。',
    icon: Scale,
  },
  {
    title: '权属清晰',
    description: '合作不自动取得参赛项目、代码、作品、数据或其他知识产权。',
    icon: ShieldCheck,
  },
  {
    title: '隐私保护',
    description: '未经授权，不向合作方提供参赛者个人联系方式或非公开资料。',
    icon: Users,
  },
] as const;

function ExchangeList({ title, items, tone }: { title: string; items: readonly string[]; tone: 'partner' | 'competition' }) {
  return (
    <div className="rounded-xl border border-[#e7e5e4] bg-[#fafaf9] p-5 sm:p-6">
      <div className="flex items-center gap-2">
        <span className={`h-2.5 w-2.5 rounded-full ${tone === 'partner' ? 'bg-[#64748b]' : 'bg-[#0075de]'}`} aria-hidden="true" />
        <h3 className="text-base font-bold text-[#18253f]">{title}</h3>
      </div>
      <ul className="mt-4 grid gap-3">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-sm leading-7 text-[#615d59]">
            <CheckCircle2 aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-[#0075de]" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function PartnershipExchangeCard({ item }: { item: PartnershipItem }) {
  const Icon = item.icon;

  return (
    <article className="notion-card overflow-hidden">
      <div className="p-6 sm:p-8">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
          <div className="flex items-start gap-4">
            <div className="notion-sticker grid h-12 w-12 shrink-0 place-items-center">
              <Icon aria-hidden="true" className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-bold tracking-[0.16em] text-[#0075de]">{item.eyebrow}</p>
              <h2 className="heading-3 notion-card-title mt-2">{item.title}</h2>
              <p className="notion-card-body mt-2 text-sm leading-7">{item.description}</p>
            </div>
          </div>
          <span className="w-fit rounded-full border border-[#e7e5e4] bg-[#fafaf9] px-3 py-1.5 text-xs font-semibold text-[#615d59]">
            双向合作
          </span>
        </div>

        <div className="relative mt-7 grid gap-4 lg:grid-cols-2 lg:gap-8">
          <ExchangeList title="合作方提供" items={item.partnerProvides} tone="partner" />
          <div className="absolute left-1/2 top-1/2 z-10 hidden h-10 w-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-xl border border-[#e7e5e4] bg-white text-[#0075de] lg:grid">
            <ArrowLeftRight aria-hidden="true" className="h-5 w-5" />
          </div>
          <ExchangeList title="比赛方提供" items={item.partnerReceives} tone="competition" />
        </div>
      </div>

      <div className="border-t border-[#e7e5e4] bg-[#fafaf9] px-6 py-5 sm:px-8">
        <div className="flex items-center gap-2 text-sm font-bold text-[#18253f]">
          <FileCheck2 aria-hidden="true" className="h-5 w-5 text-[#0075de]" />
          双方确认交付
        </div>
        <ul className="mt-3 flex flex-wrap gap-2" aria-label={`${item.title}交付物`}>
          {item.deliverables.map((deliverable) => (
            <li key={deliverable} className="rounded-full border border-[#e7e5e4] bg-white px-3 py-1.5 text-xs font-semibold text-[#615d59]">
              {deliverable}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export default function CooperationPage() {
  return (
    <main className="bg-white text-slate-950">
      <PageHero
        eyebrow="商务合作"
        title="连接技术、场景与青年创新力量"
        description="面向政府园区、产业伙伴、院校和技术平台开展规范、透明、可交付的赛事合作，共同支持真实项目成长。"
        backgroundImage="/assets/hero/aiadc-hero-incubation.png"
        dark
        fullBleedBackground
      />

      <ScrollReveal as="section" className="border-b border-slate-200 bg-white py-7 sm:py-8" delay={30}>
        <div className="section-shell flex flex-col items-center justify-between gap-5 text-center sm:flex-row sm:text-left">
          <div>
            <p className="text-lg font-bold text-slate-950">寻找长期、可信的合作伙伴</p>
            <p className="mt-1 text-sm leading-7 text-slate-600">合作内容以双方确认的正式文件为准。</p>
          </div>
          <Button asChild size="lg" className="shrink-0 lg:mr-16">
            <a href="mailto:aiadc@aiadc.org.cn?subject=AIADC商务合作咨询">
              联系合作团队
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </ScrollReveal>

      <ScrollReveal as="section" className="bg-white py-12 sm:py-16" delay={40}>
        <div className="section-shell">
          <SectionHeading
            eyebrow="合作方案"
            title="每一种合作，都有清晰的双向交付"
            description="分别说明合作方投入、比赛方支持和最终交付物，便于双方快速确认合作边界。"
            centered
            className="mx-auto max-w-4xl"
          />

          <div className="mt-10 grid gap-7">
            {partnershipItems.map((item) => (
              <PartnershipExchangeCard key={item.title} item={item} />
            ))}
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal as="section" className="bg-[#f7f9ff] py-12 sm:py-16" delay={50}>
        <div className="section-shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <SectionHeading
            eyebrow="合作流程"
            title="简单、清晰、可交付"
            description="以正式确认的合作内容为准。"
          />

          <ol className="grid gap-4 sm:grid-cols-3">
            {cooperationSteps.map((item) => (
              <li key={item.step} className="notion-card p-5">
                <span className="text-sm font-bold tracking-[0.16em] text-[#0075de]">{item.step}</span>
                <h2 className="mt-3 text-lg font-bold text-slate-950">{item.title}</h2>
                <p className="mt-2 text-sm leading-7 text-slate-600">{item.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </ScrollReveal>

      <ScrollReveal as="section" className="bg-white py-12 sm:py-16" delay={60}>
        <div className="section-shell">
          <SectionHeading
            eyebrow="合作准则"
            title="守住公平、权属与隐私边界"
            description="不以合作资源交换评审影响、项目权属或非公开信息。"
            centered
            className="mx-auto max-w-4xl"
          />

          <div className="mt-9 grid gap-4 md:grid-cols-3">
            {complianceItems.map((item) => {
              const Icon = item.icon;

              return (
                <article key={item.title} className="notion-card p-5">
                  <div className="notion-sticker grid h-10 w-10 place-items-center">
                    <Icon aria-hidden="true" className="h-5 w-5" />
                  </div>
                  <h2 className="mt-4 text-lg font-bold text-slate-950">{item.title}</h2>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{item.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal as="section" className="bg-[#f7f9ff] py-12 sm:py-16" delay={70}>
        <div className="section-shell">
          <div className="overflow-hidden rounded-[24px] bg-[#213183] px-6 py-10 text-center text-white sm:px-10 sm:py-12">
            <Mail aria-hidden="true" className="mx-auto h-8 w-8" />
            <h2 className="mt-5 text-balance text-3xl font-bold tracking-[-0.03em] sm:text-4xl">期待与您共建真实、有价值的合作</h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-8 text-white/82 sm:text-base">
              请简要说明机构名称、合作方向与可提供资源，组委会将通过官方邮箱与您联系。
            </p>
            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild size="lg" className="bg-white !text-[#0b3b8f] hover:bg-white/90">
                <a href="mailto:aiadc@aiadc.org.cn?subject=AIADC商务合作咨询">aiadc@aiadc.org.cn</a>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/35 bg-white/10 !text-white hover:bg-white/18">
                <InternalLink href={ROUTES.contact}>查看联系方式</InternalLink>
              </Button>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </main>
  );
}
