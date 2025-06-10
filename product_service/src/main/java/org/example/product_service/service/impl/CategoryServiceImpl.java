package org.example.product_service.service.impl;

import lombok.RequiredArgsConstructor;
import org.example.product_service.Repository.CategoryRepository;
import org.example.product_service.dto.request.CategoryDTO;
import org.example.product_service.entity.Category;
import org.example.product_service.exception.ErrorHandler;
import org.example.product_service.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {
    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public Category createCategory(CategoryDTO categoryDTO) {
        try {
            Category category = new Category();
            category.setTenDanhMuc(categoryDTO.getTenDanhMuc());
            return categoryRepository.save(category);
        } catch (Exception e) {
            throw new RuntimeException("Không thể thêm danh mục sản phẩm");
        }
    }

    @Override
    public Category updateCategory(int id, CategoryDTO categoryDTO) {
        try {
            Optional<Category> optionalCategory = categoryRepository.findById(id);
            if (optionalCategory.isPresent()) {
                Category category = optionalCategory.get();
                category.setTenDanhMuc(categoryDTO.getTenDanhMuc());
                return categoryRepository.save(category);
            } else {
                throw new RuntimeException("Không thể tìm thấy danh mục sản phẩm với id:" + id);
            }
        } catch (Exception e) {
            throw new RuntimeException("Không thể cập nhật danh mục sản phẩm");
        }
    }

    @Override
    public Page<Category> findAll(int page, int size) {
        return categoryRepository.findAll(PageRequest.of(page, size));
    }

    @Override
    public CategoryDTO todo(Category category) {
        CategoryDTO categoryDTO = new CategoryDTO();
        categoryDTO.setId(category.getId());
        categoryDTO.setTenDanhMuc(category.getTenDanhMuc());
        return categoryDTO;
    }

    @Override
    public Category findById(int id) {
        return categoryRepository.findById(id)
                .orElseThrow(()->new ErrorHandler(HttpStatus.NOT_FOUND,"Không tìm thấy danh mục"));
    }

    @Override
    public void deleteCategoryById(int id) {
        try {
            if(!categoryRepository.existsById(id)) {
                throw new Exception("Không tìm thấy danh mục sản phẩm với id:" + id);
            }
            categoryRepository.deleteById(id);
        }catch (Exception e) {
            throw new RuntimeException("Không thể xóa danh mục sản phẩm");
        }
    }
}
