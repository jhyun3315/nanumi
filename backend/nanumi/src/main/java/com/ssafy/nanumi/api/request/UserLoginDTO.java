package com.ssafy.nanumi.api.request;

import com.ssafy.nanumi.common.provider.Provider;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class UserLoginDTO {
    private String email;
    private String password;
    private String fcmToken;
    private Provider provider;

    @Builder
    public UserLoginDTO(String email, String password, String fcmToken) {
        this.email = email;
        this.password = password;
        this.fcmToken = fcmToken;
        this.provider = Provider.local;

    }
}
