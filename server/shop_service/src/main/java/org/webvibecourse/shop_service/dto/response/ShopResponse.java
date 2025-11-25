package org.webvibecourse.shop_service.dto.response;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class ShopResponse {

    private Long id;

    private String shopCode;

    private String shopName;

    private String slug;

    private String description;

    private String logoUrl;

    private String bannerUrl;

    private Integer status;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    private List<ShopAddressResponse> addresses;
}
