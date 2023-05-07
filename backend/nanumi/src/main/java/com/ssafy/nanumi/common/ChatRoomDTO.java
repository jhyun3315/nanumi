package com.ssafy.nanumi.common;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChatRoomDTO {
    private Long pk;
    private Long[] users;

    public ChatRoomDTO(Long pk, Long[] users) {
        this.pk = pk;
        this.users = users;
    }


}
