package com.ssafy.nanumi.api.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.ssafy.nanumi.api.request.kakaoLoginReqDTO;
import com.ssafy.nanumi.api.response.UserLoginResDTO;
import com.ssafy.nanumi.api.service.KakaoOauthService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/oauth/kakao")
@CrossOrigin(origins = {"http://localhost:3000", "https://j8b208.p.ssafy.io", "https://kapi.kakao.com"})
public class OauthController {
    private final KakaoOauthService kakaoOauthService;

    @GetMapping("/login")
    public void kakaoLogin(HttpServletResponse response) throws IOException {
        response.sendRedirect(kakaoOauthService.loginPage()); // 로그인 페이지로 리다이렉트
    }

    /* 카카오 로그인 */
    @GetMapping("/callback")
//    public UserLoginResDTO kakaoLogin(@RequestBody kakaoLoginReqDTO kakaoLoginReqDTO) throws JsonProcessingException {
    public UserLoginResDTO kakaoLogin(@RequestParam("code") String code) throws JsonProcessingException {
        System.out.println("이게 인가 코드 !! "+code);
        return kakaoOauthService.kakaoLogin(code);
    }
}
