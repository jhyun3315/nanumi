package com.ssafy.nanumi.api.service;


import com.ssafy.nanumi.common.CreateChatRoomDTO;
import com.ssafy.nanumi.db.entity.ChatRoomEntity;
import com.ssafy.nanumi.db.repository.ChatRoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ChatRoomService {
    private final ChatRoomRepository chatRoomRepository;
    private final SimpMessageSendingOperations messageTemplate;

    //TODO 채팅방 생성 메서드
    @Transactional
    public ResponseEntity<?> CreateChatRoom(CreateChatRoomDTO DTO) {
        long sendUser = DTO.getSendUser();
        long receiveUser = DTO.getReceiveUser();
        long[] users= new long[] {sendUser, receiveUser};

        try {
            ChatRoomEntity chatRoomEntity = ChatRoomEntity.builder().userList(users).build();
            chatRoomRepository.save(chatRoomEntity);

            // messageTemplate.convertAndSend("/sub/user/" + sendUser, new com.ssafy.nanumi.common.SubscribeChatRoomDTO("CHATROOM", receiveUser, chatRoomEntity.getChatroomSeq()));
            // messageTemplate.convertAndSend("/sub/user/" + receiveUser, new com.cupid.joalarm.chatroom.dto.SubscribeChatRoomDTO("CHATROOM", sendUser, chatRoomEntity.getChatroomSeq()));

            return new ResponseEntity<>("Chat room created successfully", HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to create chat room", HttpStatus.BAD_REQUEST);
        }
    }

    // TODO 모든 채팅방 찾기 메소드
    public List<ChatRoomEntity> FindRoom() {
        return chatRoomRepository.findAll();
    }

    // TODO 특정 사용자의 채팅방 찾기 메소드
    public List<ChatRoomEntity> FindMyChatRooms(long user) {
        return chatRoomRepository.findAllByUserListIn(user);
    }

    // TODO 채팅방 신고처리 메서드
    @Transactional
    public boolean reportByRoomSeq(Long seq) {
        ChatRoomEntity chatRoom = chatRoomRepository.findChatRoomEntityByChatroomSeq(seq);

        // 찾은 채팅방이 없다면 false 리턴
        if(chatRoom == null) return false;

        // 채팅방의 활성화 상태를 false로 변경하여 비활성화 합니다.
        chatRoom.setActivate(false);

        // 변경된 정보를 저장한다.
        chatRoomRepository.save(chatRoom);

        // 채팅방 신고처리가 성공적으로 완료되었으므로 true를 반환한다.
        return true;
    }

}

