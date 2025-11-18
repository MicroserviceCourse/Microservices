package org.example.blogservice.dto.response;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class PostResponse {
    private Long id;
    private String title;
    private String content;
    private String slug;
    private String thumbnailUrl;
    private String metaTitle;
    private String metaDescription;
    private Boolean published;
    private LocalDateTime publishedAt;

    private Long categoryId;
    private String categoryName;

    private List<TagDto> tags;
}
