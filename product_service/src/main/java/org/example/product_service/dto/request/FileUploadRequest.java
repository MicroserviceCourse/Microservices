package org.example.product_service.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FileUploadRequest {
    private byte[]fileBytes;
    private String fileName;
    private String contentType;
    private String path;
    private int productId;
    private boolean IsMainImage;
}
