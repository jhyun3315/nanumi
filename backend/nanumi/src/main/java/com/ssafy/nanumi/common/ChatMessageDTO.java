package com.ssafy.nanumi.common;


import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;
@Getter
@Setter
public class ChatMessageDTO {

    // 채팅 메시지의 타입을 나타내는 열거형(enum)이다.
    // TALK는 일반 채팅 메시지, QUIT는 채팅방에서 나갈 때의 메시지를 의미한다.
    public enum MessageType {
        TALK, QUIT
    }

    // 채팅 메시지의 타입을 저장하는 변수
    private MessageType type;
    
    // 채팅 메시지가 속한 채팅방의 ID를 저장하는 변수
    private long roomId;

    // 채팅 메시지를 보낸 사용자의 ID를 저장하는 변수
    private long sender;

    // 채팅 메시지의 내용을 저장하는 변수
    private String message;

}
