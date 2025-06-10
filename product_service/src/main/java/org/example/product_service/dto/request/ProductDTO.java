package org.example.product_service.dto.request;

import lombok.Data;


import java.util.List;

@Data
public class ProductDTO {
    private int id;
    private String ten_san_pham;
    private int gia;
    private String moTa;
    private List<Integer> id_danh_muc;
    private String HinhChing;
    private List<String>HinhAnhPhu;

}
