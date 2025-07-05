package org.example.cartservice.service.impl;

import feign.FeignException;
import org.example.cartservice.client.AuthServiceClient;
import org.example.cartservice.client.ProductServiceClient;
import org.example.cartservice.dto.RequestResponse;
import org.example.cartservice.dto.request.AccountDTO;
import org.example.cartservice.dto.request.CartDTO;
import org.example.cartservice.dto.request.CartItemDTO;
import org.example.cartservice.dto.request.ProductDTO;
import org.example.cartservice.entity.Cart;
import org.example.cartservice.entity.CartItem;
import org.example.cartservice.repository.CartItemRepository;
import org.example.cartservice.repository.CartRepository;
import org.example.cartservice.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class CartServiceImpl implements CartService {
    @Autowired
    private AuthServiceClient authServiceClient;
    @Autowired
    private ProductServiceClient productService;
    @Autowired
    private CartRepository cartRepository;
    @Autowired
    private CartItemRepository cartItemRepository;

    @Override
    public Cart createCart(String token, CartDTO cartDTO) {
        try {
            RequestResponse<AccountDTO> response = authServiceClient.getMyInfo(token);
            AccountDTO accountDTO = response.getData();
            Cart cart = new Cart();
            cart.setUserId(accountDTO.getId());
            cart.setCreatedAt(LocalDateTime.now());
            cart.setUpdatedAt(LocalDateTime.now());
            Double totalPrice = 0.0;
            List<CartItem> cartItems = new ArrayList<CartItem>();
            for (CartItemDTO cartItemDTO : cartDTO.getCartItems()) {
                try {
                    RequestResponse<ProductDTO> productDTORequestResponse = productService.getProduct(cartItemDTO.getId());
                    ProductDTO productDTO = productDTORequestResponse.getData();
                    CartItem cartItem = new CartItem();
                    cartItem.setCart(cart);
                    cartItem.setProductId(cartItemDTO.getId());
                    cartItem.setPrice((double) productDTO.getGia());
                    cartItem.setQuantity(cartItemDTO.getQuantity());
                    totalPrice += cartItem.getPrice() * cartItemDTO.getQuantity();
                    cartItems.add(cartItem);
                } catch (FeignException.NotFound e) {
                    throw new RuntimeException("Sản phẩm không tồn tại");
                }

            }
            cart.setItems(cartItems);
            cart.setTotalPrice(totalPrice);
            return cartRepository.save(cart);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public Cart updateCart(String token, CartDTO cartDTO) {
        try {
            AccountDTO user = authServiceClient.getMyInfo(token).getData();
            Cart cart = cartRepository.findByUserId(user.getId())
                    .orElseThrow(() -> new RuntimeException("Cart Not Found"));
            Map<Integer, CartItem> currentTimes = cart.getItems()
                    .stream()
                    .collect(Collectors.toMap(CartItem::getProductId, Function.identity()));
            double totalPrice = 0.0;
            for (CartItemDTO cartItemDTO : cartDTO.getCartItems()) {
                ProductDTO productDTO = productService.getProduct(cartItemDTO.getId()).getData();
                if (currentTimes.containsKey(productDTO.getId())) {
                    CartItem existing = currentTimes.get(productDTO.getId());
                    existing.setQuantity(cartItemDTO.getQuantity());
                    existing.setPrice((double) productDTO.getGia());
                } else {
                    CartItem cartItem = new CartItem();
                    cartItem.setCart(cart);
                    cartItem.setProductId(cartItemDTO.getId());
                    cartItem.setQuantity(cartItemDTO.getQuantity());
                    cartItem.setPrice((double) productDTO.getGia());
                    cart.getItems().add(cartItem);
                }
                totalPrice += productDTO.getGia() * cartItemDTO.getQuantity();
            }
            cart.setTotalPrice(totalPrice);
            cart.setUpdatedAt(LocalDateTime.now());
            return cartRepository.save(cart);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public void removeItemFromCart(String token, int productId) {
        try {
            AccountDTO user = authServiceClient.getMyInfo(token).getData();
            Cart cart = cartRepository.findByUserId(user.getId())
                    .orElseThrow(() -> new RuntimeException("Cart Not Found"));
            List<CartItem> updatedItems = cart.getItems().stream()
                    .filter(item -> item.getProductId() != productId)
                    .collect(Collectors.toList());
            if (updatedItems.size() == cart.getItems().size()) {
                throw new RuntimeException("Product Not Found in cart");
            }
            if (updatedItems.isEmpty()) {
                cartRepository.delete(cart);
                return;
            }
            cart.setItems(updatedItems);
            double totalPrice = updatedItems.stream()
                    .mapToDouble(item -> item.getPrice() * item.getQuantity())
                    .sum();
            cart.setTotalPrice(totalPrice);
            cartRepository.save(cart);
        } catch (Exception e) {
            throw new RuntimeException("Lỗi khi xóa sản phẩm khỏi giỏ hàng:" + e.getMessage(), e);
        }
    }

    @Override
    public Page<Cart> findCartByUser(String token, int page, int size) {
        AccountDTO user = authServiceClient.getMyInfo(token).getData();
        return cartRepository.findCartsByUserId(user.getId(), PageRequest.of(page, size));
    }

    @Override
    public CartDTO todo(Cart cart) {
        CartDTO cartDTO = new CartDTO();
        cartDTO.setTotalPrice(cart.getTotalPrice());

        cartDTO.setId(cart.getId());
        List<CartItemDTO> cartItemDTOList = new ArrayList<>();
        for (CartItem cartItem : cart.getItems()) {
            CartItemDTO cartItemDTO = new CartItemDTO();
            ProductDTO productDTO = productService.getProduct(cartItem.getId()).getData();
            cartItemDTO.setId(cartItem.getProductId());
            cartItemDTO.setQuantity(cartItem.getQuantity());
            cartItemDTO.setPrice(cartItem.getPrice());
            cartItemDTO.setProductName(productDTO.getTenSanPham());
            cartItemDTOList.add(cartItemDTO);
        }
        cartDTO.setCartItems(cartItemDTOList);
        return cartDTO;
    }

    @Override
    public CartItem getCartByUserIdAndProductId(String token, int productId) {
        AccountDTO user = authServiceClient.getMyInfo(token).getData();
        return cartItemRepository.findCartItemByUserIdAndProductId(user.getId(), productId);
    }

    @Override
    public CartItemDTO todoCartItem(CartItem cart) {
        CartItemDTO cartItemDTO = new CartItemDTO();
        cartItemDTO.setId(cart.getId());
        cartItemDTO.setQuantity(cart.getQuantity());
        cartItemDTO.setPrice(cart.getPrice());
        return cartItemDTO;
    }
}
