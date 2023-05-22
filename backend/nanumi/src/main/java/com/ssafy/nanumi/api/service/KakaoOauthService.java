package com.ssafy.nanumi.api.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.nanumi.api.request.UserJoinDTO;
import com.ssafy.nanumi.api.request.UserLoginDTO;
import com.ssafy.nanumi.api.response.UserLoginResDTO;
import com.ssafy.nanumi.common.provider.Provider;
import com.ssafy.nanumi.config.response.exception.CustomException;
import com.ssafy.nanumi.db.entity.LoginProvider;
import com.ssafy.nanumi.db.entity.User;
import com.ssafy.nanumi.db.repository.LoginProviderRepository;
import com.ssafy.nanumi.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Optional;

import static com.ssafy.nanumi.config.response.exception.CustomExceptionStatus.*;


@Service
@Transactional
@RequiredArgsConstructor
public class KakaoOauthService {
    @Value("${spring.security.oauth2.registration.kakao.client-id}")
    private String clientId;

    @Value("${spring.security.oauth2.registration.kakao.redirect-uri}")
    private String redirctURI;
    @Value("${spring.security.oauth2.registration.kakao.client-id}")
    private String restApiKey;

    @Value("${spring.security.oauth2.registration.kakao.client-secret}")
    private String adminKey;

    private final UserRepository userRepository;
    private final LoginProviderRepository loginProviderRepository;
    private final UserService userService;


//    public HttpStatus logout(String accessToken){
//        // accessToken 으로 사용자 정보 가져옴
//        User user = userService.getUserByAT(accessToken);
//
//        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
//
//        HashMap<String, String> request = new HashMap<>();
//        request.put("target_id_type","user_id");
//        request.put("target_id", String.valueOf(user.getId()));
//
//        // 카카오 로그아웃 요청을 위한 request 생성
//        // HTTP Header 생성
//        HttpHeaders headers = new HttpHeaders();
//        headers.add("Authorization", "KakaoAK " + adminKey);
//        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");
//
//        // HTTP 요청 보내기
//        HttpEntity<MultiValueMap<String, String>> kakaoUserInfoRequest = new HttpEntity<>(headers);
//        RestTemplate rt = new RestTemplate();
//        ResponseEntity<String> response = rt.exchange(
//                "https://kapi.kakao.com/v1/user/logout",
//                HttpMethod.POST,
//                kakaoUserInfoRequest,
//                String.class
//        );
//
//        ObjectMapper objectMapper = new ObjectMapper();
//        return response.getStatusCode();
//    }

    public String loginPage(String fcmToken) {
        return "https://kauth.kakao.com/oauth/authorize?client_id="+restApiKey+"&redirect_uri="+redirctURI+"&state="+fcmToken+"&response_type=code";
    }

    public UserLoginResDTO kakaoLogin(String code, String fcmToken) throws JsonProcessingException {

        // 1. "인가 코드"로 "액세스 토큰" 요청 -> 프론트에서 진행해서 넘겨줌
        String accessToken = getAccessToken(code);

        // 2. 토큰으로 카카오 API 호출 및 최초 로그인시 회원가입 처리
        User user = getKakaoUserInfo(accessToken);

        // 3. 로그인 처리
        return userService.login(new UserLoginDTO(user.getEmail(), user.getPassword(), fcmToken, Provider.kakao));
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
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readTree(response.getBody());

        String id = jsonNode.get("id").asText();
        String email = jsonNode.get("kakao_account").get("email_needs_agreement").asBoolean() ? id : jsonNode.get("kakao_account").get("email").asText();
        String nickname = jsonNode.get("properties").get("nickname").asText();
        String profileImage = jsonNode.get("properties").get("thumbnail_image").asText();

        LoginProvider loginProvider = loginProviderRepository.findByProvider(Provider.kakao).orElseThrow(() -> new CustomException(NOT_FOUND_LOGIN_PROVIDER));
        Optional<User> user = userRepository.findByEmailAndLoginProvider(email,loginProvider);

        // 해당 이메일+카카오 로그인으로 가입한 사용자가 없다면, 로컬 회원 가입
        // 이미 가입한 사용라면 (그냥 카카오 로그인만 하려는 사람)
        return user.orElseGet(() -> userService.join(new UserJoinDTO(email, nickname, id, 1000000000, profileImage), Provider.kakao));
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
        body.add("redirect_uri", redirctURI);
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
