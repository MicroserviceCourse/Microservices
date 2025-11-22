package org.example.blogservice.mapper;

import org.example.blogservice.dto.request.CategoryRequest;
import org.example.blogservice.dto.response.CategoryResponse;
import org.example.blogservice.entity.Category;
import org.mapstruct.BeanMapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.Mapper;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring")
public interface CategoryMapper {

    // Từ request -> entity mới để lưu
    Category toEntity(CategoryRequest request);

    // Từ entity -> response trả về API
    CategoryResponse toResponse(Category category);

    // Update entity cũ bằng dữ liệu mới trong request
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void update(@MappingTarget Category category, CategoryRequest request);
}
