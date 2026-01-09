package org.webvibecourse.product_service.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.OffsetDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PromotionRequest {
    private String name;

    private Integer type;
    private Integer value;
    private Integer priority;
    private OffsetDateTime startAt;
    private OffsetDateTime endAt;
}
