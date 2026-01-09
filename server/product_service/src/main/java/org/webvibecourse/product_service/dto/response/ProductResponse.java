package org.webvibecourse.product_service.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductResponse {

    private Long id;

    private Long shopId;

    private String code;

    private String slug;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;


    private String name;

    private String description;

    private BigDecimal price;

    private Integer status;

    @Schema(description = "Main thumbnail image URL of the product")
    private String thumbnailUrl;

    @Schema(description = "List of secondary image URLs (gallery) for the product.")
    private List<String> galleryUrls;

    private Integer stock;

    @Schema(description = "Danh sách variant của sản phẩm")
    private List<VariantResponse> variants;

    private List<CategoryResponse> categories;
}
