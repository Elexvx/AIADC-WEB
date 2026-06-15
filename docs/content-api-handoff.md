# AIADC-WEB 内容接口对接说明

本文件用于交给后端内容编辑系统或后端 AI 对接，说明当前前端已经落地的内容模型、接口边界、页面字段和复用规则。

## 1. 当前前端内容层入口

- 类型定义: `src/shared/content/types.ts`
- 内容 mock 与字段示例: `src/shared/content/data.ts`
- 内容读取服务: `src/shared/content/service.ts`
- 前端 API 路由: `src/app/api/content/**`
- 图标映射: `src/shared/content/icon-map.ts`

## 2. 复用原则

目标不是“每个页面一套字段”，而是尽量复用通用结构：

- 同类卡片统一复用 `CardItem`
- 数据展示卡统一复用 `StatItem`
- 时间线统一复用 `TimelineItem`
- 新闻统一复用 `ArticleItem`
- 下载项统一复用 `DownloadItem`
- 页面统一按 `hero + sections + ctaBanner + seo` 组织

图标不由后端传 SVG，只传 `iconKey`，前端映射到 Lucide 图标。

## 3. 通用类型

### 3.1 基础记录 `CmsRecordBase`

所有内容项共享这些字段：

```ts
type CmsRecordBase = {
  id: string;
  code: string;
  locale: 'zh' | 'en';
  title: string;
  subtitle?: string;
  description?: string;
  imageUrl?: string;
  iconKey?: string;
  sort: number;
  status: 'draft' | 'published';
  tags?: string[];
  cta?: LinkAction;
  badge?: BadgeInfo;
  extra?: any;
};
```

### 3.2 通用子结构

```ts
type LinkAction = {
  label: string;
  href: string;
  target?: '_self' | '_blank';
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'link';
};

type BadgeInfo = {
  text: string;
  tone?: 'blue' | 'gold' | 'silver' | 'bronze' | 'slate' | 'dark';
};

type ImageAsset = {
  url: string;
  alt: string;
};
```

### 3.3 可复用业务项

```ts
type StatItem = CmsRecordBase & {
  value: string;
  label: string;
  note?: string;
};

type CardItem = CmsRecordBase & {
  image?: ImageAsset;
};

type TimelineItem = CmsRecordBase & {
  date: string;
  detail: string;
  featured?: boolean;
};

type ArticleItem = CmsRecordBase & {
  category: 'news' | 'notice' | 'media';
  slug: string;
  href: string;
  excerpt: string;
  date: string;
  image: ImageAsset;
  body: string[];
};

type DownloadItem = CmsRecordBase & {
  format: string;
  audience: string;
  actionLabel: string;
  fileUrl: string;
};
```

### 3.4 页面结构

```ts
type CmsPageContent = {
  pageKey:
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
  locale: 'zh' | 'en';
  hero?: {
    eyebrow: string;
    title: string;
    description: string;
    backgroundImage?: string;
    dark?: boolean;
  };
  sections: CmsSection[];
  ctaBanner?: {
    title: string;
    description?: string;
    kicker?: string;
    action?: LinkAction;
    link?: LinkAction;
  };
  richTextBlocks?: {
    id: string;
    code: string;
    type: 'paragraph' | 'markdown';
    content: string;
  }[];
  primaryAction?: LinkAction;
  seo: {
    title: string;
    description: string;
  };
};
```

## 4. 当前前端 API

注意：由于项目使用 `next export` 静态导出，新闻接口不能使用“列表路径 + 同名子路径详情”的目录结构，否则会和静态导出冲突。

因此当前前端已经实现的接口为：

### 4.1 站点级

- `GET /api/content/site-shell?locale=zh`
- `GET /api/content/site-meta?pageKey=home&locale=zh`

### 4.2 页面内容

- `GET /api/content/pages/home?locale=zh`
- `GET /api/content/pages/intro?locale=zh`
- `GET /api/content/pages/events?locale=zh`
- `GET /api/content/pages/projects?locale=zh`
- `GET /api/content/pages/startup-base?locale=zh`
- `GET /api/content/pages/materials?locale=zh`
- `GET /api/content/pages/policies?locale=zh`
- `GET /api/content/pages/about?locale=zh`
- `GET /api/content/pages/privacy?locale=zh`
- `GET /api/content/pages/terms?locale=zh`
- `GET /api/content/pages/login?locale=zh`
- `GET /api/content/pages/news?locale=zh`

### 4.3 新闻

- `GET /api/content/news-categories?locale=zh`
- `GET /api/content/news-articles?locale=zh`
- `GET /api/content/news-articles?locale=zh&category=news`
- `GET /api/content/news-article-detail?locale=zh&slug=registration-open-2024`

如果后端不受静态导出限制，服务端真实接口仍可按更理想的 REST 设计提供：

- `GET /api/content/news/categories`
- `GET /api/content/news`
- `GET /api/content/news/{slug}`

前端这边只需要在 `src/shared/content/service.ts` 增加一层真实请求适配即可。

## 5. 页面字段清单

## 5.1 `home`

### hero
- `eyebrow`
- `title`
- `description`

### sections

#### `heroSlides`
- `title`
- `subtitle`
- `description`
- `imageUrl`
- `tags[]`
- `cta.label`
- `cta.href`
- `extra.alt`
- `extra.accent`
- `extra.deadline`

#### `stats`
- `value`
- `label`
- `iconKey`

#### `groups`
- `title`
- `description`
- `iconKey`
- `cta.label`
- `cta.href`

#### `highlights`
- `title`
- `description`
- `iconKey`

#### `partners`
- `title`

#### `faq`
- `title`
- `description`

### ctaBanner
- `kicker`
- `title`
- `description`
- `action.label`
- `action.href`

## 5.2 `intro`

### hero
- `eyebrow`
- `title`
- `description`

### sections

#### `valueCards`
- `title`
- `description`

#### `schedule`
- `date`
- `title`
- `detail`
- `featured`

#### `awards`
- `title`
- `subtitle`
- `description`
- `extra.prize`
- `extra.tone`
- `extra.glyph`

#### `tracks`
- `title`
- `subtitle`
- `description`
- `iconKey`
- `cta.label`
- `cta.href`
- `extra.badge`

#### `contacts`
- `title`
- `description`
- `iconKey`

## 5.3 `events`

### hero
- `eyebrow`
- `title`
- `description`

### sections

#### `filters`
- `title`

#### `events`
- `title`
- `subtitle`
- `description`
- `imageUrl`
- `cta.label`
- `cta.href`
- `extra.date`
- `extra.time`
- `extra.location`
- `extra.featured`

说明：
- 顶部重点活动卡和下方列表卡复用同一组 `events[]`
- 前端只按 `extra.featured` 选择重点项

## 5.4 `projects`

### hero
- `eyebrow`
- `title`
- `description`

### sections

#### `filters`
- `title`

#### `stats`
- `value`
- `label`

#### `projects`
- `title`
- `subtitle`
- `description`
- `cta.label`
- `cta.href`
- `extra.track`
- `extra.stage`
- `extra.date`
- `extra.highlight`
- `extra.featured`

说明：
- 顶部大卡
- 右侧 3 个项目卡
- 底部项目列表卡

三种展示全部复用同一个 `projects[]` 数据模型。

## 5.5 `startup-base`

### hero
- `eyebrow`
- `title`
- `description`

### sections

#### `baseItems`
- `title`
- `description`
- `imageUrl`
- `iconKey`
- `extra.location`

## 5.6 `materials`

### hero
- `eyebrow`
- `title`
- `description`

### sections

#### `materials`
- `title`
- `description`
- `format`
- `audience`
- `actionLabel`
- `fileUrl`

### ctaBanner
- `title`
- `description`
- `link.label`
- `link.href`

## 5.7 `policies`

### hero
- `eyebrow`
- `title`
- `description`

### sections

#### `policyItems`
- `title`
- `description`
- `iconKey`

## 5.8 `about`

### hero
- `eyebrow`
- `title`
- `description`

### sections

#### `aboutItems`
- `title`
- `description`
- `iconKey`

## 5.9 `privacy`

### hero
- `eyebrow`
- `title`
- `description`

### richTextBlocks
- `type`
- `content`

## 5.10 `terms`

### hero
- `eyebrow`
- `title`
- `description`

### richTextBlocks
- `type`
- `content`

## 5.11 `login`

### hero
- `eyebrow`
- `title`
- `description`

### primaryAction
- `label`
- `href`

## 5.12 `news`

### 页面内容
- `hero.eyebrow`
- `hero.title`
- `hero.description`
- `hero.backgroundImage`
- `hero.dark`

### 新闻分类接口 `news-categories`
- `label`
- `value`
- `description`

### 新闻列表 / 详情接口 `news-articles`
- `category`
- `slug`
- `href`
- `title`
- `excerpt`
- `date`
- `image.url`
- `image.alt`
- `body[]`
- `status`
- `sort`

## 6. 站点壳字段

### `site-shell.brand`
- `primary`
- `secondary`
- `homeAria`
- `applicationName`

### `site-shell.header`
- `languageAria`
- `loginLabel`
- `mainNavItems[]`
  - `label`
  - `href`
  - `dropdown?`
- `pageSwitchItems[]`
  - `label`
  - `description`
  - `href`
- `eventPageItems[]`
  - `label`
  - `description`
  - `href`

### `site-shell.footer`
- `description`
- `columns[]`
  - `title`
  - `links[]`
    - `label`
    - `href`
- `legalLinks[]`
  - `label`
  - `href`
- `copyright`

## 7. 后端对接建议

建议后端内容编辑系统按这几个层级做：

- 站点级配置
  - 品牌
  - 头部导航
  - 页脚
- 页面级配置
  - hero
  - section 列表
  - CTA banner
  - SEO
- 新闻内容
  - 分类
  - 文章

建议把 `sectionCode` 和 `sectionType` 保持稳定，不要把前端展示差异做成不同字段模型。

例如：
- `events` 页面的大卡和普通卡，不要拆成 `featuredEvent` 和 `eventList`
- `projects` 页面三种展示形态，不要拆成三套接口

统一使用一个数组，由后台控制：
- 内容
- 排序
- 是否重点展示

## 8. 当前限制说明

- 项目现在仍是静态导出模式，因此真实线上如果继续保留 `next export`，API 只能作为构建时静态 JSON 输出
- 如果后续切到有后端服务的部署方式，可以直接把 `src/shared/content/service.ts` 改成调用真实后端
- 当前仓库里中英文结构都已预留，但英文内容多数仍是示例复用或简化版，后端接入时建议单独维护两套内容
