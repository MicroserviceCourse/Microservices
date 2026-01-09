package org.webvibecourse.product_service.service;

import org.springframework.data.domain.Page;
import org.webvibecourse.product_service.dto.request.PromotionRequest;
import org.webvibecourse.product_service.dto.response.PromotionResponse;

public interface PromotionService {

    void save(PromotionRequest request);

    void update(Long id,PromotionRequest request);

    Page<PromotionResponse>getAll(
            Integer page,
            Integer size,
            String sort,
            String searchField,
            String searchValue,
            String filter,
            boolean all
    );

    PromotionResponse getById(Long id);

    void changeStatus(Long id,Boolean status);
}
