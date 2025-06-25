package org.example.chatservice.controller;

import org.example.chatservice.dto.RequestResponse;
import org.example.chatservice.dto.request.ChatParicipantDTO;
import org.example.chatservice.dto.request.ChatRoomDTO;
import org.example.chatservice.dto.request.MessageDTO;
import org.example.chatservice.entity.Message;
import org.example.chatservice.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/chat")
public class ChatRestController {
    @Autowired
    private ChatService chatService;
    @PostMapping("/room")
    public ResponseEntity<?>createRoom(@RequestBody ChatRoomDTO roomDTO) {
        try {
            chatService.createRoom(roomDTO);
            return ResponseEntity.ok(new RequestResponse("Tao phòng thanh cong"));
        }catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new RequestResponse("Đã xảy ra lỗi hệ thống"));
        }
    }
    @PostMapping("/message")
    public ResponseEntity<?>sendMessage(@RequestBody MessageDTO messageDTO) {
        try {
        chatService.sendMessage(messageDTO);
        return ResponseEntity.ok(new RequestResponse("Gửi message thành cong"));
        }catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new RequestResponse("Đã xảy ra lỗi hệ thống"));
        }
    }
    @GetMapping("/messages/{id}")
    public ResponseEntity<?> getMessages(@PathVariable int id) {
        try {
            List<Message>messages = chatService.getMessages(id);
            List<MessageDTO> messageDTOS =messages.stream().map(chatService::todo).collect(Collectors.toList());
            return ResponseEntity.ok(new RequestResponse(messageDTOS,"Danh sách messages"));
        }catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new RequestResponse("Đã xảy ra lỗi hệ thống"));
        }
    }
    @PostMapping("/join")
    public ResponseEntity<?>join(@RequestBody ChatParicipantDTO chatParicipantDTO) {
        try {
            chatService.addParticipant(chatParicipantDTO);
            return ResponseEntity.ok(new RequestResponse("Join Thành công"));
        }catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new RequestResponse("Đã xảy ra lỗi hệ thống"));
        }
    }
}
