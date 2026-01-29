package org.example.commonutils.Enum;

public enum DocumentType {
    ID_CARD(1),
    CITIZEN_ID_CARD(2),
    PASSPORT(3),
    DRIVER_LICENSE(4);

    private final int value;
    DocumentType(int value){
        this.value = value;
    }
    public int getValue(){
        return this.value;
    }
    public static DocumentType fromValue(int value){
        for (DocumentType documentType : values()){
            if(documentType.value == value) return documentType;
        }
        throw new IllegalArgumentException("Invalid value for Document type: " + value);
    }
}
