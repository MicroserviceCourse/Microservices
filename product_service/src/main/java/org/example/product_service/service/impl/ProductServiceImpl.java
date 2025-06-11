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
import org.example.product_service.service.kafka.Producer.FileProducer;
import org.example.product_service.service.kafka.Producer.KafkaProducerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
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
    private GenericService genericService;
    @Autowired
    private KafkaProducerService kafkaProducerService;
    @Autowired
    private FileProducer fileProducer;
    @Autowired
    private FileServiceClient fileServiceClient;

    @Override
    public Product createProduct(ProductDTO productDTO, MultipartFile mainImage, List<MultipartFile> subImages) {
        try {
            // Tạo entity sản phẩm mới
            Product product = new Product();
            product.setTen_san_pham(productDTO.getTen_san_pham());
            product.setGia(productDTO.getGia());
            product.setMoTa(productDTO.getMoTa());

            // Gán danh mục sản phẩm
            if (productDTO.getId_danh_muc() != null && !productDTO.getId_danh_muc().isEmpty()) {
                List<Category> categories = new ArrayList<>();
                for (Integer id : productDTO.getId_danh_muc()) {
                    Category category = categoryRepository.findById(id)
                            .orElseThrow(() -> new RuntimeException("Không tìm thấy danh mục với id: " + id));
                    categories.add(category);
                }
                product.setCategories(categories);
            }

            // Lưu sản phẩm trước để lấy ID
            productRepository.save(product);

            // Gửi ảnh chính qua Kafka
            if (mainImage != null && !mainImage.isEmpty()) {
                try {
                    fileProducer.sendFileToKafka(mainImage, "product/main/", product.getId(), true);
                    product.setMainImage("processing..."); // tạm thời
                    productRepository.save(product); // cập nhật lại
                } catch (Exception e) {
                    System.err.println("Lỗi gửi ảnh chính qua Kafka: " + e.getMessage());
                }
            }

            // Gửi ảnh phụ qua Kafka
            if (subImages != null && !subImages.isEmpty()) {
                for (MultipartFile subImage : subImages) {
                    if (subImage != null && !subImage.isEmpty()) {
                        try {
                            fileProducer.sendFileToKafka(subImage, "product/sub/", product.getId(), false);
                        } catch (Exception e) {
                            System.err.println("Lỗi gửi ảnh phụ qua Kafka: " + e.getMessage());
                        }
                    }
                }
            }

            // Gửi message thông báo sản phẩm mới qua Kafka (nếu cần)
            String payload = String.format(
                    "{\"id\":%d,\"ten_san_pham\":\"%s\",\"gia\":%d}",
                    product.getId(),
                    product.getTen_san_pham(),
                    product.getGia()
            );
            kafkaProducerService.sendProductCreatedMessage(payload);

            return product;
        } catch (Exception e) {
            throw new RuntimeException("Không thể thêm sản phẩm: " + e.getMessage());
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
            productEntity.setTen_san_pham(product.getTen_san_pham());
            if (mainImage != null && !mainImage.isEmpty()) {

                   fileProducer.sendFileToKafka(mainImage, "/product/main",productEntity.getId(),true);
                    productEntity.setMainImage("processing...");

            }
            productEntity.getImages().clear();
            if (subImages != null && !subImages.isEmpty()) {


                // ✅ Thêm ảnh phụ mới
                for (MultipartFile subImage : subImages) {
                    if (!subImage.isEmpty()) {
                       fileProducer.sendFileToKafka(subImage, "/product/sub",productEntity.getId(),false);
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
        productDTO.setTen_san_pham(product.getTen_san_pham());
        productDTO.setHinhChing("/api"+product.getMainImage());
        List<String> subImagePaths = product.getImages()
                .stream()
                .map(image -> "/api" + image.getImageUrl())
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
