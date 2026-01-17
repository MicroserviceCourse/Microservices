package org.example.commonutils.Enum;

public enum VariantOptionType {

    COLOR(1),
    SIZE(2);

    private final int code;
    VariantOptionType(int code){
        this.code = code;
    }
    public static VariantOptionType fromValue(int code){
        for (VariantOptionType type : values()){
            if(type.code==code){
                return type;
            }
        }
        throw new IllegalArgumentException("Invalid variant option type code " + code);
    }
}
