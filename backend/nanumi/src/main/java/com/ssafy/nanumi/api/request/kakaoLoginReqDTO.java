package com.ssafy.nanumi.api.request;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class kakaoLoginReqDTO {
    private final String kakaoAccessTocken;
    private String fcmToken;

    public kakaoLoginReqDTO(String kakaoAccessTocken, String fcmToken) {
        this.kakaoAccessTocken = kakaoAccessTocken;
        this.fcmToken = fcmToken;
    }
}
