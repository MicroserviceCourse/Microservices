package org.webvibecourse.product_service.controller;

import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.RequiredArgsConstructor;
import org.example.commonutils.api.ApiResponse;
import org.example.commonutils.api.PageResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.webvibecourse.product_service.dto.request.ProductRequest;
import org.webvibecourse.product_service.dto.response.ProductResponse;
import org.webvibecourse.product_service.service.ProductService;

import java.beans.PropertyEditorSupport;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService service;

    @PostMapping
    public ResponseEntity<ApiResponse<Void>> create
            (
                    @RequestBody ProductRequest request
            ){
        service.create(request);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Product created successfully"));
    }
    @GetMapping
    public ResponseEntity<ApiResponse<PageResponse<ProductResponse>>> getProducts
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
                ApiResponse.success
                        (new PageResponse<>(
                                service.getProducts(
                                        page,
                                        size,
                                        sort,
                                        searchField,
                                        searchValue,
                                        filter,
                                        all))));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<ApiResponse<Void>> changeStatus(@PathVariable Long id, @RequestParam Integer status){
        service.changeStatus(id,status);
        return ResponseEntity.ok(ApiResponse.success("Product status changed successfully"));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ProductResponse>> getProductById(@PathVariable Long id){
        return ResponseEntity.ok(ApiResponse.success(service.findById(id)));
    }
    @PutMapping(value = "/{id}",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ApiResponse<Void>> update(
            @PathVariable Long id,
            @RequestPart("data") ProductRequest request,
            @RequestParam(value = "thumbnail",required = false) MultipartFile thumbnail,

            @RequestParam(value = "gallery", required = false)
            @Parameter(required = false, allowEmptyValue = true) List<MultipartFile> gallery,

                @RequestParam(value = "variantImages", required = false)
            @Parameter(required = false, allowEmptyValue = true) List<MultipartFile> variantImages
                                                   ){
        service.update(id, request,thumbnail,gallery,variantImages);

        return ResponseEntity.ok(ApiResponse.success("Product updated successfully"));
    }
}
