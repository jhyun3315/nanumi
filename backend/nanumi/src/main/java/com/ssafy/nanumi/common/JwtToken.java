package com.ssafy.nanumi.common;

import lombok.Builder;
import org.springframework.beans.factory.annotation.Value;

import java.util.Base64;

public class JwtToken {
    @Value("${jwt.secret-key}")
    private static String SECRET_KEY;

    // 엑세스 토큰 유효기간 (1시간)
    private static final Long ACCESS_TOKEN_VALIDATE_TIME = 1000L * 60 * 60;
    // 리프레시 토큰 유효기간 (3일)
    private static final Long REFRESH_TOKEN_VALIDATE_TIME = 1000L * 60 * 60 * 24 * 3;
    private String AUTHORITIES_KEY;
    private String USER_ID;
    private String USER_EMAIL;
    private String USER_ROLE;

    @Builder
    public JwtToken(@Value("${app.auth.jwt.secret-key}") String secretKey) {
        this.SECRET_KEY = Base64.getEncoder().encodeToString(secretKey.getBytes());
    }



}
