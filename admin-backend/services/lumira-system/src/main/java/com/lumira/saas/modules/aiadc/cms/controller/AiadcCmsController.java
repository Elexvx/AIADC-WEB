package com.lumira.saas.modules.aiadc.cms.controller;

import com.lumira.common.api.ApiResponse;
import com.lumira.common.security.PermissionGuard;
import com.lumira.common.security.SecurityContextFacade;
import com.lumira.common.vo.PageResponse;
import com.lumira.common.web.TraceContext;
import com.lumira.common.web.repeatsubmit.RepeatSubmit;
import com.lumira.saas.modules.aiadc.cms.app.AiadcCmsAppService;
import com.lumira.saas.modules.aiadc.cms.dto.AiadcCmsDTO;
import com.lumira.saas.modules.aiadc.cms.vo.AiadcCmsVO;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/aiadc/cms")
public class AiadcCmsController {

    private final AiadcCmsAppService appService;
    private final SecurityContextFacade securityContextFacade;
    private final PermissionGuard permissionGuard;

    public AiadcCmsController(
            AiadcCmsAppService appService,
            SecurityContextFacade securityContextFacade,
            PermissionGuard permissionGuard
    ) {
        this.appService = appService;
        this.securityContextFacade = securityContextFacade;
        this.permissionGuard = permissionGuard;
    }

    @GetMapping("/sections")
    public ApiResponse<List<AiadcCmsVO.SectionSummary>> sections() {
        require("aiadc:cms:view");
        return ApiResponse.success(appService.sections(securityContextFacade.getCurrentUser()), TraceContext.getRequestId());
    }

    @GetMapping("/fields")
    public ApiResponse<PageResponse<AiadcCmsVO.FieldRecord>> fields(
            @RequestParam(name = "sectionKey", required = false) String sectionKey,
            @RequestParam(name = "keyword", required = false) String keyword,
            @RequestParam(name = "status", required = false) String status,
            @RequestParam(name = "pageNo", defaultValue = "1") long pageNo,
            @RequestParam(name = "pageSize", defaultValue = "20") long pageSize
    ) {
        require("aiadc:cms:view");
        return ApiResponse.success(appService.listFields(securityContextFacade.getCurrentUser(), sectionKey, keyword, status, pageNo, pageSize), TraceContext.getRequestId());
    }

    @PutMapping("/fields")
    @RepeatSubmit
    public ApiResponse<AiadcCmsVO.FieldRecord> updateField(@Valid @RequestBody AiadcCmsDTO.FieldValueRequest request) {
        require("aiadc:cms:update");
        return ApiResponse.success(appService.updateField(securityContextFacade.getCurrentUser(), request), TraceContext.getRequestId());
    }

    @PostMapping("/fields/{id}/publish")
    @RepeatSubmit
    public ApiResponse<AiadcCmsVO.FieldRecord> publish(@PathVariable("id") Long id) {
        require("aiadc:cms:publish");
        return ApiResponse.success(appService.publishField(securityContextFacade.getCurrentUser(), id), TraceContext.getRequestId());
    }

    private void require(String permissionKey) {
        permissionGuard.requirePermission(securityContextFacade.getCurrentUser(), permissionKey);
    }
}
