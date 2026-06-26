package com.lumira.saas.modules.aiadc.cms.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public final class AiadcCmsDTO {

    private AiadcCmsDTO() {
    }

    public static class FieldValueRequest {
        @NotBlank
        @Size(max = 64)
        private String sectionKey;
        @Size(max = 64)
        private String pageKey;
        @Size(max = 64)
        private String collectionKey;
        @Size(max = 64)
        private String areaKey;
        @Size(max = 64)
        private String sectionCode;
        @NotBlank
        @Size(max = 255)
        private String fieldPath;
        @Size(max = 200000)
        private String valueJson;
        @Size(max = 512)
        private String remark;

        public String getSectionKey() { return sectionKey; }
        public void setSectionKey(String sectionKey) { this.sectionKey = sectionKey; }
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
        public String getValueJson() { return valueJson; }
        public void setValueJson(String valueJson) { this.valueJson = valueJson; }
        public String getRemark() { return remark; }
        public void setRemark(String remark) { this.remark = remark; }
    }
}
