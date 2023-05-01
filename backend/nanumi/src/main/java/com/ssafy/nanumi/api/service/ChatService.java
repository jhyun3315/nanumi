package com.ssafy.nanumi.api.service;

import com.ssafy.nanumi.common.ChatMessageDTO;
import com.ssafy.nanumi.config.response.CustomResponse;
import com.ssafy.nanumi.config.response.ResponseService;
import com.ssafy.nanumi.config.response.exception.CustomException;
import com.ssafy.nanumi.config.response.exception.CustomExceptionStatus;
import com.ssafy.nanumi.db.entity.ChatEntity;
import com.ssafy.nanumi.db.entity.Product;
import com.ssafy.nanumi.db.repository.ChatRepository;
import com.ssafy.nanumi.db.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ChatService {
    // 웹 소켓 메시지를 전송하는데 사용되는 인터페이스
    private final SimpMessageSendingOperations messageTemplate;

    private final ChatRepository chatRepository;
    private final ProductRepository productRepository;
    private final ResponseService responseService;

    // TODO DTO 객체를 입력으로 받아서, 채팅 메시지를 저장하고 해당 채팅방에 전송한다.
    @Transactional
    public void CreateChat(ChatMessageDTO DTO) {
        // 날짜 형식 및 포멧터를 직접 설정 
        String pattern = "yyyy-MM-dd a KK:mm ss:SSS";
        DateFormat df = new SimpleDateFormat(pattern);

        // chatEntiy 객체를 데이터 베이스에 저장
        ChatEntity chatEntity = ChatEntity.builder()
                .type(DTO.getType())
                .roomId(DTO.getRoomId())
                .sender(DTO.getSender())
                .message(DTO.getMessage())
                .sendTime(df.format(new Date()))
                .build();
        chatRepository.save(chatEntity);

        // 채팅방의 구독자들에게 채팅 메시지를 전송한다.
        messageTemplate.convertAndSend("/sub/chat/room/" + DTO.getRoomId(), chatEntity);
    }


    // TODO roomSeq를 입력으로 받아서 해당 채팅방의 최근 20개의 채팅 로그를 반환한다.
    @Transactional
    public List<ChatEntity> GetChatLogLimit20(long roomSeq) {
        // 데이터베이스에서 최근 20개의 채팅 로그를 가져온다.
        return chatRepository.findTop20ByRoomIdOrderBySendTimeDesc(roomSeq);
    }

    @Transactional
    public CustomResponse chatEndMatch(Long productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(()-> new CustomException(CustomExceptionStatus.NOT_FOUND_USER));
        product.matchedEnd();
        return responseService.getSuccessResponse();
    }
}
