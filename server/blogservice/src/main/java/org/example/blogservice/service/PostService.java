package org.example.blogservice.service;

import org.example.blogservice.dto.request.PostRequest;
import org.example.blogservice.dto.response.PostResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface PostService {

    void create(PostRequest request);

    void update(Long id, PostRequest request);

    void delete(Long id);

    PostResponse getById(Long id);

    Page<PostResponse> getPage(Integer page,
                               Integer size,
                               String sort,
                               String filter,
                               String searchField,
                               String searchValue,
                               boolean all);
}
