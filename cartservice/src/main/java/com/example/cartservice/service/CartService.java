package com.example.cartservice.service;

import java.util.ArrayList;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.example.cartservice.dto.CartDTO;
import com.example.cartservice.entity.Cart;
import com.example.cartservice.entity.MyCompositeKey;

import jakarta.servlet.http.HttpServletRequest;

public interface CartService {
    public CartDTO save(HttpServletRequest request, Integer productId,Integer quantity)throws Exception;
    public Page<CartDTO> findAll(Pageable pageable);
    public CartDTO findById(MyCompositeKey key);
    
    public CartDTO toDTO(Cart c);
    public Cart toEntity(CartDTO dto);
    public Page<CartDTO> yourCart(HttpServletRequest request,Pageable pageable)throws Exception;
}
