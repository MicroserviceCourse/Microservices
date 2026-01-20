package org.webvibe.cart_service.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateQuantityCartRequest {

    private Long productId;

    private Integer quantity;
}
