UPDATE aiadc_cms_content
   SET deleted = 1,
       updated_at = CURRENT_TIMESTAMP
 WHERE tenant_id = 1001
   AND section_key = 'news'
   AND collection_key IN ('newsCategories', 'newsArticles')
   AND field_path <> 'items'
   AND deleted = 0;

INSERT INTO aiadc_cms_content (
  tenant_id, section_key, section_label, page_key, collection_key, area_key,
  section_code, field_path, field_type, control_type, required, editable, guarded,
  draft_value, published_value, status, version, created_by, created_at, updated_by, updated_at, deleted
)
SELECT 1001, 'news', 'News', NULL, 'newsCategories', NULL,
       NULL, 'items', 'NewsCategorySummary[]', 'schema-driven-extra', 1, 1, 0,
       JSON_ARRAY(
         JSON_OBJECT('label', '新闻动态', 'value', 'news', 'description', '赛事进展与重要发布。', 'sort', 1, 'status', 'published'),
         JSON_OBJECT('label', '通知公告', 'value', 'notice', 'description', '规则、材料、奖项与报名提醒。', 'sort', 2, 'status', 'published'),
         JSON_OBJECT('label', '媒体报道', 'value', 'media', 'description', '媒体关注与项目展示。', 'sort', 3, 'status', 'published')
       ),
       JSON_ARRAY(
         JSON_OBJECT('label', '新闻动态', 'value', 'news', 'description', '赛事进展与重要发布。', 'sort', 1, 'status', 'published'),
         JSON_OBJECT('label', '通知公告', 'value', 'notice', 'description', '规则、材料、奖项与报名提醒。', 'sort', 2, 'status', 'published'),
         JSON_OBJECT('label', '媒体报道', 'value', 'media', 'description', '媒体关注与项目展示。', 'sort', 3, 'status', 'published')
       ),
       'published', 1, 0, CURRENT_TIMESTAMP, 0, CURRENT_TIMESTAMP, 0
WHERE NOT EXISTS (
  SELECT 1 FROM aiadc_cms_content
   WHERE tenant_id = 1001
     AND section_key = 'news'
     AND collection_key = 'newsCategories'
     AND field_path = 'items'
     AND deleted = 0
);

INSERT INTO aiadc_cms_content (
  tenant_id, section_key, section_label, page_key, collection_key, area_key,
  section_code, field_path, field_type, control_type, required, editable, guarded,
  draft_value, published_value, status, version, created_by, created_at, updated_by, updated_at, deleted
)
SELECT 1001, 'news', 'News', NULL, 'newsArticles', NULL,
       NULL, 'items', 'ArticleItem[]', 'markdown-editor', 1, 1, 0,
       JSON_ARRAY(), JSON_ARRAY(), 'published', 1, 0, CURRENT_TIMESTAMP, 0, CURRENT_TIMESTAMP, 0
WHERE NOT EXISTS (
  SELECT 1 FROM aiadc_cms_content
   WHERE tenant_id = 1001
     AND section_key = 'news'
     AND collection_key = 'newsArticles'
     AND field_path = 'items'
     AND deleted = 0
);
