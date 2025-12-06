package org.webvibecourse.product_service.dto.request;

import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Schema(description = "Product create request")
public class ProductRequest {


    private String name;

    private String description;

    private BigDecimal price;

    private Integer status;

    private List<Long> categoryIds;

    private List<ProductVariantRequest> variants;
    
    private String thumbnailUrl;

    private List<String> galleryUrls;

}
