package org.example.product_service.service;

import org.example.product_service.dto.request.ProductVariantDTO;
import org.example.product_service.entity.ProductVariant;
import org.springframework.data.domain.Page;

public interface ProductVariantService {
    ProductVariant create(ProductVariantDTO productVariantDTO);
    ProductVariant update(int id, ProductVariantDTO productVariantDTO);
    Page<ProductVariant>getAll(int page, int size);
    ProductVariant findById(int id);
    ProductVariantDTO todo(ProductVariant productVariant);
}
