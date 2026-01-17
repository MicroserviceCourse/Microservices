package org.webvibecourse.product_service.service.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.commonutils.util.GenericSpecBuilder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.webvibecourse.product_service.dto.response.VariantResponse;
import org.webvibecourse.product_service.entity.Product;
import org.webvibecourse.product_service.entity.ProductVariant;
import org.webvibecourse.product_service.mapper.VariantMapper;
import org.webvibecourse.product_service.repository.ProductRepository;
import org.webvibecourse.product_service.repository.ProductVariantRepository;
import org.webvibecourse.product_service.service.ProductVariantService;

import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class ProductVariantServiceImpl implements ProductVariantService {
    private final ProductVariantRepository repository;
    private final ProductRepository productRepository;
    private final VariantMapper mapper;
    private static final List<String> SEARCH_FIELDS =
            List.of("name");
    @Override
    public Page<VariantResponse> getVariants(Integer page,
                                             Integer size,
                                             String sort,
                                             String searchField,
                                             String searchValue,
                                             String filter,
                                             boolean all) {
        log.info("start get product variant");
        Pageable pageable = all
                ? Pageable.unpaged()
                : PageRequest.of(page - 1, size);
        Specification<ProductVariant> spec = GenericSpecBuilder.
                build(sort,filter,searchField,searchValue,SEARCH_FIELDS);
        Page<ProductVariant> variants = repository.findAll(spec, pageable);
        List<Long> productIds = variants.getContent().stream()
                .map(ProductVariant::getProduct)
                .filter(Objects::nonNull)
                .map(Product::getId)
                .distinct()
                .toList();

        Map<Long, Long> variantCountByProductId =
                productIds.isEmpty()
                        ? Map.of()
                        : productRepository.countByProductIds(productIds)
                        .stream()
                        .collect(Collectors.toMap(
                                r -> (Long) r[0],
                                r -> (Long) r[1]
                        ));


        return variants.map(variant -> {
            VariantResponse res = mapper.toResponse(variant);

            Product product = variant.getProduct();
            if (product == null) {
                res.setQuantity(0); // hoặc null
            } else {
                res.setQuantity(
                        variantCountByProductId
                                .getOrDefault(product.getId(), 0L)
                                .intValue()
                );
            }
            return res;
        });
    }
}
