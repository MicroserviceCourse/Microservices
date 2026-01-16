package org.webvibecourse.product_service.service.impl;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.commonsecurity.SecurityUtils;
import org.example.commonutils.Enum.PromotionStatus;
import org.example.commonutils.util.GenericSpecBuilder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.webvibecourse.product_service.dto.request.PromotionRequest;
import org.webvibecourse.product_service.dto.response.PromotionResponse;
import org.webvibecourse.product_service.entity.Promotion;
import org.webvibecourse.product_service.mapper.PromotionMapper;
import org.webvibecourse.product_service.repository.PromotionRepository;
import org.webvibecourse.product_service.service.PromotionService;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class PromotionServiceImpl implements PromotionService {

    private final PromotionRepository repository;

    private final PromotionMapper mapper;

    private final SecurityUtils securityUtils;

    private static final List<String> SEARCH_FIELDS =
            List.of("code","name");
    @Override
    public void save(PromotionRequest request) {
        Promotion promotion = mapper.toEntity(request,
                securityUtils.getCurrentUserId(),
                securityUtils.getCurrentShopId());

        repository.save(promotion);
    }

    @Override
    public void update(Long id, PromotionRequest request) {
        Promotion promotion = repository
                .getReferenceById(id);
        mapper.update(request,
                promotion,
                securityUtils.getCurrentUserId(),
                securityUtils.getCurrentShopId());
        repository.save(promotion);
    }

    @Override
    public Page<PromotionResponse> getAll(Integer page, Integer size, String sort, String searchField, String searchValue, String filter, boolean all) {
        log.info("start get promotion");
        Pageable pageable = all
                ? Pageable.unpaged()
                : PageRequest.of(page - 1, size);
        Specification<Promotion> spec = GenericSpecBuilder.
                build(sort,filter,searchField,searchValue,SEARCH_FIELDS);
        return repository.findAll(spec,pageable)
                .map(mapper::toResponse);
    }

    @Override
    public PromotionResponse getById(Long id) {
        return  repository.findById(id)
                .map(mapper::toResponse)
                .orElseThrow(
                        () -> new EntityNotFoundException("Promotion not found with id " + id));
    }

    @Override
    public void changeStatus(Long id, Integer status) {
        Promotion promotion = repository.getReferenceById(id);

        promotion.setStatus(PromotionStatus.fromValue(status).getCode());
        repository.save(promotion);
    }
}
