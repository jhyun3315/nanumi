package com.ssafy.nanumi.api.request;

import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class UserLoginDTO {
    private long userId;
    private String password;
    private String fcmToken;


    @Builder
    public UserLoginDTO(long userId, String password, String fcmToken) {
        this.userId = userId;
        this.password = password;
        this.fcmToken = fcmToken;

    }
}
