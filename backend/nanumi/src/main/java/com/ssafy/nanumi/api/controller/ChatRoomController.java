package com.ssafy.nanumi.api.controller;


import com.ssafy.nanumi.api.service.ChatRoomService;
import com.ssafy.nanumi.common.CreateChatRoomDTO;
import com.ssafy.nanumi.db.entity.ChatRoomEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor  // final, NotNull 필드 자동 생성
@Controller
@RequestMapping("chat")
public class ChatRoomController {
    private final ChatRoomService chatRoomService;


    @PostMapping("room")
    public ResponseEntity<?> createRoom(@RequestBody CreateChatRoomDTO DTO) {
        return chatRoomService.CreateChatRoom(DTO);
    }

    @GetMapping("findroom")
    public ResponseEntity<List<ChatRoomEntity>> findRoom() {
        return new ResponseEntity<>(chatRoomService.FindRoom(), HttpStatus.OK);
    }

    @GetMapping("findmyroom")
    public ResponseEntity<List<ChatRoomEntity>> findMyRoom(@RequestParam long user) {
        return new ResponseEntity<>(chatRoomService.FindMyChatRooms(user), HttpStatus.OK);
    }
}
