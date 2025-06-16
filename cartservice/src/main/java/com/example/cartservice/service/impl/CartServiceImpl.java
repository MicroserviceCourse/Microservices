package com.example.cartservice.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;

import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import com.example.cartservice.client.AuthServiceClient;
import com.example.cartservice.client.ProductServiceClient;
import com.example.cartservice.config.JwtService;
import com.example.cartservice.dto.CartDTO;
import com.example.cartservice.entity.Cart;
import com.example.cartservice.entity.MyCompositeKey;
import com.example.cartservice.repository.CartRepository;
import com.example.cartservice.service.CartService;

import jakarta.servlet.http.HttpServletRequest;

@Service
public class CartServiceImpl implements CartService {
    @Autowired
    AuthServiceClient auth;
    @Autowired
    ProductServiceClient product;
    @Autowired
    CartRepository repo;
    @Autowired
    JwtService jwtService;
    public Cart toEntity(CartDTO dto){
        Cart c=new Cart();
        c.setId(new MyCompositeKey(dto.getUserId(),dto.getProductId()));
        c.setQuantity(dto.getQuantity());
        return c;
    }
     public CartDTO toDTO(Cart c){
        CartDTO dto=new CartDTO();
        dto.setUserId(c.getId().getUserId());
        dto.setProductId(c.getId().getProductId());
        dto.setQuantity(c.getQuantity());
        dto.setProductName(product.findNameById(dto.getProductId()));
        return dto;
    }
    public CartDTO findById(MyCompositeKey id){
        return toDTO(repo.findById(id).get());
    }
    public CartDTO save(HttpServletRequest request, Integer productId,Integer quantity)throws Exception{
        String email = jwtService.getEmail(request);
        System.out.println(auth.getUserRole(email));
        Integer userId=auth.getUserId(email);
        Cart c=new Cart();
        c.setId(new MyCompositeKey(userId,productId));
        c.setQuantity(quantity);
        return toDTO(repo.save(c));
    }
    public Page<CartDTO> findAll(Pageable pageable){
        return repo.findAll(pageable).map(this::toDTO);
    }
    public Page<CartDTO> yourCart(HttpServletRequest request,Pageable pageable)throws Exception{
        String email = jwtService.getEmail(request);
        Integer userId=auth.getUserId(email);
        return repo.yourCart(userId,pageable).map(this::toDTO);
    }
}
