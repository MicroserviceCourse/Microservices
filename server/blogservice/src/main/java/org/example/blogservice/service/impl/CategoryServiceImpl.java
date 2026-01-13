package org.example.blogservice.service.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.blogservice.dto.request.CategoryRequest;
import org.example.blogservice.dto.response.CategoryResponse;
import org.example.blogservice.entity.Category;
import org.example.blogservice.mapper.CategoryMapper;
import org.example.blogservice.repository.CategoryRepository;
import org.example.blogservice.service.CategoryService;
import org.example.commonsecurity.SecurityUtils;
import org.example.commonutils.util.GenericSpecBuilder;
import org.example.commonutils.util.SearchHelper;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
@Slf4j
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;
    private final CategoryMapper categoryMapper;
    private final SecurityUtils securityUtils;
    private static final List<String> SEARCH_FIELDS =
            List.of("name");
    @Override
    public void create(CategoryRequest request) {
        Category category = categoryMapper.toEntity(request,securityUtils.getCurrentUserId());
        categoryRepository.save(category);
    }

    @Override
    public void update(Long id, CategoryRequest request) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Category not found: " + id));

        categoryMapper.update(category, request,securityUtils.getCurrentUserId());
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
    public Page<CategoryResponse> getPage(Integer page,
                                          Integer size,
                                          String sort,
                                          String filter,
                                          String searchField,
                                          String searchValue,
                                          boolean all) {
        log.info("start get category Post");

        Pageable pageable = all
                ? Pageable.unpaged()
                : PageRequest.of(page-1,size);

        Specification<Category> spec = GenericSpecBuilder
                .build(sort,filter,searchField,searchValue,SEARCH_FIELDS);

        return categoryRepository.findAll(spec,pageable)
                .map(categoryMapper::toResponse);
    }


}
