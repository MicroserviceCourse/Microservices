package org.webvibecourse.shop_service.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "shop_status_history",schema = "shop_service")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ShopStatusHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "shop_id",nullable = false)
    private Shop shop;

    @Column(name = "previous_status")
    private Integer previousStatus;

    @Column(name = "new_status", nullable = false)
    private Integer newStatus;

    @Column(name = "action_by")
    private Long actionBy;

    @Column(name = "reason")
    private String reason;

    @CreationTimestamp
    @Column(name = "action_time",updatable = false)
    private LocalDateTime actionTime;
}
