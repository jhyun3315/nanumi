package com.ssafy.nanumi.api.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
@AllArgsConstructor
public class TokenInfoResDTO {
    private String grantType; // JWT에 대한 인증 타입 (Bearer를 사용한다) - HTTP 헤더의 prefix로 붙여주는 타입
    private String accessToken;
    private String refreshToken;
}

