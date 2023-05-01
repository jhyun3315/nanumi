package com.ssafy.nanumi.sequence;

import com.ssafy.nanumi.db.entity.ChatRoomEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.data.mongodb.core.mapping.event.AbstractMongoEventListener;
import org.springframework.data.mongodb.core.mapping.event.BeforeConvertEvent;
import org.springframework.stereotype.Component;

// TODO ChatRoomSeqListener는 MongoDB에서 ChatRoomEntity의 chatroomSeq 필드에 대해 자동으로 증가하는 순차 ID를 생성하는 역할을 합니다.
//  이 클래스는 ChatRoomEntity 객체가 MongoDB에 저장되기 전에 호출되는 이벤트 핸들러를 정의하고 있습니다.
//  이 클래스는 AbstractMongoEventListener를 상속받아 BeforeConvertEvent를 처리합니다.

@RequiredArgsConstructor
@Component
public class ChatRoomSeqListener extends AbstractMongoEventListener<ChatRoomEntity> {
    // SequenceGeneratorService는 순차 ID를 생성하는 서비스입니다.
    private final SequenceGeneratorService generatorService;

    // TODO
    //  이 메소드는 ChatRoomEntity 객체가 MongoDB에 저장되기 전에 호출됩니다.
    //  객체의 chatroomSeq 필드가 1보다 작은 경우 SequenceGeneratorService를 사용하여 새로운 순차 ID를 생성하고,
    //  객체의 chatroomSeq 필드에 할당합니다.
    //  @param event BeforeConvertEvent<ChatRoomEntity> 타입의 이벤트 객체로, MongoDB에 저장되기 전의 ChatRoomEntity 객체를 포함하고 있습니다.
    @Override
    public void onBeforeConvert(BeforeConvertEvent<ChatRoomEntity> event) {
        if (event.getSource().getChatroomSeq() < 1) {
            event.getSource().setChatroomSeq(generatorService.generateSequence(ChatRoomEntity.SEQUENCE_NAME));
        }
    }
}
