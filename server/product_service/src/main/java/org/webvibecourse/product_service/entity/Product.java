package org.webvibecourse.product_service.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.commonutils.Enum.ProductStatus;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "product",schema = "product_service")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Schema(description = "Unique identifier of the product.")
    private Long id;

    @Schema(description = "ID of the shop that owns this product (foreign reference to Shop Service).")
    private Long shopId;

    @Schema(description = "Product name displayed to customers.")
    private String name;

    @Schema(description = "SEO-friendly URL slug generated from the product name.")
    private String slug;

    @Column(columnDefinition = "TEXT")
    @Schema(description = "Full product description, allowing HTML or rich text.")
    private String description;

    @Schema(description = "Original price of the product.")
    private BigDecimal price;

    @Schema(description = "Unique product code, auto-generated.")
    @Column(name = "code", unique = true, nullable = false, length = 50)
    private String code;


    @Schema(description = "Product status:\n"
                          + "0 = Hidden\n"
                          + "1 = Active/Published\n"
                          + "2 = Deleted/Removed")
    private Integer status;

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


    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
    private List<ProductVariant> variants;

    @Schema(description = "Main thumbnail image URl of the product")
    @Column(name = "thumbnail_url", columnDefinition = "TEXT")
    private String thumbnailUrl;
    @Schema(description = "List of secondary image URLs (gallery) for the product.")
    @Column(name = "gallery_urls", columnDefinition = "TEXT")
    private String galleryUrls;

    @PrePersist
    public void prePersist() {
        if(this.slug == null || this.slug.isBlank()){
            this.slug = generateSlug(this.name);
        }

        if(this.code == null || this.code.isBlank()){
            this.code = generateProductCode();
        }
        if(this.status == null ){
            this.status = ProductStatus.ACTIVE.getCode();
        }
    }

    private String generateSlug(String input){
        if(input==null){
            return null;
        }
        String nowhitespace = java.text.Normalizer.normalize(input, java.text.Normalizer.Form.NFD)
                .replaceAll("\\p{InCombiningDiacriticalMarks}+", "")
                .replaceAll("[^\\w\\s-]", "")
                .trim()
                .replaceAll("\\s+", "-");

        return nowhitespace.toLowerCase();
    }
    private String generateProductCode() {
        // Random 6 ký tự A-Z0-9
        String random = UUID.randomUUID().toString().
                replace("-", "").substring(0, 6).toUpperCase();
        return "PRD-" + random;
    }

}
