package org.example.file_service.controller;

import lombok.RequiredArgsConstructor;
import org.example.file_service.dto.RequestResponse;
import org.example.file_service.service.GeneralService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
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
}
