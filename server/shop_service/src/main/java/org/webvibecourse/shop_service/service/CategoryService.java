package org.webvibecourse.shop_service.service;

import org.springframework.data.domain.Page;
import org.webvibecourse.shop_service.dto.response.CategoryResponse;

public interface CategoryService {

    Page<CategoryResponse>getAll(
            Integer page,
            Integer size,
            String sort,
            String searchField,
            String searchValue,
            String filter,
            boolean all
    );
}
