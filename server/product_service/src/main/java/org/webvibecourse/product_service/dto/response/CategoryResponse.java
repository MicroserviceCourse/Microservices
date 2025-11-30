package org.webvibecourse.product_service.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

/**
 * Response DTO representing a product category returned to the client.
 *
 * <p>This DTO provides all necessary information about a category,
 * including identifiers, hierarchy structure, display order,
 * activation status, and timestamp metadata.</p>
 */
@Data
@RequiredArgsConstructor
@AllArgsConstructor
@Schema(name = "CategoryResponse", description = "Represents a product category returned to the client.")
public class CategoryResponse {

    @Schema(description = "Unique identifier of the category.")
    private Long id;

    @Schema(description = "Auto-generated category code (e.g., CAT0001).")
    private String code;


    @Schema(name = "Category name displayed to users (e.g., “Men’s Fashion”, “Shoes”, “Electronics”).")
    private String name;

    @Schema(name = "ID of the parent category. Used to build category tree/hierarchy. null means this is a root category.")
    private Long parentId;

    @Schema(description = "Name of the parent category. Null for root categories.")
    private String parentName;

    @Schema(description = "Hierarchical depth level of the category. Root categories have level 0.")
    private Integer level;

    @Schema(name = "Display order of the category. Smaller values are shown first. Used for ordering in menus and category listings.")
    private Integer sortOrder;

    @Schema(description = "Category visibility: true = active, false = inactive.")
    private boolean active;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Ho_Chi_Minh")
    @Schema(description = "Timestamp when the product was created (auto-generated).")
    private LocalDateTime createdAt;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Ho_Chi_Minh")
    @Schema(description = "Timestamp when the product was last updated (auto-generated).")
    private LocalDateTime updatedAt;

    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    private List<CategoryResponse> children;
}
