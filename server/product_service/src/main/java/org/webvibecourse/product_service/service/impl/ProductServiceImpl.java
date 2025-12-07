package org.webvibecourse.product_service.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.commonsecurity.SecurityUtils;
import org.example.commonutils.Enum.ProductStatus;
import org.example.commonutils.util.GenericSpecBuilder;
import org.example.commonutils.util.JsonUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.webvibecourse.product_service.client.MediaClient;
import org.webvibecourse.product_service.dto.request.ProductRequest;
import org.webvibecourse.product_service.dto.request.ProductVariantRequest;
import org.webvibecourse.product_service.dto.response.ProductResponse;
import org.webvibecourse.product_service.dto.response.client.MediaResponse;
import org.webvibecourse.product_service.entity.Product;
import org.webvibecourse.product_service.entity.ProductVariant;
import org.webvibecourse.product_service.mapper.ProductMapper;
import org.webvibecourse.product_service.mapper.VariantMapper;
import org.webvibecourse.product_service.repository.ProductRepository;
import org.webvibecourse.product_service.service.ProductService;

import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductMapper mapper;

    private final VariantMapper variantMapper;

    private final MediaClient  mediaClient;

    private final ProductRepository repository;

    private final SecurityUtils securityUtils;


    private static final List<String> SEARCH_FIELDS =
            List.of("code","name","slug");

    @Override
    public void create
            (
                    ProductRequest request
            ) {

        Product product = mapper.toEntity
                (request,
                 securityUtils.getCurrentUserId(),
                 securityUtils.getCurrentShopId());
        product = repository.save(product);

        handleVariants(product,request.getVariants());

        repository.save(product);
    }
    private void handleVariants
            (
                    Product product,
                    List<ProductVariantRequest> variantRequests
            ){
        if(variantRequests ==null || variantRequests.isEmpty())return;

        for (int i = 0; i < variantRequests.size(); i++) {

            ProductVariantRequest req = variantRequests.get(i);



            ProductVariant variant =
                    variantMapper.toEntity(req,product);

            if(variant.getPrice() ==null){
                variant.setPrice(req.getPrice());
            }

            product.getVariants().add(variant);
        }
    }

    @Override
    public Page<ProductResponse> getProducts(
            Integer page, Integer size, String sort, String searchField,
            String searchValue, String filter, boolean all
                                            ) {
        log.info("start get products");

        Pageable pageable = all
                ? Pageable.unpaged()
                : PageRequest.of(page - 1, size);

        Specification<Product> spec = GenericSpecBuilder.
                build(sort,filter,searchField,searchValue,SEARCH_FIELDS);
        return repository.findAll(spec,pageable)
                .map(mapper::toResponse);
    }

    @Override
    public void changeStatus(Long id, Integer status) {
        Product product = repository.getReferenceById(id);

        product.setStatus(ProductStatus.fromCode(status).getCode());
        repository.save(product);
    }

    @Override
    public ProductResponse findById(Long id) {
        return repository.findById(id)
                .map(mapper::toResponse)
                .orElseThrow(
                        () -> new EntityNotFoundException("Product not found with id " + id));
    }

    @Override
    @Transactional
    public void update(
            Long id,
            ProductRequest request
                      ) {
        Product product = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Product not found with id " + id));

        mapper.update(request, product, securityUtils.getCurrentShopId(), securityUtils.getCurrentUserId());



        // ----------------------------
        // 3) SYNC VARIANTS
        // ----------------------------
        List<ProductVariant> oldVariants = product.getVariants();
        List<ProductVariantRequest> reqVariants = request.getVariants();
        if (reqVariants == null) reqVariants = List.of();

        // A) XÓA VARIANT KHÔNG CÒN TRONG REQUEST
        Set<Long> reqIds = reqVariants.stream()
                .map(ProductVariantRequest::getId)
                .filter(Objects::nonNull)
                .collect(Collectors.toSet());

        List<ProductVariant> removed = oldVariants.stream()
                .filter(v -> v.getId() != null && !reqIds.contains(v.getId()))
                .toList();

        oldVariants.removeAll(removed);

        // B) UPDATE VARIANT CŨ
        for (ProductVariantRequest vr : reqVariants) {

            if (vr.getId() == null) continue;

            ProductVariant existing = oldVariants.stream()
                    .filter(v -> v.getId().equals(vr.getId()))
                    .findFirst()
                    .orElseThrow(() -> new EntityNotFoundException("Variant not found: " + vr.getId()));
            existing.setProduct(product);
            variantMapper.update(existing, vr);
        }

        // C) TẠO VARIANT MỚI
        for (ProductVariantRequest vr : reqVariants) {

            if (vr.getId() != null) continue;
            ProductVariant newVar = variantMapper.toEntity(vr, product);
            newVar.setProduct(product);
            oldVariants.add(newVar);
        }

        product.setVariants(oldVariants);
        repository.save(product);
    }


}
