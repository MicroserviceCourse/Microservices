package org.webvibecourse.shop_service.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.webvibecourse.shop_service.dto.response.ShopResponse;
import org.webvibecourse.shop_service.entity.Shop;

@Mapper(componentModel = "spring")
public interface ShopMapper {

    @Mapping(target = "addresses", source = "addresses")
    ShopResponse toResponse(Shop shop);
}
