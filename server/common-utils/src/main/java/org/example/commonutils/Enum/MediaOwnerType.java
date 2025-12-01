package org.example.commonutils.Enum;

public enum MediaOwnerType {
    PRODUCT(1),
    USER(2),
    SHOP(3),
    BANNER(4),
    CATEGORY(5),
    OTHER(6);

    private final int value;

    MediaOwnerType(int value) {
        this.value = value;
    }

    public int getValue() {
        return value;
    }

    public static MediaOwnerType fromValue(int value) {
        for (MediaOwnerType t : values()) {
            if(t.value == value) return t;
        }
        throw new IllegalArgumentException("Invalid value for MediaOwnerType: " + value);
    }
}
