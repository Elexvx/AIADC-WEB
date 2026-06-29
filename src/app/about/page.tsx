import type { Metadata } from 'next';
import type { CSSProperties } from 'react';
import {
  Banknote,
  Boxes,
  CalendarDays,
  CheckCircle2,
  ClipboardCheck,
  FileCheck2,
  Flag,
  GraduationCap,
  Lightbulb,
  Network,
  Medal,
  Rocket,
  ShieldCheck,
  Sparkles,
  Trophy,
  Users,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { PageHero, ScrollReveal, SectionHeading } from '@/components/ui';

export const metadata: Metadata = {
  title: '关于大赛',
  description: '了解全国大学生智能应用开发大赛的背景、组织单位、参赛组别、赛道设置、项目要求、赛程安排、评审奖项与报名费用。',
  alternates: {
    canonical: '/about/',
    languages: {
      'zh-CN': '/about/',
    },
  },
};

const organizerGroups = [
  { label: '指导单位', value: '中国移动通信联合会人工智能产教融合研究院' },
  { label: '主办单位', value: '全国大学生智能应用开发大赛组织委员会' },
  { label: '支持单位', value: 'HarmonyOS、武汉誉天互联科技有限公司' },
  { label: '承办单位', value: '江苏函九科技有限公司' },
];

const practicePrinciples = [
  {
    title: '真实问题',
    description: '鼓励从具体用户、具体场景、具体痛点出发，回应教育教学、校园服务、智慧生活、产业协同、公共服务等真实需求。',
    icon: ShieldCheck,
  },
  {
    title: '真实开发',
    description: '关注开发过程、模块设计、工具使用、团队分工、测试记录与阶段成果，不以包装替代项目建设。',
    icon: CheckCircle2,
  },
  {
    title: '持续成长',
    description: '通过分类评价、项目打磨、专家诊断和资源对接，推动项目从构想走向开发、验证和迭代。',
    icon: Rocket,
  },
];

const participantGroups = [
  {
    title: '职教组',
    description: '主要面向全日制职业院校及其他符合条件的职业教育阶段在校学生。',
    icon: GraduationCap,
  },
  {
    title: '高校组',
    description: '主要面向普通高等学校全日制在校学生，覆盖本科生、研究生及其他符合条件的高校在校学生。',
    icon: Users,
  },
  {
    title: '青年创新组',
    description: '主要面向具备明确项目基础、开发实践经历或组织实施能力的青年项目主体，参赛人员年龄原则上不超过35周岁。',
    icon: Rocket,
  },
];

const tracks = [
  {
    stage: '早期探索',
    title: '萌芽赛道',
    description: '面向尚未完全成型但具备创新潜力和成长空间的项目，重点考察问题洞察、探索过程与初步验证。',
    icon: Sparkles,
  },
  {
    stage: '方案形成',
    title: '创意赛道',
    description: '面向已形成明确问题意识、应用方向和产品构想的项目，重点关注场景价值、技术路线和方案完整性。',
    icon: Lightbulb,
  },
  {
    stage: '轻量验证',
    title: 'OPC轻创赛道',
    description: '面向已产出阶段成果、具备现场演示条件的项目，强调小规模、强主导、快验证和可持续迭代。',
    icon: Boxes,
  },
];

const projectDirections = [
  '教育教学',
  '校园服务',
  '智慧生活',
  '文化传播',
  '产业协同',
  '社会治理',
  '公共服务',
  '智能制造',
  '健康服务',
  '数字文创',
];

const projectTypes = [
  'AI智能体应用',
  'AI生态应用',
  '智能终端软件',
  '智能硬件交互',
  'AI辅助学习工具',
  '智慧校园服务系统',
  'AI办公与协作工具',
  '数字文创与内容生成应用',
  '智能制造辅助系统',
  '行业智能化解决方案',
  '公共服务智能应用',
];

const requirementHighlights = [
  { label: '申报形式', value: '个人或团队均可申报' },
  { label: '最低人数', value: '不设最低人数要求' },
  { label: '建议规模', value: '团队原则上10人以内' },
  { label: '放宽上限', value: '经审核最多不超过15人' },
];

const scheduleItems = [
  {
    date: '2026.07.01 - 2026.08.31',
    title: '启动发布与暑期预报名',
    description: '发布赛事通知、执行方案、评分细则及模板，开放报名入口，开展线上答疑和院校建联。',
  },
  {
    date: '2026.07.01 - 2026.09.30',
    title: '报名征集与材料提交',
    description: '受理项目报名，组织团队提交项目报告书、路演文稿、团队信息表、承诺书及过程证明材料。',
  },
  {
    date: '2026.10.01 - 2026.10.10',
    title: '资格审核与初赛组织',
    description: '开展材料完整性、资格符合性、赛道适配性和基础合规审查，组织符合条件项目进入初赛。',
  },
  {
    date: '2026.10.11 - 2026.10.20',
    title: '初赛评审与入围确认',
    description: '组织线上材料评审，根据需要设置线上陈述或问答，综合确定拟入围决赛项目。',
  },
  {
    date: '2026.10.21 - 2026.10.29',
    title: '项目打磨与决赛复核',
    description: '组织入围项目完善展示内容、路演材料和演示准备，并复核真实性与权属材料。',
  },
  {
    date: '2026.10.30 - 2026.10.31',
    title: '线下决赛与成果展示',
    description: '组织线下路演答辩、项目展示、奖项评定、颁奖仪式和资源对接活动。',
  },
  {
    date: '2026.11.01 - 2026.12.31',
    title: '成果展示与后续服务',
    description: '开展成果展示、证书制作、资源对接及后续服务工作。',
  },
];

const awardCards = [
  { title: '金奖', standard: '综合表现突出，问题真实、技术路线清晰、成果完成度高，具备较强示范价值。' },
  { title: '银奖', standard: '项目逻辑完整，开发过程证据充分，已有较好验证基础和持续迭代能力。' },
  { title: '铜奖', standard: '项目方向明确，材料完整，能够说明关键实现过程和阶段性成果。' },
  { title: '优秀奖', standard: '符合赛事要求，具有一定创新潜力、实践价值或成长空间。' },
  { title: '技术创新奖', standard: '在算法、系统架构、智能交互、工程实现或技术组合方面具有明显亮点。' },
  { title: '场景突破奖', standard: '面向真实场景提出有效解决方案，用户需求、应用流程和落地路径清晰。' },
  { title: '产品匠心奖', standard: '产品体验、功能完整度、演示效果、视觉表达或细节打磨表现突出。' },
  { title: '优秀指导教师奖', standard: '在项目指导、组织培育、过程管理和学生成长支持方面贡献突出。' },
  { title: '卓越组织奖', standard: '院校或机构组织动员有力，赛事服务规范，参赛成果质量和参与度突出。' },
  { title: '协同育人奖', standard: '在产教融合、资源支持、场景开放和人才培养协同方面形成有效实践。' },
];

const tierAwards = awardCards.slice(0, 4);
const specialAwards = awardCards.slice(4);

const tierAwardStyles = [
  {
    card: {
      background: 'linear-gradient(135deg, rgba(255,249,226,0.98), rgba(255,255,255,0.94) 52%, rgba(255,238,167,0.72))',
      borderColor: '#f4d884',
    },
    icon: 'border-[#f2cf64] bg-[#fff8dc] text-[#b77900]',
  },
  {
    card: {
      background: 'linear-gradient(135deg, rgba(248,250,252,0.98), rgba(255,255,255,0.94) 52%, rgba(223,230,240,0.78))',
      borderColor: '#d9e0ea',
    },
    icon: 'border-[#c9d3e2] bg-[#f8fafc] text-[#64748b]',
  },
  {
    card: {
      background: 'linear-gradient(135deg, rgba(255,246,237,0.98), rgba(255,255,255,0.94) 52%, rgba(238,190,142,0.68))',
      borderColor: '#e9bf92',
    },
    icon: 'border-[#dfaa75] bg-[#fff3e7] text-[#b75f1b]',
  },
  {
    card: {
      background: 'linear-gradient(135deg, rgba(239,253,248,0.98), rgba(255,255,255,0.94) 52%, rgba(186,235,220,0.72))',
      borderColor: '#bfe3d8',
    },
    icon: 'border-[#9fd4c5] bg-[#eefcf7] text-[#0f8a6a]',
  },
];

export default function AboutPage() {
  return (
    <main className="bg-white text-slate-950">
      <PageHero
        eyebrow="关于大赛"
        title="全国大学生智能应用开发大赛"
        description="面向青年学生与青年创新主体，围绕真实需求、智能应用开发、产品设计、场景验证与项目实践，搭建规范、公正、可验证的赛事与成果展示平台。"
        backgroundImage="/assets/hero/aiadc-intro-competition-bg.png"
        dark
        overlayClassName="bg-[linear-gradient(120deg,rgba(33,49,131,0.78),rgba(33,49,131,0.64),rgba(33,49,131,0.72))]"
        fullBleedBackground
      />

      <ScrollReveal as="section" className="bg-white py-12 sm:py-16" delay={40}>
        <div className="section-shell">
          <SectionHeading
            eyebrow="大赛背景"
            title="服务教育强国、科技强国、人才强国建设"
            description="为深入贯彻落实教育强国、科技强国、人才强国建设战略部署，切实提升大学生面向真实需求开展智能应用开发、产品设计、场景验证与项目实践的综合能力，全国大学生智能应用开发大赛组织委员会决定举办全国大学生智能应用开发大赛。"
            centered
            className="mx-auto max-w-4xl"
          />
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {practicePrinciples.map((item) => {
              const Icon = item.icon;

              return (
                <div key={item.title} className="notion-card p-6">
                  <div className="notion-sticker grid h-12 w-12 place-items-center">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h2 className="heading-3 notion-card-title mt-5">{item.title}</h2>
                  <p className="mt-3 text-sm leading-8 text-[#615d59]">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </ScrollReveal>

      <InfoBand />

      <CardSection
        eyebrow="参赛组别"
        title="面向不同阶段与基础的青年创新主体"
        description="本届大赛设置三个参赛组别，按组别组织报名、评审与成果展示。"
        items={participantGroups}
      />

      <TracksSection />

      <ScrollReveal as="section" className="overflow-hidden bg-white py-12 sm:py-16" delay={80}>
        <div className="section-shell">
          <SectionHeading
            eyebrow="项目方向"
            title="围绕现实需求开展智能应用开发"
            description="项目不限技术路线，团队需说明技术选型、开发过程和可验证成果。"
            centered
            className="mx-auto max-w-4xl"
          />
          <ProjectDirectionWall />
        </div>
      </ScrollReveal>

      <ScrollReveal as="section" className="bg-white py-12 sm:py-16" delay={100}>
        <div className="section-shell">
          <SectionHeading
            eyebrow="参赛要求"
            title="申报门槛清晰，团队规模可按项目复杂度说明"
            description="参赛项目可由个人或团队申报，重点关注团队真实贡献、项目开发过程和可验证成果。"
            centered
            className="mx-auto max-w-4xl"
          />
          <div className="mt-8 grid gap-4 md:grid-cols-4">
            {requirementHighlights.map((item) => (
              <div key={item.label} className="notion-card p-6 text-center">
                <div className="mx-auto grid h-11 w-11 place-items-center rounded-lg border border-[#dfe7fb] bg-white text-[#0075de]">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <div className="mt-4 text-sm font-bold text-[#0075de]">{item.label}</div>
                <p className="mt-2 text-lg font-bold leading-7 text-[#18253f]">{item.value}</p>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-6 max-w-4xl text-center text-sm leading-8 text-[#615d59]">
            因项目复杂度高、跨领域协作需求显著或展示任务繁重等原因确需增加团队人数的，可提交专项说明，经组委会审核后适当放宽。
          </p>
        </div>
      </ScrollReveal>

      <ScrollReveal as="section" id="schedule" className="bg-white py-12 sm:py-16" delay={120}>
        <div className="section-shell">
          <SectionHeading
            eyebrow="赛程安排"
            title="按时间节点推进报名、评审与决赛展示"
            description="以下为赛事执行节奏，具体安排以大赛组织委员会后续正式通知为准。"
            centered
            className="mx-auto max-w-4xl"
          />
          <div className="mt-8">
            <div className="grid gap-4 md:grid-cols-2">
              {scheduleItems.map((item, index) => (
                <div key={item.title} className="notion-card p-6">
                  <div className="flex items-start gap-4">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-[#0075de] text-sm font-bold text-white">
                      {index + 1}
                    </span>
                    <div>
                      <div className="flex items-center gap-2 text-sm font-bold text-[#0075de]">
                        <CalendarDays className="h-4 w-4" />
                        {item.date}
                      </div>
                      <h3 className="mt-2 text-lg font-bold text-[#18253f]">{item.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-[#615d59]">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal as="section" className="bg-white py-12 sm:py-16" delay={140}>
        <div className="section-shell">
          <SectionHeading
            eyebrow="评审与奖项"
            title="评审与奖项"
            description="初赛阶段主要采取材料评审方式，决赛阶段采取路演展示与专家答辩相结合的方式，综合考察真实性、完成度、演示效果和后续迭代能力。"
            centered
            className="mx-auto max-w-5xl"
          />
          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            <ReviewBlock
              title="初赛阶段"
              description="重点审查项目材料完整性、逻辑清晰度、开发过程证据、成果基础、发展潜力及赛道适配性。"
              icon={FileCheck2}
            />
            <ReviewBlock
              title="决赛阶段"
              description="重点考察项目展示效果、现场表达能力、专家问答质量、成果真实性、开发完成度、演示完成度和后续迭代能力。"
              icon={ClipboardCheck}
            />
          </div>
          <div className="mt-8 space-y-3">
            {tierAwards.map((item, index) => (
              <div
                key={item.title}
                style={tierAwardStyles[index]?.card}
                className={`notion-card mx-auto p-5 ${
                  index === 0
                    ? 'max-w-md'
                    : index === 1
                      ? 'max-w-xl'
                      : index === 2
                        ? 'max-w-3xl'
                        : 'max-w-5xl'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`grid h-10 w-10 place-items-center rounded-lg border ${tierAwardStyles[index]?.icon ?? 'border-[#dfe7fb] bg-white text-[#0075de]'}`}>
                    <Medal className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-bold text-[#18253f]">{item.title}</h3>
                </div>
                <p className="mt-4 text-sm leading-7 text-[#615d59]">{item.standard}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {specialAwards.map((item) => (
              <div key={item.title} className="notion-card p-5">
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-lg border border-[#dfe7fb] bg-white text-[#0075de]">
                    <Trophy className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-bold text-[#18253f]">{item.title}</h3>
                </div>
                <p className="mt-4 text-sm leading-7 text-[#615d59]">{item.standard}</p>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal as="section" className="bg-white py-12 pb-16 sm:py-16 sm:pb-20" delay={160}>
        <div className="section-shell">
          <SectionHeading
            eyebrow="报名费用"
            title="报名费用"
            description="本次大赛各参赛组别、各赛道报名费统一标准为每人50元。"
            centered
            className="mx-auto max-w-4xl"
          />
          <div className="mx-auto mt-8 max-w-5xl">
            <div className="grid gap-5 md:grid-cols-[260px_1fr] md:items-stretch">
              <div className="notion-card grid place-items-center p-8 text-center">
                <div>
                  <div className="mx-auto grid h-12 w-12 place-items-center rounded-lg border border-[#dfe7fb] bg-white text-[#0075de]">
                    <Banknote className="h-6 w-6" />
                  </div>
                  <div className="mt-5 text-sm font-bold text-[#0075de]">统一标准</div>
                  <div className="mt-2 text-5xl font-bold text-[#18253f]">50元</div>
                  <div className="mt-1 text-sm text-[#615d59]">每人</div>
                </div>
              </div>
              <div className="notion-card p-7 sm:p-8">
                <h2 className="heading-3 notion-card-title">报名费用说明</h2>
                <p className="mt-4 text-sm leading-8 text-[#31302e] sm:text-base">
                  参赛团队须按实际报名人数缴纳相应费用，即每队报名费用为：50元/人 × 实际报名人数。
                </p>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </main>
  );
}

function InfoBand() {
  return (
    <ScrollReveal as="section" className="bg-white py-12 sm:py-16" delay={60}>
      <div className="section-shell">
        <SectionHeading
          eyebrow="组织单位"
          title="多方协同推进赛事组织与服务保障"
          description="大赛由组织委员会统筹实施，联合指导、支持与承办单位共同保障赛事规范开展。"
          centered
          className="mx-auto max-w-4xl"
        />
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {organizerGroups.map((item) => (
            <div key={item.label} className="notion-card p-6">
              <div className="text-xl font-bold leading-7 text-[#18253f]">{item.label}</div>
              <p className="mt-4 text-sm font-medium leading-7 text-[#615d59] sm:text-base">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </ScrollReveal>
  );
}

function TracksSection() {
  return (
    <ScrollReveal as="section" id="tracks" className="bg-white py-12 sm:py-16" delay={70}>
      <div className="section-shell">
        <SectionHeading
          eyebrow="赛区设置"
          title="三大赛道同步开放"
          description="从概念孵化、原型构建到敏捷开发，覆盖智能应用开发的完整生命周期。"
          centered
          className="mx-auto max-w-4xl"
        />
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {tracks.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="notion-card p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="notion-sticker grid h-12 w-12 place-items-center">
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="rounded-full border border-[#dfe7fb] bg-white px-4 py-1.5 text-xs font-bold text-[#0075de]">
                    {item.stage}
                  </span>
                </div>
                <h3 className="heading-3 notion-card-title mt-5">{item.title}</h3>
                <p className="mt-3 text-sm leading-8 text-[#615d59]">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </ScrollReveal>
  );
}

type IconCardItem = {
  title: string;
  description: string;
  icon: LucideIcon;
};

function CardSection({
  eyebrow,
  title,
  description,
  items,
}: {
  eyebrow: string;
  title: string;
  description: string;
  items: IconCardItem[];
}) {
  return (
    <ScrollReveal as="section" className="bg-white py-12 sm:py-16" delay={70}>
      <div className="section-shell">
        <SectionHeading eyebrow={eyebrow} title={title} description={description} centered className="mx-auto max-w-4xl" />
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="notion-card p-6">
                <div className="notion-sticker grid h-12 w-12 place-items-center">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="heading-3 notion-card-title mt-5">{item.title}</h3>
                <p className="mt-3 text-sm leading-8 text-[#615d59]">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </ScrollReveal>
  );
}

function ProjectDirectionWall() {
  const rows = [
    { label: '重点领域', icon: Network, items: projectDirections, reverse: false, duration: 124 },
    { label: '项目类型', icon: Flag, items: projectTypes, reverse: true, duration: 138 },
    { label: '重点领域', icon: Network, items: [...projectDirections.slice(4), ...projectDirections.slice(0, 4)], reverse: true, duration: 132 },
    { label: '项目类型', icon: Flag, items: [...projectTypes.slice(5), ...projectTypes.slice(0, 5)], reverse: false, duration: 146 },
  ];

  return (
    <div className="mx-auto mt-8 max-w-6xl py-2">
      <div className="space-y-3">
        {rows.map((row, rowIndex) => {
          const Icon = row.icon;
          const repeatedItems = [...row.items, ...row.items, ...row.items, ...row.items];

          return (
            <div key={`${row.label}-${rowIndex}`} className="relative overflow-hidden py-1">
              <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-white to-transparent" />
              <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-white to-transparent" />
              <div
                className={`flex w-max transform-gpu gap-3 px-10 will-change-transform ${
                  row.reverse ? 'animate-[tag-scroll-quarter-reverse_var(--tag-duration)_linear_infinite]' : 'animate-[tag-scroll-quarter_var(--tag-duration)_linear_infinite]'
                }`}
                style={{ '--tag-duration': `${row.duration}s` } as CSSProperties}
              >
                {repeatedItems.map((item, index) => (
                  <span
                    key={`${item}-${rowIndex}-${index}`}
                    className="inline-flex items-center gap-2 rounded-full border border-[#dfe7fb] bg-white px-5 py-2.5 text-sm font-medium text-[#18253f] shadow-sm"
                  >
                    <Icon className="h-4 w-4 text-[#0075de]" />
                    {item}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
function ReviewBlock({ title, description, icon: Icon }: { title: string; description: string; icon: LucideIcon }) {
  return (
    <div className="notion-card p-6">
      <div className="flex items-center gap-3 text-base font-bold text-[#0075de]">
        <div className="grid h-10 w-10 place-items-center rounded-lg border border-[#dfe7fb] bg-white">
          <Icon className="h-5 w-5" />
        </div>
        {title}
      </div>
      <p className="mt-4 text-sm leading-8 text-[#615d59]">{description}</p>
    </div>
  );
}
