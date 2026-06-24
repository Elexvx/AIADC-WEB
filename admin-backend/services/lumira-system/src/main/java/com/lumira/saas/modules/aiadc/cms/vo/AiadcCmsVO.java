package com.lumira.saas.modules.aiadc.cms.vo;

import java.util.List;
import java.util.Map;

public final class AiadcCmsVO {

    private AiadcCmsVO() {
    }

    public static class FieldRecord {
        private Long id;
        private String sectionKey;
        private String sectionLabel;
        private String pageKey;
        private String collectionKey;
        private String areaKey;
        private String sectionCode;
        private String fieldPath;
        private String fieldType;
        private String controlType;
        private Boolean required;
        private Boolean editable;
        private Boolean guarded;
        private String draftValue;
        private String publishedValue;
        private String status;
        private Long version;
        private String remark;
        private String updatedAt;
        private String publishedAt;

        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public String getSectionKey() { return sectionKey; }
        public void setSectionKey(String sectionKey) { this.sectionKey = sectionKey; }
        public String getSectionLabel() { return sectionLabel; }
        public void setSectionLabel(String sectionLabel) { this.sectionLabel = sectionLabel; }
        public String getPageKey() { return pageKey; }
        public void setPageKey(String pageKey) { this.pageKey = pageKey; }
        public String getCollectionKey() { return collectionKey; }
        public void setCollectionKey(String collectionKey) { this.collectionKey = collectionKey; }
        public String getAreaKey() { return areaKey; }
        public void setAreaKey(String areaKey) { this.areaKey = areaKey; }
        public String getSectionCode() { return sectionCode; }
        public void setSectionCode(String sectionCode) { this.sectionCode = sectionCode; }
        public String getFieldPath() { return fieldPath; }
        public void setFieldPath(String fieldPath) { this.fieldPath = fieldPath; }
        public String getFieldType() { return fieldType; }
        public void setFieldType(String fieldType) { this.fieldType = fieldType; }
        public String getControlType() { return controlType; }
        public void setControlType(String controlType) { this.controlType = controlType; }
        public Boolean getRequired() { return required; }
        public void setRequired(Boolean required) { this.required = required; }
        public Boolean getEditable() { return editable; }
        public void setEditable(Boolean editable) { this.editable = editable; }
        public Boolean getGuarded() { return guarded; }
        public void setGuarded(Boolean guarded) { this.guarded = guarded; }
        public String getDraftValue() { return draftValue; }
        public void setDraftValue(String draftValue) { this.draftValue = draftValue; }
        public String getPublishedValue() { return publishedValue; }
        public void setPublishedValue(String publishedValue) { this.publishedValue = publishedValue; }
        public String getStatus() { return status; }
        public void setStatus(String status) { this.status = status; }
        public Long getVersion() { return version; }
        public void setVersion(Long version) { this.version = version; }
        public String getRemark() { return remark; }
        public void setRemark(String remark) { this.remark = remark; }
        public String getUpdatedAt() { return updatedAt; }
        public void setUpdatedAt(String updatedAt) { this.updatedAt = updatedAt; }
        public String getPublishedAt() { return publishedAt; }
        public void setPublishedAt(String publishedAt) { this.publishedAt = publishedAt; }
    }

    public static class SectionSummary {
        private String key;
        private String label;
        private Long fieldCount;
        private Long publishedCount;

        public String getKey() { return key; }
        public void setKey(String key) { this.key = key; }
        public String getSectionKey() { return key; }
        public void setSectionKey(String sectionKey) { this.key = sectionKey; }
        public String getLabel() { return label; }
        public void setLabel(String label) { this.label = label; }
        public Long getFieldCount() { return fieldCount; }
        public void setFieldCount(Long fieldCount) { this.fieldCount = fieldCount; }
        public Long getPublishedCount() { return publishedCount; }
        public void setPublishedCount(Long publishedCount) { this.publishedCount = publishedCount; }
    }

    public static class PublicContent {
        private String locale;
        private List<FieldRecord> fields;
        private Map<String, Object> values;

        public String getLocale() { return locale; }
        public void setLocale(String locale) { this.locale = locale; }
        public List<FieldRecord> getFields() { return fields; }
        public void setFields(List<FieldRecord> fields) { this.fields = fields; }
        public Map<String, Object> getValues() { return values; }
        public void setValues(Map<String, Object> values) { this.values = values; }
    }
}
