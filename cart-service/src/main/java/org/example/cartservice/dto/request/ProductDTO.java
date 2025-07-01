package org.example.cartservice.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductDTO {
    private int id;
    private String tenSanPham;
    private int gia;
    private String moTa;
    private List<Integer> id_danh_muc;
    private String mainImage;
    private String danhMuc;
    private List<String>subImages;
    private String HinhChing;
    private List<String>HinhAnhPhu;

}
