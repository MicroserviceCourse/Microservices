package org.webvibecourse.product_service.mapper;

import org.mapstruct.*;
import org.webvibecourse.product_service.dto.request.PromotionRequest;
import org.webvibecourse.product_service.dto.response.PromotionResponse;
import org.webvibecourse.product_service.entity.Promotion;

@Mapper(componentModel = "spring")
public interface PromotionMapper {

    @Mapping(target = "createdBy", source = "userId")
    @Mapping(target = "updatedBy", source = "userId")
    @Mapping(target = "shopId", source = "shopId")
    Promotion toEntity(PromotionRequest request,Long userId,Long shopId);

    @BeanMapping(nullValuePropertyMappingStrategy =
            NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "updatedBy", source = "userId")
    @Mapping(target = "shopId", source = "shopId")
    void update(PromotionRequest request, @MappingTarget Promotion promotion,
                Long userId,Long shopId);

    PromotionResponse toResponse(Promotion promotion);
}
