package org.webvibecourse.shop_service.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.webvibecourse.shop_service.dto.request.Shop.ShopVerificationRequest;
import org.webvibecourse.shop_service.entity.ShopVerification;

@Mapper(componentModel = "spring")
public interface ShopVerificationMapper {

    @Mapping(target = "createdBy",source = "userId")
    @Mapping(target = "updatedBy",source = "userId")
    ShopVerification toEntity(ShopVerificationRequest request,Long userId);
}
