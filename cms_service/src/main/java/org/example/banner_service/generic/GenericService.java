package org.example.banner_service.generic;

import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class GenericService {
    public String saveFile(MultipartFile file, String subDirectory) throws IOException, IOException {
        // Lấy tên file và làm sạch tên file
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        // Xác định thư mục upload
        String uploadDir = System.getProperty("user.dir") + "/product_service/src/main/resources/static/" + subDirectory;

        // Tạo thư mục nếu chưa tồn tại
        Path uploadPath = Paths.get(uploadDir);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }


        Path filePath = uploadPath.resolve(file.getOriginalFilename());
        // Lưu file vào thư mục
        file.transferTo(filePath.toFile());

        // Trả về đường dẫn tương đối của file
        return "/" + subDirectory + file.getOriginalFilename();
    }
}
