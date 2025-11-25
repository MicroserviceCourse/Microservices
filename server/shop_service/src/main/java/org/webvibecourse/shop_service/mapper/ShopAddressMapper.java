package org.webvibecourse.shop_service.mapper;

import org.mapstruct.Mapper;
import org.webvibecourse.shop_service.dto.response.ShopAddressResponse;
import org.webvibecourse.shop_service.entity.ShopAddress;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ShopAddressMapper {

    ShopAddressResponse toResponse(ShopAddress address);

    List<ShopAddressResponse> toResponseList(List<ShopAddress> addresses);
}
