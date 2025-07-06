package org.example.cartservice.service;

import org.example.cartservice.dto.request.CartDTO;
import org.example.cartservice.entity.Cart;
import org.springframework.data.domain.Page;

public interface CartService {
    Cart createCart(String token,CartDTO cartDTO);
    Cart updateCart(String token,CartDTO cartDTO);
    void removeItemFromCart(String token,int productId);
    Page<Cart>findCartByUser(String token,int page,int size);
    CartDTO todo(Cart cart);
}
