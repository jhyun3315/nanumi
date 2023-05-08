package com.ssafy.nanumi.common;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateChatRoomDTO {
    private long sendUser;
    private long opponentId;
    private String opponentNickname;
    private String opponentProfileImage;
    private long productId;
}

