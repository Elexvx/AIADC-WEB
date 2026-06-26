---
title: AIADC 文章 Markdown 发布说明
subtitle: 内容发布
slug: aiadc-markdown-publishing-guide
category: guide
tags: [Markdown, 内容发布, 运营指南]
excerpt: 文章模块现在支持通过 Markdown 文件维护正文，并通过 frontmatter 声明分类、标签、封面图和发布时间。
date: 2026-07-02
image: /assets/official-notice-cover.png
imageAlt: AIADC 内容发布说明
sort: 20
status: published
---

## Markdown 文件放在哪里

文章 Markdown 文件放在 `official-frontend/content/news` 目录下，文件扩展名可以是 `.md` 或 `.markdown`。构建时系统会自动读取这些文件，并生成对应的 `/news/{slug}` 详情页。

## frontmatter 字段

- `title`：文章标题，必填。
- `slug`：文章路由标识，建议只使用小写字母、数字和连字符。
- `category`：文章分类，可以是 `news`、`notice`、`media`，也可以是自定义分类。
- `tags`：文章标签数组，用于列表筛选和相关推荐。
- `excerpt`：摘要，会显示在列表、详情引言和 SEO 描述中。
- `date`：发布日期，推荐使用 `YYYY-MM-DD`。
- `image` 和 `imageAlt`：封面图地址与替代文本。
- `sort`：排序值，数值越小越靠前。
- `status`：`published` 或 `draft`。

## 正文能力

正文支持二级到四级标题、段落、引用、无序列表、有序列表、行内代码、代码块和链接。为了保证页面安全，前台不会直接执行 Markdown 里的 HTML。

> 建议正式公告保持段落短、标题清晰，并使用标签标记受众、主题和业务类型。

## 发布流程建议

1. 复制本文件并改名。
2. 修改 frontmatter 中的 `slug`、`title`、`category` 和 `tags`。
3. 编写正文并本地预览 `/news/{slug}`。
4. 构建通过后提交发布。
