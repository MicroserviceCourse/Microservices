package org.webvibecourse.shop_service.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.webvibecourse.shop_service.dto.request.Shop.ShopRequest;
import org.webvibecourse.shop_service.dto.response.ShopResponse;
import org.webvibecourse.shop_service.entity.Shop;

@Mapper(componentModel = "spring")
public interface ShopMapper {


    ShopResponse toResponse(Shop shop);
    @Mapping(target = "createdBy",source = "userId")
    @Mapping(target = "updatedBy",source = "userId")
    @Mapping(target = "ownerId",source = "userId")
    Shop toEntity(ShopRequest request,Long userId);
}
