package org.example.product_service.service.impl;

import lombok.RequiredArgsConstructor;
import org.example.product_service.Repository.ProductRepository;
import org.example.product_service.Repository.ProductVariantRepository;
import org.example.product_service.Repository.VarionOptionRepository;
import org.example.product_service.dto.request.ProductVariantDTO;
import org.example.product_service.entity.Product;
import org.example.product_service.entity.ProductVariant;
import org.example.product_service.entity.VariantOption;
import org.example.product_service.exception.ErrorHandler;
import org.example.product_service.service.ProductVariantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductVariantServiceImpl implements ProductVariantService {
    @Autowired
    private ProductVariantRepository productVariantRepository;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private VarionOptionRepository varionOptionRepository;

    @Override
    public ProductVariant create(ProductVariantDTO productVariantDTO) {
        try {
            ProductVariant productVariant = new ProductVariant();
            Product product = productRepository.findById(productVariantDTO.getIdProduct())
                    .orElseThrow(() -> new RuntimeException("Product not found"));
            productVariant.setSku(productVariantDTO.getSku());
            productVariant.setGia(productVariantDTO.getGia());
            productVariant.setProduct(product);
            if (productVariantDTO.getIdOptions() != null && !productVariantDTO.getIdOptions().isEmpty()) {
                List<VariantOption> VariantOptions = new ArrayList<>();
                for (Integer idVariantOption : productVariantDTO.getIdOptions()) {
                    VariantOption variantOptions = varionOptionRepository.findById(idVariantOption).orElse(null);
                    VariantOptions.add(variantOptions);
                }
                productVariant.setOptions(VariantOptions);
            }
            return productVariantRepository.save(productVariant);
        } catch (Exception e) {
            throw new RuntimeException("Không thể thêm Product Variant");
        }
    }

    @Override
    public ProductVariant update(int id, ProductVariantDTO productVariantDTO) {
        try {
            Optional<ProductVariant> productVariant = productVariantRepository.findById(id);
            if (productVariant.isPresent()) {
                ProductVariant productVariant1 = productVariant.get();
                productVariant1.setSku(productVariantDTO.getSku());
                productVariant1.setGia(productVariantDTO.getGia());
                Product product = productRepository.findById(productVariant1.getId())
                        .orElseThrow(() -> new RuntimeException("Product not found"));
                productVariant1.setProduct(product);
                if (productVariantDTO.getIdOptions() != null && !productVariantDTO.getIdOptions().isEmpty()) {
                    List<VariantOption> VariantOptions = new ArrayList<>();
                    for (Integer idVariantOption : productVariantDTO.getIdOptions()) {
                        VariantOption variantOptions = varionOptionRepository.findById(idVariantOption).orElse(null);
                        VariantOptions.add(variantOptions);
                    }
                    productVariant1.setOptions(VariantOptions);
                }
                return productVariantRepository.save(productVariant1);
            } else {
                throw new RuntimeException("Product not found");
            }
        } catch (Exception e) {
            throw new RuntimeException("Không thể cập nhật Product Variant");
        }
    }

    @Override
    public Page<ProductVariant> getAll(int page, int size) {
        return productVariantRepository.findAll(PageRequest.of(page, size));
    }

    @Override
    public ProductVariant findById(int id) {
        return productVariantRepository.findById(id).orElseThrow(() -> new ErrorHandler(HttpStatus.NOT_FOUND, "Không tìm thấy Product Variant"));
    }

    @Override
    public ProductVariantDTO todo(ProductVariant productVariant) {
        ProductVariantDTO productVariantDTO = new ProductVariantDTO();
        productVariantDTO.setId(productVariant.getId());
        productVariantDTO.setSku(productVariant.getSku());
        productVariantDTO.setGia(productVariant.getGia());
        productVariantDTO.setIdProduct(productVariant.getProduct().getId());
        if (productVariant.getOptions() != null) {
            List<Integer> OptionsList = productVariant.getOptions()
                    .stream()
                    .map(VariantOption::getId)
                    .collect(Collectors.toList());
            List<String> VariantOptions = productVariant.getOptions()
                    .stream()
                    .map(dt -> dt.getType())
                    .collect(Collectors.toList());
            productVariantDTO.setIdOptions(OptionsList);
            productVariantDTO.setVariantOptions(VariantOptions);
        }
        return productVariantDTO;
    }

    @Override
    public void deleteProductVariantById(int id) {
        try {
            if(!productVariantRepository.existsById(id)) {
                throw new Exception("Không tìm thấy product variant với id:"+id);
            }
            productVariantRepository.deleteById(id);
        }catch (Exception e) {
            throw new RuntimeException("không thể xóa product variant");
        }
    }
}
