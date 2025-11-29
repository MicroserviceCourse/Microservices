package org.webvibecourse.commission_service.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * Response DTO representing a commission rule returned to the client
 *
 * <p>This object contains all relevant information about the commission rule,
 * including  its identifier and metadata.</p>
 *
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Schema(name = "Commission rules response apply to seller/category/product")
public class CommissionRuleResponse {

    @Schema(name = "Id of the rule")
    private Long id;

    @Schema(name = "Name of the seller to whom the rule applies")
    private String sellerName;

    @Schema(name = "Name of the category this  rule applies to")
    private String categoryName;

    @Schema(name = "Name of the product this rule applies to")
    private String productName;

    @Schema(name = "Type of commission")
    private Integer type;

    @Schema(name = "Commission value")
    private BigDecimal value;

    @Schema(name = "whether the rule is active")
    private Boolean active;

    @Schema(description = "Timestamp indicating when the rule was created")
    private LocalDateTime createdAt;

    @Schema(description = "Timestamp indicating the last time the rule was updated")
    private LocalDateTime updatedAt;
}
