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

export const eventPageItems: NavPanelItem[] = [
  { label: '大赛简介', description: '赛事定位与生态介绍', href: '/intro' },
  { label: '赛事安排', description: '报名、评审与决赛节点', href: '/schedule' },
  { label: '奖项设置', description: '奖金、证书与生态支持', href: '/awards' },
  { label: '赛区设置', description: '参赛组别与赛道方向', href: '/tracks' },
];

export const mainNavItems: MainNavItem[] = [
  { label: '首页', href: '/' },
  { label: '新闻中心', href: '/news' },
  { label: '赛事', href: '/intro', dropdown: true },
  { label: '活动', href: '/schedule' },
  { label: '优秀项目', href: '/news/tabs' },
  { label: '创业基地', href: '/#signup' },
  { label: '服务介绍', href: '/materials' },
  { label: '政府政策', href: '/intro' },
  { label: '关于我们', href: '/intro' },
] as const;

export const pageSwitchItems: NavPanelItem[] = [
  { label: '大赛首页', description: '赛事概览与关键数据', href: '/' },
  ...eventPageItems,
  { label: '参赛报名', description: '报名入口与材料说明', href: '/#signup' },
  { label: '材料下载', description: '执行方案与参赛模板', href: '/materials' },
  { label: '新闻动态', description: '赛事进展与评审消息', href: '/news' },
];

export const footerSwitchLinks: NavLinkItem[] = [
  { label: '首页', href: '/' },
  { label: '大赛简介', href: '/intro' },
  { label: '赛事安排', href: '/schedule' },
  { label: '奖项设置', href: '/awards' },
  { label: '赛区设置', href: '/tracks' },
  { label: '材料下载', href: '/materials' },
  { label: '新闻中心', href: '/news' },
  { label: '报名入口', href: '/#signup' },
];
