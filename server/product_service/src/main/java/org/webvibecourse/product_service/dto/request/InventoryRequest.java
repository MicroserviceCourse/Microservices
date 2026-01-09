package org.webvibecourse.product_service.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class InventoryRequest {

    private List<ProductInventoryRequest> productInventories;
    private String note;
}
