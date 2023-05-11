package com.ssafy.nanumi.api.request;

import lombok.Data;

@Data
public class TokenInfoDTO {
    private String email;
    private String accessToken;
    private String refreshToken;
}
