package org.webvibecourse.product_service.mapper.common;


import org.mapstruct.Named;
import org.webvibecourse.product_service.dto.response.CategoryResponse;
import org.webvibecourse.product_service.entity.Category;
import org.webvibecourse.product_service.entity.Product;

import java.util.List;

public interface CommonMapper {
    @Named("mapCategories")
    static List<CategoryResponse> mapCategories(Product product) {
        if (product.getProductCategories() == null) return java.util.Collections.emptyList();

        return product.getProductCategories().stream()
                .map(pc -> {
                    Category c = pc.getCategory();
                    if (c == null) return null;

                    CategoryResponse dto = new CategoryResponse();
                    dto.setId(c.getId());
                    dto.setCode(c.getCode());
                    dto.setName(c.getName());
                    dto.setParentId(c.getParentId());
                    // nếu entity Category có parent -> bạn có thể set parentName ở đây
                    dto.setParentName(null);
                    dto.setSortOrder(c.getSortOrder());
                    dto.setActive(c.isActive());
                    dto.setCreatedAt(c.getCreatedAt());
                    dto.setUpdatedAt(c.getUpdatedAt());
                    // children để trống (null) hoặc Collections.emptyList()
                    return dto;
                })
                .filter(c -> c != null)
                .toList();
    }

}
