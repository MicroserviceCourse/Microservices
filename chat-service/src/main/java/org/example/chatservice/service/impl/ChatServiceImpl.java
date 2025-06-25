package org.example.chatservice.service.impl;

import org.example.chatservice.dto.request.ChatParicipantDTO;
import org.example.chatservice.dto.request.ChatRoomDTO;
import org.example.chatservice.dto.request.MessageDTO;
import org.example.chatservice.entity.ChatParticipant;
import org.example.chatservice.entity.ChatRoom;
import org.example.chatservice.entity.Message;
import org.example.chatservice.repository.ChatParticipantRepository;
import org.example.chatservice.repository.ChatRoomRepository;
import org.example.chatservice.repository.MessageRepository;
import org.example.chatservice.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ChatServiceImpl implements ChatService {
    @Autowired
    private ChatRoomRepository chatRoomRepository;
    @Autowired
    private MessageRepository messageRepository;
    @Autowired
    private ChatParticipantRepository chatParticipantRepository;

    @Override
    public ChatRoom createRoom(ChatRoomDTO chatDTO) {
        try {
            ChatRoom chatRoom = new ChatRoom();
            chatRoom.setType(chatDTO.getType());
            chatRoom.setStatus(chatDTO.getStatus());
            chatRoom.setCreatedAt(LocalDateTime.now());
            return chatRoomRepository.save(chatRoom);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public ChatParticipant addParticipant(ChatParicipantDTO chatParticipantDTO) {
        try {
            ChatRoom chatRoom = chatRoomRepository.findById(chatParticipantDTO.getIdChatRoom())
                    .orElseThrow(() -> new RuntimeException("ChatRoom not found"));
            ChatParticipant chatParticipant = new ChatParticipant();
            chatParticipant.setChatRoom(chatRoom);
            if(chatParticipantDTO.getGuestId() != null) {
                chatParticipant.setGuestId(chatParticipantDTO.getGuestId());
            }
            if(chatParticipantDTO.getIdUser() != null) {
                chatParticipant.setUserId(chatParticipantDTO.getIdUser());
            }

            return chatParticipantRepository.save(chatParticipant);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public Message sendMessage(MessageDTO messageDTO) {
        try {
            ChatRoom chatRoom = chatRoomRepository.findById(messageDTO.getIdChatRoom())
                    .orElseThrow(() -> new RuntimeException("ChatRoom not found"));
            Message message = new Message();
            message.setChatRoom(chatRoom);
            message.setSenderUserId(messageDTO.getSenderUserId());
            message.setSenderGuestId(messageDTO.getSenderGuestId());
            message.setContent(messageDTO.getContent());
            return messageRepository.save(message);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public List<Message> getMessages(int chatRoomId) {
        return messageRepository.findByChatRoomIdOrderByCreatedAtAsc(chatRoomId);
    }

    @Override
    public MessageDTO todo(Message message) {
        MessageDTO messageDTO = new MessageDTO();
        messageDTO.setId(message.getId());
        messageDTO.setContent(message.getContent());
        messageDTO.setIdChatRoom(message.getChatRoom().getId());
        return messageDTO;
    }
}
