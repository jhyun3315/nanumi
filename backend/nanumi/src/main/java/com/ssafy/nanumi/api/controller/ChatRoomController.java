package com.ssafy.nanumi.api.controller;


import com.ssafy.nanumi.api.service.ChatRoomService;
import com.ssafy.nanumi.common.ChatRoomInfoDTO;
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

    // TODO 채팅방 생성 메서드
    @PostMapping("room")
    public ResponseEntity<?> createRoom(@RequestBody CreateChatRoomDTO DTO) {
        return chatRoomService.CreateChatRoom(DTO);
    }

    // TODO 모든 채팅방 찾기 메서드
    @GetMapping("findroom")
    public ResponseEntity<List<ChatRoomEntity>> findRoom() {
        return new ResponseEntity<>(chatRoomService.FindRoom(), HttpStatus.OK);
    }


    // TODO 특정 사용자의 채팅방 찾기 메서드
    @GetMapping("findmyroom")
    public ResponseEntity<List<ChatRoomInfoDTO>> findMyRoom(@RequestParam long user) {
        return new ResponseEntity<>(chatRoomService.FindMyChatRooms(user), HttpStatus.OK);
    }
}
