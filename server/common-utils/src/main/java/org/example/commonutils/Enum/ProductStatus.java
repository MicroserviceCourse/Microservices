package org.example.commonutils.Enum;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Product status: 0 = Hidden, 1 = Active, 2 = Deleted")
public enum ProductStatus {

    @Schema(description = "Hidden (0) – sản phẩm ẩn, không hiển thị")
    HIDDEN(0),

    @Schema(description = "Active (1) – sản phẩm đang bán")
    ACTIVE(1),

    @Schema(description = "Deleted (2) – sản phẩm bị xoá/không sử dụng")
    DELETED(2);

    private final int code;

    ProductStatus(int code) {
        this.code = code;
    }

    public int getCode() {
        return code;
    }
    public static ProductStatus fromCode(int code) {
        for (ProductStatus productStatus : ProductStatus.values()) {
            if(productStatus.getCode()==code)
                return productStatus;
        }
        throw new IllegalArgumentException("Invalid product status code " + code);
    }
}
