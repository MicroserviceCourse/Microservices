package com.example.cartservice.service;

import com.example.cartservice.model.Cart;
import com.example.cartservice.model.CartItem;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class CartService {
    private final Map<String, Cart> cartStorage = new HashMap<>();

    public Cart getCart(String userId) {
        return cartStorage.getOrDefault(userId, new Cart());
    }

    public Cart addItem(String userId, CartItem item) {
        Cart cart = cartStorage.getOrDefault(userId, new Cart());
        cart.setUserId(userId);
        Optional<CartItem> existing = cart.getItems().stream()
            .filter(i -> i.getProductId().equals(item.getProductId()))
            .findFirst();
        if (existing.isPresent()) {
            existing.get().setQuantity(existing.get().getQuantity() + item.getQuantity());
        } else {
            cart.getItems().add(item);
        }
        cartStorage.put(userId, cart);
        return cart;
    }

    public Cart updateItem(String userId, CartItem item) {
        Cart cart = cartStorage.getOrDefault(userId, new Cart());
        cart.setUserId(userId);
        cart.getItems().removeIf(i -> i.getProductId().equals(item.getProductId()));
        cart.getItems().add(item);
        cartStorage.put(userId, cart);
        return cart;
    }

    public Cart removeItem(String userId, String productId) {
        Cart cart = cartStorage.getOrDefault(userId, new Cart());
        cart.setUserId(userId);
        cart.getItems().removeIf(i -> i.getProductId().equals(productId));
        cartStorage.put(userId, cart);
        return cart;
    }

    public void clearCart(String userId) {
        cartStorage.remove(userId);
    }
} 