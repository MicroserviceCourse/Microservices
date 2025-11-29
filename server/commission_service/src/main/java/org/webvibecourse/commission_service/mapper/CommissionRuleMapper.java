package org.webvibecourse.commission_service.mapper;

import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.webvibecourse.commission_service.dto.request.CommissionRuleRequest;
import org.webvibecourse.commission_service.dto.response.CommissionRuleResponse;
import org.webvibecourse.commission_service.entity.CommissionRule;

@Mapper(componentModel = "spring")
public interface CommissionRuleMapper {

    CommissionRule toEntity(CommissionRuleRequest request);

    @BeanMapping(nullValuePropertyMappingStrategy =
            NullValuePropertyMappingStrategy.IGNORE)
    void update(CommissionRuleRequest request,
                @MappingTarget CommissionRule entity);

    CommissionRuleResponse toResponse(CommissionRule entity);
}
