package org.webvibecourse.product_service.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.commonutils.Enum.PromotionStatus;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.OffsetDateTime;
import java.util.UUID;

@Entity
@Table(
        name = "promotion",
        schema = "product_service",
        indexes = {
                @Index(
                        name = "idx_promotion_status_time_priority",
                        columnList = "status, start_at, end_at, priority"
                ),
                @Index(
                        name = "idx_promotion_code",
                        columnList = "code",
                        unique = true
                ),
                @Index(
                        name = "idx_promotion_status",
                        columnList = "status"
                )
        }
)
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Promotion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private Integer type;

    private String code;

    @Column(nullable = false)
    private Integer value;

    private Integer priority; // flash sale ưu tiên cao

    @Column(nullable = false)
    private OffsetDateTime startAt;

    @Column(nullable = false)
    private OffsetDateTime endAt;

    @Column(nullable = false)
    private Integer status;

    @CreationTimestamp
    private OffsetDateTime createdAt;

    @UpdateTimestamp
    private OffsetDateTime updatedAt;
    @Column(name = "created_by")
    private String createdBy;
    @Column(name = "updated_by")
    private String updatedBy;
    private Long shopId;

    @PrePersist
    public void prePersist(){
        if(this.code == null || this.code.isBlank()){
            this.code = UUID.randomUUID().toString();
        }
        if(this.status==null ){
            this.status = PromotionStatus.DRAFT.getCode();
        }
    }

}
