package org.webvibecourse.commission_service.entity;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "commission_payout")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Schema(description = "Seller wallet (revenue after commission deduction)")
public class CommissionPayout {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Schema(description = "Seller wallet ID",example = "1")
    private Long id;
}
