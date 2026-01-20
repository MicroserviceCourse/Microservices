package org.webvibe.cart_service.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;

@Entity
@Table(name = "cart_items",
        indexes = {
                @Index(name = "idx_cart_item_product", columnList = "product_id"),
                @Index(name = "idx_cart_item_cart", columnList = "cart_id")
        }
)
@Data
public class CartItem {

    @Id
    @GeneratedValue(strategy =GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cart_id")
    private Cart cart;


    private Long productId;

    private String productName;

    private String productImage;

    private Integer quantity;

    private BigDecimal price;
}
