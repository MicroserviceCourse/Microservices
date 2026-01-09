package org.webvibecourse.product_service.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.OffsetDateTime;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PromotionResponse {

    private Long id;

    private String name;

    private Integer type;

    private String code;

    private Integer value;

    private Integer priority;

    private OffsetDateTime startAt;

    private OffsetDateTime endAt;

    private Boolean active;

    private OffsetDateTime createdAt;

    private OffsetDateTime updatedAt;

    private String createdBy;

    private String updatedBy;
    private Long shopId;
}
