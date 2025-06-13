package com.example.cartservice.repository;

import java.util.ArrayList;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.cartservice.entity.Cart;
import com.example.cartservice.entity.MyCompositeKey;

@Repository
public interface CartRepository extends JpaRepository<Cart,MyCompositeKey> {
    @Query(nativeQuery=true,value="select * from cart where user_id=?1")
    public Page<Cart> yourCart(Integer user_id,Pageable pageable);
}
