package org.example.blogservice.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.example.blogservice.dto.request.PostRequest;
import org.example.blogservice.dto.response.PostResponse;
import org.example.blogservice.service.PostService;
import org.example.commonutils.api.ApiResponse;
import org.example.commonutils.api.PageResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/posts")
@RequiredArgsConstructor
public class PostController {

    private final PostService postService;

    @PostMapping
    public ResponseEntity<ApiResponse<PostResponse>> create(@Valid @RequestBody PostRequest request) {
        PostResponse data = postService.create(request);
        return ResponseEntity.ok(ApiResponse.success(data));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<PostResponse>> update(@PathVariable Long id,
                                                            @Valid @RequestBody PostRequest request) {
        PostResponse data = postService.update(id, request);
        return ResponseEntity.ok(ApiResponse.success(data));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        postService.delete(id);
        return ResponseEntity.ok(ApiResponse.success(null));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<PostResponse>> getById(@PathVariable Long id) {
        PostResponse data = postService.getById(id);
        return ResponseEntity.ok(ApiResponse.success(data));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<PageResponse<PostResponse>>> getPage(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size
    ) {
        Page<PostResponse> resultPage = postService.getPage(PageRequest.of(page, size));
        PageResponse<PostResponse> body = new PageResponse<>(resultPage);
        return ResponseEntity.ok(ApiResponse.success(body));
    }
}
