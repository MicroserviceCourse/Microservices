package org.example.product_service.service;

import org.example.product_service.dto.request.CategoryDTO;
import org.example.product_service.entity.Category;
import org.springframework.data.domain.Page;

public interface CategoryService {
    Category createCategory(CategoryDTO categoryDTO);
    Category updateCategory(int id, CategoryDTO categoryDTO);
    Page<Category>findAll(int page, int size);
    CategoryDTO todo(Category category);
    Category findById(int id);
    void deleteCategoryById(int id);
}
