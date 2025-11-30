package org.webvibecourse.product_service.mapper;

import org.mapstruct.*;
import org.webvibecourse.product_service.dto.request.CategoryRequest;
import org.webvibecourse.product_service.dto.response.CategoryResponse;
import org.webvibecourse.product_service.entity.Category;
import org.webvibecourse.product_service.mapper.common.CommonMapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CategoryMapper extends CommonMapper {
    /**
     Mapper responsible for converting between category and categoryRequest.
     */
    @Mapping(target = "createdBy",source = "userId")
    @Mapping(target = "updatedBy",source = "userId")
    Category toEntity(CategoryRequest request,Long userId);

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
    @Mapping(target = "parentName", ignore = true)
    @Mapping(target = "level", ignore = true)
    @Mapping(target = "children", ignore = true)
    CategoryResponse toResponse(Category category);
}
