package org.webvibecourse.product_service.service;

import org.springframework.data.domain.Page;
import org.webvibecourse.product_service.dto.response.VariantResponse;

public interface ProductVariantService {

    Page<VariantResponse> getVariants(
            Integer page,
            Integer size,
            String sort,
            String searchField,
            String searchValue,
            String filter,
            boolean all
    );
}
