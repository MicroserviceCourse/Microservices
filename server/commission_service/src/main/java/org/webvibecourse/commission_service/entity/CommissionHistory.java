package org.webvibecourse.commission_service.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "commission_history")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Schema(description = "Commission history of an order or product")
public class CommissionHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Schema(description = "Commission History ID",example = "100")
    private Long id;

    @Column(nullable = false)
    @Schema(description = "Seller commission deducted",example = "10")
    private Long sellerId;

    @Column(nullable = false)
    @Schema(description = "Order Id",example = "5001")
    private Long orderId;

    @Column(nullable = false)
    @Schema(description = "Product Id",example = "1001")
    private Long productId;

    @Column(nullable = false)
    @Schema(description = "Single value or product line",example = "1000000")
    private BigDecimal orderAmount;

    @Column(nullable = false)
    @Schema(description = "Commission rates apply",example = "10")
    private BigDecimal commissionValue;

    @Column(nullable = false)
    @Schema(description = "Commission amount calculated",example = "1000000")
    private BigDecimal commissionAmount;

    @Column(nullable = false)
    @Schema(description = "Amount actually received by seller",example = "900000")
    private BigDecimal sellerReceiveAmount;

    @Column(nullable = false)
    @Schema(description = "Commission status",example = "1")
    private Integer status;

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
