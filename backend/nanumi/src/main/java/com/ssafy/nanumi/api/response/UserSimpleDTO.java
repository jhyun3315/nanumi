package com.ssafy.nanumi.api.response;

import com.ssafy.nanumi.db.entity.User;
import lombok.Getter;

@Getter
public class UserSimpleDTO {
    private final String nickName;
    private final String profileUrl;

    public UserSimpleDTO(User user){
        nickName = user.getNickname();
        profileUrl = user.getProfileUrl();
    }
}
