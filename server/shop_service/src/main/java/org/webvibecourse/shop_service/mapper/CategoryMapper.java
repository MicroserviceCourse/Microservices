package org.webvibecourse.shop_service.mapper;

import org.mapstruct.Mapper;
import org.webvibecourse.shop_service.dto.response.CategoryResponse;
import org.webvibecourse.shop_service.entity.Category;

@Mapper(componentModel = "spring")
public interface CategoryMapper {
    CategoryResponse toResponse(Category category);
}
