package org.webvibecourse.commission_service.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "commission_rule")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Schema(description = "Commission rules apply to seller/category/product")
public class CommissionRule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Schema(description = "Id of the rule",example = "1")
    private Long id;

    @Schema(description = "Seller is subject to rules (null = system-wide rules)",example = "10")
    private Long sellerId;

    @Schema(description = "Category applicable commission",example = "5")
    private Long categoryId;

    @Schema(description = "Product applicable commission",example = "1234")
    private Long productId;

    @Column(nullable = false)
    @Schema(description = "Type of rose",example = "1")
    private Integer type;

    @Column(nullable = false)
    @Schema(description = "Commission value (% or amount)",example = "10")
    private BigDecimal value;

    @Column(nullable = false)
    @Schema(description = "Is the rule working",example = "true")
    private Boolean active=true;

    @CreationTimestamp
    @Column(name = "created_at",updatable = false)
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Ho_Chi_Minh")
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Column(name = "created_by",length = 50)
    private String createdBy;

    @Column(name = "updated_by",length = 50)
    private String updatedBy;
}
