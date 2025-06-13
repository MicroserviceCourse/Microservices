package org.example.product_service.service;

import org.example.product_service.dto.request.VariantOptionDTO;
import org.example.product_service.entity.VariantOption;
import org.springframework.data.domain.Page;

public interface VariantOptionService {
    VariantOption create(VariantOptionDTO optionDTO);
    VariantOption update(int id,VariantOptionDTO optionDTO);
    Page<VariantOption> findAll(int page, int size);
    VariantOption findById(int id);
    VariantOptionDTO todo(VariantOption variantOption);
    void deleteVariantOptionById(int id);
}
