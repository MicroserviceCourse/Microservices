package org.example.product_service.service.impl;

import lombok.RequiredArgsConstructor;
import org.example.product_service.Repository.CategoryRepository;
import org.example.product_service.Repository.ProductImageRepository;
import org.example.product_service.Repository.ProductRepository;
import org.example.product_service.client.FileServiceClient;
import org.example.product_service.dto.request.ProductDTO;
import org.example.product_service.entity.Category;
import org.example.product_service.entity.Product;
import org.example.product_service.entity.ProductImage;
import org.example.product_service.exception.ErrorHandler;
import org.example.product_service.generic.GenericService;
import org.example.product_service.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private ProductImageRepository productImageRepository;
    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private KafkaTemplate<String, Object> kafkaTemplate;
    private static final String TOPIC = "product-topic";
    public String findProductNameById(int id){
        return productRepository.findById(id).get().getTenSanPham();
    }

    @Autowired
    private FileServiceClient fileServiceClient;

    @Override
    public Product createProduct(ProductDTO product, MultipartFile mainImage, List<MultipartFile> subImages) {
        try {
            Product productEntity = new Product();
            productEntity.setGia(product.getGia());
            if(product.getId_danh_muc()!=null && !product.getId_danh_muc().isEmpty()) {
                List<Category>categories=new ArrayList<>();
                for (Integer idDanhMuc : product.getId_danh_muc()) {
                    Category category=categoryRepository.findById(idDanhMuc)
                            .orElseThrow(() -> new RuntimeException("Không tìm thấy danh mục với id: " + idDanhMuc));
                    categories.add(category);
                }
                productEntity.setCategories(categories);
            }
            productEntity.setMoTa(product.getMoTa());
            productEntity.setTenSanPham(product.getTenSanPham());
            if (mainImage != null && !mainImage.isEmpty()) {
                try {
                    String filePath = fileServiceClient.uploadFile(mainImage, "product/main/");
                    productEntity.setMainImage(filePath);

                } catch (Exception e) {
                    throw new ErrorHandler(HttpStatus.INTERNAL_SERVER_ERROR, "Lỗi khi lưu hình ảnh: " + e.getMessage());
                }
            }
            productEntity = productRepository.save(productEntity);
            if (subImages != null && !subImages.isEmpty()) {
                for (MultipartFile subImage : subImages) {
                    if (!subImage.isEmpty()) {
                        try {
                            String subImagePath = fileServiceClient.uploadFile(subImage, "product/sub/");

                            ProductImage productImage = new ProductImage();
                            productImage.setProduct(productEntity); // Gán FK
                            productImage.setImageUrl(subImagePath);

                            productImageRepository.save(productImage);
                        } catch (Exception e) {
                            throw new ErrorHandler(HttpStatus.INTERNAL_SERVER_ERROR, "Lỗi khi lưu ảnh phụ: " + e.getMessage());
                        }
                    }
                }
            }

            kafkaTemplate.send(TOPIC, product);
            return productEntity;
        } catch (Exception e) {
            throw new RuntimeException("Không thể thêm sản phẩm");
        }
    }

    @Override
    public Product updateProduct(int id, ProductDTO product, MultipartFile mainImage, List<MultipartFile> subImages) {
        try {
            Product productEntity = productRepository.findById(id)
                    .orElseThrow(() -> new ErrorHandler(HttpStatus.NOT_FOUND, "Không tìm thấy sản phẩm với id = " + id));
            productEntity.setGia(product.getGia());
            if(product.getId_danh_muc()!=null && !product.getId_danh_muc().isEmpty()) {
                List<Category>categories=new ArrayList<>();
                for (Integer idDanhMuc : product.getId_danh_muc()) {
                    Category category=categoryRepository.findById(idDanhMuc)
                            .orElseThrow(() -> new RuntimeException("Không tìm thấy danh mục với id: " + idDanhMuc));
                    categories.add(category);
                }
                productEntity.setCategories(categories);
            }
            productEntity.setMoTa(product.getMoTa());
            productEntity.setTenSanPham(product.getTenSanPham());
            String mainImagePath = fileServiceClient.uploadFile(mainImage, "/product/main");
            productEntity.setMainImage(mainImagePath);
            productEntity.getImages().clear();
            if (subImages != null && !subImages.isEmpty()) {
                // ✅ Thêm ảnh phụ mới
                for (MultipartFile subImage : subImages) {
                    if (!subImage.isEmpty()) {
                        try {
                            String subImagePath = fileServiceClient.uploadFile(subImage, "/product/sub");

                            ProductImage image = new ProductImage();
                            image.setProduct(productEntity); // thiết lập liên kết hai chiều
                            image.setImageUrl(subImagePath);

                            productEntity.getImages().add(image);
                        } catch (Exception e) {
                            throw new ErrorHandler(HttpStatus.INTERNAL_SERVER_ERROR, "Lỗi khi lưu ảnh phụ: " + e.getMessage());
                        }
                    }
                }
            }
            return productRepository.save(productEntity);
        } catch (Exception e) {
            throw new RuntimeException("Không thể thêm sản phẩm");
        }
    }

    @Override
    public Page<Product> getAll(int page, int size) {
        return productRepository.findAll(PageRequest.of(page, size));
    }

    @Override
    public ProductDTO todo(Product product) {
        ProductDTO productDTO = new ProductDTO();
        productDTO.setId(product.getId());
        productDTO.setGia(product.getGia());
        if(product.getCategories()!=null){
            List<Integer>CateList=product.getCategories()
                    .stream()
                    .map(Category::getId)
                    .collect(Collectors.toList());
                productDTO.setId_danh_muc(CateList);
        }
        productDTO.setMoTa(product.getMoTa());
        productDTO.setTenSanPham(product.getTenSanPham());
        productDTO.setHinhChing("/api/file"+product.getMainImage());
        List<String> subImagePaths = product.getImages()
                .stream()
                .map(image -> "/api/file" + image.getImageUrl())
                .toList();


        productDTO.setHinhAnhPhu(subImagePaths);
        return productDTO;
    }

    @Override
    public void deleteProductById(int id) {
        try {
            if(!productRepository.existsById(id)) {
                throw new RuntimeException("Không tìm thấy sản phẩm với id :"+id);
            }
            productRepository.deleteById(id);
        }catch (Exception e){
            throw new RuntimeException("Không thể xóa sản phẩm");
        }
    }

    @Override
    public Product getProductById(int id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
    }
}
