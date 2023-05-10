package com.ssafy.nanumi.config.response.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum CustomExceptionStatus {

    /* common error */
    REQUEST_LOGIN(false, 400, "로그인을 다시 하세요."),
    REQUEST_ERROR(false, 400, "잘못된 요청입니다."),
    RESPONSE_EMAIL_EXISTED(false, 400,"이미 존재하는 이메일 입니다."),
    NOT_MATCHED_PASSWORD(false, 400,"비밀번호가 올바르지 않습니다."),
    NOT_FOUND_LOGIN_PROVIDER(false, 404, "올바르지 않은 로그인 제공자 유형입니다."),
    NOT_FOUND_USER(false, 400, "해당 유저가 존재하지 않습니다."),
    INVALID_USER(false, 400, "상품 작성자와 일치하지 않습니다."),
    NOT_FOUND_MATCH(false, 400, "해당 매칭이 존재하지 않습니다."),
    NOT_FOUND_ADDRESS_CODE(false, 400, "해당 주소가 존재하지 않습니다."),
    CAN_NOT_UPDATE_ADDRESS(false, 400, "해당 주소로 수정할수 없습니다."),
    NOT_FOUND_USER_INFO(false, 400, "해당 유저 정보가 존재하지 않습니다."),
    NOT_FOUND_PRODUCT(false, 404, "상품을 찾을 수 없습니다." ),
    NOT_FOUND_CATEGORY(false, 404, "카테고리를 찾을 수 없습니다."),
    NOT_FOUND_ADDRESS(false, 404, "주소를 찾을 수 없습니다."),
    NOT_SUPPORTED_FORMAT(false, 404, "지원하지 않는 format 입니다."),

    NOT_FOUND_CHAT_ROOM(false,404, "Not found chat room"),
    ;


    private final boolean isSuccess;
    private final int code;
    private final String message;
}
