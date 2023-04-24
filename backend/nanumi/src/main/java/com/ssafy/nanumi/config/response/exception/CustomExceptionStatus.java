package com.ssafy.nanumi.config.response.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum CustomExceptionStatus {

    /* common error */
    REQUEST_ERROR(false, 400, "잘못된 요청입니다."),
    RESPONSE_EMAIL_EXISTED(false, 400,"이미 존재하는 이메일 입니다."),
    NOT_FOUND_LOGIN_PROVIDER(false, 404, "올바르지 않은 로그인 제공자 유형입니다."),

    ;

    private final boolean isSuccess;
    private final int code;
    private final String message;
}
