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
    @OneToMany(mappedBy = "product",cascade = CascadeType.ALL,orphanRemoval = true)
    private List<ProductImage>images=new ArrayList<>();
    @ManyToMany
    @JoinTable(
            name = "product_category",
            joinColumns = @JoinColumn(name = "product_id"),
            inverseJoinColumns = @JoinColumn(name = "category_id")
    )
    private List<Category>categories=new ArrayList<>();
    @ManyToMany
    @JoinTable(
            name = "product_tag",
            joinColumns = @JoinColumn(name = "product_id"),
            inverseJoinColumns = @JoinColumn(name = "tag_id")
    )
    private List<Tag>tags=new ArrayList<>();
}
