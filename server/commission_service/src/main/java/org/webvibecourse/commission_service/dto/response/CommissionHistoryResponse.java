package org.webvibecourse.commission_service.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * Response DTO representing a commission history returned to the client
 *
 * <p>This object contains all relevant information about the commission history,
 * including  its identifier and metadata.</p>
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Schema(name = "Commission history of an order or product")
public class CommissionHistoryResponse {

    @Schema(description = "Id of the rule",example = "1")
    private Long id;

    @Schema(name = "Name of the seller related to this commission history",example = "john")
    private String sellerName;

    @Schema(name = "Name of the product related this commission history",example = "product Name")
    private String productName;

    @Schema(name = "Single value or product line",example = "1000000")
    private BigDecimal orderAmount;

    @Schema(name = "Commission rates apply",example = "10")
    private BigDecimal commissionValue;

    @Schema(name = "Commission amount calculated",example = "1000000")
    private BigDecimal commissionAmount;

    @Schema(name = "Amount actually received by seller",example = "900000")
    private BigDecimal sellerReceiveAmount;

    @Schema(description = "Timestamp indicating when the rule was created")
    private LocalDateTime createdAt;

    @Schema(description = "Timestamp indicating the last time the rule was updated")
    private LocalDateTime updatedAt;
}
