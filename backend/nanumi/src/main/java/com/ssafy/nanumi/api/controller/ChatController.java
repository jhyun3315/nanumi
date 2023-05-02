package com.ssafy.nanumi.api.controller;

import com.ssafy.nanumi.api.service.ChatRoomService;
import com.ssafy.nanumi.api.service.ChatService;
import com.ssafy.nanumi.common.ChatMessageDTO;
import com.ssafy.nanumi.config.response.CustomResponse;
import com.ssafy.nanumi.config.response.ResponseService;
import com.ssafy.nanumi.db.entity.ChatEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static com.ssafy.nanumi.config.response.exception.CustomSuccessStatus.RESPONSE_SUCCESS;

@RequiredArgsConstructor
@RestController
public class ChatController {
    private final ChatService chatService;
    private final ChatRoomService chatRoomService;
    private final ResponseService responseService;

    @MessageMapping("chat/message")
    public void message(ChatMessageDTO message) {
        switch (message.getType()) {
            case TALK: // 일반 채팅 메시지의 경우
                chatService.CreateChat(message);
                break;
            case QUIT: // 채팅방에서 나갈 때 메시지의 경우
                chatService.CreateChat(message); // 채팅을 생성
                chatRoomService.reportByRoomSeq(message.getRoomId()); // 채팅방의 정보 생신
                break;
            default:
                break;
        }
    }

    //TODO "chat/chatlog"로 매핑된 HTTP GET 요청을 처리하도록 설정한다.
    @GetMapping("chat/chatlog")
    public ResponseEntity<List<ChatEntity>> ChatLog(@RequestParam long roomSeq) {

        // 해당 채팅방의 최근 20개의 채팅 로그를 반환한다.
        return new ResponseEntity<>(chatService.GetChatLogLimit20(roomSeq), HttpStatus.OK);
    }
    @GetMapping("/chat/end/{product-id}")
    public CustomResponse endChat(@PathVariable("product-id") Long productId) {
        return responseService.getDataResponse(chatService.chatEndMatch(productId),RESPONSE_SUCCESS);
    }
}