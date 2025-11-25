package org.example.commonutils.Enum;

public enum ShopStatus {

    PENDING(0, "Chờ duyệt"),
    ACTIVE(1, "Đang hoạt động"),
    REJECTED(2, "Bị từ chối"),
    BLOCKED(3, "Bị khóa"),
    INACTIVE(4, "Ngừng hoạt động");

    private final int code;
    private final String description;

    ShopStatus(int code, String description) {
        this.code = code;
        this.description = description;
    }

    public int getCode() {
        return code;
    }

    public String getDescription() {
        return description;
    }
}
