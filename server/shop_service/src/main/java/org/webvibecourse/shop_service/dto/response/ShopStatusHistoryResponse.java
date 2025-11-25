package org.webvibecourse.shop_service.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * DTO representing a record of status changes for a shop.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ShopStatusHistoryResponse {

    private Long id;

    private Integer previousStatus;

    private Integer newStatus;

    private String reason;

    private Long actionBy;

    private LocalDateTime actionTime;
}
