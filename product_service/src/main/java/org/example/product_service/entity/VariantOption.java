package org.example.product_service.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "variant_options")
public class VariantOption {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name = "value",nullable = false)
    private String value;
    @Column(name = "type", nullable = false)
    private String type;

    @ManyToMany(mappedBy = "options")
    private List<ProductVariant> variants = new ArrayList<>();
}
