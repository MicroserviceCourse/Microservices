package com.example.cartservice.controller;

import com.example.cartservice.model.Cart;
import com.example.cartservice.model.CartItem;
import com.example.cartservice.service.CartService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/cart")
public class CartController {
    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @GetMapping("/{userId}")
    public Cart getCart(@PathVariable String userId) {
        return cartService.getCart(userId);
    }

    @PostMapping("/{userId}/add")
    public Cart addItem(@PathVariable String userId, @RequestBody CartItem item) {
        return cartService.addItem(userId, item);
    }

    @PutMapping("/{userId}/update")
    public Cart updateItem(@PathVariable String userId, @RequestBody CartItem item) {
        return cartService.updateItem(userId, item);
    }

    @DeleteMapping("/{userId}/remove/{productId}")
    public Cart removeItem(@PathVariable String userId, @PathVariable String productId) {
        return cartService.removeItem(userId, productId);
    }

    @DeleteMapping("/{userId}/clear")
    public void clearCart(@PathVariable String userId) {
        cartService.clearCart(userId);
    }
} 