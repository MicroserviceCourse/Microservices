package org.webvibecourse.product_service.entity;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "product_category",schema = "product_service")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Schema(description = "Unique identifier of the product–category mapping entry.")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "product_id")
    @Schema(description = "Reference to the product that is assigned to a category.")
    private Product product;

    @ManyToOne
    @JoinColumn(name = "category_id")
    @Schema(description = "Reference to the category that the product belongs to.")
    private Category category;
}
