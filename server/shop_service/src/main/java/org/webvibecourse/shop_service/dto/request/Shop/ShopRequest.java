package org.webvibecourse.shop_service.dto.request.Shop;

import lombok.Data;

import java.util.List;

@Data
public class ShopRequest {

    private String shopName;

    private String logoUrl;

    private String bannerUrl;
    private String description;

    private ShopAddressRequest addresses;


    private List<Long>categoryIds;

    private ShopVerificationRequest shopVerification;
}
