package org.webvibecourse.shop_service.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.webvibecourse.shop_service.dto.request.Shop.ShopAddressRequest;
import org.webvibecourse.shop_service.dto.request.Shop.ShopRequest;
import org.webvibecourse.shop_service.dto.response.ShopAddressResponse;
import org.webvibecourse.shop_service.entity.ShopAddress;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ShopAddressMapper {

    ShopAddressResponse toResponse(ShopAddress address);

    @Mapping(target = "createdBy",source = "userId")
    @Mapping(target = "updatedBy",source = "userId")
    ShopAddress toEntity(ShopAddressRequest request,Long userId);
}
