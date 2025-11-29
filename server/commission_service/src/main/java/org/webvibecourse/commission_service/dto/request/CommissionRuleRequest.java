package org.webvibecourse.commission_service.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

/**
 * Request DTO for creating or updating a commission rule
 *
 *
 *  Fields:
 *  • sellerId: Seller to whom the commission rule applies
 *  • categoryId: The Category this the commission applies to
 *  • productId: The Product this the commission applies to
 *  • type: Type of commission
 *  • value: Commission value
 *  • active: whether the rule is active
 *
 *  Usage:
 *  This DTO is used as the request payload in create/update commission rule APIs.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Schema(name = "Request DTO for creating or updating a commission rule")
public class CommissionRuleRequest {

    @Schema(name = "Seller to whom the commission rule applies",example = "1")
    private Long sellerId;

    @Schema(name = "The Category this the commission applies to",example = "1")
    private Long categoryId;

    @Schema(name = "The Product this the commission applies to",example = "1")
    private Long productId;

    @Schema(
            description = "Commission type: 0 = PERCENT (percentage-based), 1 = FIXED (fixed amount)",
            example = "0"
    )
    private Integer type;

    @Schema(
            description = "Commission value",
            example = "0"
    )
    private BigDecimal value;

}
