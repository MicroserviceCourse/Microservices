package org.example.banner_service.dto.request;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class BannerDTO {
    private int id;
    private String title;
    private String imageUrl;
    private String linkUrl;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private int sortOrder;


}
