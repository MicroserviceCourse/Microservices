package org.example.blogservice.service;

import org.example.blogservice.dto.request.CategoryRequest;
import org.example.blogservice.dto.response.CategoryResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface CategoryService {

    CategoryResponse create(CategoryRequest request);

    CategoryResponse update(Long id, CategoryRequest request);

    void delete(Long id);

    CategoryResponse getById(Long id);

    Page<CategoryResponse> getPage(Pageable pageable);
}
