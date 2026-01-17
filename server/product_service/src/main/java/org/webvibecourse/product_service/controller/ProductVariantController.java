package org.webvibecourse.product_service.controller;

import lombok.RequiredArgsConstructor;
import org.example.commonutils.api.ApiResponse;
import org.example.commonutils.api.PageResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.webvibecourse.product_service.dto.response.VariantResponse;
import org.webvibecourse.product_service.service.ProductVariantService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/variants")
public class ProductVariantController {

    private final ProductVariantService service;

    @GetMapping
    public ResponseEntity<ApiResponse<PageResponse<VariantResponse>>> getAll(
            @RequestParam(defaultValue = "1") Integer page,
            @RequestParam(defaultValue = "5") Integer size,
            @RequestParam(defaultValue = "id,desc") String sort,
            @RequestParam(required = false) String filter,
            @RequestParam(required = false) String searchField,
            @RequestParam(required = false) String searchValue,
            @RequestParam(defaultValue = "false") Boolean all
    ){
        return ResponseEntity.ok(
                ApiResponse.success(
                        new PageResponse<>(
                                service.getVariants(
                                        page,
                                        size,
                                        sort,
                                        searchField,
                                        searchValue,
                                        filter,
                                        all
                                )
                        )
                )
        );
    }
}
