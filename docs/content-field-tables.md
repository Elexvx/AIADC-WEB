# AIADC-WEB 内容字段表

这份文档给后端内容管理系统使用，按“字段要什么、参数是什么、哪些地方复用”整理。当前前端对应类型在 `src/shared/content/types.ts`，字段示例在 `src/shared/content/data.ts`。

## 1. 接口总览

| 接口 | 方法 | 查询参数 | 返回内容 | 后端用途 |
| --- | --- | --- | --- | --- |
| `/api/content/site-shell` | `GET` | `locale` | 站点品牌、导航、页脚 | 站点级配置 |
| `/api/content/site-meta` | `GET` | `pageKey`, `locale` | 页面 SEO 标题与描述 | 页面元信息 |
| `/api/content/pages/{pageKey}` | `GET` | `locale` | 单个页面完整内容 | 页面区块配置 |
| `/api/content/news-categories` | `GET` | `locale` | 新闻分类列表 | 新闻分类管理 |
| `/api/content/news-articles` | `GET` | `locale`, `category?` | 新闻文章列表 | 新闻列表管理 |
| `/api/content/news-article-detail` | `GET` | `locale`, `slug` | 单篇新闻详情 | 新闻详情管理 |

## 2. 公共枚举

| 枚举 | 可选值 | 说明 |
| --- | --- | --- |
| `locale` | `zh`, `en` | 内容语言 |
| `status` | `draft`, `published` | 内容状态，前端只展示 `published` |
| `target` | `_self`, `_blank` | 链接打开方式 |
| `variant` | `primary`, `secondary`, `ghost`, `outline`, `link` | 按钮或链接样式语义 |
| `tone` | `blue`, `gold`, `silver`, `bronze`, `slate`, `dark` | 标签或卡片强调色语义 |
| `pageKey` | `home`, `intro`, `events`, `projects`, `startup-base`, `materials`, `policies`, `about`, `privacy`, `terms`, `login`, `news` | 页面唯一键 |
| `news.category` | `news`, `notice`, `media` | 新闻分类 |

## 3. 通用基础字段 `CmsRecordBase`

所有卡片、列表项、时间线、新闻、下载项都继承这些字段。

| 字段 | 类型 | 必填 | 示例 | 说明 | 后端编辑建议 |
| --- | --- | --- | --- | --- | --- |
| `id` | `string` | 是 | `project-1` | 内容项唯一 ID | 系统生成，不建议人工编辑 |
| `code` | `string` | 是 | `campus-research-agent` | 稳定业务编码 | 后台可展示，谨慎修改 |
| `locale` | `zh \| en` | 是 | `zh` | 当前内容语言 | 后台按语言维护 |
| `title` | `string` | 是 | `校园科研助手智能体平台` | 主标题 | 可编辑 |
| `subtitle` | `string` | 否 | `教育服务` | 副标题、分类名或小标签 | 可编辑 |
| `description` | `string` | 否 | `围绕选题...` | 描述文案 | 可编辑，建议支持多行 |
| `imageUrl` | `string` | 否 | `https://...jpg` | 图片地址 | 可编辑，URL 必须可访问 |
| `iconKey` | `string` | 否 | `rocket` | 前端图标映射键 | 后台用下拉选择 |
| `sort` | `number` | 是 | `10` | 排序值，越小越靠前 | 后台拖拽排序后写入 |
| `status` | `draft \| published` | 是 | `published` | 发布状态 | 草稿不展示 |
| `tags` | `string[]` | 否 | `["AI 赋能"]` | 标签数组 | 可编辑 |
| `cta` | `LinkAction` | 否 | `{ label, href }` | 主操作链接 | 复用链接结构 |
| `badge` | `BadgeInfo` | 否 | `{ text, tone }` | 徽标信息 | 可编辑 |
| `extra` | `object` | 否 | `{ featured: true }` | 页面特殊字段 | 后端按 section schema 控制 |

## 4. 通用子结构

### 4.1 `LinkAction`

| 字段 | 类型 | 必填 | 示例 | 说明 |
| --- | --- | --- | --- | --- |
| `label` | `string` | 是 | `查看详情` | 按钮或链接文字 |
| `href` | `string` | 是 | `/login` | 跳转地址 |
| `target` | `_self \| _blank` | 否 | `_self` | 打开方式 |
| `variant` | `primary \| secondary \| ghost \| outline \| link` | 否 | `primary` | 样式语义 |

### 4.2 `ImageAsset`

| 字段 | 类型 | 必填 | 示例 | 说明 |
| --- | --- | --- | --- | --- |
| `url` | `string` | 是 | `https://...jpg` | 图片地址 |
| `alt` | `string` | 是 | `活动现场` | 图片替代文本 |

### 4.3 `BadgeInfo`

| 字段 | 类型 | 必填 | 示例 | 说明 |
| --- | --- | --- | --- | --- |
| `text` | `string` | 是 | `重点推荐` | 徽标文字 |
| `tone` | `blue \| gold \| silver \| bronze \| slate \| dark` | 否 | `blue` | 徽标色彩语义 |

## 5. 页面顶层结构 `CmsPageContent`

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `pageKey` | `PageKey` | 是 | 页面唯一键 |
| `locale` | `zh \| en` | 是 | 内容语言 |
| `hero` | `HeroContent` | 否 | 页面头图/标题区 |
| `sections` | `CmsSection[]` | 是 | 页面区块数组 |
| `ctaBanner` | `CtaBanner` | 否 | 页面底部或辅助 CTA |
| `richTextBlocks` | `RichTextBlock[]` | 否 | 隐私、条款等富文本块 |
| `primaryAction` | `LinkAction` | 否 | 登录页等单按钮操作 |
| `seo` | `SeoContent` | 是 | SEO 标题和描述 |

### 5.1 `HeroContent`

| 字段 | 类型 | 必填 | 使用页面 | 说明 |
| --- | --- | --- | --- | --- |
| `eyebrow` | `string` | 是 | 全部页面 | 小标题 |
| `title` | `string` | 是 | 全部页面 | 页面主标题 |
| `description` | `string` | 是 | 全部页面 | 页面说明 |
| `backgroundImage` | `string` | 否 | `news` | 背景图 URL |
| `dark` | `boolean` | 否 | `news` | 是否使用深色文字层 |

### 5.2 `CmsSection`

| 字段 | 类型 | 必填 | 示例 | 说明 |
| --- | --- | --- | --- | --- |
| `id` | `string` | 是 | `home-stats` | 区块 ID |
| `sectionCode` | `string` | 是 | `stats` | 前端查找区块的稳定键 |
| `sectionType` | `string` | 是 | `cards` | 区块展示类型 |
| `title` | `string` | 否 | `覆盖多元青年创新团队` | 区块标题 |
| `description` | `string` | 否 | `以团队形式参赛...` | 区块说明 |
| `items` | `array` | 是 | `[]` | 区块内容项 |
| `extra` | `object` | 否 | `{}` | 区块级扩展 |

## 6. 站点壳字段 `SiteShellContent`

### 6.1 `brand`

| 字段 | 类型 | 必填 | 示例 | 说明 |
| --- | --- | --- | --- | --- |
| `primary` | `string` | 是 | `全国大学生` | 品牌主文本 |
| `secondary` | `string` | 是 | `智能应用开发大赛` | 品牌副文本 |
| `homeAria` | `string` | 是 | `首页` | Logo 链接无障碍说明 |
| `applicationName` | `string` | 是 | `全国大学生智能应用开发大赛` | 应用名称和 SEO 站点名 |

### 6.2 `header`

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `languageAria` | `string` | 是 | 语言切换按钮无障碍说明 |
| `loginLabel` | `string` | 是 | 登录按钮文字 |
| `mainNavItems` | `NavLinkItem[]` | 是 | 桌面主导航 |
| `pageSwitchItems` | `NavPanelItem[]` | 是 | 移动端菜单/页面切换项 |
| `eventPageItems` | `NavPanelItem[]` | 是 | 下拉菜单项，当前可为空数组 |

### 6.3 `NavLinkItem`

| 字段 | 类型 | 必填 | 示例 | 说明 |
| --- | --- | --- | --- | --- |
| `label` | `string` | 是 | `新闻中心` | 导航文字 |
| `href` | `string` | 是 | `/news` | 跳转地址 |
| `dropdown` | `boolean` | 否 | `true` | 是否带下拉 |

### 6.4 `NavPanelItem`

| 字段 | 类型 | 必填 | 示例 | 说明 |
| --- | --- | --- | --- | --- |
| `label` | `string` | 是 | `优秀项目` | 菜单文字 |
| `href` | `string` | 是 | `/projects` | 跳转地址 |
| `description` | `string` | 是 | `重点展示与项目成果浏览` | 菜单说明 |

### 6.5 `footer`

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `description` | `string` | 是 | 页脚简介 |
| `columns` | `FooterColumn[]` | 是 | 页脚栏目 |
| `legalLinks` | `NavLinkItem[]` | 是 | 隐私政策、服务条款等 |
| `copyright` | `string` | 是 | 版权文字 |

## 7. 页面字段表

## 7.1 首页 `home`

| 区域 | `sectionCode` | 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- | --- | --- |
| 顶层 | `hero` | `eyebrow` | `string` | 是 | 首页小标题 |
| 顶层 | `hero` | `title` | `string` | 是 | 首页标题 |
| 顶层 | `hero` | `description` | `string` | 是 | 首页说明 |
| 轮播 | `heroSlides` | `title` | `string` | 是 | 第一行标题 |
| 轮播 | `heroSlides` | `subtitle` | `string` | 是 | 第二行标题 |
| 轮播 | `heroSlides` | `description` | `string` | 是 | 轮播描述 |
| 轮播 | `heroSlides` | `imageUrl` | `string` | 是 | 背景图 |
| 轮播 | `heroSlides` | `tags` | `string[]` | 否 | 顶部标签 |
| 轮播 | `heroSlides` | `cta.label` | `string` | 是 | 主按钮文字 |
| 轮播 | `heroSlides` | `cta.href` | `string` | 是 | 主按钮链接 |
| 轮播 | `heroSlides` | `extra.alt` | `string` | 是 | 图片 alt |
| 轮播 | `heroSlides` | `extra.accent` | `string` | 否 | 高亮词 |
| 轮播 | `heroSlides` | `extra.deadline` | `string` | 否 | 截止时间文案 |
| 数据卡 | `stats` | `value` | `string` | 是 | 数值 |
| 数据卡 | `stats` | `label` | `string` | 是 | 指标名称 |
| 数据卡 | `stats` | `iconKey` | `string` | 否 | 图标键 |
| 参赛对象卡 | `groups` | `title` | `string` | 是 | 卡片标题 |
| 参赛对象卡 | `groups` | `description` | `string` | 是 | 卡片描述 |
| 参赛对象卡 | `groups` | `iconKey` | `string` | 否 | 图标键 |
| 参赛对象卡 | `groups` | `cta.label` | `string` | 否 | 操作文字 |
| 参赛对象卡 | `groups` | `cta.href` | `string` | 否 | 操作链接 |
| 亮点卡 | `highlights` | `title` | `string` | 是 | 卡片标题 |
| 亮点卡 | `highlights` | `description` | `string` | 是 | 卡片描述 |
| 亮点卡 | `highlights` | `iconKey` | `string` | 否 | 图标键 |
| 合作伙伴 | `partners` | `title` | `string` | 是 | 机构名称 |
| FAQ | `faq` | `title` | `string` | 是 | 问题 |
| FAQ | `faq` | `description` | `string` | 是 | 答案 |
| 报名 CTA | `ctaBanner` | `kicker` | `string` | 否 | CTA 小标题 |
| 报名 CTA | `ctaBanner` | `title` | `string` | 是 | CTA 标题 |
| 报名 CTA | `ctaBanner` | `description` | `string` | 否 | CTA 描述 |
| 报名 CTA | `ctaBanner` | `action.label` | `string` | 是 | 按钮文字 |
| 报名 CTA | `ctaBanner` | `action.href` | `string` | 是 | 按钮链接 |

## 7.2 大赛简介 `intro`

| 区域 | `sectionCode` | 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- | --- | --- |
| 顶层 | `hero` | `eyebrow` | `string` | 是 | 页面小标题 |
| 顶层 | `hero` | `title` | `string` | 是 | 页面标题 |
| 顶层 | `hero` | `description` | `string` | 是 | 页面说明 |
| 价值卡 | `valueCards` | `title` | `string` | 是 | 卡片标题 |
| 价值卡 | `valueCards` | `description` | `string` | 是 | 卡片描述 |
| 赛程 | `schedule` | `date` | `string` | 是 | 日期范围 |
| 赛程 | `schedule` | `title` | `string` | 是 | 节点标题 |
| 赛程 | `schedule` | `detail` | `string` | 是 | 节点说明 |
| 赛程 | `schedule` | `featured` | `boolean` | 否 | 是否重点节点 |
| 奖项 | `awards` | `title` | `string` | 是 | 奖项名称 |
| 奖项 | `awards` | `subtitle` | `string` | 否 | 名额说明 |
| 奖项 | `awards` | `description` | `string` | 是 | 奖项说明 |
| 奖项 | `awards` | `extra.prize` | `string` | 是 | 奖金或奖品 |
| 奖项 | `awards` | `extra.tone` | `gold \| silver \| bronze \| slate` | 否 | 奖项色彩 |
| 奖项 | `awards` | `extra.glyph` | `string` | 否 | 展示符号 |
| 赛道 | `tracks` | `title` | `string` | 是 | 赛道名称 |
| 赛道 | `tracks` | `subtitle` | `string` | 否 | 赛道编号 |
| 赛道 | `tracks` | `description` | `string` | 是 | 赛道描述 |
| 赛道 | `tracks` | `iconKey` | `string` | 否 | 图标键 |
| 赛道 | `tracks` | `cta.label` | `string` | 否 | 操作文字 |
| 赛道 | `tracks` | `cta.href` | `string` | 否 | 操作链接 |
| 联系方式 | `contacts` | `title` | `string` | 是 | 联系项名称 |
| 联系方式 | `contacts` | `description` | `string` | 是 | 联系内容 |
| 联系方式 | `contacts` | `iconKey` | `string` | 否 | 图标键 |

## 7.3 活动中心 `events`

| 区域 | `sectionCode` | 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- | --- | --- |
| 顶层 | `hero` | `eyebrow` | `string` | 是 | 页面小标题 |
| 顶层 | `hero` | `title` | `string` | 是 | 页面标题 |
| 顶层 | `hero` | `description` | `string` | 是 | 页面说明 |
| 筛选项 | `filters` | `title` | `string` | 是 | 筛选名称 |
| 活动卡 | `events` | `title` | `string` | 是 | 活动标题 |
| 活动卡 | `events` | `subtitle` | `string` | 是 | 活动分类 |
| 活动卡 | `events` | `description` | `string` | 是 | 活动说明 |
| 活动卡 | `events` | `imageUrl` | `string` | 是 | 活动图片 |
| 活动卡 | `events` | `cta.href` | `string` | 否 | 详情链接 |
| 活动卡 | `events` | `extra.date` | `string` | 是 | 日期 |
| 活动卡 | `events` | `extra.time` | `string` | 是 | 时间 |
| 活动卡 | `events` | `extra.location` | `string` | 是 | 地点 |
| 活动卡 | `events` | `extra.featured` | `boolean` | 否 | 是否作为顶部重点活动 |

## 7.4 优秀项目 `projects`

| 区域 | `sectionCode` | 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- | --- | --- |
| 顶层 | `hero` | `eyebrow` | `string` | 是 | 页面小标题 |
| 顶层 | `hero` | `title` | `string` | 是 | 页面标题 |
| 顶层 | `hero` | `description` | `string` | 是 | 页面说明 |
| 筛选项 | `filters` | `title` | `string` | 是 | 筛选名称 |
| 统计卡 | `stats` | `value` | `string` | 是 | 数值 |
| 统计卡 | `stats` | `label` | `string` | 是 | 名称 |
| 项目卡 | `projects` | `title` | `string` | 是 | 项目名称 |
| 项目卡 | `projects` | `subtitle` | `string` | 是 | 应用方向 |
| 项目卡 | `projects` | `description` | `string` | 是 | 项目简介 |
| 项目卡 | `projects` | `cta.href` | `string` | 否 | 详情链接 |
| 项目卡 | `projects` | `extra.track` | `string` | 是 | 所属赛道 |
| 项目卡 | `projects` | `extra.stage` | `string` | 是 | 项目阶段 |
| 项目卡 | `projects` | `extra.date` | `string` | 是 | 更新时间 |
| 项目卡 | `projects` | `extra.highlight` | `string` | 是 | 项目亮点 |
| 项目卡 | `projects` | `extra.featured` | `boolean` | 否 | 是否作为顶部重点项目 |

## 7.5 创业基地 `startup-base`

| 区域 | `sectionCode` | 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- | --- | --- |
| 顶层 | `hero` | `eyebrow` | `string` | 是 | 页面小标题 |
| 顶层 | `hero` | `title` | `string` | 是 | 页面标题 |
| 顶层 | `hero` | `description` | `string` | 是 | 页面说明 |
| 基地卡 | `baseItems` | `title` | `string` | 是 | 卡片标题 |
| 基地卡 | `baseItems` | `description` | `string` | 是 | 卡片描述 |
| 基地卡 | `baseItems` | `imageUrl` | `string` | 是 | 图片地址 |
| 基地卡 | `baseItems` | `iconKey` | `string` | 否 | 图标键 |
| 基地卡 | `baseItems` | `extra.location` | `string` | 是 | 空间/地点名称 |

## 7.6 材料下载 `materials`

| 区域 | `sectionCode` | 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- | --- | --- |
| 顶层 | `hero` | `eyebrow` | `string` | 是 | 页面小标题 |
| 顶层 | `hero` | `title` | `string` | 是 | 页面标题 |
| 顶层 | `hero` | `description` | `string` | 是 | 页面说明 |
| 下载项 | `materials` | `title` | `string` | 是 | 文件名称 |
| 下载项 | `materials` | `description` | `string` | 是 | 文件说明 |
| 下载项 | `materials` | `format` | `string` | 是 | 文件格式 |
| 下载项 | `materials` | `audience` | `string` | 是 | 适用对象 |
| 下载项 | `materials` | `actionLabel` | `string` | 是 | 操作文字 |
| 下载项 | `materials` | `fileUrl` | `string` | 是 | 文件下载地址 |
| 支持 CTA | `ctaBanner` | `title` | `string` | 是 | CTA 标题 |
| 支持 CTA | `ctaBanner` | `description` | `string` | 否 | CTA 描述 |
| 支持 CTA | `ctaBanner` | `link.label` | `string` | 是 | 链接文字 |
| 支持 CTA | `ctaBanner` | `link.href` | `string` | 是 | 链接地址 |

## 7.7 政策支持 `policies`

| 区域 | `sectionCode` | 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- | --- | --- |
| 顶层 | `hero` | `eyebrow` | `string` | 是 | 页面小标题 |
| 顶层 | `hero` | `title` | `string` | 是 | 页面标题 |
| 顶层 | `hero` | `description` | `string` | 是 | 页面说明 |
| 政策卡 | `policyItems` | `title` | `string` | 是 | 卡片标题 |
| 政策卡 | `policyItems` | `description` | `string` | 是 | 卡片描述 |
| 政策卡 | `policyItems` | `iconKey` | `string` | 否 | 图标键 |

## 7.8 关于我们 `about`

| 区域 | `sectionCode` | 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- | --- | --- |
| 顶层 | `hero` | `eyebrow` | `string` | 是 | 页面小标题 |
| 顶层 | `hero` | `title` | `string` | 是 | 页面标题 |
| 顶层 | `hero` | `description` | `string` | 是 | 页面说明 |
| 关于卡 | `aboutItems` | `title` | `string` | 是 | 卡片标题 |
| 关于卡 | `aboutItems` | `description` | `string` | 是 | 卡片描述 |
| 关于卡 | `aboutItems` | `iconKey` | `string` | 否 | 图标键 |

## 7.9 隐私政策 `privacy`

| 区域 | 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- | --- |
| 顶层 | `hero.eyebrow` | `string` | 是 | 页面小标题 |
| 顶层 | `hero.title` | `string` | 是 | 页面标题 |
| 顶层 | `hero.description` | `string` | 是 | 页面说明 |
| 正文 | `richTextBlocks[].id` | `string` | 是 | 段落 ID |
| 正文 | `richTextBlocks[].code` | `string` | 是 | 段落编码 |
| 正文 | `richTextBlocks[].type` | `paragraph \| markdown` | 是 | 内容类型 |
| 正文 | `richTextBlocks[].content` | `string` | 是 | 正文内容 |

## 7.10 服务条款 `terms`

| 区域 | 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- | --- |
| 顶层 | `hero.eyebrow` | `string` | 是 | 页面小标题 |
| 顶层 | `hero.title` | `string` | 是 | 页面标题 |
| 顶层 | `hero.description` | `string` | 是 | 页面说明 |
| 正文 | `richTextBlocks[].id` | `string` | 是 | 段落 ID |
| 正文 | `richTextBlocks[].code` | `string` | 是 | 段落编码 |
| 正文 | `richTextBlocks[].type` | `paragraph \| markdown` | 是 | 内容类型 |
| 正文 | `richTextBlocks[].content` | `string` | 是 | 正文内容 |

## 7.11 登录入口 `login`

| 区域 | 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- | --- |
| 顶层 | `hero.eyebrow` | `string` | 是 | 页面小标题 |
| 顶层 | `hero.title` | `string` | 是 | 页面标题 |
| 顶层 | `hero.description` | `string` | 是 | 页面说明 |
| 主按钮 | `primaryAction.label` | `string` | 是 | 按钮文字 |
| 主按钮 | `primaryAction.href` | `string` | 是 | 按钮链接 |

## 7.12 新闻中心 `news`

| 区域 | 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- | --- |
| 顶层 | `hero.eyebrow` | `string` | 是 | 页面小标题 |
| 顶层 | `hero.title` | `string` | 是 | 页面标题 |
| 顶层 | `hero.description` | `string` | 是 | 页面说明 |
| 顶层 | `hero.backgroundImage` | `string` | 否 | 头图背景 |
| 顶层 | `hero.dark` | `boolean` | 否 | 深色遮罩模式 |
| 分类 | `categories[].label` | `string` | 是 | 分类名称 |
| 分类 | `categories[].value` | `news \| notice \| media` | 是 | 分类值 |
| 分类 | `categories[].description` | `string` | 是 | 分类说明 |
| 文章 | `articles[].category` | `news \| notice \| media` | 是 | 分类值 |
| 文章 | `articles[].slug` | `string` | 是 | 详情页 URL 标识 |
| 文章 | `articles[].href` | `string` | 是 | 详情页地址 |
| 文章 | `articles[].title` | `string` | 是 | 标题 |
| 文章 | `articles[].excerpt` | `string` | 是 | 摘要 |
| 文章 | `articles[].date` | `string` | 是 | 发布日期 |
| 文章 | `articles[].image.url` | `string` | 是 | 图片地址 |
| 文章 | `articles[].image.alt` | `string` | 是 | 图片 alt |
| 文章 | `articles[].body` | `string[]` | 是 | 正文段落 |
| 文章 | `articles[].status` | `draft \| published` | 是 | 发布状态 |
| 文章 | `articles[].sort` | `number` | 是 | 排序 |

## 8. 数据库表设计建议

如果后端要建表，建议拆成这些表，既能编辑又能复用：

| 表名 | 用途 | 关键字段 |
| --- | --- | --- |
| `cms_site_shell` | 站点级配置 | `locale`, `brand`, `header`, `footer`, `status` |
| `cms_page` | 页面主记录 | `page_key`, `locale`, `hero`, `cta_banner`, `primary_action`, `seo`, `status` |
| `cms_section` | 页面区块 | `page_id`, `section_code`, `section_type`, `title`, `description`, `sort`, `extra` |
| `cms_content_item` | 通用区块内容项 | `section_id`, `code`, `title`, `subtitle`, `description`, `image_url`, `icon_key`, `cta`, `badge`, `extra`, `sort`, `status` |
| `cms_news_category` | 新闻分类 | `locale`, `label`, `value`, `description`, `sort`, `status` |
| `cms_news_article` | 新闻文章 | `locale`, `category`, `slug`, `title`, `excerpt`, `date`, `image`, `body`, `sort`, `status` |

`cms_content_item.extra` 建议用 JSON 字段承载各页面少量差异字段，例如：

| 页面 | sectionCode | extra 字段 |
| --- | --- | --- |
| `home` | `heroSlides` | `alt`, `accent`, `deadline` |
| `intro` | `awards` | `prize`, `tone`, `glyph` |
| `events` | `events` | `date`, `time`, `location`, `featured` |
| `projects` | `projects` | `track`, `stage`, `date`, `highlight`, `featured` |
| `startup-base` | `baseItems` | `location` |

## 9. 后端返回示例

### 9.1 页面接口

```json
{
  "pageKey": "projects",
  "locale": "zh",
  "hero": {
    "eyebrow": "优秀项目",
    "title": "重点作品与应用成果集中展示",
    "description": "聚焦大赛中的代表性作品..."
  },
  "sections": [
    {
      "id": "project-list",
      "sectionCode": "projects",
      "sectionType": "cards",
      "items": [
        {
          "id": "project-1",
          "code": "campus-research-agent",
          "locale": "zh",
          "title": "校园科研助手智能体平台",
          "subtitle": "教育服务",
          "description": "围绕选题、文献梳理...",
          "sort": 10,
          "status": "published",
          "cta": {
            "label": "查看项目详情",
            "href": "/login"
          },
          "extra": {
            "track": "创意赛道",
            "stage": "复赛项目",
            "date": "2026.05.18",
            "highlight": "支持实验记录自动结构化与阶段进度追踪",
            "featured": true
          }
        }
      ]
    }
  ],
  "seo": {
    "title": "优秀项目",
    "description": "浏览全国大学生智能应用开发大赛中的优秀项目与重点展示作品。"
  }
}
```

### 9.2 新闻详情接口

```json
{
  "id": "news-1",
  "code": "registration-open-2024",
  "locale": "zh",
  "category": "news",
  "slug": "registration-open-2024",
  "href": "/news/registration-open-2024",
  "title": "2024 赛季报名通道正式开启，参赛团队可在线提交项目资料",
  "excerpt": "本届赛事面向职业院校、普通高校与青年创新团队开放报名...",
  "date": "2024.06.10",
  "image": {
    "url": "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b",
    "alt": "报名启动现场"
  },
  "body": [
    "2024 赛季全国大学生智能应用开发大赛报名通道正式开启。",
    "本届赛事面向职业院校、普通高校与青年创新团队开放。"
  ],
  "sort": 10,
  "status": "published"
}
```
