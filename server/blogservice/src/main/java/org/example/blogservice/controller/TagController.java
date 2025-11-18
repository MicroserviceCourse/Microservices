package org.example.blogservice.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.example.blogservice.dto.request.TagRequest;
import org.example.blogservice.dto.response.TagDto;
import org.example.blogservice.service.TagService;
import org.example.commonutils.api.ApiResponse;
import org.example.commonutils.api.PageResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/tags")
@RequiredArgsConstructor
public class TagController {

    private final TagService tagService;

    @PostMapping
    public ResponseEntity<ApiResponse<TagDto>> create(@Valid @RequestBody TagRequest request) {
        TagDto data = tagService.create(request);
        return ResponseEntity.ok(ApiResponse.success(data));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<TagDto>> update(@PathVariable Long id,
                                                      @Valid @RequestBody TagRequest request) {
        TagDto data = tagService.update(id, request);
        return ResponseEntity.ok(ApiResponse.success(data));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        tagService.delete(id);
        return ResponseEntity.ok(ApiResponse.success(null));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<TagDto>> getById(@PathVariable Long id) {
        TagDto data = tagService.getById(id);
        return ResponseEntity.ok(ApiResponse.success(data));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<PageResponse<TagDto>>> getPage(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size
    ) {
        Page<TagDto> resultPage = tagService.getPage(PageRequest.of(page, size));
        PageResponse<TagDto> body = new PageResponse<>(resultPage);
        return ResponseEntity.ok(ApiResponse.success(body));
    }
}
