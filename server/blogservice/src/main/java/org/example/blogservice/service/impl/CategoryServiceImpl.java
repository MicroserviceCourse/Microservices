package org.example.blogservice.service.impl;

import lombok.RequiredArgsConstructor;
import org.example.blogservice.dto.request.CategoryRequest;
import org.example.blogservice.dto.response.CategoryResponse;
import org.example.blogservice.entity.Category;
import org.example.blogservice.mapper.CategoryMapper;
import org.example.blogservice.repository.CategoryRepository;
import org.example.blogservice.service.CategoryService;
import org.example.commonutils.util.SearchHelper;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;
    private final CategoryMapper categoryMapper;

    @Override
    public CategoryResponse create(CategoryRequest request) {
        Category category = categoryMapper.toEntity(request);
        return categoryMapper.toResponse(categoryRepository.save(category));
    }

    @Override
    public void update(Long id, CategoryRequest request) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Category not found: " + id));

        categoryMapper.update(category, request);
        categoryRepository.save(category);
    }


    @Override
    public void delete(Long id) {
        if (!categoryRepository.existsById(id)) {
            throw new NoSuchElementException("Category not found: " + id);
        }
        categoryRepository.deleteById(id);
    }

    @Override
    public CategoryResponse getById(Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Category not found: " + id));
        return categoryMapper.toResponse(category);
    }

    @Override
    public Page<CategoryResponse> getPage(int page, int size, String search, String sort) {

        Pageable pageable = buildPageable(page, size, sort);

        Specification<Category> spec =
                SearchHelper.buildSearchSpec(null, search, List.of("name", "slug", "description"));


        return categoryRepository.findAll(spec, pageable)
                .map(categoryMapper::toResponse);
    }


    private Pageable buildPageable(int page, int size, String sortStr) {
        if (sortStr == null || sortStr.isBlank()) {
            return PageRequest.of(page, size);
        }

        String[] parts = sortStr.split(",");
        String field = parts[0];
        Sort.Direction direction =
                parts.length > 1 && "desc".equalsIgnoreCase(parts[1])
                        ? Sort.Direction.DESC
                        : Sort.Direction.ASC;

        return PageRequest.of(page, size, Sort.by(direction, field));
    }
}
