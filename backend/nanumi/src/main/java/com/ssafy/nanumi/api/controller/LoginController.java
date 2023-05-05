package com.ssafy.nanumi.api.controller;

import com.ssafy.nanumi.config.auth.AuthService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
@RestController
@RequiredArgsConstructor
public class LoginController {
    private final AuthService authService;

    @GetMapping("/login/redirect")
    public void loginRedirect(HttpServletResponse response) throws IOException {
        String loginPageUri = authService.loginPage(); // 로그인 페이지 가져오기
        response.sendRedirect(loginPageUri);
    }


}
