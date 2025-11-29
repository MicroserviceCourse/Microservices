package org.example.authservice.dto.response.client;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Call information shop of account Seller
 */
@JsonIgnoreProperties(ignoreUnknown = true)
@Data
public class ShopResponse {
    private Long id;
    private String shopName;
    private Integer status;
}
