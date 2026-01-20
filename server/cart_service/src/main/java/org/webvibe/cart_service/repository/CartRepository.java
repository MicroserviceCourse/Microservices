package org.webvibe.cart_service.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;
import org.webvibe.cart_service.entity.Cart;

import java.util.List;
import java.util.Optional;

@Repository
public interface CartRepository extends
        JpaRepository<Cart,Long>,
        JpaSpecificationExecutor<Cart> {
    Optional<Cart> findByUserId(Long userId);

    List<Cart> findCartByUserId(Long userId);
}
