package org.example.cartservice.repository;

import org.example.cartservice.entity.Cart;
import org.example.cartservice.generic.IRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface CartRepository extends IRepository<Cart, Integer> {
   Optional<Cart> findByUserId(Integer userId);
   Page<Cart>findCartsByUserId(Integer userId, Pageable pageable);
}
