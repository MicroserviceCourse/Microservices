package com.example.cartservice.entity;

import com.example.cartservice.dto.CartDTO;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Cart {
    @EmbeddedId
    MyCompositeKey id;
    private Integer quantity;
    public Cart toEntity(CartDTO dto){
        Cart c=new Cart();
        c.setId(new MyCompositeKey(dto.getUserId(),dto.getProductId()));
        c.setQuantity(dto.getQuantity());
        return c;
    }
}
