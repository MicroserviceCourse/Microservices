package org.webvibecourse.product_service.controller;

import lombok.RequiredArgsConstructor;
import org.example.commonutils.api.ApiResponse;
import org.example.commonutils.api.PageResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.webvibecourse.product_service.dto.request.PromotionRequest;
import org.webvibecourse.product_service.dto.response.PromotionResponse;
import org.webvibecourse.product_service.service.PromotionService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/promotions")
public class PromotionController {

    private final PromotionService service;

    @PostMapping
    public ResponseEntity<ApiResponse<Void>> create(
            @RequestBody PromotionRequest request
    ){
        service.save(request);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Promotion created successfully"));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> update(
            @RequestBody PromotionRequest request,
            @PathVariable Long id
    ){
        service.update(id,request);

        return ResponseEntity.ok(ApiResponse.success("Promotion updated successfully"));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<PageResponse<PromotionResponse>>> getPromotion(
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
                                service.getAll(
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
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<PromotionResponse>>getPromotionById(
            @PathVariable Long id
    ){
        return ResponseEntity.ok(ApiResponse.success(service.getById(id)));
    }
}
