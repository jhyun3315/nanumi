package com.ssafy.nanumi.config.jwt;

public interface JwtProperties {
    String SECRET = "kimwoojin"; // 서버만 알고 있는 개인키
    int EXPIRATION_TIME = 1000 * 60 * 60; // 1초 (1/1000초) * 60 * 60 = 1H
    String TOKEN_PREFIX = "Bearer ";
    String HEADER_STRING = "Authorization";
}
