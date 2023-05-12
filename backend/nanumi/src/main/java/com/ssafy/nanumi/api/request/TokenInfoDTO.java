package com.ssafy.nanumi.api.request;

import lombok.Data;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class TokenInfoDTO {
    private final long id;
    private final String accessToken;
    private final String refreshToken;
}
