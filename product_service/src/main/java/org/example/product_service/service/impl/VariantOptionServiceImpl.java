package org.example.product_service.service.impl;

import org.example.product_service.Repository.VarionOptionRepository;
import org.example.product_service.dto.request.VariantOptionDTO;
import org.example.product_service.entity.VariantOption;
import org.example.product_service.exception.ErrorHandler;
import org.example.product_service.service.VariantOptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class VariantOptionServiceImpl implements VariantOptionService {
    @Autowired
    private VarionOptionRepository varionOptionRepository;

    @Override
    public VariantOption create(VariantOptionDTO optionDTO) {
        try {
            VariantOption option = new VariantOption();
            option.setValue(optionDTO.getValue());
            option.setType(optionDTO.getType());
            return varionOptionRepository.save(option);
        } catch (Exception e) {
            throw new RuntimeException("Không thể thêm Thuộc tính sản phẩm");
        }
    }

    @Override
    public VariantOption update(int id, VariantOptionDTO optionDTO) {
        try {
            Optional<VariantOption> variantOption = varionOptionRepository.findById(id);
            if (variantOption.isPresent()) {
                VariantOption option = variantOption.get();
                option.setValue(optionDTO.getValue());
                option.setType(optionDTO.getType());
                return varionOptionRepository.save(option);
            } else {
                throw new RuntimeException("Không thể tìm thấy Thuộc tính sản phẩm với id:" + id);
            }
        } catch (Exception e) {
            throw new RuntimeException("Không thể cập nhật Thuộc tính sản phẩm");
        }
    }

    @Override
    public Page<VariantOption> findAll(int page, int size) {
        return varionOptionRepository.findAll(PageRequest.of(page, size));
    }

    @Override
    public VariantOption findById(int id) {
        return varionOptionRepository.findById(id)
                .orElseThrow(() -> new ErrorHandler(HttpStatus.NOT_FOUND, "Không tìm thấy thuộc tính sán phẩm"));
    }

    @Override
    public VariantOptionDTO todo(VariantOption variantOption) {
        VariantOptionDTO variantOptionDTO = new VariantOptionDTO();
        variantOptionDTO.setId(variantOption.getId());
        variantOptionDTO.setValue(variantOption.getValue());
        variantOptionDTO.setType(variantOption.getType());
        return variantOptionDTO;
    }
}
