package org.webvibecourse.commission_service.mapper;

import org.mapstruct.Mapper;
import org.webvibecourse.commission_service.dto.response.CommissionHistoryResponse;
import org.webvibecourse.commission_service.entity.CommissionHistory;
@Mapper(componentModel = "spring")
public interface CommissionHistoryMapper {

    /**
     * Mapper responsible for converting between commission history and
     * CommissionHistoryResponse.
     */
    CommissionHistoryResponse toResponse(CommissionHistory entity);
}
