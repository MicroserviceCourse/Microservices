package org.webvibecourse.product_service.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Schema(description = "Variant info")
public class ProductVariantRequest {

    private Long id;

    private String name;

    private String sku;

    private BigDecimal price;

    private Integer imageIndex;
}
