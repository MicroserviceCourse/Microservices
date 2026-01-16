package org.example.blogservice.mapper;

import org.example.blogservice.dto.request.CategoryRequest;
import org.example.blogservice.dto.response.CategoryResponse;
import org.example.blogservice.entity.Category;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface CategoryMapper {

    // Từ request -> entity mới để lưu
    @Mapping(target = "createdBy", source = "userId")
    @Mapping(target = "updatedBy", source = "userId")
    Category toEntity(CategoryRequest request,Long userId);

    // Từ entity -> response trả về API


    // Update entity cũ bằng dữ liệu mới trong request
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "createdBy", source = "userId")
    @Mapping(target = "updatedBy", source = "userId")
    void update(@MappingTarget Category category, CategoryRequest request,Long userId);

    @Mapping(target = "blogCategoryCode",source = "blogCategoryCode")
    CategoryResponse toResponse(Category category);
}
