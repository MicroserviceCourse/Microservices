package org.webvibecourse.commission_service.controller;

import lombok.RequiredArgsConstructor;
import org.example.commonutils.api.ApiResponse;
import org.example.commonutils.api.PageResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.webvibecourse.commission_service.dto.response.CommissionHistoryResponse;
import org.webvibecourse.commission_service.service.CommissionHistoryService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/commission-histories")
public class CommissionHistoryController {

    private final CommissionHistoryService service;

    @GetMapping
    public ResponseEntity<ApiResponse<PageResponse<CommissionHistoryResponse>>> getAllCommissionHistories
            (
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
                                service.getCommissionHistories(
                                        page,
                                        size,
                                        sort,
                                        searchField,
                                        searchValue,
                                        filter,
                                        all))
                                   ));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<CommissionHistoryResponse>> getCommissionHistoryById
            (@PathVariable Long id){
        return ResponseEntity.ok(
                ApiResponse.success(service.getCommissionHistoryById(id)));
    }
}
