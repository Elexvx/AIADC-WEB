import type { Locale } from '@/shared/i18n/config';
import { ROUTES } from '@/shared/config/routes';

type NavLink = {
  label: string;
  href: string;
};

type NavPanelItem = NavLink & {
  description: string;
};

type FooterColumn = {
  title: string;
  links: NavLink[];
};

type LocaleMessages = {
  brand: {
    primary: string;
    secondary: string;
    homeAria: string;
  };
  header: {
    languageAria: string;
    login: string;
    eventPageItems: NavPanelItem[];
    mainNavItems: (NavLink & { dropdown?: boolean })[];
    pageSwitchItems: NavPanelItem[];
  };
  footer: {
    description: string;
    columns: FooterColumn[];
    legalLinks: NavLink[];
    copyright: string;
  };
  home: {
    signup: {
      kicker: string;
      title: string;
      description: string;
      action: string;
    };
  };
};

export const localeMessages: Record<Locale, LocaleMessages> = {
  zh: {
    brand: {
      primary: '全国大学生',
      secondary: '智能应用开发大赛',
      homeAria: '首页',
    },
    header: {
      languageAria: '切换语言',
      login: '登录',
      eventPageItems: [],
      mainNavItems: [
        { label: '首页', href: ROUTES.home },
        { label: '新闻中心', href: ROUTES.news },
        { label: '赛事', href: ROUTES.intro },
        { label: '活动', href: ROUTES.events },
        { label: '优秀项目', href: ROUTES.projects },
        { label: '创业基地', href: ROUTES.startupBase },
        { label: '材料下载', href: ROUTES.materials },
        { label: '政策支持', href: ROUTES.policies },
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
        { label: '政策支持', description: '政策信息与规范说明', href: ROUTES.policies },
        { label: '关于我们', description: '赛事定位与组织方式', href: ROUTES.about },
      ],
    },
    footer: {
      description: '面向高校与青年创新团队的智能应用竞赛门户，集中提供赛道信息、报名入口、材料下载与赛事资讯。',
      columns: [
        {
          title: '赛事导航',
          links: [
            { label: '首页', href: '/' },
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
            { label: '政策支持', href: ROUTES.policies },
            { label: '关于我们', href: ROUTES.about },
          ],
        },
      ],
      legalLinks: [
        { label: '隐私政策', href: ROUTES.privacy },
        { label: '服务条款', href: ROUTES.terms },
      ],
      copyright: '© 2024 全国大学生智能应用开发大赛. 保留所有权利。',
    },
    home: {
      signup: {
        kicker: '报名参赛',
        title: '立即开启你的智能应用开发之旅',
        description: '加入顶尖的技术生态圈，与优秀的同侪一起，将疯狂的创意转化为改变现实的产品。',
        action: '进入报名系统',
      },
    },
  },
  en: {
    brand: {
      primary: 'National College',
      secondary: 'AI App Development Competition',
      homeAria: 'Home',
    },
    header: {
      languageAria: 'Switch language',
      login: 'Log in',
      eventPageItems: [],
      mainNavItems: [
        { label: 'Home', href: ROUTES.home },
        { label: 'News', href: ROUTES.news },
        { label: 'Competition', href: ROUTES.intro },
        { label: 'Events', href: ROUTES.events },
        { label: 'Projects', href: ROUTES.projects },
        { label: 'Startup Base', href: ROUTES.startupBase },
        { label: 'Materials', href: ROUTES.materials },
        { label: 'Policy', href: ROUTES.policies },
        { label: 'About', href: ROUTES.about },
      ],
      pageSwitchItems: [
        { label: 'Home', description: 'Event highlights and key metrics', href: ROUTES.home },
        { label: 'News', description: 'Article categories and updates', href: ROUTES.news },
        { label: 'Competition', description: 'Overview and event context', href: ROUTES.intro },
        { label: 'Events', description: 'Activity calendar and event highlights', href: ROUTES.events },
        { label: 'Projects', description: 'Featured teams and applied outcomes', href: ROUTES.projects },
        { label: 'Startup Base', description: 'Incubation and growth support', href: ROUTES.startupBase },
        { label: 'Downloads', description: 'Templates and supporting files', href: ROUTES.materials },
        { label: 'Policy', description: 'Policy and compliance notes', href: ROUTES.policies },
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
            { label: 'Policy', href: ROUTES.policies },
            { label: 'About', href: ROUTES.about },
          ],
        },
      ],
      legalLinks: [
        { label: 'Privacy', href: ROUTES.privacy },
        { label: 'Terms', href: ROUTES.terms },
      ],
      copyright: '© 2024 National College AI App Development Competition. All rights reserved.',
    },
    home: {
      signup: {
        kicker: 'Registration',
        title: 'Start your AI application development journey now',
        description: 'Join a top technical ecosystem, collaborate with talented peers, and turn bold ideas into products that change reality.',
        action: 'Open registration',
      },
    },
  },
};
