package org.example.chatservice.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "messages")
@Getter
@Setter
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @ManyToOne
    private ChatRoom chatRoom;
    private Integer senderUserId;
    private String senderGuestId;
    private String content;
    private String messageType = "TEXT";
    private LocalDateTime createdAt = LocalDateTime.now();

    @PrePersist
    @PreUpdate
    public void validate() {
        if ((senderUserId == null && senderGuestId == null) || (senderUserId != null && senderGuestId != null)) {
            throw new IllegalStateException("Chỉ được có senderUserId hoặc senderGuestId");
        }
    }
}
