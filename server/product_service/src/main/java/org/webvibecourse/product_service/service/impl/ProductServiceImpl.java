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
                    ProductRequest request,
                    MultipartFile thumbnailUrl,
                    List<MultipartFile> galleryUrls,
                    List<MultipartFile> variantImages
            ) {

        Product product = mapper.toEntity
                (request,
                 securityUtils.getCurrentUserId(),
                 securityUtils.getCurrentShopId());

        handleThumbnailUpload(product, thumbnailUrl);

        handleGalleryUpload(product, galleryUrls);

        product = repository.save(product);

        handleVariants(product,request.getVariants(),variantImages);

        repository.save(product);
    }

    private void handleThumbnailUpload(Product product,MultipartFile thumbnail){
        if(thumbnail !=null && !thumbnail.isEmpty()){
            MediaResponse uploaded = mediaClient.uploadSingleImage(thumbnail,"product/main");
            if(uploaded!=null){
                product.setThumbnailUrl(uploaded.getUrl());
            }
        }
    }

    private void handleGalleryUpload(Product product,List<MultipartFile> gallery){
        if(gallery !=null && !gallery.isEmpty()){

            List<MediaResponse> uploaded =
                    mediaClient.uploadMultipleImages(gallery,"product/sub");

            List<String> urls = uploaded.stream()
                    .map(MediaResponse::getUrl)
                    .toList();

            product.setGalleryUrls(JsonUtils.toJson(urls));
        }
    }

    private String uploadVariantImage(List<MultipartFile> variantImages, int index){
        if(variantImages == null ||
           variantImages.size() <= index ||
           variantImages.get(index).isEmpty()){
            return null;
        }

        MediaResponse uploaded = mediaClient.uploadSingleImage
                (
                        variantImages.get(index),
                        "variant"
                );
        return uploaded !=null ? uploaded.getUrl() : null;
    }
    private void handleVariants
            (
                    Product product,
                    List<ProductVariantRequest> variantRequests,
                    List<MultipartFile> variantImages
            ){
        if(variantRequests ==null || variantRequests.isEmpty())return;

        for (int i = 0; i < variantRequests.size(); i++) {

            ProductVariantRequest req = variantRequests.get(i);

            String variantImageUrl = uploadVariantImage(variantImages, i);

            ProductVariant variant =
                    variantMapper.toEntity(req,product, variantImageUrl);

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
            ProductRequest request,
            MultipartFile newThumbnail,
            List<MultipartFile> newGallery,
            List<MultipartFile> newVariantImages
                      ) {
        Product product = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Product not found with id " + id));

        mapper.update(request, product, securityUtils.getCurrentShopId(), securityUtils.getCurrentUserId());

        // ----------------------------
        // 1) UPDATE THUMBNAIL
        // ----------------------------
        if (newThumbnail != null && !newThumbnail.isEmpty()) {
            if (product.getThumbnailUrl() != null) {
                mediaClient.deleteMedia(product.getThumbnailUrl());
            }

            MediaResponse uploaded = mediaClient.uploadSingleImage(newThumbnail, "product/main");
            product.setThumbnailUrl(uploaded.getUrl());
        }

        // ----------------------------
        // 2) UPDATE GALLERY
        // ----------------------------
        List<String> oldGallery = JsonUtils.jsonToList(product.getGalleryUrls(), String.class);

        if (newGallery != null && !newGallery.isEmpty()) {

            if (oldGallery != null) {
                oldGallery.forEach(mediaClient::deleteMedia);
            }

            List<String> galleryUrls = mediaClient.uploadMultipleImages(newGallery, "product/sub")
                    .stream()
                    .map(MediaResponse::getUrl)
                    .toList();

            product.setGalleryUrls(JsonUtils.toJson(galleryUrls));
        }

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

        removed.forEach(v -> {
            if (v.getImageUrl() != null) mediaClient.deleteMedia(v.getImageUrl());
        });

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

            if (vr.getImageIndex() != null &&
                newVariantImages != null &&
                vr.getImageIndex() < newVariantImages.size()) {

                MultipartFile img = newVariantImages.get(vr.getImageIndex());

                if (img != null && !img.isEmpty()) {

                    if (existing.getImageUrl() != null) {
                        mediaClient.deleteMedia(existing.getImageUrl());
                    }

                    MediaResponse up = mediaClient.uploadSingleImage(img, "variant");
                    existing.setImageUrl(up.getUrl());
                }
            }
        }

        // C) TẠO VARIANT MỚI
        for (ProductVariantRequest vr : reqVariants) {

            if (vr.getId() != null) continue;

            String imageUrl = null;

            if (vr.getImageIndex() != null &&
                newVariantImages != null &&
                vr.getImageIndex() < newVariantImages.size()) {

                MultipartFile img = newVariantImages.get(vr.getImageIndex());

                if (img != null && !img.isEmpty()) {
                    MediaResponse up = mediaClient.uploadSingleImage(img, "variant");
                    imageUrl = up.getUrl();
                }
            }

            ProductVariant newVar = variantMapper.toEntity(vr, product, imageUrl);
            newVar.setProduct(product);
            oldVariants.add(newVar);
        }

        product.setVariants(oldVariants);
        repository.save(product);
    }


}
