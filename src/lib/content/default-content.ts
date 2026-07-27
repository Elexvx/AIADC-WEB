import type { ArticleItem, CmsContentBundle, CmsPageContent, CmsRecordBase, DownloadItem, PageKey, StatItem, TimelineItem } from '@/lib/content/types';
import { ROUTES, SITE_NAV_ITEMS } from '@/lib/config/routes';
import { defaultLocale, type Locale } from '@/lib/i18n/config';
import { getMarkdownNewsArticles } from './markdown-articles';

const noticeCover = '/assets/official-notice-cover.png';
const heroVisual = '/assets/aiadc-hero-visual.png';
const heroOfficialPoster = '/assets/hero/aiadc-hero-official-poster.png';
const heroCompetition = '/assets/hero/aiadc-hero-competition.png';
const heroRegistration = '/assets/hero/aiadc-hero-registration.png';
const heroIncubation = '/assets/hero/aiadc-hero-incubation.png';
const introCompetitionBackground = '/assets/hero/aiadc-intro-competition-bg.png';

function record<T extends Partial<CmsRecordBase>>(locale: Locale, id: string, code: string, data: T): CmsRecordBase & T {
  return {
    id,
    code,
    locale,
    title: '',
    sort: 0,
    status: 'published',
    ...data,
  } as CmsRecordBase & T;
}

function page(locale: Locale, pageKey: PageKey, content: Omit<CmsPageContent, 'pageKey' | 'locale'>): CmsPageContent {
  return {
    pageKey,
    locale,
    ...content,
  };
}

function seo(title: string, description: string) {
  return { title, description };
}

function buildZhBundle(locale: Locale = defaultLocale): CmsContentBundle {
  const siteMeta: Record<PageKey, { title: string; description: string }> = {
    home: seo('全国大学生智能应用开发大赛', '面向青年开发实践主体的智能应用开发赛事官网。'),
    events: seo('活动中心', '查看报名征集、材料提交、评审组织、项目打磨与决赛展示安排。'),
    materials: seo('材料下载', '下载赛事通知、执行方案、评审规则及报名材料。'),
    about: seo('关于大赛', '了解全国大学生智能应用开发大赛组织机制与办赛原则。'),
    news: seo('新闻动态', '查看赛事通知、组委会公告与媒体动态。'),
  };

  const home = page(locale, 'home', {
    seo: siteMeta.home,
    hero: {
      eyebrow: '',
      title: '全国大学生智能应用开发大赛',
      description: '围绕真实问题、真实开发、真实贡献和可验证成果，推动青年团队完成项目构思、方案设计、原型开发、成果展示与应用验证。',
    },
    sections: [
      {
        id: 'home-hero-slides',
        sectionCode: 'heroSlides',
        sectionType: 'hero-carousel',
        items: [
          record(locale, 'hero-official-poster', 'official-poster', {
            title: 'AIADC',
            subtitle: '',
            description: 'AIADC official competition poster',
            imageUrl: heroOfficialPoster,
            sort: 0,
            extra: {
              alt: 'AIADC official competition poster',
              variant: 'image-only',
            },
          }),
          record(locale, 'hero-2026', '2026', {
            title: '全国大学生\n智能应用开发大赛',
            subtitle: '聚焦真实问题 · 真开发 · 可验证 · 能落地 · 促成长',
            description: '面向全国高校与职业院校学生、青年创新团队开放，以真实开发过程和可验证成果为核心评价依据。',
            imageUrl: heroCompetition,
            sort: 1,
            tags: ['2026赛季', '智能应用开发', '分类评审'],
            cta: { label: '立即报名', href: ROUTES.registration },
            extra: {
              alt: '智能应用开发大赛官网首屏插画',
              secondaryAction: { label: '参赛入口', href: ROUTES.registration },
            },
          }),
          record(locale, 'hero-registration', 'registration', {
            title: '2026年报名征集\n与材料提交进行中',
            subtitle: '报名时间：2026年7月1日 - 2026年9月30日',
            description: '参赛团队可围绕教育教学、校园服务、智慧生活、产业协同、公共服务等真实方向提交项目。',
            imageUrl: heroRegistration,
            sort: 2,
            tags: ['报名征集', '材料提交', '参赛团队'],
            cta: { label: '立即报名', href: ROUTES.registration },
            extra: {
              alt: '赛事报名征集轮播图',
              secondaryAction: { label: '查看通知', href: ROUTES.news },
            },
          }),
          record(locale, 'hero-project-support', 'project-support', {
            title: '项目培育\n连接资源与真实场景',
            subtitle: '从方案打磨、工程实现到成果展示，支持青年团队持续成长',
            description: '大赛提供训练营、专家评审、资源对接和成果孵化服务，推动项目从创意探索走向可验证应用。',
            imageUrl: heroIncubation,
            sort: 3,
            tags: ['项目培育', '资源对接', '成果孵化'],
            cta: { label: '了解培育服务', href: ROUTES.events },
            extra: {
              alt: '项目培育与资源对接轮播图',
              secondaryAction: { label: '资料中心', href: ROUTES.materials },
            },
          }),
        ],
      },
      {
        id: 'home-stats',
        sectionCode: 'stats',
        sectionType: 'stats',
        items: [
          record(locale, 'stat-schools', 'schools', { value: '1200+', label: '参赛高校', title: '参赛高校', iconKey: 'users-2', sort: 1 }) as StatItem,
          record(locale, 'stat-teams', 'teams', { value: '8500+', label: '参赛团队', title: '参赛团队', iconKey: 'users', sort: 2 }) as StatItem,
          record(locale, 'stat-works', 'works', { value: '12000+', label: '参赛作品', title: '参赛作品', iconKey: 'file-text', sort: 3 }) as StatItem,
          record(locale, 'stat-awards', 'awards', { value: '1500+', label: '历届获奖项目', title: '历届获奖项目', iconKey: 'trophy', sort: 4 }) as StatItem,
        ],
      },
      {
        id: 'home-groups',
        sectionCode: 'groups',
        sectionType: 'cards',
        title: '参赛组别',
        description: '三类参赛组别面向不同青年开发实践主体，按组别分类评价。',
        items: [
          record(locale, 'group-vocational', 'vocational', {
            title: '职教组',
            description: '面向全国职业院校在校学生团队，突出应用实践与技术技能创新。',
            iconKey: 'graduation-cap',
            sort: 1,
            cta: { label: '查看组别规则', href: `${ROUTES.docs}/participation/groups` },
          }),
          record(locale, 'group-university', 'university', {
            title: '高校组',
            description: '面向全国普通高等院校在校学生团队，鼓励技术创新与工程实现。',
            iconKey: 'building-2',
            sort: 2,
            cta: { label: '查看组别规则', href: `${ROUTES.docs}/participation/groups` },
          }),
          record(locale, 'group-youth', 'youth', {
            title: '青年创新组',
            description: '面向35周岁及以下青年团队，鼓励社会力量与青年创新创业。',
            iconKey: 'users-2',
            sort: 3,
            cta: { label: '查看组别规则', href: `${ROUTES.docs}/participation/groups` },
          }),
        ],
      },
      {
        id: 'home-highlights',
        sectionCode: 'highlights',
        sectionType: 'cards',
        title: '赛道设置',
        description: '三类赛道面向不同项目成熟度与实现路径，鼓励从创意探索走向可验证应用。',
        items: [
          record(locale, 'track-seed-home', 'seed-home', {
            title: '萌芽赛道',
            description: '面向创新想法与早期探索项目，鼓励创意孵化与能力成长。',
            iconKey: 'sprout',
            sort: 1,
          }),
          record(locale, 'track-creative-home', 'creative-home', {
            title: '创意赛道',
            description: '面向具有完整方案与原型的项目，强调创新性与可行性。',
            iconKey: 'lightbulb',
            sort: 2,
          }),
          record(locale, 'track-opc-home', 'opc-home', {
            title: 'OPC轻创赛道',
            description: '面向基于开源与开放技术的应用项目，聚焦轻量实现与应用价值。',
            iconKey: 'code-2',
            sort: 3,
          }),
        ],
      },
      {
        id: 'home-partners',
        sectionCode: 'partners',
        sectionType: 'partners',
        items: [
          record(locale, 'partner-mca', 'mca', { title: 'MCA', subtitle: '合作支持', imageUrl: '/assets/partners/partner-mca.png', sort: 1 }),
          record(locale, 'partner-aieiri', 'aieiri', { title: '中国人工智能产教融合研究院', subtitle: '合作支持', imageUrl: '/assets/partners/partner-aieiri.png', sort: 2 }),
          record(locale, 'partner-harmonyos', 'harmonyos', { title: 'HarmonyOS', subtitle: '支持平台', imageUrl: '/assets/partners/partner-harmonyos.png', sort: 3 }),
          record(locale, 'partner-yutian-edu', 'yutian-edu', { title: '誉天教育', subtitle: '合作支持', imageUrl: '/assets/partners/partner-yutian-edu.png', sort: 4 }),
          record(locale, 'partner-jishu-financial', 'jishu-financial', { title: '集数财务', subtitle: '合作支持', imageUrl: '/assets/partners/partner-jishu-financial.png', sort: 5 }),
          record(locale, 'partner-elexvx-ai', 'elexvx-ai', { title: 'ElexvxAI 创新产业研发中心', subtitle: '合作支持', imageUrl: '/assets/partners/partner-elexvx-ai.png', sort: 6 }),
          record(locale, 'partner-elexvx', 'elexvx', { title: 'Elexvx', subtitle: '合作支持', imageUrl: '/assets/partners/partner-elexvx.png', sort: 7 }),
          record(locale, 'partner-jadeisle', 'jadeisle', { title: 'Jadeisle', subtitle: '合作支持', imageUrl: '/assets/partners/partner-jadeisle.png', sort: 8 }),
          record(locale, 'partner-aliyun', 'aliyun', { title: '阿里云', subtitle: '技术支持', imageUrl: '/assets/partners/partner-aliyun.png', sort: 9 }),
          record(locale, 'partner-tencent', 'tencent', { title: '腾讯云', subtitle: '技术支持', imageUrl: '/assets/partners/partner-tencent.png', sort: 10 }),
          record(locale, 'partner-baidu', 'baidu', { title: '百度智能云', subtitle: '技术支持', imageUrl: '/assets/partners/partner-baidu.png', sort: 11 }),
          record(locale, 'partner-deepseek', 'deepseek', { title: 'DeepSeek', subtitle: '模型生态', imageUrl: '/assets/partners/partner-deepseek.png', sort: 12 }),
          record(locale, 'partner-bytedance', 'bytedance', { title: '字节跳动', subtitle: '生态支持', imageUrl: '/assets/partners/partner-bytedance.png', sort: 13 }),
          record(locale, 'partner-alipay', 'alipay', { title: '支付宝', subtitle: '生态支持', imageUrl: '/assets/partners/partner-alipay.png', sort: 14 }),
        ],
      },
      {
        id: 'home-faq',
        sectionCode: 'faq',
        sectionType: 'faq',
        items: [
          record(locale, 'faq-team-size', 'team-size', {
            title: '参赛项目必须组队吗？',
            description: '项目可由个人或团队申报，不设最低人数要求。团队规模原则上控制在10人以内，确需增加的可提交专项说明，原则上不超过15人。',
            sort: 1,
          }),
          record(locale, 'faq-track', 'track', {
            title: '如何选择赛道？',
            description: '萌芽赛道看问题洞察与成长潜力，创意赛道看方案逻辑与产品构想，OPC轻创赛道看阶段成果、演示能力和低成本验证。',
            sort: 2,
          }),
          record(locale, 'faq-materials', 'materials', {
            title: '报名需要准备哪些材料？',
            description: '必交项目报告书、路演PPT、团队信息表、真实性与知识产权承诺书、开发过程与证明材料。',
            sort: 3,
          }),
          record(locale, 'faq-ai', 'ai-tools', {
            title: '可以使用AI工具辅助吗？',
            description: '可以合理使用AI工具辅助资料整理、方案构思、界面设计、代码辅助、文案优化和演示制作，但不能替代团队真实思考与研发实践。',
            sort: 4,
          }),
        ],
      },
    ],
    ctaBanner: {
      kicker: '创新服务',
      title: '立即体验 AIADC 智能应用创新服务',
      description: '从参赛报名到项目孵化，连接模型、算力、导师、企业命题与创新生态。',
      action: { label: '立即报名', href: ROUTES.registration },
      items: [
        {
          title: '参赛者入口',
          description: '完善资料并创建团队/项目',
          action: { label: '参赛者入口', href: ROUTES.registration },
        },
        {
          title: '开发者文档',
          description: '查看 SDK、API 与平台能力',
          action: { label: '参赛指南', href: ROUTES.docsParticipation },
        },
        {
          title: '企业命题',
          description: '发布场景需求并对接团队',
          action: { label: '企业命题', href: ROUTES.events },
        },
        {
          title: '合作咨询',
          description: '赛事、生态与产学研合作',
          action: { label: '合作咨询', href: ROUTES.contact },
        },
      ],
    },
  });

  const schedule: TimelineItem[] = [
    record(locale, 'schedule-launch', 'launch', {
      title: '启动发布与组织动员',
      date: '2026.07.01 - 2026.08.31',
      detail: '发布赛事通知、执行方案、评分细则及相关模板，开放报名入口，开展线上答疑与院校联系人建联。',
      featured: true,
      sort: 1,
    }) as TimelineItem,
    record(locale, 'schedule-submit', 'submit', {
      title: '报名征集与材料提交',
      date: '2026.07.01 - 2026.09.30',
      detail: '受理项目报名，组织团队提交项目报告书、路演PPT、团队信息表、承诺书及开发过程证明材料。',
      featured: true,
      sort: 2,
    }) as TimelineItem,
    record(locale, 'schedule-qualification', 'qualification', {
      title: '资格审核与初赛组织',
      date: '2026.10.01 - 2026.10.10',
      detail: '开展材料完整性、资格符合性、赛道适配性和基础合规审查。',
      sort: 3,
    }) as TimelineItem,
    record(locale, 'schedule-preliminary', 'preliminary', {
      title: '线上初赛评审',
      date: '2026.11.08 - 2026.11.15',
      detail: '组织线上材料评审，根据需要设置线上陈述或问答，综合确定拟入围决赛项目。',
      sort: 4,
    }) as TimelineItem,
    record(locale, 'schedule-polish', 'polish', {
      title: '项目打磨与材料复核',
      date: '2026.11.16 - 2026.12.06',
      detail: '入围项目完善展示内容、路演材料与演示准备，并接受真实性、知识产权与成果证明复核。',
      sort: 5,
    }) as TimelineItem,
    record(locale, 'schedule-final', 'final', {
      title: '线下决赛与成果展示',
      date: '2026.12.12 - 2026.12.13',
      detail: '组织线下路演答辩、项目展示、奖项评定、颁奖仪式和资源对接活动。',
      featured: true,
      sort: 6,
    }) as TimelineItem,
  ];

  const tracks = [
    record(locale, 'track-seed', 'seed', {
      title: '萌芽赛道',
      subtitle: '早期探索',
      description: '面向尚未完全成型但具备创新潜力和成长空间的项目，重点考察问题洞察、探索过程与初步验证。',
      iconKey: 'sparkles',
      sort: 1,
      cta: { label: '了解材料侧重', href: ROUTES.materials },
      extra: { badge: '成长潜力' },
    }),
    record(locale, 'track-creative', 'creative', {
      title: '创意赛道',
      subtitle: '方案形成',
      description: '面向已形成明确问题意识、应用方向和产品构想的项目，重点关注场景价值、技术路线和方案完整性。',
      iconKey: 'compass',
      sort: 2,
      cta: { label: '了解材料侧重', href: ROUTES.materials },
      extra: { badge: '逻辑完整' },
    }),
    record(locale, 'track-opc', 'opc', {
      title: 'OPC轻创赛道',
      subtitle: '轻量验证',
      description: '面向已产出阶段成果、具备现场演示条件的项目，强调小规模、强主导、快验证和可持续迭代。',
      iconKey: 'code-2',
      sort: 3,
      cta: { label: '了解材料侧重', href: ROUTES.materials },
      extra: { badge: '已有成果' },
    }),
  ];

  const events = page(locale, 'events', {
    seo: siteMeta.events,
    hero: {
      eyebrow: '活动中心',
      title: '围绕报名、评审与项目打磨有序推进',
      description: '从暑期预报名到线下决赛，官网集中呈现关键节点、活动安排和参赛团队需要关注的事项。',
    },
    sections: [
      {
        id: 'event-filters',
        sectionCode: 'filters',
        sectionType: 'filters',
        items: [
          record(locale, 'filter-all', 'all', { title: '全部', sort: 1 }),
          record(locale, 'filter-roadshow', 'roadshow', { title: '路演活动', sort: 2 }),
          record(locale, 'filter-salon', 'salon', { title: '创业沙龙', sort: 3 }),
          record(locale, 'filter-policy', 'policy', { title: '政策宣讲', sort: 4 }),
        ],
      },
      {
        id: 'event-list',
        sectionCode: 'events',
        sectionType: 'events',
        items: [
          record(locale, 'event-submit', 'submit-materials', {
            title: '报名征集与材料提交',
            subtitle: '政策宣讲',
            description: '参赛团队在报名周期内完成组别、赛道、成员信息、项目报告书、路演PPT和过程证明材料提交。',
            sort: 1,
            cta: { label: '进入报名', href: ROUTES.registration },
            extra: { featured: true, date: '2026.07.01 - 09.30', time: '线上持续开放', location: '赛事报名系统' },
          }),
          record(locale, 'event-workshop', 'ai-workshop', {
            title: 'AI应用开发与材料规范辅导',
            subtitle: '创业沙龙',
            description: '围绕项目报告书、演示视频、开发过程证明和AI工具使用说明，帮助团队提升材料可信度。',
            sort: 2,
            cta: { label: '查看材料', href: ROUTES.materials },
            extra: { date: '2026.08 - 10', time: '按通知安排', location: '线上工作坊' },
          }),
          record(locale, 'event-preliminary', 'preliminary-review', {
            title: '线上初赛材料评审',
            subtitle: '政策宣讲',
            description: '专家依据对应赛道100分评分表，审查材料完整性、逻辑清晰度、开发过程证据和赛道适配性。',
            sort: 3,
            cta: { label: '查看评审规则', href: ROUTES.materials },
            extra: { date: '2026.11.08 - 11.15', time: '线上评审', location: '专家评审系统' },
          }),
          record(locale, 'event-final', 'final-roadshow', {
            title: '线下决赛路演与成果展示',
            subtitle: '路演活动',
            description: '入围团队进行6至8分钟路演展示和4至5分钟专家问答，集中呈现问题来源、技术方案、阶段成果和后续计划。',
            sort: 4,
            cta: { label: '了解赛程', href: ROUTES.about },
            extra: { date: '2026.12.12 - 12.13', time: '线下组织', location: '地点以后续通知为准' },
          }),
        ],
      },
    ],
  });

  const materials = page(locale, 'materials', {
    seo: siteMeta.materials,
    hero: {
      eyebrow: '材料下载',
      title: '按组别、赛道和项目阶段准备参赛材料',
      description: '请优先保证材料真实、完整、可核验。涉及第三方技术、数据资源、知识产权或合作资源的项目，应补充授权、权属或关系证明。',
      backgroundImage: introCompetitionBackground,
      dark: true,
    },
    sections: [
      {
        id: 'material-list',
        sectionCode: 'materials',
        sectionType: 'downloads',
        items: [
          record(locale, 'material-notice', 'event-notice', { title: '关于举办全国大学生智能应用开发大赛的通知', description: '大赛名称、组织单位、参赛组别、赛道设置、材料提交、赛程安排、评审与报名费用等核心信息。', format: 'DOCX', audience: '参赛团队', actionLabel: '下载', fileUrl: '/downloads/aiadc-event-notice.docx', sort: 1 }) as DownloadItem,
        ],
      },
    ],
    ctaBanner: {
      title: '材料准备建议',
      description: '先梳理项目真实问题、目标用户、开发过程、阶段成果和团队贡献，再补充演示链接、截图、测试记录、开发日志等证明材料。',
      link: { label: '查看赛程与赛道', href: ROUTES.about },
    },
  });

  const about = page(locale, 'about', {
    seo: siteMeta.about,
    hero: {
      eyebrow: '关于大赛',
      title: '建设公平、规范、可信的智能应用开发赛事',
      description: '大赛由全国大学生智能应用开发大赛组织委员会主办，围绕资格审核、材料审查、专家评审、纪律监督、结果确认和赛事服务建立清晰工作机制。',
    },
    sections: [
      {
        id: 'about-items',
        sectionCode: 'aboutItems',
        sectionType: 'cards',
        items: [
          record(locale, 'about-committee', 'committee', { title: '大赛组委会', description: '负责赛事整体统筹协调、重大事项审议、制度规则制定、资源调配和结果确认。', iconKey: 'landmark', sort: 1 }),
          record(locale, 'about-experts', 'experts', { title: '专家评审委员会', description: '负责评审标准研究、项目评审组织、专业咨询服务和重点项目诊断指导。', iconKey: 'badge-check', sort: 2 }),
          record(locale, 'about-secretariat', 'secretariat', { title: '赛事执行秘书处', description: '负责报名组织、材料审核、信息发布、赛程推进、现场执行、档案管理和日常服务保障。', iconKey: 'users', sort: 3 }),
          record(locale, 'about-supervision', 'supervision', { title: '纪律监督委员会', description: '负责资格审核监督、评审秩序维护、投诉举报受理、违规处理和结果复核监督。', iconKey: 'shield-check', sort: 4 }),
        ],
      },
    ],
  });

  const newsArticles: ArticleItem[] = [
    record(locale, 'news-event-notice', 'event-notice', {
      title: '关于举办全国大学生智能应用开发大赛的通知发布',
      subtitle: '组委会通知',
      category: 'news',
      slug: 'event-notice-2026',
      href: '/news/event-notice-2026',
      excerpt: '赛事面向青年开发实践主体，设置职教组、高校组和青年创新组，开放萌芽赛道、创意赛道与OPC轻创赛道。',
      date: '2026-07-01',
      image: { url: noticeCover, alt: '权威发布' },
      body: [
        '全国大学生智能应用开发大赛围绕智能应用开发、场景化技术实践、实践能力提升和项目持续培育四个核心维度组织实施。',
        '大赛不单纯以创意展示为唯一目标，也不单纯以技术复杂度作为唯一评价依据，重点考察项目真实来源、团队真实参与、过程真实推进和成果真实可信。',
        '参赛团队可结合教育教学、校园服务、智慧生活、文化传播、产业协同、社会治理、公共服务、智能制造、健康服务、数字文创等方向开展项目设计与实践探索。',
      ],
      sort: 1,
    }) as ArticleItem,
    record(locale, 'news-rules', 'review-rules', {
      title: '2026评审规则公布：坚持分组、分道、分阶段评价',
      subtitle: '评审规则',
      category: 'notice',
      slug: 'review-rules-2026',
      href: '/news/review-rules-2026',
      excerpt: '评审坚持技术路线中立原则，围绕真实问题、真实开发、真实贡献、可验证成果和持续迭代能力展开。',
      date: '2026-07-01',
      image: { url: '/assets/aiadc-logo.png', alt: '全国大学生智能应用开发大赛标识' },
      body: [
        '初赛材料评审重点审查项目材料完整性、逻辑清晰度、开发过程证据、成果基础、发展潜力及赛道适配性。',
        '决赛综合评分结合现场路演、专家问答、演示效果和复核情况形成最终分值。',
        '专家评分应坚持独立判断、证据导向和同类比较，对材料中未体现、现场无法说明、问答不能支撑的内容，不得按预期成果或口头承诺直接给高分。',
      ],
      sort: 2,
    }) as ArticleItem,
  ];
  const markdownArticles = getMarkdownNewsArticles(locale);
  const sourceNewsArticles = markdownArticles.length > 0 ? markdownArticles : newsArticles;
  const mergedNewsArticles = sourceNewsArticles.sort((left, right) => left.sort - right.sort || right.date.localeCompare(left.date));
  const extraNewsCategories = Array.from(new Set(mergedNewsArticles.map((article) => article.category)))
    .filter((value) => !['news', 'notice', 'media'].includes(value))
    .map((value, index) => ({
      label: value,
      value,
      description: `${value} 分类文章。`,
      sort: 50 + index,
      status: 'published' as const,
    }));

  return {
    siteShell: {
      brand: {
        primary: '智能应用开发大赛-AIADC',
        secondary: '',
        homeAria: '返回首页',
        applicationName: '全国大学生智能应用开发大赛（AIADC，National College Student AI Application Development Competition）',
      },
      header: {
        languageAria: '语言切换',
        loginLabel: '报名参赛',
        mainNavItems: [...SITE_NAV_ITEMS],
        pageSwitchItems: [
          { label: '活动中心', href: ROUTES.events, description: '报名征集、评审组织、项目打磨与决赛展示。' },
          { label: '材料下载', href: ROUTES.materials, description: '下载通知、方案、规则和报名材料。' },
          { label: '新闻动态', href: ROUTES.news, description: '组委会通知、评审动态与媒体信息。' },
          { label: '关于大赛', href: ROUTES.about, description: '组织机制、办赛原则和监督机制。' },
          { label: '商务合作', href: ROUTES.cooperation, description: '赛事共建、技术支持与场景合作。' },
          { label: '联系方式', href: ROUTES.contact, description: '官网、邮箱与赛事咨询群。' },
        ],
        eventPageItems: [
          { label: '活动中心', href: ROUTES.events, description: '关键赛程和组织活动。' },
          { label: '报名入口', href: ROUTES.registration, description: '进入报名与材料提交系统。' },
          { label: '项目培育', href: ROUTES.events, description: '赛前辅导、工作坊和资源对接。' },
        ],
      },
      footer: {
        description: '面向青年开发实践主体，聚焦智能应用开发、真实场景验证与项目持续培育，建设公平、规范、可信的赛事服务平台。',
        columns: [
          {
            title: '为什么选择 AIADC',
            links: [
              { label: '真实赛题', href: ROUTES.about },
              { label: '全球开发者生态', href: ROUTES.about },
              { label: '产业资源连接', href: ROUTES.events },
              { label: '模型与算力支持', href: ROUTES.events },
              { label: '安全合规', href: ROUTES.materials },
              { label: '成果孵化', href: ROUTES.events },
            ],
          },
          {
            title: '大模型',
            links: [
              { label: '通用大模型', href: ROUTES.events },
              { label: '多模态能力', href: ROUTES.events },
              { label: '智能体服务', href: ROUTES.events },
              { label: '行业知识增强', href: ROUTES.materials },
            ],
          },
          {
            title: '产品和服务',
            links: [
              { label: '全部服务', href: ROUTES.events, variant: 'primary' },
              { label: '参赛服务', href: ROUTES.registration },
              { label: '模型广场', href: ROUTES.events },
              { label: '算力资源', href: ROUTES.events },
              { label: '项目工作台', href: ROUTES.events },
              { label: '成本与权益', href: ROUTES.materials },
            ],
          },
          {
            title: '技术内容',
            links: [
              { label: '技术解决方案', href: ROUTES.about },
              { label: '帮助文档', href: ROUTES.docsParticipation },
              { label: '开发者社区', href: ROUTES.events },
              { label: '训练营课程', href: ROUTES.events },
              { label: '参赛指南', href: ROUTES.docsParticipation },
            ],
          },
          {
            title: '权益',
            links: [
              { label: '免费试用', href: ROUTES.registration },
              { label: '高校计划', href: ROUTES.about },
              { label: '算力补贴', href: ROUTES.events },
              { label: '优秀项目孵化', href: ROUTES.events },
              { label: '推荐返现计划', href: ROUTES.events },
            ],
          },
          {
            title: '服务',
            links: [
              { label: '基础服务', href: ROUTES.events },
              { label: '企业命题服务', href: ROUTES.events },
              { label: '赛事公告', href: ROUTES.news },
              { label: '健康看板', href: ROUTES.about },
              { label: '信任中心', href: ROUTES.materials },
              { label: '联系我们', href: ROUTES.contact },
            ],
          },
        ],
        contactPanel: {
          title: '关注 AIADC',
          description: '关注官方公众号或赛事服务群，关注赛事资讯，随时获取报名通知、训练营资料与技术支持。',
          qrCodes: [
            { label: '微信公众号', href: ROUTES.contact, imageUrl: '/assets/qr/wechat-official-account.jpg' },
            { label: 'QQ群', href: ROUTES.contact, imageUrl: '/assets/qr/qq-group.jpg' },
            { label: '微信群', href: ROUTES.contact, imageUrl: '/assets/qr/wechat-group.jpg' },
          ],
        },
        legalLinks: [],
        topicLinks: [],
        filings: [
          { label: '苏ICP备2025160017号-2', href: 'https://beian.miit.gov.cn/' },
          { label: '苏公网安备32010502011484号', href: 'https://beian.mps.gov.cn/#/query/webSearch?code=32010502011484', variant: 'primary' },
        ],
        copyright: '版权归全国大学生智能应用开发大赛组委会所有',
        complianceLine: '',
      },
    },
    siteMeta,
    pages: {
      home,
      events,
      materials,
      about,
      news: page(locale, 'news', {
        seo: siteMeta.news,
        hero: {
          eyebrow: '新闻动态',
          title: '赛事通知、规则发布与重要动态',
          description: '集中发布组委会通知、评审规则、报名提醒和项目培育信息。',
          backgroundImage: introCompetitionBackground,
          dark: true,
        },
        sections: [],
      }),
    },
    news: {
      categories: [
        { label: '新闻动态', value: 'news', description: '赛事进展与重要发布。', sort: 1, status: 'published' },
        { label: '通知公告', value: 'notice', description: '规则、材料、奖项与报名提醒。', sort: 2, status: 'published' },
        { label: '媒体报道', value: 'media', description: '媒体关注与项目展示。', sort: 3, status: 'published' },
        ...extraNewsCategories,
      ],
      articles: mergedNewsArticles,
    },
  };
}

export function getDefaultContentBundle(locale?: string): CmsContentBundle {
  return structuredClone(buildZhBundle(locale === 'en' ? 'en' : defaultLocale));
}
