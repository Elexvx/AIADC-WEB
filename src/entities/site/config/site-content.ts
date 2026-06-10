import { ROUTES } from '@/shared/config/routes';

export type NavItem = {
  label: string;
  target: string;
};

export type StatItem = {
  value: string;
  label: string;
  note?: string;
};

export type GroupItem = {
  title: string;
  description: string;
  cta: string;
};

export type TrackItem = {
  code: string;
  title: string;
  description: string;
  cta: string;
};

export type ScheduleItem = {
  date: string;
  title: string;
  detail: string;
  featured?: boolean;
};

export type AwardItem = {
  icon: string;
  title: string;
  subtitle: string;
  prize: string;
  detail: string;
  tone: 'gold' | 'silver' | 'bronze' | 'slate';
};

export type HeroButtonItem = {
  label: string;
  href: string;
  variant: 'primary' | 'secondary' | 'ghost';
};

export type HeroSlideItem = {
  kicker: string;
  title: string[];
  subtitle: string;
  description: string;
  imageUrl: string;
  tone: 'blueprint' | 'aurora' | 'summit';
  buttons: HeroButtonItem[];
};

export type NewsArticleItem = {
  category: 'news' | 'notice' | 'media';
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  imageUrl: string;
  href: string;
  body: string[];
};

export type FooterColumnItem = {
  title: string;
  links: {
    label: string;
    href: string;
  }[];
};

export const siteContent = {
  brand: {
    name: 'AI National Competition',
    cnName: '全国大学生智能应用开发大赛',
  },
  nav: [
    { label: '首页', target: 'top' },
    { label: '大赛介绍', target: 'intro' },
    { label: '组别赛道', target: 'groups' },
    { label: '赛程安排', target: 'schedule' },
    { label: '报名参赛', target: 'signup' },
    { label: '材料下载', target: 'tracks' },
    { label: '新闻动态', target: 'news' },
    { label: '结果公示', target: 'signup' },
  ] satisfies NavItem[],
  hero: {
    kicker: '2024 赛季报名现已开启',
    title: ['全国大学生智能', '应用开发大赛'],
    subtitle: '让智能应用，从想法走向验证',
    description:
      '面向职业院校、普通高校与青年创新团队的顶级科技竞技平台。在这里，将前沿 AI 技术与实际业务场景深度融合，打造具备行业颠覆潜力的创新应用产品。',
    actions: {
      primary: '立即报名',
      secondary: '查看赛道',
      tertiary: '下载执行方案',
    },
  },
  heroSlides: [
    {
      kicker: '2024 赛季报名现已开启',
      title: ['全国大学生智能', '应用开发大赛'],
      subtitle: '让智能应用，从想法走向验证',
      description:
        '面向职业院校、普通高校与青年创新团队的顶级科技竞技平台。在这里，将前沿 AI 技术与实际业务场景深度融合，打造具备行业颠覆潜力的创新应用产品。',
      imageUrl:
        'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=2400&q=85',
      tone: 'blueprint',
      buttons: [{ label: '立即报名', href: ROUTES.login, variant: 'primary' }],
    },
    {
      kicker: '三大赛道同步开放',
      title: ['从创新概念', '到可演示原型'],
      subtitle: '萌芽、创意与 OPC 轻创赛道全面覆盖',
      description:
        '围绕真实产业命题组织作品评审，帮助参赛团队完成概念验证、交互原型、敏捷开发与路演答辩的完整闭环。',
      imageUrl:
        'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=2400&q=85',
      tone: 'aurora',
      buttons: [
        { label: '立即报名', href: ROUTES.login, variant: 'primary' },
        { label: '了解赛事', href: ROUTES.intro, variant: 'secondary' },
      ],
    },
    {
      kicker: '全国总决赛 09.28',
      title: ['链接产业资源', '看见青年创造力'],
      subtitle: '优秀项目将获得奖金、证书与产业生态支持',
      description:
        '赛事连接专家评审、企业实践场景、云资源与创投网络，让真正有落地潜力的智能应用项目获得持续成长机会。',
      imageUrl:
        'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=2400&q=85',
      tone: 'summit',
      buttons: [
        { label: '立即报名', href: ROUTES.login, variant: 'primary' },
        { label: '了解赛事', href: ROUTES.intro, variant: 'secondary' },
        { label: '下载执行方案', href: ROUTES.materials, variant: 'ghost' },
      ],
    },
  ] satisfies HeroSlideItem[],
  stats: [
    { value: '3', label: '大参赛组别', note: '' },
    { value: '3', label: '大赛事赛道', note: '' },
    { value: '4', label: '个月赛事周期', note: '' },
    { value: '50', label: '单人报名费', note: '' },
  ] satisfies StatItem[],
  intro: {
    title: '不止是一场比赛，更是一次',
    accent: '智能应用项目的成长路径',
  },
  groups: [
    {
      title: '职教组',
      description:
        '面向全国中等和高等职业院校在籍学生。侧重于智能技术在具体职业场景和生产实践中的落地应用，强调实操能力与解决实际问题的效率。',
      cta: '了解报名条件',
    },
    {
      title: '高校组',
      description:
        '面向全国普通本科院校在籍学生。关注前沿算法创新、复杂系统架构设计以及跨学科交叉融合，鼓励探索智能技术的边界与颠覆性可能。',
      cta: '了解报名条件',
    },
    {
      title: '青年创新组',
      description:
        '面向毕业 5 年内的青年创客、初创团队。要求项目具备较高的商业价值和市场转化可行性，需提交完整的商业计划及可演示的 MVP 原型。',
      cta: '了解报名条件',
    },
  ] satisfies GroupItem[],
  tracks: [
    {
      code: 'Track A',
      title: '萌芽赛道',
      description:
        '聚焦从 0 到 1 的想法孵化。参赛者需提交基于特定 AI 技术的创新概念书及初步应用场景规划，重点考察想象力与逻辑严密性。',
      cta: '查看评审标准',
    },
    {
      code: 'Track B',
      title: '创意赛道',
      description:
        '强调从概念到原型的转化。需提交可交互的软件原型或硬件 Demo，展示核心功能的实现逻辑，考察技术可行性与用户体验设计。',
      cta: '查看评审标准',
    },
    {
      code: 'Featured',
      title: 'OPC 轻创赛道',
      description:
        '基于提供的 One-Page-Code 框架或低代码平台，在极短时间内完成特定命题的应用开发。极限挑战开发者的工程化能力与敏捷开发素养。',
      cta: '查看评审标准',
    },
  ] satisfies TrackItem[],
  schedule: [
    { date: '06.10 - 07.15', title: '报名与组队', detail: '线上系统开放', featured: true },
    { date: '07.20 - 08.10', title: '初赛作品提交', detail: '材料审核与初评' },
    { date: '08.15', title: '复赛名单公布', detail: '专家评审团盲审' },
    { date: '09.01 - 09.05', title: '全国半决赛', detail: '线上路演与答辩' },
    { date: '09.28', title: '总决赛暨颁奖典礼', detail: '线下巅峰对决' },
  ] satisfies ScheduleItem[],
  awards: [
    {
      icon: '🏆',
      title: '金奖',
      subtitle: '每个赛道各 1 名',
      prize: '¥ 50,000',
      detail: '颁发证书及奖杯\n直通头部企业终面',
      tone: 'gold',
    },
    {
      icon: '🥈',
      title: '银奖',
      subtitle: '每个赛道各 2 名',
      prize: '¥ 20,000',
      detail: '颁发证书及奖杯\n知名创投机构对接',
      tone: 'silver',
    },
    {
      icon: '🥉',
      title: '铜奖',
      subtitle: '每个赛道各 3 名',
      prize: '¥ 10,000',
      detail: '颁发证书及奖杯\n免费云资源支持',
      tone: 'bronze',
    },
    {
      icon: '★',
      title: '优秀奖',
      subtitle: '若干名',
      prize: '精美礼包',
      detail: '颁发荣誉证书\n大赛限量周边',
      tone: 'slate',
    },
  ] satisfies AwardItem[],
  newsCategories: [
    { label: '新闻动态', value: 'news' },
    { label: '通知公告', value: 'notice' },
    { label: '媒体报道', value: 'media' },
  ],
  newsArticles: [
    {
      category: 'news',
      slug: 'registration-open-2024',
      title: '2024 赛季报名通道正式开启，参赛团队可在线提交项目资料',
      excerpt: '本届赛事面向职业院校、普通高校与青年创新团队开放报名，支持跨校组队与多赛道作品提交。',
      date: '2024.06.10',
      imageUrl:
        'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=1200&q=82',
      href: '/news/registration-open-2024',
      body: [
        '2024 赛季全国大学生智能应用开发大赛报名通道正式开启。参赛团队可通过线上系统完成队伍信息填写、赛道选择与项目资料提交。',
        '本届赛事面向职业院校、普通高校与青年创新团队开放，鼓励跨校、跨专业组队，围绕人工智能应用开发、产业命题验证与产品化路演展开比拼。',
        '组委会建议参赛团队提前确认成员资格、指导老师信息与作品方向，并在报名截止前完成材料核验，避免因资料缺失影响后续评审。',
      ],
    },
    {
      category: 'news',
      slug: 'opc-track-release',
      title: 'OPC 轻创赛道公布命题方向，强调敏捷开发与应用落地',
      excerpt: '赛道将围绕真实业务场景设置开发任务，重点考察团队在短周期内完成产品验证的工程能力。',
      date: '2024.06.18',
      imageUrl:
        'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=1200&q=82',
      href: '/news/opc-track-release',
      body: [
        'OPC 轻创赛道将围绕真实业务场景设置开发任务，强调快速理解命题、组织功能优先级并完成可演示原型。',
        '参赛团队需要在有限周期内提交产品方案、运行演示与关键技术说明，评审将重点关注工程实现能力、交互体验和场景适配度。',
        '赛道鼓励使用成熟开发框架、低代码平台与 AI 工具链完成应用构建，但作品应体现团队对业务问题和用户价值的独立判断。',
      ],
    },
    {
      category: 'news',
      slug: 'review-committee-preparation',
      title: '专家评审委员会启动初评准备工作，评审标准将同步发布',
      excerpt: '初评阶段将综合考察创新价值、技术可行性、用户体验、商业潜力与答辩表达等维度。',
      date: '2024.07.02',
      imageUrl:
        'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=82',
      href: '/news/review-committee-preparation',
      body: [
        '专家评审委员会已启动初评准备工作，后续将围绕各赛道特点发布更细化的评审说明。',
        '初评阶段将综合考察作品的创新价值、技术可行性、用户体验、商业潜力与答辩表达，确保不同类型作品在统一规则下获得公平评价。',
        '组委会将持续完善评审流程与材料要求，参赛团队可关注官网新闻中心和材料下载页面，及时获取最新通知。',
      ],
    },
    {
      category: 'notice',
      slug: 'submission-material-format',
      title: '关于作品提交材料格式的说明',
      excerpt: '参赛团队需按模板提交项目说明书、演示视频与可访问原型链接。',
      date: '2024.06.22',
      imageUrl:
        'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1200&q=82',
      href: '/news/submission-material-format',
      body: [
        '为提升材料审核效率，参赛团队需按统一模板提交项目说明书、演示视频与可访问原型链接。',
        '项目说明书应包含项目背景、目标用户、核心功能、技术方案、创新价值与后续计划。演示视频应清晰展示主要功能流程，避免只提交概念说明。',
        '如作品涉及外部数据、第三方模型或开源组件，请在材料中注明来源与使用范围，便于评审委员会核验。',
      ],
    },
    {
      category: 'media',
      slug: 'industry-partners-focus',
      title: '多家产业伙伴关注青年智能应用创新项目',
      excerpt: '赛事将持续链接产业场景，为优秀团队提供后续资源支持。',
      date: '2024.06.26',
      imageUrl:
        'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=82',
      href: '/news/industry-partners-focus',
      body: [
        '多家产业伙伴持续关注青年智能应用创新项目，希望通过赛事发现具备落地潜力的团队与作品。',
        '赛事将围绕真实场景、云资源、导师辅导与生态对接提供支持，帮助优秀项目在比赛结束后继续获得验证和成长机会。',
        '组委会也将结合项目成熟度与合作意向，为入围团队组织后续展示、交流与资源对接活动。',
      ],
    },
  ] satisfies NewsArticleItem[],
  cta: {
    title: '立即开启你的智能应用开发之旅',
    description: '加入顶尖的技术生态圈，与优秀的同侪一起，将疯狂的创意转化为改变现实的产品。',
    action: '进入报名系统',
  },
  footer: {
    description: '面向高校与青年创新团队的智能应用竞赛门户，集中提供赛道信息、报名入口、材料下载与赛事资讯。',
    columns: [
      {
        title: '赛事导航',
        links: [
          { label: '首页', href: ROUTES.home },
          { label: '大赛简介', href: ROUTES.intro },
        ],
      },
      {
        title: '参赛支持',
        links: [
          { label: '创业基地', href: ROUTES.startupBase },
          { label: '材料下载', href: ROUTES.materials },
          { label: '登录入口', href: ROUTES.login },
        ],
      },
      {
        title: '资讯与内容',
        links: [
          { label: '新闻中心', href: ROUTES.news },
          { label: '赛事动态', href: ROUTES.news },
          { label: '政策支持', href: ROUTES.policies },
          { label: '关于我们', href: ROUTES.about },
        ],
      },
    ] satisfies FooterColumnItem[],
    copyright: '© 2024 全国大学生智能应用开发大赛. 保留所有权利。',
    legalLinks: [
      { label: '隐私政策', href: ROUTES.privacy },
      { label: '服务条款', href: ROUTES.terms },
    ],
  },
} as const;
