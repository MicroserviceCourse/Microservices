package org.example.chatservice.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "chat_participants")
@Getter
@Setter
public class ChatParticipant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @ManyToOne
    private ChatRoom chatRoom;
    private Integer userId;
    private String guestId;
    private LocalDateTime joinedAt = LocalDateTime.now();

    @PrePersist
    @PreUpdate
    public void validate() {
        if ((userId == null && guestId == null) || (userId != null && userId != null)) {
            throw new IllegalStateException("Chỉ được có userId hoặc guestId");

        }
    }
}
