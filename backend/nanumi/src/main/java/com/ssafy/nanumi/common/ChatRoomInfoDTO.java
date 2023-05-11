package com.ssafy.nanumi.common;


import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
@Getter
@Setter
public class ChatRoomInfoDTO {
    private long chatRoomId;
    private long opponentId;
    private String opponentNickname;
    private String opponentProfileImage;
    private String lastMessage;
    private LocalDateTime lastMessageTime;
    private long productId;
    private boolean isBlocked;


}