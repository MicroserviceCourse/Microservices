package org.webvibecourse.product_service.mapper;

import org.mapstruct.Mapper;
import org.webvibecourse.product_service.dto.request.ProductRequest;
import org.webvibecourse.product_service.dto.response.ProductResponse;
import org.webvibecourse.product_service.entity.Product;

@Mapper(componentModel = "spring")
public interface ProductMapper {

    Product toEntity(ProductRequest request);

    ProductResponse toResponse(Product entity);
}
