# 资料中心发布说明

资料中心采用“一个 Markdown 文件渲染一行”的方式维护。新增资料时，复制任意现有 `.md` 文件并修改 frontmatter 字段即可。

常用字段：

- `title`：文件名称。
- `code`：唯一标识，建议使用小写字母、数字和连字符。
- `format`：资料类型，例如 `DOCX`、`PDF`、`待发布`。
- `audience`：适用对象，例如 `参赛团队`、`组织单位`。
- `description`：内容说明。
- `fileUrl`：下载地址或说明页地址。
- `actionLabel`：操作按钮文案，例如 `下载`、`查看说明`。
- `sort`：排序值，数值越小越靠前。
- `status`：`published` 或 `draft`。
