CREATE TABLE IF NOT EXISTS aiadc_cms_content (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  tenant_id BIGINT NOT NULL,
  section_key VARCHAR(64) NOT NULL,
  section_label VARCHAR(128) NOT NULL,
  page_key VARCHAR(64) NULL,
  collection_key VARCHAR(64) NULL,
  area_key VARCHAR(64) NULL,
  section_code VARCHAR(64) NULL,
  field_path VARCHAR(255) NOT NULL,
  field_type VARCHAR(128) NOT NULL,
  control_type VARCHAR(64) NOT NULL,
  required TINYINT(1) NOT NULL DEFAULT 0,
  editable TINYINT(1) NOT NULL DEFAULT 1,
  guarded TINYINT(1) NOT NULL DEFAULT 0,
  draft_value JSON NULL,
  published_value JSON NULL,
  status VARCHAR(32) NOT NULL DEFAULT 'draft',
  version BIGINT NOT NULL DEFAULT 1,
  remark VARCHAR(512) NULL,
  created_by BIGINT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_by BIGINT NULL,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  published_by BIGINT NULL,
  published_at DATETIME NULL,
  deleted TINYINT(1) NOT NULL DEFAULT 0,
  UNIQUE KEY uk_aiadc_cms_field (tenant_id, section_key, page_key, collection_key, area_key, section_code, field_path),
  KEY idx_aiadc_cms_section_status (tenant_id, section_key, status, deleted),
  KEY idx_aiadc_cms_page (tenant_id, page_key, deleted),
  KEY idx_aiadc_cms_updated_at (tenant_id, updated_at)
);

INSERT INTO sys_permission (tenant_id, permission_key, permission_name, permission_group, source_type, plugin_code, created_by, created_at, updated_by, updated_at, deleted)
SELECT 1001, 'aiadc:cms:view', 'AIADC content view', 'aiadc', 'BUSINESS', NULL, 0, CURRENT_TIMESTAMP, 0, CURRENT_TIMESTAMP, 0
WHERE NOT EXISTS (SELECT 1 FROM sys_permission WHERE tenant_id = 1001 AND permission_key = 'aiadc:cms:view');

INSERT INTO sys_permission (tenant_id, permission_key, permission_name, permission_group, source_type, plugin_code, created_by, created_at, updated_by, updated_at, deleted)
SELECT 1001, 'aiadc:cms:update', 'AIADC content update', 'aiadc', 'BUSINESS', NULL, 0, CURRENT_TIMESTAMP, 0, CURRENT_TIMESTAMP, 0
WHERE NOT EXISTS (SELECT 1 FROM sys_permission WHERE tenant_id = 1001 AND permission_key = 'aiadc:cms:update');

INSERT INTO sys_permission (tenant_id, permission_key, permission_name, permission_group, source_type, plugin_code, created_by, created_at, updated_by, updated_at, deleted)
SELECT 1001, 'aiadc:cms:publish', 'AIADC content publish', 'aiadc', 'BUSINESS', NULL, 0, CURRENT_TIMESTAMP, 0, CURRENT_TIMESTAMP, 0
WHERE NOT EXISTS (SELECT 1 FROM sys_permission WHERE tenant_id = 1001 AND permission_key = 'aiadc:cms:publish');

INSERT INTO sys_role_permission (tenant_id, role_id, permission_key, created_by, created_at, updated_by, updated_at, deleted)
SELECT 1001, 2001, 'aiadc:cms:view', 0, CURRENT_TIMESTAMP, 0, CURRENT_TIMESTAMP, 0
WHERE NOT EXISTS (SELECT 1 FROM sys_role_permission WHERE tenant_id = 1001 AND role_id = 2001 AND permission_key = 'aiadc:cms:view');

INSERT INTO sys_role_permission (tenant_id, role_id, permission_key, created_by, created_at, updated_by, updated_at, deleted)
SELECT 1001, 2001, 'aiadc:cms:update', 0, CURRENT_TIMESTAMP, 0, CURRENT_TIMESTAMP, 0
WHERE NOT EXISTS (SELECT 1 FROM sys_role_permission WHERE tenant_id = 1001 AND role_id = 2001 AND permission_key = 'aiadc:cms:update');

INSERT INTO sys_role_permission (tenant_id, role_id, permission_key, created_by, created_at, updated_by, updated_at, deleted)
SELECT 1001, 2001, 'aiadc:cms:publish', 0, CURRENT_TIMESTAMP, 0, CURRENT_TIMESTAMP, 0
WHERE NOT EXISTS (SELECT 1 FROM sys_role_permission WHERE tenant_id = 1001 AND role_id = 2001 AND permission_key = 'aiadc:cms:publish');

