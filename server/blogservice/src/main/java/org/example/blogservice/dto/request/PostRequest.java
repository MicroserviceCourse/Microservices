package org.example.blogservice.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.List;

@Data
public class PostRequest {

    @NotBlank
    private String title;

    @NotBlank
    private String content;

    private String thumbnailUrl;


    @NotNull
    private Long categoryId;

    private List<Long> tagIds;
}
