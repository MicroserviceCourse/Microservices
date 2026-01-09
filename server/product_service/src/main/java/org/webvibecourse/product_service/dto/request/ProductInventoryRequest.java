package org.webvibecourse.product_service.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductInventoryRequest {
    private Long productId;
    private Integer quantity;
}
