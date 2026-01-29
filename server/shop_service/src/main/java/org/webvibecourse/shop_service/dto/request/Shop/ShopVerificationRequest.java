package org.webvibecourse.shop_service.dto.request.Shop;

import lombok.Data;

@Data
public class ShopVerificationRequest {
    private Integer documentType;

    private String documentFront;

    private String documentBack;

    private String businessLicense;
}
