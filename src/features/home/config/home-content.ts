import { BadgeCheck, Building2, Code2, GraduationCap, Rocket, Users, type LucideIcon } from 'lucide-react';

export type HomeHeroSlide = {
  imageUrl: string;
  alt: string;
  tags: string[];
  title: [string, string];
  accent: string;
  description: string;
  deadline: string;
};

export type HomeStatItem = {
  value: string;
  label: string;
  icon: LucideIcon;
};

export type HomeFeatureItem = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export type HomeFaqItem = {
  question: string;
  answer: string;
};

export const homeHeroSlides: HomeHeroSlide[] = [
  {
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=2400&q=88',
    alt: '参赛团队在科技竞赛中展示智能应用项目',
    tags: ['AI 赋能', '应用创新', '智领未来'],
    title: ['全国大学生', '智能应用开发大赛'],
    accent: '应用',
    description: '面向全国高校在校学生，聚焦人工智能与行业应用的深度融合，打造创新引领、协同育人、开放共赢的高水平赛事平台。',
    deadline: '2024-07-15 24:00',
  },
  {
    imageUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=2400&q=88',
    alt: '青年团队围绕智能应用项目协作开发',
    tags: ['产业命题', '项目路演', '生态支持'],
    title: ['链接真实场景', '验证智能应用价值'],
    accent: '智能',
    description: '围绕真实产业需求组织作品开发、评审与路演，让创新想法在可验证、可演示、可落地的路径中成长。',
    deadline: '2024-09-28 总决赛',
  },
  {
    imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=2400&q=88',
    alt: '创新团队在会议中讨论项目方案',
    tags: ['多元赛道', '专家评审', '青年创新'],
    title: ['三大赛道开放', '共创 AI 应用未来'],
    accent: 'AI',
    description: '覆盖萌芽、创意与 OPC 轻创赛道，支持不同阶段团队提交概念方案、交互原型与敏捷开发成果。',
    deadline: '06.10 - 07.15 报名',
  },
];

export const homeStatItems: HomeStatItem[] = [
  { value: '1200+', label: '高校参与', icon: GraduationCap },
  { value: '18000+', label: '参赛团队', icon: Users },
  { value: '35000+', label: '参赛学生', icon: Code2 },
  { value: '200+', label: '优秀作品', icon: BadgeCheck },
  { value: '30+', label: '支持单位', icon: Building2 },
];

export const homeGroupIcons: LucideIcon[] = [GraduationCap, Users, Code2];

export const homeHighlightItems: HomeFeatureItem[] = [
  { title: '权威平台', description: '专家评审、院校联动与产业伙伴共同组成赛事生态。', icon: BadgeCheck },
  { title: '产教融合', description: '围绕真实产业命题组织开发、评审与路演。', icon: Building2 },
  { title: '真实场景', description: '作品从业务问题出发，强调可验证、可演示、可落地。', icon: Code2 },
  { title: '成长赋能', description: '优秀团队可获得云资源、导师辅导与生态对接。', icon: Rocket },
];

export const homePartnerLogos: string[] = [
  '清华大学 AI 研究院',
  '北京大学软件工程中心',
  '中国人工智能学会',
  '华为云',
  '阿里云',
  '腾讯云',
  '百度智能云',
  '科大讯飞',
  '商汤科技',
  '旷视科技',
  '智谱 AI',
  '火山引擎',
];

export const homeFaqItems: HomeFaqItem[] = [
  { question: '可以跨校、跨专业组队吗？', answer: '可以。团队需确认所有成员符合对应组别资格，并由负责人统一提交报名材料。' },
  { question: '同一团队可以报名多个赛道吗？', answer: '同一作品建议选择一个最匹配的赛道；不同作品可按规则分别报名。' },
  { question: '作品是否必须已经上线？', answer: '不强制上线，但需要提供可验证的演示材料，创意赛道与 OPC 轻创赛道需重点展示可运行原型。' },
  { question: '报名后还能修改材料吗？', answer: '报名截止前可按系统要求补充或更新材料，截止后原则上不再接受替换。' },
];
