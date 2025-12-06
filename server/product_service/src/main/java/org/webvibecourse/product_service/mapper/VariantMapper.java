package org.webvibecourse.product_service.mapper;

import org.mapstruct.*;
import org.webvibecourse.product_service.dto.request.ProductVariantRequest;
import org.webvibecourse.product_service.dto.response.VariantResponse;
import org.webvibecourse.product_service.entity.Product;
import org.webvibecourse.product_service.entity.ProductVariant;

@Mapper(componentModel = "spring")
public interface VariantMapper {

    @Mapping(target = "id",ignore = true)
    @Mapping(target = "product",source = "product")
    @Mapping(target = "name", source = "request.name")
    @Mapping(target = "sku", source = "request.sku")
    @Mapping(target = "price", source = "request.price")
    ProductVariant toEntity(ProductVariantRequest request, Product product);


    VariantResponse toResponse(ProductVariant entity);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "product", ignore = true)
    @Mapping(target = "imageUrl", ignore = true)
    void update(@MappingTarget ProductVariant entity, ProductVariantRequest request);

}
