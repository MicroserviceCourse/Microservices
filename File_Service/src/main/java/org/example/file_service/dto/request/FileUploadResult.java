package org.example.file_service.dto.request;

import lombok.*;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class FileUploadResult {
    private int productId;
    private boolean isMainImage;
    private String filePath;
}
