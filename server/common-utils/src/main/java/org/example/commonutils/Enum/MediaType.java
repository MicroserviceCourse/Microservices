package org.example.commonutils.Enum;

public enum MediaType {
    IMAGE(1),
    VIDEO(2),
    DOCUMENT(3),
    AUDIO(4);
    private final int value;

    MediaType(int value) {
        this.value = value;
    }

    public int getValue() {
        return value;
    }

    public static MediaType fromValue(int value) {
        for (MediaType t : values()) {
            if(t.value == value) return t;
        }
        throw new IllegalArgumentException("Invalid value for MediaType: " + value);
    }
}
