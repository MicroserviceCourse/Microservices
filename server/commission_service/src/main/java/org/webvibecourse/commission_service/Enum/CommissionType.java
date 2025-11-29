package org.webvibecourse.commission_service.Enum;

/**
 * Type of the commission
 */
public enum CommissionType {

    PERCENT(0),
    FIXED(1);

    private final int code;

    CommissionType(int code) {
        this.code = code;
    }

    public int getCode() {
        return code;
    }

    public static CommissionType fromCode(int code) {
            for (CommissionType type : values()) {
                if(type.getCode() == code)
                    return type;
            }
            throw new IllegalArgumentException(
                    "Invalid value for CommissionType: " + code);
    }
}
