package org.webvibecourse.product_service.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductResponse {

    private Long id;

    private Long shopId;

    private String code;

    private String slug;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;


    private String name;

    private String description;

    private BigDecimal price;

    private Integer status;

    private String thumbnailUrl;

}
