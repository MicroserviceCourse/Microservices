package org.webvibecourse.commission_service.Enum;

/**
 * Status of commission historyH
 */
public enum CommissionHistoryStatus {

    PENDING(0),
    APPLIED(1),
    REVERSED(2);

    private final  int code;

    CommissionHistoryStatus(int code) {
        this.code = code;
    }

    public int getCode() {
        return code;
    }
    public static CommissionHistoryStatus fromCode(int code) {
        for (CommissionHistoryStatus status : values()) {
            if (status.getCode() == code) {
                return status;
            }
        }
        throw new IllegalArgumentException("No enum constant for code " + code);
    }
}
