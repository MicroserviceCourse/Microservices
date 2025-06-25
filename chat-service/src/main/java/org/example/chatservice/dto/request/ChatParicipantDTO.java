package org.example.chatservice.dto.request;

import lombok.Data;

@Data
public class ChatParicipantDTO {
    private int id;
    private int idChatRoom;
    private Integer idUser;
    private String guestId;

}
