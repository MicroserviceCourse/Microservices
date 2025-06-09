package org.example.product_service.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "categories")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name = "ten_danh_muc")
    private String tenDanhMuc;
    @ManyToMany(mappedBy = "categories")
    private List<Product>products;
}
