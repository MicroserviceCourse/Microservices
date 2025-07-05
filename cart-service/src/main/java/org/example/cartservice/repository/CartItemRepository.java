package org.example.cartservice.repository;

import org.example.cartservice.entity.CartItem;
import org.example.cartservice.generic.IRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface CartItemRepository extends IRepository<CartItem,Integer> {
    @Query("select * from CartItem a where a.cart.userId = :userId and a.productId = :productId")
    CartItem findCartItemByUserIdAndProductId(Integer userId, Integer productId);
}
