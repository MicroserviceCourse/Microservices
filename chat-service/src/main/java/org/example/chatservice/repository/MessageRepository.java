package org.example.chatservice.repository;

import org.example.chatservice.entity.Message;
import org.example.chatservice.generic.IRepository;

import java.util.List;

public interface MessageRepository extends IRepository<Message,Integer> {
    List<Message>findByChatRoomIdOrderByCreatedAtAsc(Integer chatRoomId);
}
