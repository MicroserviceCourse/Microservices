package org.webvibecourse.product_service.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "category",schema = "product_service")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Schema(description = "Unique identifier of the category.")
    private Long id;

    @Schema(name = "Category name displayed to users (e.g., “Men’s Fashion”, “Shoes”, “Electronics”).")
    private String name;

    @Schema(name = "ID of the parent category. Used to build category tree/hierarchy. null means this is a root category.")
    private Long parentId;

    @Schema(name = "Display order of the category. Smaller values are shown first. Used for ordering in menus and category listings.")
    private Integer sortOrder;

    @Schema(description = "Category visibility: true = active, false = inactive.")
    private boolean active=true;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Ho_Chi_Minh")
    @Schema(description = "Timestamp when the product was created (auto-generated).")
    private LocalDateTime createdAt;
    @UpdateTimestamp
    @Column(name = "updated_at")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Ho_Chi_Minh")
    @Schema(description = "Timestamp when the product was last updated (auto-generated).")
    private LocalDateTime updatedAt;
    @Column(name = "created_by")
    private String createdBy;
    @Column(name = "updated_by")
    private String updatedBy;
}
