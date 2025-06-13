package org.example.product_service.dto.request;

import lombok.Data;

import java.util.List;

@Data
public class ProductVariantDTO {
    private int id;
    private String sku;
    private int gia;
    private int idProduct;
    private List<String>variantOptions;
    private List<Integer>idOptions;
}
