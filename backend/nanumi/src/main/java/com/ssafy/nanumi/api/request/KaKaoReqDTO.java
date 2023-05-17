package com.ssafy.nanumi.api.request;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class KaKaoReqDTO {
    private String code;
    private String errorDescription;
    private String fcmToken;
    private String errorName;

    @Builder
    public KaKaoReqDTO(String code, String errorDescription, String fcmToken, String errorName) {
        this.code = code;
        this.errorDescription = errorDescription;
        this.fcmToken = fcmToken;
        this.errorName = errorName;
    }
}
