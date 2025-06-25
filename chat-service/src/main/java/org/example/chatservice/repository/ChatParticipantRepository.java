package org.example.chatservice.repository;

import org.example.chatservice.entity.ChatParticipant;
import org.example.chatservice.generic.IRepository;

import java.util.List;

public interface ChatParticipantRepository extends IRepository<ChatParticipant,Integer> {
    List<ChatParticipant>findByUserIdOrGuestId(Integer userId, String guestId);
}
