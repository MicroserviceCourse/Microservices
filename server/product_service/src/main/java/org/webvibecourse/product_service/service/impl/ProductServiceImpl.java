package org.webvibecourse.product_service.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.commonutils.util.GenericSpecBuilder;
import org.example.commonutils.util.JsonUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.webvibecourse.product_service.client.MediaClient;
import org.webvibecourse.product_service.dto.request.ProductRequest;
import org.webvibecourse.product_service.dto.response.ProductResponse;
import org.webvibecourse.product_service.dto.response.client.MediaResponse;
import org.webvibecourse.product_service.entity.Product;
import org.webvibecourse.product_service.mapper.ProductMapper;
import org.webvibecourse.product_service.repository.ProductRepository;
import org.webvibecourse.product_service.service.ProductService;

import java.util.List;
@Service
@Slf4j
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductMapper mapper;

    private final MediaClient  mediaClient;

    private final ProductRepository repository;

    private static final List<String> SEARCH_FIELDS =
            List.of("code","name","slug","price");

    @Override
    public void create
            (
                    ProductRequest request,
                    MultipartFile thumbnailUrl,
                    List<MultipartFile> galleryUrls
            ) {
        Product product = mapper.toEntity(request);

        if(thumbnailUrl !=null && !thumbnailUrl.isEmpty()){
            MediaResponse res = mediaClient.uploadSingleImage(thumbnailUrl,"product/sub");
            if(res!=null){
                product.setThumbnailUrl(res.getUrl());
            }
        }

        if(galleryUrls != null && !galleryUrls.isEmpty()) {
            List<MediaResponse> galleryMedia =
                    mediaClient.uploadMultipleImages(galleryUrls,"product/main");
            List<String> urls = galleryMedia.stream()
                    .map(MediaResponse::getUrl)
                    .toList();
            product.setGalleryUrls(JsonUtils.toJson(urls));
        }
        repository.save(product);
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
}
