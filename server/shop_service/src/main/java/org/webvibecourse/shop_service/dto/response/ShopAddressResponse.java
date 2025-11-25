package org.webvibecourse.shop_service.dto.response;

import lombok.Data;

@Data
public class ShopAddressResponse {

    private Long id;

    private String fullAddress;

    private Long idProvince;

    private Long idDistrict;

    private Long idWard;

    private Double lat;

    private Double lng;

    private Boolean isDefault;
}
