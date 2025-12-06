package org.webvibecourse.product_service.mapper;
import org.example.commonutils.util.JsonUtils;

import org.mapstruct.*;
import org.webvibecourse.product_service.dto.request.ProductRequest;
import org.webvibecourse.product_service.dto.response.ProductResponse;
import org.webvibecourse.product_service.entity.Product;
import org.webvibecourse.product_service.mapper.common.CommonMapper;

@Mapper(componentModel = "spring",imports = {JsonUtils.class,CommonMapper.class},uses = {CategoryMapper.class})
public interface ProductMapper extends CommonMapper {

    @Mapping(target = "createdBy", source = "userId")
    @Mapping(target = "updatedBy", source = "userId")
    @Mapping(target = "shopId", source = "shopId")
    @Mapping(target = "galleryUrls",
            expression = "java(JsonUtils.toJson(request.getGalleryUrls()))")

    Product toEntity(ProductRequest request, Long shopId, Long userId);


    @BeanMapping(nullValuePropertyMappingStrategy =
            NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "updatedBy", source = "userId")
    @Mapping(target = "shopId", source = "shopId")
    @Mapping(target = "galleryUrls", ignore = true)
    void update(ProductRequest request, @MappingTarget Product product, Long shopId, Long userId);

    @Mapping(target = "galleryUrls",
            expression = "java(JsonUtils.jsonToList(entity.getGalleryUrls(),String.class))")
    @Mapping(
            target = "categories",
            expression = "java(CommonMapper.mapCategories(entity))"
    )
    ProductResponse toResponse(Product entity);
}
