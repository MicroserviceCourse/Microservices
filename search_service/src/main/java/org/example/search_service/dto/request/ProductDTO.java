package org.example.search_service.dto.request;

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
    private String danhmuc;
    private String mainImage;
    private List<String>subImages;
    private String HinhChing;
    private List<String>HinhAnhPhu;
}
