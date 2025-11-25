package org.webvibecourse.shop_service.mapper;

import org.mapstruct.Mapper;
import org.webvibecourse.shop_service.dto.response.ShopStatusHistoryResponse;
import org.webvibecourse.shop_service.entity.ShopStatusHistory;

@Mapper(componentModel = "spring")
public interface ShopStatusHistoryMapper {

    ShopStatusHistoryResponse toResponse
            (ShopStatusHistory shopStatusHistory);
}
