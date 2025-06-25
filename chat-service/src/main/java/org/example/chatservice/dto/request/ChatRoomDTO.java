package org.example.chatservice.dto.request;

import lombok.Data;

@Data
public class ChatRoomDTO {
    private int id;
    private String type;
    private String status = "ACTIVE";


}
