package org.webvibecourse.product_service.mapper;

import org.mapstruct.*;
import org.webvibecourse.product_service.dto.request.CategoryRequest;
import org.webvibecourse.product_service.dto.response.CategoryResponse;
import org.webvibecourse.product_service.entity.Category;

@Mapper(componentModel = "spring")
public interface CategoryMapper {
    /**
     Mapper responsible for converting between category and categoryRequest.
     */
    @Mapping(target = "createdBy",source = "userId")
    @Mapping(target = "updatedBy",source = "userId")
    Category toEntity(CategoryRequest request);

    /**
     Mapper responsible for converting between category and categoryRequest.
     */
    @BeanMapping(nullValuePropertyMappingStrategy =
            NullValuePropertyMappingStrategy.IGNORE)
    void update(CategoryRequest request, @MappingTarget Category entity);

    /**
     * Mapper responsible for converting between category and
     * CategoryResponse.
     */
    CategoryResponse toResponse(Category category);
}
