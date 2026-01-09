package org.example.commonutils.Enum;

public enum InventoryAction {
    IMPORT(1),
    ADJUST(2);
    private final int value;

    InventoryAction(int value){
        this.value = value;
    }
    public int getValue(){
        return value;
    }

    public static InventoryAction fromValue(int value){
        for (InventoryAction t : values()){
            if(t.value == value){
                return t;
            }

        }
        throw new IllegalArgumentException("Invalid value for inventory: " + value);
    }
}
