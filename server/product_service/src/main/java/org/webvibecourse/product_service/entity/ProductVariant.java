package org.webvibecourse.product_service.entity;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Entity
@Table(name = "product_variant",schema = "product_service")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductVariant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Schema(description = "Unique identifier of the product variant.")
    private Long id;

    @Schema(description = "Variant name (e.g., “Black / Size M”, “32GB – Red”).")
    private String name;

    @Schema(description = "Stock Keeping Unit – unique code assigned to identify this specific variant.")
    private String sku;

    @Schema(description = "Variant-specific price (can override the base product's price).")
    private BigDecimal price;

    private Integer type;

    @Schema(
            description = "Image URL associated with the variant, typically for color or style preview.",
            example = "https://cdn.example.com/images/products/variant-red.png"
    )
    private String imageUrl;

    @ManyToOne
    @JoinColumn(name = "product_id")
    @Schema(description = "Reference to the parent product. Links variant to its product.")
    private Product product;
}
