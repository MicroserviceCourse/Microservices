package org.webvibecourse.shop_service.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "shop_verification",schema = "shop_service")
public class ShopVerification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "document_type",length = 50)
    private String documentType;

    @Column(name = "document_front")
    private String documentFront;

    @Column(name = "document_back")
    private String documentBack;

    @Column(name = "business_license")
    private String businessLicense;

    @Column(nullable = false)
    private Integer status = 0;

    @Column(name = "reject_reason",columnDefinition = "TEXT")
    private String rejectReason;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

}
