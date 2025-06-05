package org.example.product_service.entity;

import jakarta.persistence.*;
import lombok.*;


import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "products")
public class Product {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id",nullable = false)
    private int id;
    @Basic
    @Column(name = "ten_san_pham")
    private String ten_san_pham;
    @Basic
    @Column(name = "gia")
    private int gia;
    @Basic
    @Lob
    @Column(name = "mo_ta")
    private String moTa;
    @Column(name = "main_image")
    private String mainImage;
    @Basic
    @Column(name = "id_danh_muc")
    private int id_danh_muc;
    @OneToMany(mappedBy = "product",cascade = CascadeType.ALL,orphanRemoval = true)
    private List<ProductImage>images=new ArrayList<>();
}
