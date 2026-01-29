package org.webvibecourse.shop_service.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "shop_address", schema = "shop_service")
public class ShopAddress {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "shop_id",nullable = false)
    private Shop shop;

    @Column(name = "full_address",nullable = false,length = 255)
    private String fullAddress;

    @Column(name = "id_province")
    private Long idProvince;

    @Column(name = "id_district")
    private Long idDistrict;

    @Column(name = "id_ward")
    private Long idWard;

    private Double lat;

    private Double lng;


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
