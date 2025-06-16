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
<<<<<<< HEAD
    private String mainImage;
    private List<String>subImages;
=======
    private String HinhChing;
    private List<String>HinhAnhPhu;
>>>>>>> 4a8fa49793573d7098133076dfaf873dc10154c5

}
