package com.ssafy.nanumi.config.response.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum CustomSuccessStatus {

    RESPONSE_SUCCESS(true, 200, "요청에 성공했습니다."),
    RESPONSE_NO_CONTENT(true, 204, "조회된 데이터가 없습니다.");

    private final boolean isSuccess;
    private final int code;
    private final String message;
}
