package org.webvibecourse.shop_service.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
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
