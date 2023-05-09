package com.ssafy.nanumi.api.request;

import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class UserLoginDTO {
    private String email;
    private String password;

    @Builder
    public UserLoginDTO(String email, String password) {
        this.email = email;
        this.password = password;
    }
}
