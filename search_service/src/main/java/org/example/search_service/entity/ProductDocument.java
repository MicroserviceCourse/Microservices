package org.example.search_service.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;

@Document(indexName = "products")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductDocument {
    @Id
    private int id;
    private String tenSanPham;
    private String moTa;
    private int gia;
    private String danhMuc;
}
