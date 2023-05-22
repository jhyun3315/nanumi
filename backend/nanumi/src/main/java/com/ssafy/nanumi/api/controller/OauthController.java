package com.ssafy.nanumi.api.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.ssafy.nanumi.api.service.KakaoOauthService;
import com.ssafy.nanumi.api.service.UserService;
import com.ssafy.nanumi.config.response.CustomDataResponse;
import com.ssafy.nanumi.config.response.ResponseService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import static com.ssafy.nanumi.config.response.exception.CustomSuccessStatus.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/oauth/kakao")
@CrossOrigin(origins = {"http://localhost:3000", "https://k8b103.p.ssafy.io", "https://kapi.kakao.com"})
public class OauthController {
    private final KakaoOauthService kakaoOauthService;
    private final ResponseService responseService;
    private final UserService userService;

    @GetMapping("/login")
    public void kakaoLogin(HttpServletResponse response, @RequestParam("fcmToken") String fcmToken) throws IOException {
        response.sendRedirect(kakaoOauthService.loginPage(fcmToken)); // 로그인 페이지로 리다이렉트
    }

    /* 카카오 로그인 */
    @GetMapping("/callback")
    public CustomDataResponse kakaoLogin( @RequestParam("code") String code, @RequestParam("state")String fcmToken) throws JsonProcessingException {
        return responseService.getDataResponse(kakaoOauthService.kakaoLogin(code, fcmToken),RESPONSE_SUCCESS);
    }



//    @PostMapping("/logout")
//    public CustomResponse kakaoLogout(@RequestHeader("Authorization") String accessToken){
//        HttpStatus status = kakaoOauthService.logout(accessToken);
//        System.out.println("< kakao logout response statue > "+status.value());
//        return responseService.getSuccessResponse();
//    }


}
