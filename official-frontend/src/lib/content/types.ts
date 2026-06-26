import type { Locale } from '@/lib/i18n/config';

export type PageKey =
  | 'home'
  | 'intro'
  | 'events'
  | 'projects'
  | 'startup-base'
  | 'materials'
  | 'policies'
  | 'about'
  | 'privacy'
  | 'terms'
  | 'login'
  | 'news';

export type ContentStatus = 'draft' | 'published';

export type LinkAction = {
  label: string;
  href: string;
  target?: '_self' | '_blank';
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'link';
};

export type ImageAsset = {
  url: string;
  alt: string;
};

export type BadgeInfo = {
  text: string;
  tone?: 'blue' | 'gold' | 'silver' | 'bronze' | 'slate' | 'dark';
};

export type RichTextBlock = {
  id: string;
  code: string;
  type: 'paragraph' | 'markdown';
  content: string;
};

export type CmsRecordBase = {
  id: string;
  code: string;
  locale: Locale;
  title: string;
  subtitle?: string;
  description?: string;
  imageUrl?: string;
  iconKey?: string;
  sort: number;
  status: ContentStatus;
  tags?: string[];
  cta?: LinkAction;
  badge?: BadgeInfo;
  extra?: any;
};

export type StatItem = CmsRecordBase & {
  value: string;
  label: string;
  note?: string;
};

export type CardItem = CmsRecordBase & {
  image?: ImageAsset;
};

export type TimelineItem = CmsRecordBase & {
  date: string;
  detail: string;
  featured?: boolean;
};

export type ArticleItem = CmsRecordBase & {
  category: string;
  slug: string;
  href: string;
  excerpt: string;
  date: string;
  image: ImageAsset;
  body: string[];
  bodyMarkdown?: string;
  contentFormat?: 'paragraphs' | 'markdown';
  sourceType?: 'default' | 'cms' | 'markdown';
  sourcePath?: string;
};

export type DownloadItem = CmsRecordBase & {
  format: string;
  audience: string;
  actionLabel: string;
  fileUrl: string;
};

export type HeroContent = {
  eyebrow: string;
  title: string;
  description: string;
  backgroundImage?: string;
  dark?: boolean;
};

export type SeoContent = {
  title: string;
  description: string;
};

export type CmsSection<TItem = any> = {
  id: string;
  sectionCode: string;
  sectionType: string;
  title?: string;
  description?: string;
  items: TItem[];
  extra?: any;
};

export type CmsPageContent = {
  pageKey: PageKey;
  locale: Locale;
  hero?: HeroContent;
  sections: CmsSection[];
  ctaBanner?: {
    title: string;
    description?: string;
    kicker?: string;
    action?: LinkAction;
    link?: LinkAction;
    items?: Array<{
      title: string;
      description?: string;
      action: LinkAction;
    }>;
  };
  richTextBlocks?: RichTextBlock[];
  primaryAction?: LinkAction;
  seo: SeoContent;
};

export type NavLinkItem = {
  label: string;
  href: string;
  target?: '_self' | '_blank';
  variant?: LinkAction['variant'];
  dropdown?: boolean;
};

export type NavPanelItem = NavLinkItem & {
  description: string;
};

export type FooterQrCode = {
  label: string;
  href?: string;
  imageUrl?: string;
};

export type FooterContactPanel = {
  title: string;
  description: string;
  phoneLabel?: string;
  phoneNumber?: string;
  qrCodes: FooterQrCode[];
};

export type SiteShellContent = {
  brand: {
    primary: string;
    secondary: string;
    homeAria: string;
    applicationName: string;
  };
  header: {
    languageAria: string;
    loginLabel: string;
    mainNavItems: NavLinkItem[];
    pageSwitchItems: NavPanelItem[];
    eventPageItems: NavPanelItem[];
  };
  footer: {
    description: string;
    columns: {
      title: string;
      links: NavLinkItem[];
    }[];
    contactPanel?: FooterContactPanel;
    legalLinks: NavLinkItem[];
    topicLinks?: NavLinkItem[];
    filings: NavLinkItem[];
    copyright: string;
    complianceLine?: string;
  };
};

export type NewsCategorySummary = {
  label: string;
  value: string;
  description: string;
  sort?: number;
  status?: ContentStatus;
};

export type CmsContentBundle = {
  siteShell: SiteShellContent;
  siteMeta: Record<PageKey, SeoContent>;
  pages: Record<PageKey, CmsPageContent>;
  news: {
    categories: NewsCategorySummary[];
    articles: ArticleItem[];
  };
};
