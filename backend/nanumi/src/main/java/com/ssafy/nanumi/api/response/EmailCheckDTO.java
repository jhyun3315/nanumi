package com.ssafy.nanumi.api.response;

import lombok.Builder;
import lombok.Getter;

@Getter
public class EmailCheckDTO {
    private String code;

    @Builder
    public EmailCheckDTO(String code) {
        this.code = code;
    }
}
