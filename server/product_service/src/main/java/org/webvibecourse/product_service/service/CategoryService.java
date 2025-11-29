package org.webvibecourse.product_service.service;

import org.springframework.data.domain.Page;
import org.webvibecourse.product_service.dto.request.CategoryRequest;
import org.webvibecourse.product_service.dto.response.CategoryResponse;

public interface CategoryService {

    void create(CategoryRequest request);

    void update(Long id, CategoryRequest request);

    Page<CategoryResponse> getCategories
            (
                    Integer page,
                    Integer size,
                    String sort,
                    String searchField,
                    String searchValue,
                    String filter,
                    boolean all
            );

    CategoryResponse getCategoryById(Long id);

    void changeStatus(Long id,Boolean status);
}
