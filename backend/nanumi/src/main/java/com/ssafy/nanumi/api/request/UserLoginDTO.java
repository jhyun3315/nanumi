package com.ssafy.nanumi.api.request;

import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class UserLoginDTO {
    private String id;
    private String password;

    @Builder
    public UserLoginDTO(String id, String password) {
        this.id = id;
        this.password = password;
    }
}
