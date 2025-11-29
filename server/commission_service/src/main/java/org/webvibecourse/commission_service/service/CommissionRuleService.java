package org.webvibecourse.commission_service.service;

import org.springframework.data.domain.Page;
import org.webvibecourse.commission_service.dto.request.CommissionRuleRequest;
import org.webvibecourse.commission_service.dto.response.CommissionRuleResponse;

public interface CommissionRuleService {

    void create(CommissionRuleRequest request);

    void update(Long id, CommissionRuleRequest request);

    Page<CommissionRuleResponse> getCommissionRules
            (
                    Integer page,
                    Integer size,
                    String sort,
                    String searchField,
                    String searchValue,
                    String filter,
                    boolean all
            );

    void changeStatus(Long id,Boolean status);

    CommissionRuleResponse findById(Long id);
}
