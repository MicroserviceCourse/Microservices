package org.webvibecourse.shop_service.dto.request.Shop;

import lombok.Data;

@Data
public class ShopAddressRequest {

    private String fullAddress;

    private Long idProvince;

    private Long idDistrict;

    private Long idWard;

    private Double lat;

    private Double lng;
}
