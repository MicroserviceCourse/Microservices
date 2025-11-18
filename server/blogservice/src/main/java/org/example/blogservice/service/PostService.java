package org.example.blogservice.service;

import org.example.blogservice.dto.request.PostRequest;
import org.example.blogservice.dto.response.PostResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface PostService {

    PostResponse create(PostRequest request);

    PostResponse update(Long id, PostRequest request);

    void delete(Long id);

    PostResponse getById(Long id);

    Page<PostResponse> getPage(Pageable pageable);
}
