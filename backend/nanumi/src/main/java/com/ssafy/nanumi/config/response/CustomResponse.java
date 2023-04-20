package com.ssafy.nanumi.config.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

@Getter
@Setter
@NoArgsConstructor
public class CustomResponse {

    public boolean isSuccess;
    public int code;
    public String message;

    @Builder
    public CustomResponse(boolean isSuccess, int code, String message) {
        this.isSuccess = isSuccess;
        this.code = code;
        this.message = message;
    }
}
