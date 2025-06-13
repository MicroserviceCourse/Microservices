package org.example.product_service.service;

import org.example.product_service.dto.request.ProductDTO;
import org.example.product_service.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ProductService {
    Product createProduct(ProductDTO product, MultipartFile mainImage, List<MultipartFile>subImages);
    Product updateProduct(int id, ProductDTO product, MultipartFile mainImage, List<MultipartFile>subImages);
    Page<Product>getAll(int page, int size);
    ProductDTO todo(Product product);
    void deleteProductById(int id);
    public String findProductNameById(int id);
}
