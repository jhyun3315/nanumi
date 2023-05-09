package com.ssafy.nanumi.api.request;

import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class UserLoginDTO {
    private String id;
    private String password;

    private String fcmToken;

    @Builder
    public UserLoginDTO(String id, String password, String fcmToken) {
        this.id = id;
        this.password = password;
        this.fcmToken = fcmToken;
    }
}
