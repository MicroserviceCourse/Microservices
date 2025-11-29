package org.webvibecourse.commission_service.service;

import org.springframework.data.domain.Page;
import org.webvibecourse.commission_service.dto.response.CommissionHistoryResponse;

public interface CommissionHistoryService {

    Page<CommissionHistoryResponse> getCommissionHistories
            (
                    Integer page,
                    Integer size,
                    String sort,
                    String searchField,
                    String searchValue,
                    String filter,
                    boolean all
            );

    CommissionHistoryResponse getCommissionHistoryById(Long id);
}
