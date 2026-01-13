package org.example.blogservice.dto.response;

import lombok.Data;

@Data
public class CategoryResponse {
    private Long id;
    private String blogCategoryCode;
    private String name;
}
