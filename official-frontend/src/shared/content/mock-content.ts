import type {
  ArticleItem,
  CmsContentBundle,
  CmsPageContent,
  CmsRecordBase,
  CmsSection,
  DownloadItem,
  NewsCategorySummary,
  PageKey,
  SeoContent,
  SiteShellContent,
  StatItem,
  TimelineItem,
} from '@/shared/content/types';
import { defaultLocale, type Locale } from '@/shared/i18n/config';

const heroImage = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1800&q=80';
const cityImage = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1800&q=80';
const labImage = 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1800&q=80';
const teamImage = 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1800&q=80';
const startupImage = 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1800&q=80';
const newsImage = 'https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=1600&q=80';
const codeImage = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1600&q=80';

const pageKeys: PageKey[] = [
  'home',
  'intro',
  'events',
  'projects',
  'startup-base',
  'materials',
  'policies',
  'about',
  'privacy',
  'terms',
  'login',
  'news',
];

function record(id: string, code: string, title: string, sort: number, extra: Partial<CmsRecordBase> = {}): CmsRecordBase {
  return {
    id,
    code,
    locale: 'zh',
    title,
    sort,
    status: 'published',
    ...extra,
  };
}

function section<TItem = CmsRecordBase>(
  id: string,
  sectionCode: string,
  items: TItem[],
  extra: Partial<CmsSection<TItem>> = {},
): CmsSection<TItem> {
  return {
    id,
    sectionCode,
    sectionType: sectionCode,
    items,
    ...extra,
  };
}

function page(
  pageKey: PageKey,
  hero: CmsPageContent['hero'],
  sections: CmsPageContent['sections'] = [],
  extra: Partial<CmsPageContent> = {},
): CmsPageContent {
  return {
    pageKey,
    locale: 'zh',
    hero,
    sections,
    seo: {
      title: hero?.title ?? '',
      description: hero?.description ?? '',
    },
    ...extra,
  };
}

const siteMeta: Record<PageKey, SeoContent> = {
  home: {
    title: 'AI 应用开发创新大赛',
    description: '面向青年开发者和创新团队的 AI 应用开发赛事官网。',
  },
  intro: {
    title: '大赛简介',
    description: '了解 AIADC 的赛事定位、参赛对象、赛程安排与奖项设置。',
  },
  events: {
    title: '活动中心',
    description: '查看赛事路演、沙龙、政策宣讲和行业交流活动。',
  },
  projects: {
    title: '优秀项目',
    description: '展示 AI 应用开发创新大赛中的代表性项目案例。',
  },
  'startup-base': {
    title: '创业基地',
    description: '了解赛事联动的孵化空间、实训基地和产业资源。',
  },
  materials: {
    title: '材料下载',
    description: '下载报名、作品提交、评审说明和赛事宣传材料。',
  },
  policies: {
    title: '政策支持',
    description: '了解赛事相关政策、扶持计划与创新创业服务。',
  },
  about: {
    title: '关于我们',
    description: '了解 AI 应用开发创新大赛组委会与服务机制。',
  },
  privacy: {
    title: '隐私政策',
    description: '了解网站如何保护参赛者和访问者的信息。',
  },
  terms: {
    title: '服务条款',
    description: '了解官网访问、报名服务和内容使用规则。',
  },
  login: {
    title: '登录入口',
    description: '进入报名系统完成团队报名、作品提交和进度查看。',
  },
  news: {
    title: '新闻中心',
    description: '查看 AIADC 赛事新闻、通知公告和媒体报道。',
  },
};

const siteShell: SiteShellContent = {
  brand: {
    primary: 'AIADC',
    secondary: '应用开发创新大赛',
    homeAria: '返回首页',
    applicationName: 'AI 应用开发创新大赛',
  },
  header: {
    languageAria: '切换语言',
    loginLabel: '报名入口',
    mainNavItems: [
      { label: '首页', href: '/' },
      { label: '赛事信息', href: '/intro', dropdown: true },
      { label: '新闻中心', href: '/news' },
      { label: '关于我们', href: '/about' },
    ],
    pageSwitchItems: [
      { label: '大赛简介', href: '/intro', description: '赛事定位、赛程、奖项和联系方式' },
      { label: '活动中心', href: '/events', description: '路演、沙龙、政策宣讲和行业峰会' },
      { label: '优秀项目', href: '/projects', description: '优秀 AI 应用项目案例展示' },
      { label: '创业基地', href: '/startup-base', description: '孵化空间、实训基地和产业资源' },
      { label: '材料下载', href: '/materials', description: '报名与作品提交所需材料' },
      { label: '新闻中心', href: '/news', description: '赛事新闻、通知公告和媒体报道' },
    ],
    eventPageItems: [
      { label: '大赛简介', href: '/intro', description: '查看赛事定位、参赛对象、赛程安排与奖项设置' },
      { label: '活动中心', href: '/events', description: '查看近期路演、沙龙、政策宣讲和行业交流' },
      { label: '优秀项目', href: '/projects', description: '了解往期和模拟优秀项目展示案例' },
      { label: '创业基地', href: '/startup-base', description: '查看赛事联动孵化空间和资源服务' },
      { label: '材料下载', href: '/materials', description: '下载报名、作品提交和评审说明材料' },
    ],
  },
  footer: {
    description: 'AIADC 聚焦 AI 应用开发、产业命题和创新实践，连接高校、企业、开发者与创业服务资源。',
    columns: [
      {
        title: '赛事信息',
        links: [
          { label: '大赛简介', href: '/intro' },
          { label: '活动中心', href: '/events' },
          { label: '材料下载', href: '/materials' },
        ],
      },
      {
        title: '内容中心',
        links: [
          { label: '新闻中心', href: '/news' },
          { label: '优秀项目', href: '/projects' },
          { label: '创业基地', href: '/startup-base' },
        ],
      },
      {
        title: '服务支持',
        links: [
          { label: '报名入口', href: '/login' },
          { label: '关于我们', href: '/about' },
          { label: '隐私政策', href: '/privacy' },
        ],
      },
    ],
    legalLinks: [
      { label: '隐私政策', href: '/privacy' },
      { label: '服务条款', href: '/terms' },
    ],
    filings: [
      { label: 'ICP备案号办理中', href: 'https://beian.miit.gov.cn/' },
      { label: '公安备案号办理中', href: 'https://www.beian.gov.cn/portal/registerSystemInfo' },
    ],
    copyright: 'Copyright 2026 AIADC 组委会. All Rights Reserved.',
  },
};

const newsCategories: NewsCategorySummary[] = [
  { label: '新闻动态', value: 'news', description: '赛事进展、组织动态和重要发布。' },
  { label: '通知公告', value: 'notice', description: '报名、提交、评审和答辩安排。' },
  { label: '媒体报道', value: 'media', description: '合作媒体和产业生态报道。' },
];

const newsArticles: ArticleItem[] = [
  {
    ...record('news-1', 'launch', 'AI 应用开发创新大赛报名通道开放', 1, {
      description: '报名通道开放，参赛团队可提前准备项目材料。',
    }),
    category: 'news',
    slug: 'registration-open',
    href: '/news/registration-open',
    excerpt: 'AIADC 面向高校学生、青年开发者和创新团队开放报名，鼓励参赛者围绕真实场景构建可运行的 AI 应用。',
    date: '2026-06-10',
    image: { url: newsImage, alt: '赛事新闻发布现场' },
    body: [
      'AI 应用开发创新大赛围绕产业命题、城市服务、校园创新和创业实践设置多个方向，鼓励团队提交具备真实使用价值的 AI 应用作品。',
      '参赛团队可在报名阶段完善成员信息、项目名称、赛道方向和项目简介，并在作品提交阶段补充演示材料、技术说明与部署链接。',
      '组委会将持续发布赛程提醒、答疑活动和评审说明，帮助团队按照节点推进开发、测试和答辩准备。',
    ],
    sort: 1,
    status: 'published',
    locale: 'zh',
  },
  {
    ...record('notice-1', 'materials', '作品材料提交说明发布', 2),
    category: 'notice',
    slug: 'submission-guide',
    href: '/news/submission-guide',
    excerpt: '作品提交需包含项目简介、演示说明、核心功能截图和团队信息，请参赛团队提前准备。',
    date: '2026-06-18',
    image: { url: codeImage, alt: '开发者正在准备作品提交材料' },
    body: [
      '作品材料建议围绕问题定义、方案设计、模型或工具使用、核心功能、部署方式和后续计划展开说明。',
      '演示材料应尽量体现产品主流程、用户价值和技术实现亮点，避免只提交概念描述。',
      '如团队正在迭代作品，可在提交材料中说明当前完成度、下一步计划和需要评审重点关注的能力边界。',
    ],
    sort: 2,
    status: 'published',
    locale: 'zh',
  },
  {
    ...record('media-1', 'ecosystem', '产业伙伴共建 AI 应用创新生态', 3),
    category: 'media',
    slug: 'partner-ecosystem',
    href: '/news/partner-ecosystem',
    excerpt: '赛事联动技术平台、孵化空间和产业导师，为优秀项目提供展示、辅导和资源对接机会。',
    date: '2026-06-20',
    image: { url: teamImage, alt: '产业伙伴交流会' },
    body: [
      'AIADC 希望通过开放命题、项目辅导和成果展示，帮助更多青年团队把 AI 能力转化为可落地的应用方案。',
      '赛事期间将组织线上答疑、主题沙龙和路演交流，为不同阶段团队提供更清晰的产品化路径。',
      '优秀项目将有机会进入后续孵化服务，获得产业导师、场地空间和资源对接支持。',
    ],
    sort: 3,
    status: 'published',
    locale: 'zh',
  },
];

const homePage = page(
  'home',
  {
    eyebrow: 'AI 应用开发创新大赛',
    title: '让 AI 应用从想法走向验证',
    description: '面向青年开发者、高校学生和创新团队，围绕真实场景打造可演示、可评审、可成长的 AI 应用作品。',
  },
  [
    section('home-hero', 'heroSlides', [
      record('hero-1', 'main', 'AI 应用开发', 1, {
        subtitle: '创新大赛',
        description: '用真实问题驱动智能应用开发，用赛事机制连接学习、实践、展示与创业资源。',
        imageUrl: heroImage,
        tags: ['AI APPLICATION', 'INNOVATION', 'YOUTH TEAMS'],
        cta: { label: '立即报名', href: '/login' },
        extra: { accent: '创新大赛', alt: '青年团队进行 AI 应用开发讨论' },
      }),
      record('hero-2', 'ecosystem', '产业命题', 2, {
        subtitle: '开放协同',
        description: '链接高校、企业、技术平台和孵化空间，让参赛作品贴近真实使用场景。',
        imageUrl: teamImage,
        tags: ['INDUSTRY', 'MENTORSHIP', 'SHOWCASE'],
        cta: { label: '查看赛程', href: '/intro#schedule' },
        extra: { accent: '开放协同', alt: '产业导师与参赛团队交流' },
      }),
    ]),
    section<StatItem>('home-stats', 'stats', [
      { ...record('stat-1', 'tracks', '赛道方向', 1), value: '3+', label: '核心赛道' },
      { ...record('stat-2', 'teams', '参赛团队', 2), value: '100+', label: '预计团队' },
      { ...record('stat-3', 'mentors', '导师资源', 3), value: '30+', label: '产业导师' },
      { ...record('stat-4', 'events', '配套活动', 4), value: '12+', label: '路演沙龙' },
    ]),
    section('home-groups', 'groups', [
      record('group-1', 'students', '高校学生团队', 1, {
        description: '面向在校学生与跨校组队团队，鼓励围绕校园、城市和产业场景提出 AI 应用方案。',
        iconKey: 'graduation-cap',
        cta: { label: '查看报名条件', href: '/intro' },
      }),
      record('group-2', 'developers', '青年开发者团队', 2, {
        description: '适合具备产品、设计、算法、前端或后端能力的青年开发者共同完成应用原型。',
        iconKey: 'code-2',
        cta: { label: '查看赛道方向', href: '/intro#tracks' },
      }),
      record('group-3', 'startups', '创新创业团队', 3, {
        description: '支持已有原型或早期项目的团队通过赛事获得展示、反馈和后续孵化资源。',
        iconKey: 'rocket',
        cta: { label: '查看创业基地', href: '/startup-base' },
      }),
    ], {
      title: '覆盖多元青年创新团队',
      description: '以团队形式参赛，每队 1-5 人，可跨校、跨专业组队，按照项目阶段选择对应赛道。',
    }),
    section('home-highlights', 'highlights', [
      record('highlight-1', 'real-topic', '真实场景命题', 1, {
        description: '围绕教育、城市服务、企业效率和社会治理等真实需求设计作品。',
        iconKey: 'flag',
      }),
      record('highlight-2', 'prototype', '作品可演示', 2, {
        description: '鼓励提交可运行原型、核心流程截图和简明技术说明。',
        iconKey: 'badge-check',
      }),
      record('highlight-3', 'mentor', '导师陪跑', 3, {
        description: '通过答疑、沙龙和路演帮助团队优化产品叙事与技术路径。',
        iconKey: 'users-2',
      }),
      record('highlight-4', 'incubation', '孵化衔接', 4, {
        description: '优秀项目可进入展示、资源对接和创业孵化支持通道。',
        iconKey: 'building-2',
      }),
    ], {
      title: '让智能应用，从想法走向验证',
      description: '赛事围绕组别、赛道、时间线与作品评审构建一体化体验，让每个团队都能快速找到适合自己的成长路径。',
    }),
    section('home-partners', 'partners', [
      record('partner-1', 'university', '高校创新中心', 1),
      record('partner-2', 'industry', '产业服务平台', 2),
      record('partner-3', 'cloud', '云计算合作方', 3),
      record('partner-4', 'incubator', '创业孵化基地', 4),
      record('partner-5', 'media', '科技媒体伙伴', 5),
      record('partner-6', 'community', '开发者社区', 6),
    ]),
    section('home-faq', 'faq', [
      record('faq-1', 'team-size', '团队人数有限制吗？', 1, {
        description: '建议每队 1-5 人，可跨校、跨专业组队。团队需明确负责人并保持联系方式畅通。',
      }),
      record('faq-2', 'prototype', '必须提交完整上线产品吗？', 2, {
        description: '不要求商业化上线，但建议提供可演示原型、核心流程截图和清晰的技术实现说明。',
      }),
      record('faq-3', 'track', '报名后可以调整赛道吗？', 3, {
        description: '在作品正式提交前可根据项目方向调整，最终以提交阶段确认的赛道为准。',
      }),
      record('faq-4', 'review', '评审重点是什么？', 4, {
        description: '评审将综合关注场景价值、AI 能力使用、工程实现、用户体验和团队表达。',
      }),
    ]),
  ],
  {
    ctaBanner: {
      kicker: '报名进行中',
      title: '准备好提交你的 AI 应用创意了吗？',
      description: '登录报名系统完善团队信息，按赛程节点提交作品材料。',
      action: { label: '进入报名系统', href: '/login' },
    },
  },
);

const introPage = page(
  'intro',
  {
    eyebrow: '大赛简介',
    title: '连接 AI 技术、应用场景与青年创新力量',
    description: 'AIADC 鼓励参赛团队围绕真实需求构建可运行的 AI 应用，完成从问题洞察到作品展示的完整实践。',
    backgroundImage: labImage,
    dark: true,
  },
  [
    section('intro-values', 'valueCards', [
      record('value-1', 'practice', '实践导向', 1, {
        description: '不止比较概念，更强调原型能力、应用价值和工程可验证性。',
      }),
      record('value-2', 'open', '开放协同', 2, {
        description: '联合高校、企业、平台和社区提供命题、辅导、展示与资源对接。',
      }),
      record('value-3', 'growth', '成长支持', 3, {
        description: '通过赛程节点、活动答疑和导师反馈帮助团队持续迭代作品。',
      }),
    ]),
    section<TimelineItem>('intro-schedule', 'schedule', [
      {
        ...record('schedule-1', 'registration', '报名启动', 1),
        date: '2026.06.10 - 2026.07.15',
        detail: '团队完成报名、赛道选择和项目简介填写。',
        featured: true,
      },
      {
        ...record('schedule-2', 'submission', '作品提交', 2),
        date: '2026.07.16 - 2026.08.05',
        detail: '提交演示材料、技术说明、项目截图和补充附件。',
      },
      {
        ...record('schedule-3', 'review', '专家评审', 3),
        date: '2026.08.06 - 2026.08.20',
        detail: '围绕应用价值、技术实现、用户体验和答辩表达进行综合评审。',
      },
      {
        ...record('schedule-4', 'final', '决赛展示', 4),
        date: '2026.08.下旬',
        detail: '优秀团队参加路演答辩和成果展示，进入资源对接环节。',
        featured: true,
      },
    ]),
    section('intro-awards', 'awards', [
      record('award-1', 'gold', '一等奖', 1, {
        subtitle: '综合创新奖',
        description: '证书、奖金与重点孵化推荐',
        extra: { tone: 'gold', glyph: '1', prize: '最高荣誉' },
      }),
      record('award-2', 'silver', '二等奖', 2, {
        subtitle: '应用价值奖',
        description: '证书、奖金与导师辅导支持',
        extra: { tone: 'silver', glyph: '2', prize: '优秀作品' },
      }),
      record('award-3', 'bronze', '三等奖', 3, {
        subtitle: '潜力项目奖',
        description: '证书、展示机会与生态资源对接',
        extra: { tone: 'bronze', glyph: '3', prize: '潜力项目' },
      }),
      record('award-4', 'special', '专项奖', 4, {
        subtitle: '最佳工程实践',
        description: '面向技术实现、产品体验和场景创新设置专项表彰',
        extra: { tone: 'slate', glyph: '★', prize: '专项表彰' },
      }),
    ]),
    section('intro-tracks', 'tracks', [
      record('track-1', 'concept', '创意概念赛道', 1, {
        subtitle: 'Idea',
        description: '适合处于创意和需求验证阶段的团队，重点展示问题洞察、方案设计和应用价值。',
        iconKey: 'sparkles',
        cta: { label: '查看材料要求', href: '/materials' },
      }),
      record('track-2', 'prototype', '原型构建赛道', 2, {
        subtitle: 'Prototype',
        description: '适合已有可演示原型的团队，重点展示核心流程、AI 能力使用和用户体验。',
        iconKey: 'code-2',
        cta: { label: '查看作品案例', href: '/projects' },
      }),
      record('track-3', 'startup', '创业实践赛道', 3, {
        subtitle: 'Startup',
        description: '适合已有早期产品或商业化计划的团队，重点展示落地场景、增长潜力和持续运营能力。',
        iconKey: 'rocket',
        cta: { label: '查看孵化资源', href: '/startup-base' },
      }),
    ]),
    section('intro-contacts', 'contacts', [
      record('contact-1', 'service', '赛事咨询', 1, {
        description: '报名、赛程和活动安排以官网通知为准。',
        iconKey: 'help-circle',
      }),
      record('contact-2', 'submission', '材料支持', 2, {
        description: '作品提交说明和模板可在材料下载页查看。',
        iconKey: 'file-text',
      }),
      record('contact-3', 'cooperation', '合作联系', 3, {
        description: '产业命题、导师和媒体合作请关注组委会后续公告。',
        iconKey: 'mail',
      }),
    ]),
  ],
);

const eventsPage = page(
  'events',
  {
    eyebrow: '活动中心',
    title: '围绕报名、开发、路演和资源对接持续展开',
    description: '通过线上答疑、线下沙龙和行业交流，帮助团队把作品从构想到可展示成果。',
    backgroundImage: cityImage,
  },
  [
    section('events-filters', 'filters', [
      record('event-filter-all', 'all', '全部活动', 1),
      record('event-filter-roadshow', 'roadshow', '路演活动', 2),
      record('event-filter-salon', 'salon', '创业沙龙', 3),
      record('event-filter-policy', 'policy', '政策宣讲', 4),
      record('event-filter-summit', 'summit', '行业峰会', 5),
    ]),
    section('events-list', 'events', [
      record('event-1', 'opening-roadshow', 'AIADC 报名说明与作品路演公开课', 1, {
        subtitle: '路演活动',
        description: '讲解报名流程、赛道选择、作品材料准备和路演表达方法。',
        cta: { label: '查看详情', href: '/login' },
        extra: { date: '2026.06.28', time: '14:00 - 16:00', location: '线上直播', featured: true },
      }),
      record('event-2', 'product-salon', '从 AI Demo 到可用产品：产品化沙龙', 2, {
        subtitle: '创业沙龙',
        description: '围绕用户场景、功能边界、交互体验和技术债控制进行实战分享。',
        cta: { label: '查看详情', href: '/login' },
        extra: { date: '2026.07.06', time: '19:00 - 20:30', location: '线上会议室' },
      }),
      record('event-3', 'policy-briefing', '青年创新创业政策宣讲', 3, {
        subtitle: '政策宣讲',
        description: '介绍创新创业支持政策、基地服务和项目后续孵化路径。',
        cta: { label: '查看详情', href: '/login' },
        extra: { date: '2026.07.12', time: '15:00 - 16:30', location: '创业服务中心' },
      }),
      record('event-4', 'ai-summit', 'AI 应用开发生态峰会', 4, {
        subtitle: '行业峰会',
        description: '邀请产业专家、技术平台和优秀团队分享 AI 应用落地趋势。',
        cta: { label: '查看详情', href: '/login' },
        extra: { date: '2026.08.24', time: '09:30 - 17:00', location: '决赛展示现场' },
      }),
    ]),
  ],
);

const projectsPage = page(
  'projects',
  {
    eyebrow: '优秀项目',
    title: '从真实问题出发的 AI 应用实践',
    description: '以下为 mock 展示项目，用于官网内容模拟和备案预览。',
    backgroundImage: codeImage,
  },
  [
    section('project-filters', 'filters', [
      record('project-filter-all', 'all', '全部项目', 1),
      record('project-filter-campus', 'campus', '校园服务', 2),
      record('project-filter-city', 'city', '城市治理', 3),
      record('project-filter-enterprise', 'enterprise', '企业效率', 4),
    ]),
    section('project-list', 'projects', [
      record('project-1', 'campus-copilot', '校园事务智能助手', 1, {
        subtitle: '校园服务',
        description: '面向学生事务咨询、流程导航和材料准备的智能问答与办事助手。',
        cta: { label: '查看详情', href: '/login' },
        extra: { track: '原型构建', stage: '可演示原型', date: '2026', featured: true },
      }),
      record('project-2', 'city-report', '城市问题线索归集系统', 2, {
        subtitle: '城市治理',
        description: '通过多模态信息归集和自动分类，辅助社区服务人员提升响应效率。',
        cta: { label: '查看详情', href: '/login' },
        extra: { track: '创业实践', stage: '试点方案', date: '2026' },
      }),
      record('project-3', 'meeting-agent', '企业会议纪要与任务助手', 3, {
        subtitle: '企业效率',
        description: '自动整理会议要点、待办责任人和项目风险，帮助团队保持执行节奏。',
        cta: { label: '查看详情', href: '/login' },
        extra: { track: '原型构建', stage: 'MVP', date: '2026' },
      }),
    ]),
  ],
);

const startupBasePage = page(
  'startup-base',
  {
    eyebrow: '创业基地',
    title: '为优秀项目提供后续成长空间',
    description: '赛事联动孵化空间、实训基地和产业导师，为项目展示、辅导和资源对接提供支撑。',
    backgroundImage: startupImage,
  },
  [
    section('startup-base-items', 'baseItems', [
      record('base-1', 'innovation-center', 'AI 创新实训中心', 1, {
        description: '提供项目辅导、路演演练和技术交流空间。',
        imageUrl: startupImage,
        extra: { location: '创新服务园区' },
      }),
      record('base-2', 'incubation-space', '青年创业孵化空间', 2, {
        description: '面向优秀项目开放孵化咨询、资源对接和展示机会。',
        imageUrl: teamImage,
        extra: { location: '城市创业基地' },
      }),
      record('base-3', 'demo-lab', '应用场景验证实验室', 3, {
        description: '支持团队围绕真实场景开展用户验证和产品迭代。',
        imageUrl: labImage,
        extra: { location: '产业合作平台' },
      }),
    ]),
  ],
);

const materialsPage = page(
  'materials',
  {
    eyebrow: '材料下载',
    title: '报名与作品提交材料集中查看',
    description: '当前为 mock 材料清单，用于备案预览和页面流程模拟。',
    backgroundImage: labImage,
  },
  [
    section<DownloadItem>('materials-list', 'materials', [
      {
        ...record('material-1', 'registration-guide', '参赛报名指南', 1, {
          description: '包含参赛对象、报名流程、团队信息填写和常见问题说明。',
        }),
        format: 'PDF',
        audience: '参赛团队',
        actionLabel: '下载',
        fileUrl: '#',
      },
      {
        ...record('material-2', 'submission-template', '作品提交模板', 2, {
          description: '用于整理项目背景、核心功能、技术架构、演示链接和团队分工。',
        }),
        format: 'DOCX',
        audience: '参赛团队',
        actionLabel: '下载',
        fileUrl: '#',
      },
      {
        ...record('material-3', 'review-standard', '评审标准说明', 3, {
          description: '说明应用价值、AI 能力使用、工程实现、用户体验和表达展示维度。',
        }),
        format: 'PDF',
        audience: '参赛团队',
        actionLabel: '下载',
        fileUrl: '#',
      },
    ]),
  ],
  {
    ctaBanner: {
      title: '需要先了解赛事整体安排？',
      description: '可先查看大赛简介，确认赛道、赛程和材料提交节点。',
      link: { label: '查看赛事介绍', href: '/intro' },
    },
  },
);

const aboutPage = page(
  'about',
  {
    eyebrow: '关于我们',
    title: '服务 AI 应用创新实践的赛事平台',
    description: 'AIADC 以赛事为入口，帮助青年团队完成项目实践、展示交流和后续成长。',
    backgroundImage: teamImage,
  },
  [
    section('about-items', 'aboutItems', [
      record('about-1', 'mission', '赛事使命', 1, {
        description: '鼓励青年开发者用 AI 解决真实问题，把学习成果转化为可演示的应用作品。',
        iconKey: 'flag',
      }),
      record('about-2', 'service', '服务机制', 2, {
        description: '通过官网内容、活动答疑、材料规范和评审机制降低参赛沟通成本。',
        iconKey: 'shield-check',
      }),
      record('about-3', 'ecosystem', '生态连接', 3, {
        description: '联动高校、产业机构和孵化空间，为优秀项目提供更多展示和成长机会。',
        iconKey: 'users-2',
      }),
    ]),
  ],
);

const privacyPage = page(
  'privacy',
  {
    eyebrow: '隐私政策',
    title: '我们重视访问者与参赛团队的信息保护',
    description: '以下为备案预览阶段的 mock 隐私政策文本，正式上线前可由运营或法务确认。',
  },
  [],
  {
    richTextBlocks: [
      {
        id: 'privacy-1',
        code: 'purpose',
        type: 'paragraph',
        content: '本网站仅在提供赛事信息、报名指引和作品提交服务所需范围内处理相关信息。',
      },
      {
        id: 'privacy-2',
        code: 'security',
        type: 'paragraph',
        content: '我们将采取合理的技术和管理措施保护信息安全，并按照适用法律法规要求处理用户数据。',
      },
      {
        id: 'privacy-3',
        code: 'contact',
        type: 'paragraph',
        content: '如对隐私政策有疑问，可通过组委会公开渠道与我们联系。',
      },
    ],
  },
);

const termsPage = page(
  'terms',
  {
    eyebrow: '服务条款',
    title: '官网访问与赛事服务使用说明',
    description: '以下为备案预览阶段的 mock 服务条款文本，正式上线前可由运营或法务确认。',
  },
  [],
  {
    richTextBlocks: [
      {
        id: 'terms-1',
        code: 'content',
        type: 'paragraph',
        content: '访问本网站即表示你了解网站内容用于赛事信息展示、报名引导和材料说明。',
      },
      {
        id: 'terms-2',
        code: 'submission',
        type: 'paragraph',
        content: '参赛团队应保证提交材料真实、合法，并拥有展示作品所需的必要权利。',
      },
      {
        id: 'terms-3',
        code: 'update',
        type: 'paragraph',
        content: '赛事规则、赛程安排和材料要求以组委会正式发布的信息为准。',
      },
    ],
  },
);

const loginPage = page(
  'login',
  {
    eyebrow: '登录入口',
    title: '进入报名系统',
    description: '当前页面用于备案预览和报名入口模拟；正式系统上线后可替换为实际登录地址。',
  },
  [],
  {
    primaryAction: { label: '进入报名系统', href: '#' },
  },
);

const policiesPage = page(
  'policies',
  {
    eyebrow: '政策支持',
    title: '创新创业政策与资源服务',
    description: '政策内容将在正式上线前由运营团队补充。',
  },
);

const newsPage = page(
  'news',
  {
    eyebrow: '新闻中心',
    title: '赛事新闻、通知公告与媒体报道',
    description: '集中查看赛事进展、重要通知和生态合作动态。',
    backgroundImage: newsImage,
  },
);

const pages: Record<PageKey, CmsPageContent> = {
  home: homePage,
  intro: introPage,
  events: eventsPage,
  projects: projectsPage,
  'startup-base': startupBasePage,
  materials: materialsPage,
  policies: policiesPage,
  about: aboutPage,
  privacy: privacyPage,
  terms: termsPage,
  login: loginPage,
  news: newsPage,
};

const mockContentBundle: CmsContentBundle = {
  siteShell,
  siteMeta,
  pages,
  news: {
    categories: newsCategories,
    articles: newsArticles,
  },
};

function resolveLocale(locale?: string): Locale {
  return locale === 'en' ? 'en' : defaultLocale;
}

function cloneBundle(locale?: string): CmsContentBundle {
  const resolvedLocale = resolveLocale(locale);
  const bundle = structuredClone(mockContentBundle) as CmsContentBundle;

  pageKeys.forEach((pageKey) => {
    bundle.pages[pageKey].locale = resolvedLocale;
  });
  bundle.news.articles.forEach((article) => {
    article.locale = resolvedLocale;
  });

  return bundle;
}

export async function getMockContentBundle(locale?: string): Promise<CmsContentBundle> {
  return cloneBundle(locale);
}

export async function getMockSiteShellContent(locale?: string): Promise<SiteShellContent> {
  return (await getMockContentBundle(locale)).siteShell;
}

export async function getMockSiteMeta(pageKey: PageKey, locale?: string): Promise<SeoContent> {
  return (await getMockContentBundle(locale)).siteMeta[pageKey];
}

export async function getMockPageContent(pageKey: PageKey, locale?: string): Promise<CmsPageContent> {
  return (await getMockContentBundle(locale)).pages[pageKey];
}

export async function getMockNewsCategories(locale?: string): Promise<NewsCategorySummary[]> {
  return (await getMockContentBundle(locale)).news.categories;
}

export async function getMockNewsArticles(locale?: string, category?: ArticleItem['category']): Promise<ArticleItem[]> {
  const items = (await getMockContentBundle(locale)).news.articles
    .filter((item) => item.status === 'published')
    .sort((left, right) => left.sort - right.sort);

  return category ? items.filter((item) => item.category === category) : items;
}

export async function getMockNewsArticleBySlug(slug: string, locale?: string): Promise<ArticleItem | undefined> {
  return (await getMockNewsArticles(locale)).find((item) => item.slug === slug);
}
