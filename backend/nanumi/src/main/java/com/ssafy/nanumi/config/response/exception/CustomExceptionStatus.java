package com.ssafy.nanumi.config.response.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum CustomExceptionStatus {

    /* common error */
    REQUEST_ERROR(false, 400, "잘못된 요청입니다."),

    ;

    private final boolean isSuccess;
    private final int code;
    private final String message;
}
