package org.webvibe.cart_service.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;
import org.webvibe.cart_service.entity.CartItem;
@Repository
public interface CartItemRepository extends
        JpaRepository<CartItem,Long>,
        JpaSpecificationExecutor<CartItem> {
}
