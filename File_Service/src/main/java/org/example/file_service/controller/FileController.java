package org.example.file_service.controller;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.example.file_service.dto.RequestResponse;
import org.example.file_service.service.GeneralService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/file")
@RequiredArgsConstructor
public class FileController {
    @Autowired
    private GeneralService generalService;
    @PostMapping(value = "/upload", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> uploadFile(@RequestParam("file") MultipartFile file,@RequestParam("path")String path) {
        try {
                String fileName=generalService.saveFile(file,path);
                return ResponseEntity.ok(fileName);
        }catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new RequestResponse("Lỗi khi xóa sản phẩm :"+e.getMessage()));
        }
    }
    @GetMapping("/**")
    public ResponseEntity<Resource> getImage(HttpServletRequest request) {
        // Lấy toàn bộ URI được gọi
        String fullPath = request.getRequestURI(); // /api/file/main/product/moderno-0139665883.webp

        // Tên route bạn đã định nghĩa trong controller
        String basePath = "/api/file/";

        // Cắt phần filename từ URL
        String filename = fullPath.substring(fullPath.indexOf(basePath) + basePath.length());

        // Đường dẫn thực tới file trong server
        String imagePath = System.getProperty("user.dir") +
                "/File_Service/src/main/resources/static/" + filename;

        Resource image = new FileSystemResource(imagePath);

        if (!image.exists()) {
            return ResponseEntity.notFound().build();
        }

        // Xác định MIME type
        MediaType mediaType;
        if (filename.toLowerCase().endsWith(".png")) {
            mediaType = MediaType.IMAGE_PNG;
        } else if (filename.toLowerCase().endsWith(".jpg") || filename.toLowerCase().endsWith(".jpeg")) {
            mediaType = MediaType.IMAGE_JPEG;
        } else if (filename.toLowerCase().endsWith(".gif")) {
            mediaType = MediaType.IMAGE_GIF;
        } else if (filename.toLowerCase().endsWith(".webp")) {
            mediaType = MediaType.parseMediaType("image/webp");
        } else {
            mediaType = MediaType.APPLICATION_OCTET_STREAM;
        }

        return ResponseEntity.ok()
                .contentType(mediaType)
                .body(image);
    }


}
