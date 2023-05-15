package com.ssafy.nanumi.api.response;

import lombok.Builder;
import lombok.Getter;

@Getter
public class EmailCheckResDTO {
    private String code;

    @Builder
    public EmailCheckResDTO(String code) {
        this.code = code;
    }
}
