package org.webvibecourse.product_service.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class VariantResponse {
    @Schema(description = "Unique identifier of the product variant.")
    private Long id;

    @Schema(description = "Variant name (e.g., “Black / Size M”, “32GB – Red”).")
    private String name;

    @Schema(description = "Stock Keeping Unit – unique code assigned to identify this specific variant.")
    private String sku;

    @Schema(description = "Variant-specific price (can override the base product's price).")
    private BigDecimal price;

    @Schema(
            description = "Image URL associated with the variant, typically for color or style preview.",
            example = "https://cdn.example.com/images/products/variant-red.png"
    )
    private String imageUrl;

    private Integer type;

    private Integer quantity;
}
