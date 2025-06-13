package org.example.product_service.controller;

import lombok.RequiredArgsConstructor;
import org.example.product_service.dto.RequestResponse;
import org.example.product_service.dto.request.ProductDTO;
import org.example.product_service.dto.response.PageResponse;
import org.example.product_service.entity.Product;
import org.example.product_service.exception.ExceptionResponse;
import org.example.product_service.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/product")
@RequiredArgsConstructor
public class ProductController {
    @Autowired
    private  ProductService productService;

    @PostMapping("/create")
    public ResponseEntity<?> create(@ModelAttribute ProductDTO productDTO, @RequestParam(value = "main", required = false) MultipartFile file, @RequestParam("subImage") List<MultipartFile> subImage) {
        try {
            productService.createProduct(productDTO, file, subImage);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new RequestResponse("Pro9duct created successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new RequestResponse("Đã xảy ra lỗi hệ thống"));
        }
    }
    @GetMapping("/getName/{id}")
     public ResponseEntity<?>findNameById(@PathVariable int id){
        try {
            
            return ResponseEntity.ok(productService.findProductNameById(id));
        }catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new RequestResponse("Lỗi khi xóa sản phẩm :"+e.getMessage()));
        }
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?>deleteById(@PathVariable("id")int id){
        try {
            productService.deleteProductById(id);
            return ResponseEntity.ok(new RequestResponse("Xóa sản phẩm thành công"));
        }catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new RequestResponse("Lỗi khi xóa sản phẩm :"+e.getMessage()));
        }
    }
    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@ModelAttribute ProductDTO productDTO, @PathVariable("id") int id, @RequestParam(value = "main", required = false) MultipartFile file, @RequestParam("subImage") List<MultipartFile> subImage) {
        try {
            productService.updateProduct(id,productDTO, file, subImage);
            return ResponseEntity.ok(new RequestResponse("Product updated successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new RequestResponse("Đã xảy ra lỗi hệ thống"));
        }
    }
    @GetMapping(value = "/sub/{filename:.+}",produces = MediaType.IMAGE_JPEG_VALUE)
    public ResponseEntity<Resource>getImageSub(@PathVariable String filename){
        String imagePath = System.getProperty("user.dir") + "/product_service/src/main/resources/static/product/sub/" + filename;
        Resource image = new FileSystemResource(imagePath);

        if (!image.exists()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_JPEG)
                .body(image);
    }
    @GetMapping(value = "/main/{filename:.+}", produces = MediaType.IMAGE_JPEG_VALUE)
    public ResponseEntity<Resource> getImage(@PathVariable String filename) {
        String imagePath = System.getProperty("user.dir") + "/product_service/src/main/resources/static/product/main/" + filename;
        Resource image = new FileSystemResource(imagePath);

        if (!image.exists()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_JPEG)
                .body(image);
    }

    @GetMapping("/all")
    public ResponseEntity<?>getAll(@RequestParam(defaultValue = "0") int page,
                                   @RequestParam(defaultValue = "10") int size){
        try {
            Page<Product>productPage=productService.getAll(page,size);
            Page<ProductDTO>dtoPage=productPage.map(productService::todo);
            PageResponse<ProductDTO>response=new PageResponse<>(dtoPage);
            return ResponseEntity.ok(new RequestResponse(response, "Lấy danh sách san pham thành công"));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ExceptionResponse("Lỗi khi lấy danh sách san pham:" + e.getMessage()));
        }
    }
}
