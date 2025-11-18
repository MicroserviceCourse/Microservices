package org.example.blogservice.service.impl;

import lombok.RequiredArgsConstructor;
import org.example.blogservice.dto.request.CategoryRequest;
import org.example.blogservice.dto.response.CategoryResponse;
import org.example.blogservice.entity.Category;
import org.example.blogservice.mapper.CategoryMapper;
import org.example.blogservice.repository.CategoryRepository;
import org.example.blogservice.service.CategoryService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;
    private final CategoryMapper categoryMapper;

    @Override
    public CategoryResponse create(CategoryRequest request) {
        Category category = categoryMapper.toEntity(request);
        category = categoryRepository.save(category);
        return categoryMapper.toResponse(category);
    }

    @Override
    public CategoryResponse update(Long id, CategoryRequest request) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Category not found: " + id));

        categoryMapper.update(category, request); // nếu mapper có method update
        category = categoryRepository.save(category);

        return categoryMapper.toResponse(category);
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
    public Page<CategoryResponse> getPage(Pageable pageable) {
        return categoryRepository.findAll(pageable)
                .map(categoryMapper::toResponse);
    }
}
