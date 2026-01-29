package org.webvibecourse.shop_service.service.impl;

import lombok.RequiredArgsConstructor;
import org.example.commonutils.util.GenericSpecBuilder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.webvibecourse.shop_service.dto.response.CategoryResponse;
import org.webvibecourse.shop_service.entity.Category;
import org.webvibecourse.shop_service.mapper.CategoryMapper;
import org.webvibecourse.shop_service.repository.CategoryRepository;
import org.webvibecourse.shop_service.service.CategoryService;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {
    private final CategoryRepository categoryRepository;
    private final CategoryMapper mapper;
    private static final List<String> SEARCH_FIELDS =
            List.of("name");

    @Override
    public Page<CategoryResponse> getAll(Integer page, Integer size,
                                         String sort, String searchField,
                                         String searchValue, String filter, boolean all) {
        Pageable pageable = all ? Pageable.unpaged() : PageRequest.of(page - 1, size);

        Specification<Category> spec = GenericSpecBuilder.build(
                sort, filter, searchField, searchValue, SEARCH_FIELDS
        );
        return categoryRepository.findAll(spec, pageable)
                .map(mapper::toResponse);
    }
}
