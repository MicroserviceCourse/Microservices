package org.example.chatservice.dto.request;

import lombok.Data;

@Data
public class MessageDTO {
    private int id;
    private int idChatRoom;
    private Integer senderUserId;
    private String senderGuestId;
    private String content;
}
