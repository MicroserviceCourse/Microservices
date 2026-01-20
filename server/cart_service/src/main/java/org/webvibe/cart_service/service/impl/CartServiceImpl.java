package org.webvibe.cart_service.service.impl;

import feign.FeignException;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.commonsecurity.SecurityUtils;
import org.example.commonutils.api.ApiResponse;
import org.example.commonutils.util.GenericSpecBuilder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;
import org.webvibe.cart_service.client.ProductClient;
import org.webvibe.cart_service.dto.request.CartItemRequest;
import org.webvibe.cart_service.dto.request.UpdateQuantityCartRequest;
import org.webvibe.cart_service.dto.response.CartItemResponse;
import org.webvibe.cart_service.dto.response.CartResponse;
import org.webvibe.cart_service.dto.response.client.ProductResponse;
import org.webvibe.cart_service.entity.Cart;
import org.webvibe.cart_service.entity.CartItem;
import org.webvibe.cart_service.mapper.CartMapper;
import org.webvibe.cart_service.repository.CartRepository;
import org.webvibe.cart_service.service.CartService;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class CartServiceImpl implements CartService {

    private final ProductClient productClient;

    private final CartRepository repository;

    private final CartMapper mapper;

    private final SecurityUtils securityUtils;

    private static final List<String> SEARCH_FIELDS =
            List.of("");

    @Override
    @Transactional
    public void addCart(CartItemRequest request) {

        Cart cart = repository.findByUserId(securityUtils.getCurrentUserId())
                .orElseGet(() -> {
                    Cart newCart = new Cart();
                    newCart.setUserId(securityUtils.getCurrentUserId());
                    return newCart;
                });

        addCartList(request, cart);
        cart.recalculateTotalPrice();
        cart.setCreatedBy(securityUtils.getCurrentUserId().toString());
        cart.setUpdatedBy(securityUtils.getCurrentUserId().toString());
        repository.save(cart);

    }

    @Override
    @Transactional
    public void removeCart(List<Long> productIds) {

        Long userId = securityUtils.getCurrentUserId();

        Cart cart = repository.findByUserId(userId)
                .orElseThrow(
                        () -> new EntityNotFoundException("cart not found with userId " + userId));

        boolean removed = cart.getCartItems().removeIf(
                item -> productIds.contains(item.getProductId())
        );
        if (!removed) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "Product not found in cart"
            );
        }
        cart.recalculateTotalPrice();
        repository.save(cart);

    }


    @Override
    public void updateQuantity(List<UpdateQuantityCartRequest> requests) {
        if(requests==null || requests.isEmpty()){
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Request list must not be empty"
            );
        }

        Long userId = securityUtils.getCurrentUserId();
        Cart cart = repository.findByUserId(userId)
                .orElseThrow(
                        () -> new EntityNotFoundException("cart not found with userId " + userId));

        for (UpdateQuantityCartRequest request : requests){
            if(request.getQuantity()<0){
                throw new ResponseStatusException(
                        HttpStatus.BAD_REQUEST,
                        "Quantity must be >= 0"
                );
            }
            ApiResponse<ProductResponse> response;

            try {
                response = productClient.getProductById(request.getProductId());
            } catch (FeignException.NotFound e) {
                throw new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Product not found with id: " + request.getProductId()
                );
            }
            ProductResponse product = response.getData();
            if (product == null) {
                throw new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Product not found with id: " + request.getProductId()
                );
            }
            if (product.getStock() == 0) {
                throw new ResponseStatusException(
                        HttpStatus.CONFLICT,
                        "Product is out of stock"
                );
            }
            if (product.getStock() < request.getQuantity()) {
                throw new ResponseStatusException(
                        HttpStatus.CONFLICT,
                        "Not enough stock for product id: " + request.getProductId()
                );
            }
            CartItem item = cart.getCartItems()
                    .stream().filter(i -> i.getProductId().equals(request.getProductId()))
                    .findFirst()
                    .orElseThrow(() -> new ResponseStatusException(
                            HttpStatus.NOT_FOUND,
                            "Product not found in cart"
                    ));
            if (request.getQuantity() == 0) {
                cart.getCartItems().remove(item);
            } else {
                item.setQuantity(request.getQuantity());
            }
        }


        cart.recalculateTotalPrice();

        repository.save(cart);
    }

    @Override
    public Integer getCartItemCount() {
        Long userId = securityUtils.getCurrentUserId();

        Cart cart = repository.findByUserId(userId)
                .orElse(null);
        if (cart == null) {
            return 0;
        }

        return cart.getCartItems().size();
    }

    @Override
    public CartResponse getCartByUserId() {
        return repository.
                findByUserId(securityUtils.getCurrentUserId())
                .map(mapper::toResponse)
                .orElseThrow(
                        () -> new EntityNotFoundException("cart not found with id " + securityUtils.getCurrentUserId()));
    }

    private void addCartList(CartItemRequest request, Cart cart) {
        ApiResponse<ProductResponse> response;

        try {
            response = productClient.getProductById(request.getProductId());
        } catch (FeignException.NotFound e) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "Product not found with id: " + request.getProductId()
            );
        }
        ProductResponse product = response.getData();
        if (product == null) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "Product not found with id: " + request.getProductId()
            );
        }

        CartItem existingItem = cart.getCartItems().stream()
                .filter(i -> i.getProductId().equals(request.getProductId()))
                .findFirst()
                .orElse(null);

        int newQuantity = request.getQuantity()
                + (existingItem != null ? existingItem.getQuantity() : 0);

        if (product.getStock() < newQuantity) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Not enough stock for product id: " + request.getProductId()
            );
        }
        if (existingItem != null) {
            existingItem.setQuantity(newQuantity);
        } else {
            CartItem cartItem = new CartItem();
            cartItem.setProductId(product.getId());
            cartItem.setProductName(product.getName());
            cartItem.setPrice(product.getPrice());
            cartItem.setQuantity(request.getQuantity());
            cartItem.setProductImage(product.getThumbnailUrl());
            cartItem.setCart(cart);
            cart.getCartItems().add(cartItem);
        }
    }
}
