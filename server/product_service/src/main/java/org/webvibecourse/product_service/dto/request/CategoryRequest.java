package org.webvibecourse.product_service.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

/**
 * Request DTO for creating or updating a category
 *
 * Fields:
 * • name:The display name of the category.
 * • parentId:ID of the parent category (null = root category).
 * • sortOrder:Display order of the category
 *
 * Usage:
 * This DTO is used as the request payload in create/update category APIs.
 */
@Data
@Schema(description = "Category request")
public class CategoryRequest {

    private String name;

    private Long parentId;

    private Integer sortOrder;

}
