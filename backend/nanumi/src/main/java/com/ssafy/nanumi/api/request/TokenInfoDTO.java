package com.ssafy.nanumi.api.request;

import lombok.Data;

@Data
public class TokenInfoDTO {
    private long userId;
    private String accessToken;
    private String refreshToken;
}
