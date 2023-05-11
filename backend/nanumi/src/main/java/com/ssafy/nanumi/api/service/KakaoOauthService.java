package com.ssafy.nanumi.api.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.nanumi.api.request.UserJoinDTO;
import com.ssafy.nanumi.api.request.kakaoLoginReqDTO;
import com.ssafy.nanumi.api.response.UserLoginResDTO;
import com.ssafy.nanumi.common.Image;
import com.ssafy.nanumi.common.provider.Provider;
import com.ssafy.nanumi.config.response.exception.CustomException;
import com.ssafy.nanumi.db.entity.Authority;
import com.ssafy.nanumi.db.entity.LoginProvider;
import com.ssafy.nanumi.db.entity.User;
import com.ssafy.nanumi.db.entity.UserInfo;
import com.ssafy.nanumi.db.repository.LoginProviderRepository;
import com.ssafy.nanumi.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import javax.servlet.http.HttpServletResponse;
import java.util.Optional;

import static com.ssafy.nanumi.config.response.exception.CustomExceptionStatus.*;


@Service
@RequiredArgsConstructor
public class KakaoOauthService {
    @Value("${spring.security.oauth2.registration.kakao.client-id}")
    private final String clientId;
    @Value("${spring.security.oauth2.registration.kakao.redirect-uri}")
    private final String redirctURI;
    @Value("${spring.security.oauth2.registration.kakao.client-id}")
    private final String restApiKey;
    @Value("${spring.security.oauth2.registration.kakao.client-secret}")
    private final String adminKey;

    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final UserService userService;
    private final LoginProviderRepository loginProviderRepository;

    public String loginPage() {
        return "https://kauth.kakao.com/oauth/authorize?client_id="+restApiKey+"&redirect_uri="+redirctURI+"&response_type=code";
    }

    public UserLoginResDTO kakaoLogin(kakaoLoginReqDTO req, HttpServletResponse response) throws JsonProcessingException {
        UserLoginResDTO userLoginResDTO = new UserLoginResDTO();

        // 1. "인가 코드"로 "액세스 토큰" 요청 -> 프론트에서 진행해서 넘겨줌
//        String accessToken = getAccessToken(token);

        // 2. 토큰으로 카카오 API 호출 및 최초 로그인시 회원가입 처리
        User user = getKakaoUserInfo(req.getKakaoAccessTocken());

        // 3. 로그인 처리
        // UserLoginDTO(String email, String password)
        return userService.login();
    }

    private void kakaoUsersAuthorizationInput(Authentication authentication, HttpServletResponse response) {
    }

    private Authentication forceLogin(User kakaoUser) {
        return null;
    }

    private User getKakaoUserInfo(String accessToken) throws JsonProcessingException {
        // HTTP Header 생성
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + accessToken);
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        // HTTP 요청 보내기
        HttpEntity<MultiValueMap<String, String>> kakaoUserInfoRequest = new HttpEntity<>(headers);
        RestTemplate rt = new RestTemplate();
        ResponseEntity<String> response = rt.exchange(
                "https://kapi.kakao.com/v2/user/me",
                HttpMethod.POST,
                kakaoUserInfoRequest,
                String.class
        );

        // responseBody에 있는 정보를 꺼냄
        String responseBody = response.getBody();
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readTree(responseBody);

        String id = jsonNode.get("id").asText();
        String email = jsonNode.get("kakao_account").get("email").asText();
        String nickname = jsonNode.get("properties")
                .get("nickname").asText();
        String profileImage = jsonNode.get("profile").get("thumbnail_image_url").asText();

        Optional<User> user = userRepository.findByEmail(email);
        // 해당 이메일로 가입한 사용자가 없거나,
        // 해당 이메일로 가입한 사용자가 있지만 카카오 로그인 가입이 아니라면
        if(user.isEmpty() || (user.isPresent() && !user.get().getLoginProvider().getProvider().equals("kakao"))){
            //회원가입
            // String email, String nickname, String password, long addressId
            return userService.join(new UserJoinDTO(email, nickname, id, 1000000000, profileImage),Provider.kakao);
        }else{ // 이미 가입한 사용라면 (그냥 카카오 로그인만 하려는 사람)
            return user.get();
        }
    }

    public String getAccessToken(String authorizeCode) throws JsonProcessingException {
        // 사용자의 엑세스 토큰 가져오기
        // HTTP Header 생성
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        // HTTP Body 생성
        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        body.add("grant_type", "authorization_code");
        body.add("client_id", clientId);
        body.add("redirect_uri", "http://localhost:8080/oauth/kakao/login");
        body.add("code", authorizeCode);

        // HTTP 요청 보내기
        HttpEntity<MultiValueMap<String, String>> kakaoTokenRequest = new HttpEntity<>(body, headers);
        RestTemplate rt = new RestTemplate();
        ResponseEntity<String> response = rt.exchange(
                "https://kauth.kakao.com/oauth/token",
                HttpMethod.POST,
                kakaoTokenRequest,
                String.class
        );

        // HTTP 응답 (JSON) -> 액세스 토큰 파싱
        String responseBody = response.getBody();
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readTree(responseBody);
        return jsonNode.get("access_token").asText();
    }
}
