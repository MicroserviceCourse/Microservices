package org.example.commonutils.Enum;

public enum PromotionStatus {

    DRAFT(1),
    ACTIVE(2),
    PAUSED(3);
    private final int code;
    PromotionStatus(int code){
        this.code=code;
    }
    public int getCode(){
        return this.code;
    }
    public static PromotionStatus fromValue(int code){
        for (PromotionStatus status : values()){
            if(status.getCode()==code){
                return status;
            }
        }
        throw new IllegalArgumentException("Invalid promotion status code " + code);
    }
}
