package org.webvibecourse.product_service.mapper;
import org.example.commonutils.util.JsonUtils;

import org.mapstruct.*;
import org.webvibecourse.product_service.dto.request.ProductRequest;
import org.webvibecourse.product_service.dto.response.ProductResponse;
import org.webvibecourse.product_service.entity.Product;

@Mapper(componentModel = "spring",imports = {JsonUtils.class})
public interface ProductMapper {

    @Mapping(target = "createdBy", source = "userId")
    @Mapping(target = "updatedBy", source = "userId")
    @Mapping(target = "shopId", source = "shopId")
    Product toEntity(ProductRequest request, Long shopId, Long userId);

    @BeanMapping(nullValuePropertyMappingStrategy =
            NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "updatedBy", source = "userId")
    @Mapping(target = "shopId", source = "shopId")
    void update(ProductRequest request, @MappingTarget Product product, Long shopId, Long userId);

    @Mapping(target = "galleryUrls",
            expression = "java(JsonUtils.jsonToList(entity.getGalleryUrls(),String.class))")
    ProductResponse toResponse(Product entity);
}
