package org.webvibecourse.shop_service.controller;

import lombok.RequiredArgsConstructor;
import org.example.commonutils.api.ApiResponse;
import org.example.commonutils.api.PageResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.webvibecourse.shop_service.dto.response.ShopStatusHistoryResponse;
import org.webvibecourse.shop_service.service.ShopStatusHistoryService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/shop-status-histories")
public class ShopStatusHistoryController {

    private final ShopStatusHistoryService service;

    @GetMapping
    public ResponseEntity<ApiResponse<PageResponse<ShopStatusHistoryResponse>>> getShopStatusHistories
            (
                    @RequestParam(defaultValue = "1") Integer page,
                    @RequestParam(defaultValue = "5") Integer size,
                    @RequestParam(defaultValue = "id,desc") String sort,
                    @RequestParam(required = false) String filter,
                    @RequestParam(required = false) String searchField,
                    @RequestParam(required = false) String searchValue,
                    @RequestParam(defaultValue = "false") Boolean all
            ) {
        return ResponseEntity.ok(
                ApiResponse.success
                        (new PageResponse<>(
                                service.getShopStatusHistories(
                                        page,
                                        size,
                                        sort,
                                        searchField,
                                        searchValue,
                                        filter,
                                        all))
                        ));
    }
}
