package org.webvibecourse.commission_service.controller;

import lombok.RequiredArgsConstructor;
import org.example.commonutils.api.ApiResponse;
import org.example.commonutils.api.PageResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.webvibecourse.commission_service.dto.request.CommissionRuleRequest;
import org.webvibecourse.commission_service.dto.response.CommissionRuleResponse;
import org.webvibecourse.commission_service.service.CommissionRuleService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/commission-rule")
public class CommissionRuleController {

    private final CommissionRuleService service;

    @PostMapping
    public ResponseEntity<ApiResponse<Void>> create
            (@RequestBody CommissionRuleRequest request){

        service.create(request);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Commission rule created"));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> update
            (@RequestBody CommissionRuleRequest request,
             @PathVariable Long id){

        service.update(id, request);

        return ResponseEntity.ok(ApiResponse.success
                ("Commission rule updated"));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<PageResponse<CommissionRuleResponse>>> getAll
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
                                service.getCommissionRules(
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
    public ResponseEntity<ApiResponse<CommissionRuleResponse>> getById
            (@PathVariable Long id){

        return ResponseEntity.ok(ApiResponse.success
                (service.findById(id)));
    }
}
