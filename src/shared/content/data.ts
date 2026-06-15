import { ROUTES } from '@/shared/config/routes';
import type { CmsContentBundle, CmsPageContent, PageKey } from '@/shared/content/types';
import type { Locale } from '@/shared/i18n/config';

function createPage(pageKey: PageKey, locale: Locale, page: Omit<CmsPageContent, 'pageKey' | 'locale'>): CmsPageContent {
  return {
    pageKey,
    locale,
    ...page,
  };
}

export const cmsContent: Record<Locale, CmsContentBundle> = {
  zh: {
    siteShell: {
      brand: {
        primary: '全国大学生',
        secondary: '智能应用开发大赛',
        homeAria: '首页',
        applicationName: '全国大学生智能应用开发大赛',
      },
      header: {
        languageAria: '切换语言',
        loginLabel: '登录',
        eventPageItems: [],
        mainNavItems: [
          { label: '首页', href: ROUTES.home },
          { label: '新闻中心', href: ROUTES.news },
          { label: '赛事', href: ROUTES.intro },
          { label: '活动', href: ROUTES.events },
          { label: '优秀项目', href: ROUTES.projects },
          { label: '创业基地', href: ROUTES.startupBase },
          { label: '材料下载', href: ROUTES.materials },
          { label: '关于我们', href: ROUTES.about },
        ],
        pageSwitchItems: [
          { label: '首页', description: '赛事概览与关键信息', href: ROUTES.home },
          { label: '新闻中心', description: '资讯分类与文章浏览', href: ROUTES.news },
          { label: '赛事', description: '赛事定位与整体介绍', href: ROUTES.intro },
          { label: '活动', description: '活动预告与线下线上安排', href: ROUTES.events },
          { label: '优秀项目', description: '重点展示与项目成果浏览', href: ROUTES.projects },
          { label: '创业基地', description: '项目成长与孵化支持', href: ROUTES.startupBase },
          { label: '材料下载', description: '文件模板与资料说明', href: ROUTES.materials },
          { label: '关于我们', description: '赛事定位与组织方式', href: ROUTES.about },
        ],
      },
      footer: {
        description: '面向高校与青年创新团队的智能应用竞赛门户，集中提供赛道信息、报名入口、材料下载与赛事资讯。',
        columns: [
          {
            title: '赛事导航',
            links: [
              { label: '首页', href: ROUTES.home },
              { label: '大赛简介', href: ROUTES.intro },
              { label: '活动中心', href: ROUTES.events },
              { label: '优秀项目', href: ROUTES.projects },
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
              { label: '关于我们', href: ROUTES.about },
            ],
          },
        ],
        legalLinks: [
          { label: '隐私政策', href: ROUTES.privacy },
          { label: '服务条款', href: ROUTES.terms },
        ],
        filings: [
          { label: 'ICP备案号待填写', href: 'https://beian.miit.gov.cn/' },
          { label: '公安备案号待填写', href: 'https://www.beian.gov.cn/portal/registerSystemInfo' },
        ],
        copyright: '© 2024 全国大学生智能应用开发大赛. 保留所有权利。',
      },
    },
    siteMeta: {
      home: { title: '全国大学生智能应用开发大赛官网', description: '全国大学生智能应用开发大赛面向高校与青年创新团队，覆盖赛事信息、活动、项目、材料下载与新闻资讯。' },
      intro: { title: '大赛简介', description: '全国大学生智能应用开发大赛简介。' },
      events: { title: '活动中心', description: '查看全国大学生智能应用开发大赛相关活动、路演、沙龙与宣讲安排。' },
      projects: { title: '优秀项目', description: '浏览全国大学生智能应用开发大赛中的优秀项目与重点展示作品。' },
      'startup-base': { title: '创业基地', description: '查看赛事关联的创业基地支持与项目孵化方向。' },
      materials: { title: '材料下载', description: '全国大学生智能应用开发大赛材料下载、报名模板、作品说明书模板与评审标准。' },
      policies: { title: '政策支持', description: '查看赛事相关政策背景与支持说明。' },
      about: { title: '关于我们', description: '查看全国大学生智能应用开发大赛的定位、组织方式与生态连接。' },
      privacy: { title: '隐私政策', description: '全国大学生智能应用开发大赛隐私政策说明。' },
      terms: { title: '服务条款', description: '全国大学生智能应用开发大赛服务条款说明。' },
      login: { title: '登录入口', description: '全国大学生智能应用开发大赛登录入口。' },
      news: { title: '新闻中心', description: '通过顶部分类切换查看全国大学生智能应用开发大赛新闻动态、通知公告与媒体报道。' },
    },
    pages: {} as Record<PageKey, CmsPageContent>,
    news: {
      categories: [
        { label: '新闻动态', value: 'news', description: '关注赛事进展、赛道发布与评审节奏，快速掌握关键动态。' },
        { label: '通知公告', value: 'notice', description: '集中查看报名要求、材料规范、时间节点与规则更新。' },
        { label: '媒体报道', value: 'media', description: '汇总产业伙伴、媒体观察与赛事生态合作相关内容。' },
      ],
      articles: [
        {
          id: 'news-1',
          code: 'registration-open-2024',
          locale: 'zh',
          title: '2024 赛季报名通道正式开启，参赛团队可在线提交项目资料',
          description: '本届赛事面向职业院校、普通高校与青年创新团队开放报名，支持跨校组队与多赛道作品提交。',
          excerpt: '本届赛事面向职业院校、普通高校与青年创新团队开放报名，支持跨校组队与多赛道作品提交。',
          image: {
            url: 'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=1200&q=82',
            alt: '报名启动现场',
          },
          category: 'news',
          slug: 'registration-open-2024',
          href: '/news/registration-open-2024',
          date: '2024.06.10',
          body: [
            '2024 赛季全国大学生智能应用开发大赛报名通道正式开启。参赛团队可通过线上系统完成队伍信息填写、赛道选择与项目资料提交。',
            '本届赛事面向职业院校、普通高校与青年创新团队开放，鼓励跨校、跨专业组队，围绕人工智能应用开发、产业命题验证与产品化路演展开比拼。',
            '组委会建议参赛团队提前确认成员资格、指导老师信息与作品方向，并在报名截止前完成材料核验，避免因资料缺失影响后续评审。',
          ],
          sort: 10,
          status: 'published',
        },
        {
          id: 'news-2',
          code: 'opc-track-release',
          locale: 'zh',
          title: 'OPC 轻创赛道公布命题方向，强调敏捷开发与应用落地',
          description: '赛道将围绕真实业务场景设置开发任务，重点考察团队在短周期内完成产品验证的工程能力。',
          excerpt: '赛道将围绕真实业务场景设置开发任务，重点考察团队在短周期内完成产品验证的工程能力。',
          image: {
            url: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=1200&q=82',
            alt: '开发者协作讨论',
          },
          category: 'news',
          slug: 'opc-track-release',
          href: '/news/opc-track-release',
          date: '2024.06.18',
          body: [
            'OPC 轻创赛道将围绕真实业务场景设置开发任务，强调快速理解命题、组织功能优先级并完成可演示原型。',
            '参赛团队需要在有限周期内提交产品方案、运行演示与关键技术说明，评审将重点关注工程实现能力、交互体验和场景适配度。',
            '赛道鼓励使用成熟开发框架、低代码平台与 AI 工具链完成应用构建，但作品应体现团队对业务问题和用户价值的独立判断。',
          ],
          sort: 20,
          status: 'published',
        },
        {
          id: 'news-3',
          code: 'review-committee-preparation',
          locale: 'zh',
          title: '专家评审委员会启动初评准备工作，评审标准将同步发布',
          description: '初评阶段将综合考察创新价值、技术可行性、用户体验、商业潜力与答辩表达等维度。',
          excerpt: '初评阶段将综合考察创新价值、技术可行性、用户体验、商业潜力与答辩表达等维度。',
          image: {
            url: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=82',
            alt: '评审会议',
          },
          category: 'news',
          slug: 'review-committee-preparation',
          href: '/news/review-committee-preparation',
          date: '2024.07.02',
          body: [
            '专家评审委员会已启动初评准备工作，后续将围绕各赛道特点发布更细化的评审说明。',
            '初评阶段将综合考察作品的创新价值、技术可行性、用户体验、商业潜力与答辩表达，确保不同类型作品在统一规则下获得公平评价。',
            '组委会将持续完善评审流程与材料要求，参赛团队可关注官网新闻中心和材料下载页面，及时获取最新通知。',
          ],
          sort: 30,
          status: 'published',
        },
        {
          id: 'notice-1',
          code: 'submission-material-format',
          locale: 'zh',
          title: '关于作品提交材料格式的说明',
          description: '参赛团队需按模板提交项目说明书、演示视频与可访问原型链接。',
          excerpt: '参赛团队需按模板提交项目说明书、演示视频与可访问原型链接。',
          image: {
            url: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1200&q=82',
            alt: '文件模板说明',
          },
          category: 'notice',
          slug: 'submission-material-format',
          href: '/news/submission-material-format',
          date: '2024.06.22',
          body: [
            '为提升材料审核效率，参赛团队需按统一模板提交项目说明书、演示视频与可访问原型链接。',
            '项目说明书应包含项目背景、目标用户、核心功能、技术方案、创新价值与后续计划。演示视频应清晰展示主要功能流程，避免只提交概念说明。',
            '如作品涉及外部数据、第三方模型或开源组件，请在材料中注明来源与使用范围，便于评审委员会核验。',
          ],
          sort: 40,
          status: 'published',
        },
        {
          id: 'media-1',
          code: 'industry-partners-focus',
          locale: 'zh',
          title: '多家产业伙伴关注青年智能应用创新项目',
          description: '赛事将持续链接产业场景，为优秀团队提供后续资源支持。',
          excerpt: '赛事将持续链接产业场景，为优秀团队提供后续资源支持。',
          image: {
            url: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=82',
            alt: '产业伙伴交流',
          },
          category: 'media',
          slug: 'industry-partners-focus',
          href: '/news/industry-partners-focus',
          date: '2024.06.26',
          body: [
            '多家产业伙伴持续关注青年智能应用创新项目，希望通过赛事发现具备落地潜力的团队与作品。',
            '赛事将围绕真实场景、云资源、导师辅导与生态对接提供支持，帮助优秀项目在比赛结束后继续获得验证和成长机会。',
            '组委会也将结合项目成熟度与合作意向，为入围团队组织后续展示、交流与资源对接活动。',
          ],
          sort: 50,
          status: 'published',
        },
      ],
    },
  },
  en: {
    siteShell: {
      brand: {
        primary: 'National College',
        secondary: 'AI App Development Competition',
        homeAria: 'Home',
        applicationName: 'National College AI App Development Competition',
      },
      header: {
        languageAria: 'Switch language',
        loginLabel: 'Log in',
        eventPageItems: [],
        mainNavItems: [
          { label: 'Home', href: ROUTES.home },
          { label: 'News', href: ROUTES.news },
          { label: 'Competition', href: ROUTES.intro },
          { label: 'Events', href: ROUTES.events },
          { label: 'Projects', href: ROUTES.projects },
          { label: 'Startup Base', href: ROUTES.startupBase },
          { label: 'Materials', href: ROUTES.materials },
          { label: 'About', href: ROUTES.about },
        ],
        pageSwitchItems: [
          { label: 'Home', description: 'Event highlights and key metrics', href: ROUTES.home },
          { label: 'News', description: 'Article categories and updates', href: ROUTES.news },
          { label: 'Competition', description: 'Overview and event context', href: ROUTES.intro },
          { label: 'Events', description: 'Activity calendar and event highlights', href: ROUTES.events },
          { label: 'Projects', description: 'Featured teams and applied outcomes', href: ROUTES.projects },
          { label: 'Startup Base', description: 'Incubation and growth support', href: ROUTES.startupBase },
          { label: 'Materials', description: 'Templates and supporting files', href: ROUTES.materials },
          { label: 'About', description: 'Positioning and organization', href: ROUTES.about },
        ],
      },
      footer: {
        description: 'A competition portal for universities and young innovators, bringing together track information, registration, materials, and event updates.',
        columns: [
          {
            title: 'Navigate',
            links: [
              { label: 'Home', href: ROUTES.home },
              { label: 'Overview', href: ROUTES.intro },
              { label: 'Events', href: ROUTES.events },
              { label: 'Projects', href: ROUTES.projects },
            ],
          },
          {
            title: 'Participation',
            links: [
              { label: 'Startup Base', href: ROUTES.startupBase },
              { label: 'Materials', href: ROUTES.materials },
              { label: 'Login', href: ROUTES.login },
            ],
          },
          {
            title: 'Updates',
            links: [
              { label: 'News Center', href: ROUTES.news },
              { label: 'Event Updates', href: ROUTES.news },
              { label: 'About', href: ROUTES.about },
            ],
          },
        ],
        legalLinks: [
          { label: 'Privacy', href: ROUTES.privacy },
          { label: 'Terms', href: ROUTES.terms },
        ],
        filings: [
          { label: 'ICP filing number pending', href: 'https://beian.miit.gov.cn/' },
          { label: 'Public security filing number pending', href: 'https://www.beian.gov.cn/portal/registerSystemInfo' },
        ],
        copyright: '© 2024 National College AI App Development Competition. All rights reserved.',
      },
    },
    siteMeta: {
      home: { title: 'Competition Portal', description: 'National college AI app development competition portal.' },
      intro: { title: 'Competition Overview', description: 'Overview of the national college AI app development competition.' },
      events: { title: 'Events', description: 'Browse roadshows, salons, policy sessions, and event schedules.' },
      projects: { title: 'Projects', description: 'Browse featured projects and showcased competition outcomes.' },
      'startup-base': { title: 'Startup Base', description: 'Explore incubation support and project growth opportunities.' },
      materials: { title: 'Materials', description: 'Download competition plans, templates, and evaluation standards.' },
      policies: { title: 'Policy Support', description: 'Policy background and support information related to the competition.' },
      about: { title: 'About', description: 'Competition positioning, organization, and ecosystem links.' },
      privacy: { title: 'Privacy', description: 'Privacy policy information.' },
      terms: { title: 'Terms', description: 'Terms of service information.' },
      login: { title: 'Login', description: 'Competition login entry.' },
      news: { title: 'News Center', description: 'Browse competition news, notices, and media coverage by category.' },
    },
    pages: {} as Record<PageKey, CmsPageContent>,
    news: {
      categories: [
        { label: 'News', value: 'news', description: 'Competition milestones, track releases, and review updates.' },
        { label: 'Notices', value: 'notice', description: 'Registration requirements, submission rules, and deadlines.' },
        { label: 'Media', value: 'media', description: 'Media observations and ecosystem partnership coverage.' },
      ],
      articles: [],
    },
  },
};

cmsContent.zh.pages = {
  home: createPage('home', 'zh', {
    hero: {
      eyebrow: '首页',
      title: '全国大学生智能应用开发大赛',
      description: '面向全国高校在校学生，聚焦人工智能与行业应用的深度融合，打造创新引领、协同育人、开放共赢的高水平赛事平台。',
    },
    sections: [
      {
        id: 'home-hero-slides',
        sectionCode: 'heroSlides',
        sectionType: 'carousel',
        items: [
          {
            id: 'home-slide-1',
            code: 'hero-slide-1',
            locale: 'zh',
            title: '全国大学生',
            subtitle: '智能应用开发大赛',
            description: '面向全国高校在校学生，聚焦人工智能与行业应用的深度融合，打造创新引领、协同育人、开放共赢的高水平赛事平台。',
            imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=2400&q=88',
            sort: 10,
            status: 'published',
            tags: ['AI 赋能', '应用创新', '智领未来'],
            extra: { alt: '参赛团队在科技竞赛中展示智能应用项目', accent: '应用', deadline: '2024-07-15 24:00' },
            cta: { label: '立即报名', href: ROUTES.login, variant: 'primary' },
            badge: { text: '了解赛事', tone: 'blue' },
          },
          {
            id: 'home-slide-2',
            code: 'hero-slide-2',
            locale: 'zh',
            title: '链接真实场景',
            subtitle: '验证智能应用价值',
            description: '围绕真实产业需求组织作品开发、评审与路演，让创新想法在可验证、可演示、可落地的路径中成长。',
            imageUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=2400&q=88',
            sort: 20,
            status: 'published',
            tags: ['产业命题', '项目路演', '生态支持'],
            extra: { alt: '青年团队围绕智能应用项目协作开发', accent: '智能', deadline: '2024-09-28 总决赛' },
            cta: { label: '立即报名', href: ROUTES.login, variant: 'primary' },
            badge: { text: '了解赛事', tone: 'blue' },
          },
          {
            id: 'home-slide-3',
            code: 'hero-slide-3',
            locale: 'zh',
            title: '三大赛道开放',
            subtitle: '共创 AI 应用未来',
            description: '覆盖萌芽、创意与 OPC 轻创赛道，支持不同阶段团队提交概念方案、交互原型与敏捷开发成果。',
            imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=2400&q=88',
            sort: 30,
            status: 'published',
            tags: ['多元赛道', '专家评审', '青年创新'],
            extra: { alt: '创新团队在会议中讨论项目方案', accent: 'AI', deadline: '06.10 - 07.15 报名' },
            cta: { label: '立即报名', href: ROUTES.login, variant: 'primary' },
            badge: { text: '了解赛事', tone: 'blue' },
          },
        ],
      },
      {
        id: 'home-stats',
        sectionCode: 'stats',
        sectionType: 'stats',
        items: [
          { id: 'home-stat-1', code: 'schools', locale: 'zh', title: '高校参与', value: '1200+', label: '高校参与', iconKey: 'graduation-cap', sort: 10, status: 'published' },
          { id: 'home-stat-2', code: 'teams', locale: 'zh', title: '参赛团队', value: '18000+', label: '参赛团队', iconKey: 'users', sort: 20, status: 'published' },
          { id: 'home-stat-3', code: 'students', locale: 'zh', title: '参赛学生', value: '35000+', label: '参赛学生', iconKey: 'code-2', sort: 30, status: 'published' },
          { id: 'home-stat-4', code: 'works', locale: 'zh', title: '优秀作品', value: '200+', label: '优秀作品', iconKey: 'badge-check', sort: 40, status: 'published' },
        ],
      },
      {
        id: 'home-groups',
        sectionCode: 'groups',
        sectionType: 'cards',
        title: '覆盖多元青年创新团队',
        description: '以团队形式参赛，每队 1-5 人，可跨校组队，按照组别选择对应赛道。',
        items: [
          { id: 'group-1', code: 'vocational', locale: 'zh', title: '职教组', description: '面向全国中等和高等职业院校在籍学生。侧重于智能技术在具体职业场景和生产实践中的落地应用。', iconKey: 'graduation-cap', sort: 10, status: 'published', cta: { label: '了解报名条件', href: ROUTES.login } },
          { id: 'group-2', code: 'university', locale: 'zh', title: '高校组', description: '面向全国普通本科院校在籍学生。关注前沿算法创新、复杂系统架构设计以及跨学科融合。', iconKey: 'users', sort: 20, status: 'published', cta: { label: '了解报名条件', href: ROUTES.login } },
          { id: 'group-3', code: 'youth-innovation', locale: 'zh', title: '青年创新组', description: '面向毕业 5 年内的青年创客、初创团队，关注商业价值与市场转化可行性。', iconKey: 'code-2', sort: 30, status: 'published', cta: { label: '了解报名条件', href: ROUTES.login } },
        ],
      },
      {
        id: 'home-highlights',
        sectionCode: 'highlights',
        sectionType: 'cards',
        title: '让智能应用，从想法走向验证',
        description: '赛事围绕组别、赛道、时间线与作品评审构建一体化体验。',
        items: [
          { id: 'highlight-1', code: 'platform', locale: 'zh', title: '权威平台', description: '专家评审、院校联动与产业伙伴共同组成赛事生态。', iconKey: 'badge-check', sort: 10, status: 'published' },
          { id: 'highlight-2', code: 'industry', locale: 'zh', title: '产教融合', description: '围绕真实产业命题组织开发、评审与路演。', iconKey: 'building-2', sort: 20, status: 'published' },
          { id: 'highlight-3', code: 'scenarios', locale: 'zh', title: '真实场景', description: '作品从业务问题出发，强调可验证、可演示、可落地。', iconKey: 'code-2', sort: 30, status: 'published' },
          { id: 'highlight-4', code: 'growth', locale: 'zh', title: '成长赋能', description: '优秀团队可获得云资源、导师辅导与生态对接。', iconKey: 'rocket', sort: 40, status: 'published' },
        ],
      },
      {
        id: 'home-partners',
        sectionCode: 'partners',
        sectionType: 'logos',
        items: [
          { id: 'partner-1', code: 'tsinghua', locale: 'zh', title: '清华大学 AI 研究院', sort: 10, status: 'published' },
          { id: 'partner-2', code: 'pku', locale: 'zh', title: '北京大学软件工程中心', sort: 20, status: 'published' },
          { id: 'partner-3', code: 'caai', locale: 'zh', title: '中国人工智能学会', sort: 30, status: 'published' },
          { id: 'partner-4', code: 'huaweicloud', locale: 'zh', title: '华为云', sort: 40, status: 'published' },
          { id: 'partner-5', code: 'aliyun', locale: 'zh', title: '阿里云', sort: 50, status: 'published' },
          { id: 'partner-6', code: 'tencent-cloud', locale: 'zh', title: '腾讯云', sort: 60, status: 'published' },
          { id: 'partner-7', code: 'baidu-cloud', locale: 'zh', title: '百度智能云', sort: 70, status: 'published' },
          { id: 'partner-8', code: 'iflytek', locale: 'zh', title: '科大讯飞', sort: 80, status: 'published' },
          { id: 'partner-9', code: 'sensetime', locale: 'zh', title: '商汤科技', sort: 90, status: 'published' },
          { id: 'partner-10', code: 'megvii', locale: 'zh', title: '旷视科技', sort: 100, status: 'published' },
          { id: 'partner-11', code: 'zhipu', locale: 'zh', title: '智谱 AI', sort: 110, status: 'published' },
          { id: 'partner-12', code: 'volcengine', locale: 'zh', title: '火山引擎', sort: 120, status: 'published' },
        ],
      },
      {
        id: 'home-faq',
        sectionCode: 'faq',
        sectionType: 'faq',
        items: [
          { id: 'faq-1', code: 'cross-school', locale: 'zh', title: '可以跨校、跨专业组队吗？', description: '可以。团队需确认所有成员符合对应组别资格，并由负责人统一提交报名材料。', sort: 10, status: 'published' },
          { id: 'faq-2', code: 'multi-track', locale: 'zh', title: '同一团队可以报名多个赛道吗？', description: '同一作品建议选择一个最匹配的赛道；不同作品可按规则分别报名。', sort: 20, status: 'published' },
          { id: 'faq-3', code: 'online-required', locale: 'zh', title: '作品是否必须已经上线？', description: '不强制上线，但需要提供可验证的演示材料，创意赛道与 OPC 轻创赛道需重点展示可运行原型。', sort: 30, status: 'published' },
          { id: 'faq-4', code: 'update-materials', locale: 'zh', title: '报名后还能修改材料吗？', description: '报名截止前可按系统要求补充或更新材料，截止后原则上不再接受替换。', sort: 40, status: 'published' },
        ],
      },
    ],
    ctaBanner: {
      kicker: '报名参赛',
      title: '立即开启你的智能应用开发之旅',
      description: '加入顶尖的技术生态圈，与优秀的同侪一起，将疯狂的创意转化为改变现实的产品。',
      action: { label: '进入报名系统', href: ROUTES.login, variant: 'primary' },
    },
    seo: cmsContent.zh.siteMeta.home,
  }),
  intro: createPage('intro', 'zh', {
    hero: {
      eyebrow: '大赛简介',
      title: '构建高水平智能应用创新竞赛生态',
      description: '全国大学生智能应用开发大赛致力于吸引更多高校学生与青年团队参与人工智能应用开发、产业命题验证与项目路演。',
      backgroundImage: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1600&q=82',
      dark: true,
    },
    sections: [
      { id: 'intro-values', sectionCode: 'valueCards', sectionType: 'cards', items: [
        { id: 'intro-value-1', code: 'innovation-ecosystem', locale: 'zh', title: '创新竞赛生态', description: '围绕智能应用开发全流程，连接高校、产业与青年创新团队。', sort: 10, status: 'published' },
        { id: 'intro-value-2', code: 'scenario-validation', locale: 'zh', title: '产业命题验证', description: '帮助项目从创意萌芽走向真实场景验证。', sort: 20, status: 'published' },
        { id: 'intro-value-3', code: 'roadshow-growth', locale: 'zh', title: '项目路演成长', description: '将项目展示、答辩与资源对接纳入同一成长路径。', sort: 30, status: 'published' },
      ]},
      { id: 'intro-schedule', sectionCode: 'schedule', sectionType: 'timeline', items: [
        { id: 'schedule-1', code: 'register', locale: 'zh', title: '报名与组队', date: '06.10 - 07.15', detail: '线上系统开放', sort: 10, status: 'published', featured: true },
        { id: 'schedule-2', code: 'submit', locale: 'zh', title: '初赛作品提交', date: '07.20 - 08.10', detail: '材料审核与初评', sort: 20, status: 'published' },
        { id: 'schedule-3', code: 'semi-list', locale: 'zh', title: '复赛名单公布', date: '08.15', detail: '专家评审团盲审', sort: 30, status: 'published' },
        { id: 'schedule-4', code: 'semi-final', locale: 'zh', title: '全国半决赛', date: '09.01 - 09.05', detail: '线上路演与答辩', sort: 40, status: 'published' },
        { id: 'schedule-5', code: 'final', locale: 'zh', title: '总决赛暨颁奖典礼', date: '09.28', detail: '线下巅峰对决', sort: 50, status: 'published' },
      ]},
      { id: 'intro-awards', sectionCode: 'awards', sectionType: 'cards', items: [
        { id: 'award-1', code: 'gold', locale: 'zh', title: '金奖', subtitle: '每个赛道各 1 名', description: '颁发证书及奖杯\n直通头部企业终面', iconKey: 'sparkles', sort: 10, status: 'published', extra: { prize: '¥ 50,000', tone: 'gold', glyph: '🏆' } },
        { id: 'award-2', code: 'silver', locale: 'zh', title: '银奖', subtitle: '每个赛道各 2 名', description: '颁发证书及奖杯\n知名创投机构对接', iconKey: 'sparkles', sort: 20, status: 'published', extra: { prize: '¥ 20,000', tone: 'silver', glyph: '🥈' } },
        { id: 'award-3', code: 'bronze', locale: 'zh', title: '铜奖', subtitle: '每个赛道各 3 名', description: '颁发证书及奖杯\n免费云资源支持', iconKey: 'sparkles', sort: 30, status: 'published', extra: { prize: '¥ 10,000', tone: 'bronze', glyph: '🥉' } },
        { id: 'award-4', code: 'excellent', locale: 'zh', title: '优秀奖', subtitle: '若干名', description: '颁发荣誉证书\n大赛限量周边', iconKey: 'sparkles', sort: 40, status: 'published', extra: { prize: '精美礼包', tone: 'slate', glyph: '★' } },
      ]},
      { id: 'intro-tracks', sectionCode: 'tracks', sectionType: 'cards', items: [
        { id: 'track-1', code: 'track-a', locale: 'zh', title: '萌芽赛道', subtitle: 'Track A', description: '聚焦从 0 到 1 的想法孵化。', iconKey: 'sparkles', sort: 10, status: 'published', cta: { label: '查看评审标准', href: ROUTES.login }, extra: { badge: 'Track A' } },
        { id: 'track-2', code: 'track-b', locale: 'zh', title: '创意赛道', subtitle: 'Track B', description: '强调从概念到原型的转化。', iconKey: 'code-2', sort: 20, status: 'published', cta: { label: '查看评审标准', href: ROUTES.login }, extra: { badge: 'Track B' } },
        { id: 'track-3', code: 'track-c', locale: 'zh', title: 'OPC 轻创赛道', subtitle: 'Featured', description: '基于提供框架或低代码平台完成特定命题的应用开发。', iconKey: 'rocket', sort: 30, status: 'published', cta: { label: '查看评审标准', href: ROUTES.login }, extra: { badge: 'Featured' } },
      ]},
      { id: 'intro-contacts', sectionCode: 'contacts', sectionType: 'cards', items: [
        { id: 'contact-1', code: 'mail', locale: 'zh', title: '咨询邮箱', description: 'contact@ai-competition.org', iconKey: 'mail', sort: 10, status: 'published' },
        { id: 'contact-2', code: 'organizer', locale: 'zh', title: '组织单位', description: '全国大学生智能应用开发大赛组委会', iconKey: 'building-2', sort: 20, status: 'published' },
        { id: 'contact-3', code: 'scope', locale: 'zh', title: '服务范围', description: '线上报名、作品评审、总决赛组织', iconKey: 'map-pin', sort: 30, status: 'published' },
      ]},
    ],
    seo: cmsContent.zh.siteMeta.intro,
  }),
  events: createPage('events', 'zh', {
    hero: {
      eyebrow: '活动中心',
      title: '日常活动与线下交流安排',
      description: '集中展示大赛相关路演活动、创业沙龙、政策宣讲与行业交流内容，方便参赛团队统一查看近期安排。',
      backgroundImage: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=82',
      dark: true,
    },
    sections: [
      { id: 'events-filters', sectionCode: 'filters', sectionType: 'tabs', items: [
        { id: 'event-filter-1', code: 'all', locale: 'zh', title: '全部活动', sort: 10, status: 'published' },
        { id: 'event-filter-2', code: 'roadshow', locale: 'zh', title: '路演活动', sort: 20, status: 'published' },
        { id: 'event-filter-3', code: 'salon', locale: 'zh', title: '创业沙龙', sort: 30, status: 'published' },
        { id: 'event-filter-4', code: 'policy', locale: 'zh', title: '政策宣讲', sort: 40, status: 'published' },
        { id: 'event-filter-5', code: 'summit', locale: 'zh', title: '行业峰会', sort: 50, status: 'published' },
      ]},
      { id: 'events-list', sectionCode: 'events', sectionType: 'cards', items: [
        { id: 'event-1', code: 'medical-roadshow', locale: 'zh', title: '归心谷 PITCH AI+医疗科技路演日', subtitle: '路演活动', description: '聚焦 AI 医疗科技项目展示与投资人交流，围绕临床场景、数据智能与商业化路径展开深度路演。', imageUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=82', sort: 10, status: 'published', extra: { time: '13:30 - 17:00', date: '2026/05/21', location: '线上 + 路演会场', featured: true }, cta: { label: '查看详情', href: ROUTES.login } },
        { id: 'event-2', code: 'demo-day', locale: 'zh', title: '2026 第四期归心 DEMO DAY 项目路演日', subtitle: '路演活动', description: '汇聚高成长项目与生态伙伴，通过现场展示、圆桌互动与资源对接提升项目曝光和合作效率。', imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=82', sort: 20, status: 'published', extra: { time: '14:00 - 17:00', date: '2026/05/20', location: '主会场', featured: false }, cta: { label: '查看详情', href: ROUTES.login } },
        { id: 'event-3', code: 'energy-roadshow', locale: 'zh', title: 'AI+能源科技项目路演日', subtitle: '路演活动', description: '聚焦智慧电网、绿色储能、碳管理平台等方向，连接行业专家、资本机构与技术创业团队。', imageUrl: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=82', sort: 30, status: 'published', extra: { time: '14:00 - 17:00', date: '2026/04/29', location: '创新中心', featured: false }, cta: { label: '查看详情', href: ROUTES.login } },
        { id: 'event-4', code: 'cross-border', locale: 'zh', title: '企业出海跨境投资操作及金融服务宣讲会', subtitle: '政策宣讲', description: '围绕企业出海投融资、东南亚投资合规与金融赋能方案展开政策解读与实操分享。', imageUrl: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=82', sort: 40, status: 'published', extra: { time: '14:00 - 15:00', date: '2026/04/23', location: '政策服务厅', featured: false }, cta: { label: '查看详情', href: ROUTES.login } },
        { id: 'event-5', code: 'art-salon', locale: 'zh', title: 'AI 时代书法 × 数字艺术跨界交流会', subtitle: '创业沙龙', description: '邀请书法艺术界与人工智能领域嘉宾，围绕数字艺术、传统文化与 AI 创作进行跨界对话。', imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=82', sort: 50, status: 'published', extra: { time: '14:00 - 17:00', date: '2026/04/18', location: '创意交流空间', featured: false }, cta: { label: '查看详情', href: ROUTES.login } },
        { id: 'event-6', code: 'lp-summit', locale: 'zh', title: '破局而立·2026 LP 开年大会', subtitle: '行业峰会', description: '围绕股权投资、创投引导基金与新质生产力方向，讨论新周期下的机会、结构与合作方式。', imageUrl: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1200&q=82', sort: 60, status: 'published', extra: { time: '09:30 - 17:30', date: '2026/03/25', location: '虹桥会展中心', featured: false }, cta: { label: '查看详情', href: ROUTES.login } },
      ]},
    ],
    seo: cmsContent.zh.siteMeta.events,
  }),
  projects: createPage('projects', 'zh', {
    hero: {
      eyebrow: '优秀项目',
      title: '重点作品与应用成果集中展示',
      description: '聚焦大赛中的代表性作品，展示青年团队在真实场景、产品设计与应用落地方面的探索成果。',
      backgroundImage: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=82',
      dark: true,
    },
    sections: [
      { id: 'project-filters', sectionCode: 'filters', sectionType: 'tabs', items: [
        { id: 'project-filter-1', code: 'all', locale: 'zh', title: '全部项目', sort: 10, status: 'published' },
        { id: 'project-filter-2', code: 'manufacturing', locale: 'zh', title: '智能制造', sort: 20, status: 'published' },
        { id: 'project-filter-3', code: 'medical', locale: 'zh', title: '医疗健康', sort: 30, status: 'published' },
        { id: 'project-filter-4', code: 'education', locale: 'zh', title: '教育服务', sort: 40, status: 'published' },
        { id: 'project-filter-5', code: 'city', locale: 'zh', title: '城市治理', sort: 50, status: 'published' },
        { id: 'project-filter-6', code: 'creative', locale: 'zh', title: '创意应用', sort: 60, status: 'published' },
      ]},
      { id: 'project-stats', sectionCode: 'stats', sectionType: 'stats', items: [
        { id: 'project-stat-1', code: 'featured-count', locale: 'zh', title: '优秀项目展示', value: '24+', label: '优秀项目展示', sort: 10, status: 'published' },
        { id: 'project-stat-2', code: 'directions', locale: 'zh', title: '重点应用方向', value: '6', label: '重点应用方向', sort: 20, status: 'published' },
        { id: 'project-stat-3', code: 'tracks', locale: 'zh', title: '赛道联合推荐', value: '3', label: '赛道联合推荐', sort: 30, status: 'published' },
      ]},
      { id: 'project-list', sectionCode: 'projects', sectionType: 'cards', items: [
        { id: 'project-1', code: 'campus-research-agent', locale: 'zh', title: '校园科研助手智能体平台', subtitle: '教育服务', description: '围绕选题、文献梳理、实验计划与成果归档构建多角色科研助手，帮助师生完成从研究准备到项目管理的协同闭环。', sort: 10, status: 'published', extra: { track: '创意赛道', stage: '复赛项目', date: '2026.05.18', highlight: '支持实验记录自动结构化与阶段进度追踪', featured: true }, cta: { label: '查看项目详情', href: ROUTES.login } },
        { id: 'project-2', code: 'industrial-maintenance', locale: 'zh', title: '工业设备异常预警与维保决策系统', subtitle: '智能制造', description: '基于边缘采集与时序信号分析，对关键设备进行异常识别、工单联动与维保建议输出。', sort: 20, status: 'published', extra: { track: 'OPC 轻创赛道', stage: '重点展示', date: '2026.05.12', highlight: '聚焦制造场景的故障预测与处理优先级决策', featured: false }, cta: { label: '查看项目详情', href: ROUTES.login } },
        { id: 'project-3', code: 'rehab-app', locale: 'zh', title: '多模态康复训练陪伴应用', subtitle: '医疗健康', description: '面向居家康复与基层随访场景，结合语音、动作反馈与训练计划推荐。', sort: 30, status: 'published', extra: { track: '萌芽赛道', stage: '优秀作品', date: '2026.04.28', highlight: '强化康复依从性与个性化训练建议', featured: false }, cta: { label: '查看项目详情', href: ROUTES.login } },
        { id: 'project-4', code: 'community-routing', locale: 'zh', title: '面向社区治理的事件智能分发平台', subtitle: '城市治理', description: '围绕社区报事、问题分类、责任单位协同与处理反馈构建统一工作台。', sort: 40, status: 'published', extra: { track: '创意赛道', stage: '优秀作品', date: '2026.04.21', highlight: '适合多部门协同的智能派单场景', featured: false }, cta: { label: '查看项目详情', href: ROUTES.login } },
        { id: 'project-5', code: 'aigc-exhibition', locale: 'zh', title: 'AIGC 展陈内容策划工作流', subtitle: '创意应用', description: '针对展馆讲解、交互脚本与视觉内容生成，提供从策展主题拆解到内容编排的辅助工作流。', sort: 50, status: 'published', extra: { track: '萌芽赛道', stage: '入围项目', date: '2026.04.16', highlight: '适合展陈、科普与品牌展示场景', featured: false }, cta: { label: '查看项目详情', href: ROUTES.login } },
        { id: 'project-6', code: 'energy-platform', locale: 'zh', title: '高校后勤能耗优化决策平台', subtitle: '智能制造', description: '通过用能数据监测、设备画像与策略推荐，辅助校园后勤团队识别高耗能环节。', sort: 60, status: 'published', extra: { track: 'OPC 轻创赛道', stage: '入围项目', date: '2026.04.10', highlight: '兼顾校园管理与低碳运营目标', featured: false }, cta: { label: '查看项目详情', href: ROUTES.login } },
      ]},
    ],
    seo: cmsContent.zh.siteMeta.projects,
  }),
  'startup-base': createPage('startup-base', 'zh', {
    hero: {
      eyebrow: '创业基地',
      title: '竞赛之外的项目成长支持',
      description: '为具备延展潜力的团队和作品提供展示、孵化与资源衔接场景，让优秀项目在比赛之后继续前进。',
      backgroundImage: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=82',
      dark: true,
    },
    sections: [
      { id: 'startup-base-items', sectionCode: 'baseItems', sectionType: 'cards', items: [
        { id: 'base-1', code: 'incubation-center', locale: 'zh', title: '创新孵化中心', subtitle: '创新孵化中心', description: '围绕参赛项目的产品打磨、路演准备与后续验证，提供更连续的成长支持。', imageUrl: 'https://images.unsplash.com/photo-1497366412874-3415097a27e7?auto=format&fit=crop&w=1200&q=82', iconKey: 'rocket', sort: 10, status: 'published', extra: { location: '创新孵化中心' } },
        { id: 'base-2', code: 'resource-space', locale: 'zh', title: '资源对接场景', subtitle: '产业协同空间', description: '连接院校、导师、企业伙伴与展示机会，让优秀作品在赛后继续沉淀与转化。', imageUrl: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=82', iconKey: 'building-2', sort: 20, status: 'published', extra: { location: '产业协同空间' } },
        { id: 'base-3', code: 'growth-path', locale: 'zh', title: '发展路径建议', subtitle: '成果展示基地', description: '帮助团队从竞赛作品走向应用试点、成果展示与后续申报，形成更清晰的发展路径。', imageUrl: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=82', iconKey: 'compass', sort: 30, status: 'published', extra: { location: '成果展示基地' } },
      ]},
    ],
    seo: cmsContent.zh.siteMeta['startup-base'],
  }),
  materials: createPage('materials', 'zh', {
    hero: {
      eyebrow: '材料下载',
      title: '参赛文件集中获取',
      description: '大赛执行方案、报名信息模板、作品说明书模板与评审标准统一整理，方便院校、指导老师与参赛团队快速查找。',
      backgroundImage: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=82',
      dark: true,
    },
    sections: [
      { id: 'materials-list', sectionCode: 'materials', sectionType: 'downloads', items: [
        { id: 'material-1', code: 'competition-plan', locale: 'zh', title: '大赛执行方案', description: '赛事章程、组织架构、赛程节点与联系方式。', format: 'PDF', audience: '院校组织者 / 指导老师', actionLabel: '下载', fileUrl: ROUTES.materials, sort: 10, status: 'published' },
        { id: 'material-2', code: 'registration-template', locale: 'zh', title: '报名信息模板', description: '团队成员、指导老师、单位信息与承诺书模板。', format: 'DOCX', audience: '参赛团队', actionLabel: '下载', fileUrl: ROUTES.materials, sort: 20, status: 'published' },
        { id: 'material-3', code: 'project-template', locale: 'zh', title: '作品说明书模板', description: '项目背景、技术方案、演示说明与创新价值。', format: 'DOCX', audience: '参赛团队', actionLabel: '下载', fileUrl: ROUTES.materials, sort: 30, status: 'published' },
        { id: 'material-4', code: 'review-rules', locale: 'zh', title: '评审标准说明', description: '创新性、技术可行性、用户体验与路演表现评分细则。', format: 'PDF', audience: '全体参赛者', actionLabel: '查看标准', fileUrl: ROUTES.materials, sort: 40, status: 'published' },
      ]},
    ],
    ctaBanner: {
      title: '需要更多报名支持？',
      description: '如需院校组织说明、赛事咨询或材料补充，请联系组委会服务入口。',
      link: { label: '查看赛事介绍', href: ROUTES.intro },
    },
    seo: cmsContent.zh.siteMeta.materials,
  }),
  policies: createPage('policies', 'zh', {
    hero: {
      eyebrow: '政策支持',
      title: '围绕项目成长的政策信息整理',
      description: '从赛事场景出发，帮助参赛团队理解与智能应用、青年创新和成果转化相关的支持方向与规范要求。',
    },
    sections: [
      { id: 'policies-items', sectionCode: 'policyItems', sectionType: 'cards', items: [
        { id: 'policy-1', code: 'direction', locale: 'zh', title: '政策导向', description: '聚焦人工智能应用、青年创新创业与数字经济方向，帮助团队理解赛事所连接的政策背景。', iconKey: 'landmark', sort: 10, status: 'published' },
        { id: 'policy-2', code: 'application', locale: 'zh', title: '申报参考', description: '整理与项目成长相关的公开信息、申报思路与资源线索，为后续发展做准备。', iconKey: 'file-text', sort: 20, status: 'published' },
        { id: 'policy-3', code: 'compliance', locale: 'zh', title: '规范说明', description: '强调材料提交、知识产权、成果展示与项目说明等环节中的基本规范要求。', iconKey: 'shield-check', sort: 30, status: 'published' },
      ]},
    ],
    seo: cmsContent.zh.siteMeta.policies,
  }),
  about: createPage('about', 'zh', {
    hero: {
      eyebrow: '关于我们',
      title: '了解赛事定位与组织方式',
      description: '从赛事目标、组织结构与生态合作三个层面，帮助访问者快速理解这项比赛在高校创新场景中的角色。',
      backgroundImage: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=82',
      dark: true,
    },
    sections: [
      { id: 'about-items', sectionCode: 'aboutItems', sectionType: 'cards', items: [
        { id: 'about-1', code: 'positioning', locale: 'zh', title: '赛事定位', description: '全国大学生智能应用开发大赛聚焦高校与青年团队的智能应用开发与真实场景验证。', iconKey: 'flag', sort: 10, status: 'published' },
        { id: 'about-2', code: 'coordination', locale: 'zh', title: '组织协同', description: '围绕组委会、评审专家、院校团队与生态伙伴构建协同机制，保证赛事组织与展示质量。', iconKey: 'users-2', sort: 20, status: 'published' },
        { id: 'about-3', code: 'ecosystem', locale: 'zh', title: '生态连接', description: '通过赛事连接项目展示、资源对接与成果传播，推动优秀作品被更多合作方看见。', iconKey: 'building-2', sort: 30, status: 'published' },
      ]},
    ],
    seo: cmsContent.zh.siteMeta.about,
  }),
  privacy: createPage('privacy', 'zh', {
    hero: {
      eyebrow: '隐私政策',
      title: '隐私与信息使用说明',
      description: '本页用于展示报名、资讯浏览与赛事服务过程中涉及的基础信息采集与使用说明，后续可根据正式规则继续完善。',
    },
    sections: [],
    richTextBlocks: [
      { id: 'privacy-1', code: 'privacy-paragraph', type: 'paragraph', content: '当前版本为站点结构整理阶段示意页，后续可接入正式隐私条款、数据使用说明与第三方服务声明。' },
    ],
    seo: cmsContent.zh.siteMeta.privacy,
  }),
  terms: createPage('terms', 'zh', {
    hero: {
      eyebrow: '服务条款',
      title: '站点使用与赛事服务条款',
      description: '本页用于承接赛事官网相关的访问、报名、资料下载与信息展示说明，后续可按正式对外版本补充完整条款。',
    },
    sections: [],
    richTextBlocks: [
      { id: 'terms-1', code: 'terms-paragraph', type: 'paragraph', content: '当前版本为路由和页面骨架统一后的占位页，方便站内导航、页脚与法务入口保持一致。' },
    ],
    seo: cmsContent.zh.siteMeta.terms,
  }),
  login: createPage('login', 'zh', {
    hero: {
      eyebrow: '登录入口',
      title: '进入赛事系统',
      description: '这里将承接正式登录流程。当前版本可先通过报名系统入口继续后续操作。',
    },
    sections: [],
    primaryAction: { label: '进入报名系统', href: ROUTES.home, variant: 'primary' },
    seo: cmsContent.zh.siteMeta.login,
  }),
  news: createPage('news', 'zh', {
    hero: {
      eyebrow: '新闻中心',
      title: '赛事资讯集中浏览',
      description: '通过顶部分类直接切换新闻动态、通知公告与媒体报道，平铺查看文章并跳转详情。',
      backgroundImage: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=82',
      dark: true,
    },
    sections: [],
    seo: cmsContent.zh.siteMeta.news,
  }),
};

cmsContent.en.pages = {
  ...cmsContent.zh.pages,
  home: createPage('home', 'en', {
    ...cmsContent.zh.pages.home,
    ctaBanner: {
      kicker: 'Registration',
      title: 'Start your AI application development journey now',
      description: 'Join a strong technical ecosystem, collaborate with peers, and turn bold ideas into products that matter.',
      action: { label: 'Open registration', href: ROUTES.login, variant: 'primary' },
    },
    seo: cmsContent.en.siteMeta.home,
  }),
  news: createPage('news', 'en', {
    ...cmsContent.zh.pages.news,
    hero: {
      eyebrow: 'News Center',
      title: 'Browse competition updates in one place',
      description: 'Switch between news, notices, and media coverage to stay aligned on competition progress.',
      backgroundImage: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=82',
      dark: true,
    },
    seo: cmsContent.en.siteMeta.news,
  }),
  intro: createPage('intro', 'en', { ...cmsContent.zh.pages.intro, seo: cmsContent.en.siteMeta.intro }),
  events: createPage('events', 'en', { ...cmsContent.zh.pages.events, seo: cmsContent.en.siteMeta.events }),
  projects: createPage('projects', 'en', { ...cmsContent.zh.pages.projects, seo: cmsContent.en.siteMeta.projects }),
  'startup-base': createPage('startup-base', 'en', { ...cmsContent.zh.pages['startup-base'], seo: cmsContent.en.siteMeta['startup-base'] }),
  materials: createPage('materials', 'en', { ...cmsContent.zh.pages.materials, seo: cmsContent.en.siteMeta.materials }),
  policies: createPage('policies', 'en', { ...cmsContent.zh.pages.policies, seo: cmsContent.en.siteMeta.policies }),
  about: createPage('about', 'en', { ...cmsContent.zh.pages.about, seo: cmsContent.en.siteMeta.about }),
  privacy: createPage('privacy', 'en', { ...cmsContent.zh.pages.privacy, seo: cmsContent.en.siteMeta.privacy }),
  terms: createPage('terms', 'en', { ...cmsContent.zh.pages.terms, seo: cmsContent.en.siteMeta.terms }),
  login: createPage('login', 'en', {
    ...cmsContent.zh.pages.login,
    hero: {
      eyebrow: 'Login',
      title: 'Enter the competition system',
      description: 'This page will host the formal sign-in flow. Use the registration entry for now.',
    },
    primaryAction: { label: 'Open registration', href: ROUTES.home, variant: 'primary' },
    seo: cmsContent.en.siteMeta.login,
  }),
};

cmsContent.en.news.articles = cmsContent.zh.news.articles.map((article) => ({
  ...article,
  locale: 'en',
}));
