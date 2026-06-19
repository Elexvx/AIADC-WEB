package com.lumira.saas.modules.aiadc.cms.controller;

import com.lumira.common.api.ApiResponse;
import com.lumira.common.web.TraceContext;
import com.lumira.saas.modules.aiadc.cms.app.AiadcCmsAppService;
import com.lumira.saas.modules.aiadc.cms.vo.AiadcCmsVO;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/public/aiadc/content")
public class PublicAiadcContentController {

    private final AiadcCmsAppService appService;

    public PublicAiadcContentController(AiadcCmsAppService appService) {
        this.appService = appService;
    }

    @GetMapping
    public ApiResponse<AiadcCmsVO.PublicContent> content(
            @RequestParam(name = "locale", defaultValue = "zh") String locale,
            @RequestParam(name = "sectionKey", required = false) String sectionKey
    ) {
        return ApiResponse.success(appService.publicContent(locale, sectionKey), TraceContext.getRequestId());
    }
}
