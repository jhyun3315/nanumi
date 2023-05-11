package com.ssafy.nanumi.api.request;

import com.ssafy.nanumi.common.provider.Provider;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class kakaoLoginReqDTO {
    private String kakaoAccessTocken;
    private String fcmToken;
    private Provider provider;

    @Builder
    public kakaoLoginReqDTO(String kakaoAccessTocken, String fcmToken) {
        this.kakaoAccessTocken = kakaoAccessTocken;
        this.fcmToken = fcmToken;
        this.provider = Provider.kakao;
    }
}
