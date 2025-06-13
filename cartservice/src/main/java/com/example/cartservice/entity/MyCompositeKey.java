package com.example.cartservice.entity;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Objects;

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MyCompositeKey implements Serializable {

    private Integer userId;
    private Integer productId;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof MyCompositeKey)) return false;
        MyCompositeKey that = (MyCompositeKey) o;
        return Objects.equals(userId, that.userId) && Objects.equals(productId, that.productId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(userId,productId);
    }
}
