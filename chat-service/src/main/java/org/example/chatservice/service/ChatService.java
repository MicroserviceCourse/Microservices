package org.example.chatservice.service;

import org.example.chatservice.dto.request.ChatParicipantDTO;
import org.example.chatservice.dto.request.ChatRoomDTO;
import org.example.chatservice.dto.request.MessageDTO;
import org.example.chatservice.entity.ChatParticipant;
import org.example.chatservice.entity.ChatRoom;
import org.example.chatservice.entity.Message;

import java.util.List;

public interface ChatService {
    ChatRoom createRoom(ChatRoomDTO chatDTO);
    ChatParticipant addParticipant(ChatParicipantDTO chatParticipantDTO);
    Message sendMessage(MessageDTO messageDTO);
    List<Message>getMessages(int chatRoomId);
    MessageDTO todo(Message message);
}
