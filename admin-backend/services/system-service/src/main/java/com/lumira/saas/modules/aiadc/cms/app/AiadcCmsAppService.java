package com.lumira.saas.modules.aiadc.cms.app;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.lumira.common.enums.ErrorCode;
import com.lumira.common.exception.BizException;
import com.lumira.common.security.CurrentUser;
import com.lumira.common.vo.PageResponse;
import com.lumira.saas.infrastructure.persistence.mybatis.BeanPropertyRowMapper;
import com.lumira.saas.infrastructure.persistence.mybatis.MyBatisQueryOperations;
import com.lumira.saas.modules.aiadc.cms.dto.AiadcCmsDTO;
import com.lumira.saas.modules.aiadc.cms.vo.AiadcCmsVO;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Pattern;

@Service
public class AiadcCmsAppService {

    private static final int MAX_PAGE_SIZE = 200;
    private static final int MAX_JSON_LENGTH = 200000;
    private static final Pattern SAFE_FIELD_PATH = Pattern.compile("^[A-Za-z0-9_.\\[\\]-]+$");
    private static final TypeReference<Map<String, Object>> MAP_TYPE = new TypeReference<>() {
    };

    private final MyBatisQueryOperations jdbcTemplate;
    private final ObjectMapper objectMapper;

    public AiadcCmsAppService(MyBatisQueryOperations jdbcTemplate, ObjectMapper objectMapper) {
        this.jdbcTemplate = jdbcTemplate;
        this.objectMapper = objectMapper;
    }

    public List<AiadcCmsVO.SectionSummary> sections(CurrentUser currentUser) {
        Long tenantId = tenantId(currentUser);
        ensureCatalog(tenantId, currentUser.getUserId());
        return jdbcTemplate.query("""
                select section_key as `key`,
                       max(section_label) as label,
                       count(1) as `fieldCount`,
                       sum(case when status = 'published' then 1 else 0 end) as `publishedCount`
                  from aiadc_cms_content
                 where tenant_id = ?
                   and deleted = 0
                 group by section_key
                 order by min(id) asc
                """, new BeanPropertyRowMapper<>(AiadcCmsVO.SectionSummary.class), tenantId);
    }

    public PageResponse<AiadcCmsVO.FieldRecord> listFields(CurrentUser currentUser, String sectionKey, String keyword, String status, long pageNo, long pageSize) {
        Long tenantId = tenantId(currentUser);
        ensureCatalog(tenantId, currentUser.getUserId());
        StringBuilder where = new StringBuilder("""
                from aiadc_cms_content
                where tenant_id = ?
                  and deleted = 0
                """);
        List<Object> params = new ArrayList<>();
        params.add(tenantId);
        if (StringUtils.hasText(sectionKey)) {
            where.append(" and section_key = ?");
            params.add(sectionKey.trim());
        }
        if (StringUtils.hasText(status)) {
            where.append(" and status = ?");
            params.add(status.trim());
        }
        if (StringUtils.hasText(keyword)) {
            where.append(" and (field_path like ? or section_label like ? or page_key like ? or collection_key like ? or section_code like ?)");
            String like = "%" + keyword.trim() + "%";
            params.add(like);
            params.add(like);
            params.add(like);
            params.add(like);
            params.add(like);
        }
        String selectSql = fieldSelectSql() + where + " order by section_key asc, page_key asc, collection_key asc, section_code asc, field_path asc";
        return pageQuery(selectSql, "select count(1) " + where, pageNo, pageSize, params);
    }

    public AiadcCmsVO.FieldRecord updateField(CurrentUser currentUser, AiadcCmsDTO.FieldValueRequest request) {
        Long tenantId = tenantId(currentUser);
        ensureCatalog(tenantId, currentUser.getUserId());
        validateFieldPath(request.getFieldPath());
        String valueJson = normalizeJson(request.getValueJson());
        AiadcCmsVO.FieldRecord record = findField(
                tenantId,
                request.getSectionKey(),
                request.getPageKey(),
                request.getCollectionKey(),
                request.getAreaKey(),
                request.getSectionCode(),
                request.getFieldPath()
        );
        if (record == null) {
            throw new BizException(ErrorCode.NOT_FOUND, "AIADC CMS field does not exist");
        }
        if (!Boolean.TRUE.equals(record.getEditable())) {
            throw new BizException(ErrorCode.FORBIDDEN, "Field is not editable");
        }
        jdbcTemplate.update("""
                update aiadc_cms_content
                   set draft_value = ?,
                       remark = ?,
                       status = case when status = 'published' then 'published' else 'draft' end,
                       version = version + 1,
                       updated_by = ?,
                       updated_at = now()
                 where id = ?
                   and tenant_id = ?
                   and deleted = 0
                """, valueJson, normalizeText(request.getRemark()), currentUser.getUserId(), record.getId(), tenantId);
        return getField(currentUser, record.getId());
    }

    public AiadcCmsVO.FieldRecord publishField(CurrentUser currentUser, Long id) {
        Long tenantId = tenantId(currentUser);
        AiadcCmsVO.FieldRecord record = getField(currentUser, id);
        jdbcTemplate.update("""
                update aiadc_cms_content
                   set published_value = draft_value,
                       status = 'published',
                       version = version + 1,
                       published_by = ?,
                       published_at = now(),
                       updated_by = ?,
                       updated_at = now()
                 where id = ?
                   and tenant_id = ?
                   and deleted = 0
                """, currentUser.getUserId(), currentUser.getUserId(), record.getId(), tenantId);
        return getField(currentUser, id);
    }

    public AiadcCmsVO.FieldRecord getField(CurrentUser currentUser, Long id) {
        if (id == null) {
            throw new BizException(ErrorCode.BAD_REQUEST, "Field id is required");
        }
        Long tenantId = tenantId(currentUser);
        AiadcCmsVO.FieldRecord record = jdbcTemplate.queryForObject(fieldSelectSql() + """
                from aiadc_cms_content
                where id = ?
                  and tenant_id = ?
                  and deleted = 0
                """, new BeanPropertyRowMapper<>(AiadcCmsVO.FieldRecord.class), id, tenantId);
        if (record == null) {
            throw new BizException(ErrorCode.NOT_FOUND, "AIADC CMS field does not exist");
        }
        return record;
    }

    public AiadcCmsVO.PublicContent publicContent(String locale, String sectionKey) {
        Long tenantId = 1001L;
        List<Object> params = new ArrayList<>();
        params.add(tenantId);
        StringBuilder sql = new StringBuilder(fieldSelectSql()).append("""
                from aiadc_cms_content
                where tenant_id = ?
                  and status = 'published'
                  and published_value is not null
                  and deleted = 0
                """);
        if (StringUtils.hasText(sectionKey)) {
            sql.append(" and section_key = ?");
            params.add(sectionKey.trim());
        }
        List<AiadcCmsVO.FieldRecord> fields = jdbcTemplate.query(sql + " order by section_key asc, id asc", new BeanPropertyRowMapper<>(AiadcCmsVO.FieldRecord.class), params.toArray());
        AiadcCmsVO.PublicContent result = new AiadcCmsVO.PublicContent();
        result.setLocale(StringUtils.hasText(locale) ? locale.trim() : "zh");
        result.setFields(fields);
        result.setValues(buildValueMap(fields));
        return result;
    }

    private void ensureCatalog(Long tenantId, Long userId) {
        if (jdbcTemplate.exists("select 1 from aiadc_cms_content where tenant_id = ? and deleted = 0 limit 1", tenantId)) {
            return;
        }
        for (FieldSpec spec : catalog()) {
            jdbcTemplate.update("""
                    insert into aiadc_cms_content (
                        tenant_id, section_key, section_label, page_key, collection_key, area_key,
                        section_code, field_path, field_type, control_type, required, editable, guarded,
                        status, version, created_by, created_at, updated_by, updated_at, deleted
                    ) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'draft', 1, ?, now(), ?, now(), 0)
                    """,
                    tenantId,
                    spec.sectionKey(),
                    spec.sectionLabel(),
                    spec.pageKey(),
                    spec.collectionKey(),
                    spec.areaKey(),
                    spec.sectionCode(),
                    spec.fieldPath(),
                    spec.fieldType(),
                    spec.controlType(),
                    spec.required() ? 1 : 0,
                    spec.editable() ? 1 : 0,
                    spec.guarded() ? 1 : 0,
                    userId,
                    userId
            );
        }
    }

    private List<FieldSpec> catalog() {
        List<FieldSpec> specs = new ArrayList<>();
        addHero(specs, "competition-promotion", "Competition promotion", "home", "hero");
        addRecord(specs, "competition-promotion", "Competition promotion", "home", null, null, "heroSlides", List.of(
                extra("extra.alt", "string", "input", true),
                extra("extra.accent", "string", "input", false),
                extra("extra.deadline", "string", "input", false)
        ));
        addRecord(specs, "competition-promotion", "Competition promotion", "home", null, null, "stats", List.of(
                extra("value", "string", "input", true),
                extra("label", "string", "input", true)
        ));
        addRecord(specs, "competition-promotion", "Competition promotion", "home", null, null, "groups", List.of());
        addRecord(specs, "competition-promotion", "Competition promotion", "home", null, null, "highlights", List.of());
        addRecord(specs, "competition-promotion", "Competition promotion", "home", null, null, "partners", List.of());
        addRecord(specs, "competition-promotion", "Competition promotion", "home", null, null, "faq", List.of());
        addPlain(specs, "competition-registration", "Competition registration", "home", null, "ctaBanner", null, List.of(
                extra("kicker", "string", "input", false),
                extra("title", "string", "input", true),
                extra("description", "string", "textarea", false),
                extra("action.label", "string", "input", true),
                extra("action.href", "string", "route-or-url-input", true)
        ));
        addRecord(specs, "competition-registration", "Competition registration", "intro", null, null, "tracks", List.of(extra("extra.badge", "string", "input", false)));
        addRecord(specs, "competition-registration", "Competition registration", "materials", null, null, "materials", List.of(
                extra("format", "string", "input", true),
                extra("audience", "string", "input", true),
                extra("actionLabel", "string", "input", true),
                extra("fileUrl", "url", "route-or-url-input", true)
        ));
        addPlain(specs, "competition-registration", "Competition registration", "login", null, "primaryAction", null, List.of(
                extra("label", "string", "input", true),
                extra("href", "string", "route-or-url-input", true),
                extra("target", "_self | _blank", "select", false),
                extra("variant", "primary | secondary | ghost | outline | link", "select", false)
        ));
        addHero(specs, "competition-intro", "Competition introduction", "intro", "hero");
        addRecord(specs, "competition-intro", "Competition introduction", "intro", null, null, "valueCards", List.of());
        addRecord(specs, "competition-intro", "Competition introduction", "intro", null, null, "schedule", List.of(
                extra("date", "string", "input", true),
                extra("detail", "string", "textarea", true),
                extra("featured", "boolean", "switch", false)
        ));
        addRecord(specs, "competition-intro", "Competition introduction", "intro", null, null, "awards", List.of(
                extra("extra.prize", "string", "input", true),
                extra("extra.tone", "gold | silver | bronze | slate", "select", false),
                extra("extra.glyph", "string", "input", false)
        ));
        addRecord(specs, "competition-intro", "Competition introduction", "intro", null, null, "contacts", List.of());
        addHero(specs, "activities", "Activities", "events", "hero");
        addRecord(specs, "activities", "Activities", "events", null, null, "filters", List.of());
        addRecord(specs, "activities", "Activities", "events", null, null, "events", List.of(
                extra("extra.date", "string", "input", true),
                extra("extra.time", "string", "input", true),
                extra("extra.location", "string", "input", true),
                extra("extra.featured", "boolean", "switch", false)
        ));
        addHero(specs, "projects", "Projects", "projects", "hero");
        addRecord(specs, "projects", "Projects", "projects", null, null, "filters", List.of());
        addRecord(specs, "projects", "Projects", "projects", null, null, "stats", List.of(extra("value", "string", "input", true), extra("label", "string", "input", true)));
        addRecord(specs, "projects", "Projects", "projects", null, null, "projects", List.of(
                extra("extra.track", "string", "input", true),
                extra("extra.stage", "string", "input", true),
                extra("extra.date", "string", "input", true),
                extra("extra.highlight", "string", "textarea", true),
                extra("extra.featured", "boolean", "switch", false)
        ));
        addHero(specs, "startup-base", "Startup base", "startup-base", "hero");
        addRecord(specs, "startup-base", "Startup base", "startup-base", null, null, "baseItems", List.of(extra("extra.location", "string", "input", true)));
        addHero(specs, "news", "News", "news", "hero");
        addPlain(specs, "news", "News", null, "newsCategories", null, null, List.of(
                extra("items", "NewsCategorySummary[]", "schema-driven-extra", true)
        ));
        addPlain(specs, "news", "News", null, "newsArticles", null, null, List.of(
                extra("items", "ArticleItem[]", "markdown-editor", true)
        ));
        addPlain(specs, "site-settings", "Site settings", null, "siteShell", null, null, List.of(
                extra("brand.primary", "string", "input", true),
                extra("brand.secondary", "string", "input", true),
                extra("brand.homeAria", "string", "input", true),
                extra("brand.applicationName", "string", "input", true),
                extra("header.mainNavItems", "NavLinkItem[]", "field-group", true),
                extra("footer.columns", "FooterColumn[]", "field-group", true)
        ));
        addPlain(specs, "site-settings", "Site settings", null, "siteMeta", null, null, List.of(extra("seo.title", "string", "input", true), extra("seo.description", "string", "textarea", true)));
        addHero(specs, "legal-pages", "Legal pages", "privacy", "page");
        addPlain(specs, "legal-pages", "Legal pages", "privacy", null, "page", null, List.of(extra("richTextBlocks[].type", "paragraph | markdown", "select", true), extra("richTextBlocks[].content", "string", "markdown-editor", true)));
        addHero(specs, "legal-pages", "Legal pages", "terms", "page");
        addPlain(specs, "legal-pages", "Legal pages", "terms", null, "page", null, List.of(extra("richTextBlocks[].type", "paragraph | markdown", "select", true), extra("richTextBlocks[].content", "string", "markdown-editor", true)));
        return specs;
    }

    private void addHero(List<FieldSpec> specs, String sectionKey, String label, String pageKey, String area) {
        addPlain(specs, sectionKey, label, pageKey, null, area, null, List.of(
                extra("hero.eyebrow", "string", "input", true),
                extra("hero.title", "string", "input", true),
                extra("hero.description", "string", "textarea", true),
                extra("hero.backgroundImage", "url", "image-url-or-upload", false),
                extra("hero.dark", "boolean", "switch", false),
                extra("seo.title", "string", "input", true),
                extra("seo.description", "string", "textarea", true)
        ));
    }

    private void addRecord(List<FieldSpec> specs, String sectionKey, String label, String pageKey, String collectionKey, String areaKey, String sectionCode, List<FieldExtra> extras) {
        addPlain(specs, sectionKey, label, pageKey, collectionKey, areaKey, sectionCode, merge(baseFields(), extras));
    }

    private void addPlain(List<FieldSpec> specs, String sectionKey, String label, String pageKey, String collectionKey, String areaKey, String sectionCode, List<FieldExtra> fields) {
        for (FieldExtra field : fields) {
            specs.add(new FieldSpec(sectionKey, label, pageKey, collectionKey, areaKey, sectionCode, field.path(), field.type(), field.control(), field.required(), field.editable(), field.guarded()));
        }
    }

    private List<FieldExtra> baseFields() {
        return List.of(
                extra("id", "string", "system-id", true, true, false),
                extra("code", "string", "input", true, true),
                extra("locale", "zh | en", "segmented", true),
                extra("title", "string", "input", true),
                extra("subtitle", "string", "input", false),
                extra("description", "string", "textarea", false),
                extra("imageUrl", "url", "image-url-or-upload", false),
                extra("iconKey", "string", "icon-select", false),
                extra("sort", "number", "drag-sort-number", true),
                extra("status", "draft | published", "publish-switch", true),
                extra("tags", "string[]", "tag-input", false),
                extra("cta.label", "string", "input", false),
                extra("cta.href", "string", "route-or-url-input", false),
                extra("badge.text", "string", "input", false),
                extra("badge.tone", "blue | gold | silver | bronze | slate | dark", "select", false)
        );
    }

    private List<FieldExtra> merge(List<FieldExtra> left, List<FieldExtra> right) {
        List<FieldExtra> merged = new ArrayList<>(left);
        merged.addAll(right);
        return merged;
    }

    private FieldExtra extra(String path, String type, String control, boolean required) {
        return extra(path, type, control, required, false);
    }

    private FieldExtra extra(String path, String type, String control, boolean required, boolean guarded) {
        return extra(path, type, control, required, guarded, true);
    }

    private FieldExtra extra(String path, String type, String control, boolean required, boolean guarded, boolean editable) {
        return new FieldExtra(path, type, control, required, guarded, editable);
    }

    private AiadcCmsVO.FieldRecord findField(Long tenantId, String sectionKey, String pageKey, String collectionKey, String areaKey, String sectionCode, String fieldPath) {
        return jdbcTemplate.queryForObject(fieldSelectSql() + """
                from aiadc_cms_content
                where tenant_id = ?
                  and section_key = ?
                  and coalesce(page_key, '') = coalesce(?, '')
                  and coalesce(collection_key, '') = coalesce(?, '')
                  and coalesce(area_key, '') = coalesce(?, '')
                  and coalesce(section_code, '') = coalesce(?, '')
                  and field_path = ?
                  and deleted = 0
                """, new BeanPropertyRowMapper<>(AiadcCmsVO.FieldRecord.class), tenantId, sectionKey, pageKey, collectionKey, areaKey, sectionCode, fieldPath);
    }

    private String normalizeJson(String valueJson) {
        String normalized = StringUtils.hasText(valueJson) ? valueJson.trim() : "null";
        if (normalized.length() > MAX_JSON_LENGTH) {
            throw new BizException(ErrorCode.BAD_REQUEST, "Field JSON is too large");
        }
        try {
            objectMapper.readTree(normalized);
            return normalized;
        } catch (JsonProcessingException exception) {
            try {
                return objectMapper.writeValueAsString(normalized);
            } catch (JsonProcessingException nested) {
                throw new BizException(ErrorCode.BAD_REQUEST, "Invalid field JSON");
            }
        }
    }

    private void validateFieldPath(String fieldPath) {
        if (!StringUtils.hasText(fieldPath) || !SAFE_FIELD_PATH.matcher(fieldPath).matches()) {
            throw new BizException(ErrorCode.BAD_REQUEST, "Invalid field path");
        }
    }

    private String fieldSelectSql() {
        return """
                select id,
                       section_key as sectionKey,
                       section_label as sectionLabel,
                       page_key as pageKey,
                       collection_key as collectionKey,
                       area_key as areaKey,
                       section_code as sectionCode,
                       field_path as fieldPath,
                       field_type as fieldType,
                       control_type as controlType,
                       required as `required`,
                       editable as `editable`,
                       guarded as `guarded`,
                       draft_value as `draftValue`,
                       published_value as `publishedValue`,
                       status,
                       version,
                       remark,
                       updated_at as `updatedAt`,
                       published_at as `publishedAt`
                """;
    }

    private PageResponse<AiadcCmsVO.FieldRecord> pageQuery(String selectSql, String countSql, long pageNo, long pageSize, List<Object> params) {
        long safePageNo = pageNo <= 0 ? 1 : pageNo;
        long safePageSize = Math.max(1L, Math.min(pageSize, MAX_PAGE_SIZE));
        long offset = (safePageNo - 1) * safePageSize;
        List<Object> queryParams = new ArrayList<>(params);
        queryParams.add(safePageSize);
        queryParams.add(offset);
        List<AiadcCmsVO.FieldRecord> records = jdbcTemplate.query(selectSql + " limit ? offset ?", new BeanPropertyRowMapper<>(AiadcCmsVO.FieldRecord.class), queryParams.toArray());
        Long total = safePageNo == 1 && records.size() < safePageSize
                ? (long) records.size()
                : jdbcTemplate.queryForObject(countSql, Long.class, params.toArray());
        PageResponse<AiadcCmsVO.FieldRecord> response = new PageResponse<>();
        response.setRecords(records);
        response.setTotal(total == null ? 0L : total);
        response.setPageNo(safePageNo);
        response.setPageSize(safePageSize);
        return response;
    }

    private Map<String, Object> buildValueMap(List<AiadcCmsVO.FieldRecord> fields) {
        Map<String, Object> values = new LinkedHashMap<>();
        for (AiadcCmsVO.FieldRecord field : fields) {
            String key = String.join(".", List.of(
                    normalizeKey(field.getSectionKey()),
                    normalizeKey(firstNonBlank(field.getPageKey(), field.getCollectionKey())),
                    normalizeKey(firstNonBlank(field.getSectionCode(), field.getAreaKey(), "root")),
                    normalizeKey(field.getFieldPath())
            ));
            values.put(key, parsePublishedValue(field.getPublishedValue()));
        }
        return values;
    }

    private Object parsePublishedValue(String value) {
        if (!StringUtils.hasText(value)) {
            return null;
        }
        try {
            if (value.trim().startsWith("{")) {
                return objectMapper.readValue(value, MAP_TYPE);
            }
            return objectMapper.readValue(value, Object.class);
        } catch (JsonProcessingException exception) {
            return value;
        }
    }

    private String firstNonBlank(String... values) {
        for (String value : values) {
            if (StringUtils.hasText(value)) {
                return value;
            }
        }
        return "";
    }

    private String normalizeKey(String value) {
        return StringUtils.hasText(value) ? value : "root";
    }

    private String normalizeText(String value) {
        return StringUtils.hasText(value) ? value.trim() : null;
    }

    private Long tenantId(CurrentUser currentUser) {
        if (currentUser == null || currentUser.getCurrentTenantId() == null) {
            throw new BizException(ErrorCode.UNAUTHORIZED, "Tenant is required");
        }
        return currentUser.getCurrentTenantId();
    }

    private record FieldSpec(String sectionKey, String sectionLabel, String pageKey, String collectionKey, String areaKey, String sectionCode, String fieldPath, String fieldType, String controlType, boolean required, boolean editable, boolean guarded) {
    }

    private record FieldExtra(String path, String type, String control, boolean required, boolean guarded, boolean editable) {
    }
}
