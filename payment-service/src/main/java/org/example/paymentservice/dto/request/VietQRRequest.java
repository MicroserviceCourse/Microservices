package org.example.paymentservice.dto.request;

import lombok.Data;

@Data
public class VietQRRequest {
    private String accountNo;
    private String accountName;
    private String acqId;
    private long amount;
    private String addInfo;
}
