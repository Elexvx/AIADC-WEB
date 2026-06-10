import { ROUTES } from '@/shared/config/routes';

export type NavLinkItem = {
  label: string;
  href: string;
};

export type MainNavItem = NavLinkItem & {
  dropdown?: boolean;
};

export type NavPanelItem = NavLinkItem & {
  description: string;
};

export const eventPageItems: NavPanelItem[] = [];

export const mainNavItems: MainNavItem[] = [
  { label: '首页', href: ROUTES.home },
  { label: '新闻中心', href: ROUTES.news },
  { label: '赛事', href: ROUTES.intro },
  { label: '活动', href: ROUTES.events },
  { label: '优秀项目', href: ROUTES.projects },
  { label: '创业基地', href: ROUTES.startupBase },
  { label: '材料下载', href: ROUTES.materials },
  { label: '政策支持', href: ROUTES.policies },
  { label: '关于我们', href: ROUTES.about },
] as const;

export const pageSwitchItems: NavPanelItem[] = [
  { label: '首页', description: '赛事概览与关键信息', href: ROUTES.home },
  { label: '新闻中心', description: '资讯分类与文章浏览', href: ROUTES.news },
  { label: '赛事', description: '赛事定位与整体介绍', href: ROUTES.intro },
  { label: '活动', description: '活动预告与交流安排', href: ROUTES.events },
  { label: '优秀项目', description: '查看重点展示作品', href: ROUTES.projects },
  { label: '创业基地', description: '项目成长与孵化支持', href: ROUTES.startupBase },
  { label: '材料下载', description: '执行方案与参赛模板', href: ROUTES.materials },
  { label: '政策支持', description: '政策信息与规范说明', href: ROUTES.policies },
  { label: '关于我们', description: '赛事定位与组织方式', href: ROUTES.about },
];

export const footerSwitchLinks: NavLinkItem[] = [
  { label: '首页', href: ROUTES.home },
  { label: '大赛简介', href: ROUTES.intro },
  { label: '优秀项目', href: ROUTES.projects },
  { label: '材料下载', href: ROUTES.materials },
  { label: '新闻中心', href: ROUTES.news },
  { label: '登录入口', href: ROUTES.login },
];
