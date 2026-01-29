package org.webvibecourse.shop_service.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
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
    private Integer documentType;

    @Column(name = "document_front")
    private String documentFront;

    @Column(name = "document_back")
    private String documentBack;

    @Column(name = "business_license")
    private String businessLicense;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "shop_id",nullable = false)
    private Shop shop;

    @CreationTimestamp
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    @Column(name = "created_by",length = 50)
    private String createdBy;

    @Column(name = "updated_by",length = 50)
    private String updatedBy;

}
