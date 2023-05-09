package com.ssafy.nanumi.config.jwt;

import com.ssafy.nanumi.api.request.TokenInfoDTO;
import com.ssafy.nanumi.api.response.TokenInfoResDTO;
import com.ssafy.nanumi.config.response.exception.CustomException;
import com.ssafy.nanumi.config.response.exception.CustomExceptionStatus;
import com.ssafy.nanumi.db.entity.Authority;
import com.ssafy.nanumi.db.entity.User;
import com.ssafy.nanumi.db.entity.UserInfo;
import com.ssafy.nanumi.db.repository.UserInfoRepository;
import com.ssafy.nanumi.db.repository.UserRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;
import java.util.List;

import static com.ssafy.nanumi.config.response.exception.CustomExceptionStatus.NOT_FOUND_USER_INFO;

@Slf4j
@RequiredArgsConstructor
@Component
public class JwtProvider {

    @Value("${jwt.secret.key}")
    private String salt;

    private Key secretKey;

    // 만료시간 : 1Hour
    private final long exp = 1000L * 60 * 60 * 24 * 7; // 1주일
    private final long rt_exp = 1000L * 60 * 60 * 24 * 7 * 4; // 1달

    private final JpaUserDetailsService userDetailsService;
    private final UserRepository userRepository;
    private final UserInfoRepository userInfoRepository;

    @PostConstruct
    protected void init() {
        secretKey = Keys.hmacShaKeyFor(salt.getBytes(StandardCharsets.UTF_8));
    }

    // 토큰 생성
    public String createAccessToken(String account, List<Authority> roles) {
        Claims claims = Jwts.claims().setSubject(account);
        claims.put("roles", roles);
        Date now = new Date();
        return Jwts.builder() // refresh token
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + exp))
                .signWith(secretKey, SignatureAlgorithm.HS256)
                .compact();
    }

    public String createRefreshToken(String account, List<Authority> roles) {
        Date now = new Date();

        return Jwts.builder() // refresh token
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + rt_exp))
                .signWith(secretKey, SignatureAlgorithm.HS256)
                .compact();
    }

    // 권한정보 획득
    // Spring Security 인증과정에서 권한확인을 위한 기능
    public Authentication getAuthentication(String token) {
        UserDetails userDetails = userDetailsService.loadUserByUsername(this.getAccount(token));
        return new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());
    }

    // 토큰에 담겨있는 유저 account 획득
    public String getAccount(String token) {
        return Jwts.parserBuilder().setSigningKey(secretKey).build().parseClaimsJws(token).getBody().getSubject();
    }

    // Authorization Header를 통해 인증을 한다.
    public String resolveToken(HttpServletRequest request) {
        return request.getHeader("Authorization");
    }

    // 토큰 검증
    public boolean validateToken(String token) {
        try {
            // Bearer 검증
            if (!token.substring(0, "BEARER ".length()).equalsIgnoreCase("BEARER ")) {
                return false;
            } else {
                token = token.split(" ")[1].trim();
            }
            Jws<Claims> claims = Jwts.parserBuilder().setSigningKey(secretKey).build().parseClaimsJws(token);
            if (claims.getBody().getExpiration().before(new Date())) {
                return false;
            }
            // 만료되었을 시 false
            return !claims.getBody().getExpiration().before(new Date());
        } catch (Exception e) {
            return false;
        }
    }

    public TokenInfoResDTO validateRefreshToken(TokenInfoDTO request) {
        try {
            // userInfo RT와 비교
            String RT = request.getRefreshToken();
            UserInfo userInfo = userInfoRepository.findByRefreshToken(RT)
                    .orElseThrow(() -> new CustomException(NOT_FOUND_USER_INFO));
            User user = userRepository.findByEmail(request.getEmail())
                    .orElseThrow(() -> new CustomException(NOT_FOUND_USER_INFO));
            String userInfo_RT = userInfo.getRefreshToken();
            if (!RT.equals(userInfo_RT)) {
                return TokenInfoResDTO.builder()
                        .grantType("Bearer ")
                        .accessToken(request.getAccessToken())
                        .refreshToken(RT)
                        .build();
            }

            // RT가 만료되지 않았을 때
            Jws<Claims> rt_claims = Jwts.parserBuilder().setSigningKey(secretKey).build().parseClaimsJws(userInfo_RT);
            if (rt_claims.getBody().getExpiration().before(new Date())) {
                String AT = this.createAccessToken(user.getEmail(), user.getTiers());
                // Refresh Token
                return TokenInfoResDTO.builder()
                        .grantType("Bearer ")
                        .accessToken(AT)
                        .refreshToken(request.getRefreshToken())
                        .build();
            }
            try {
                // AT의 만료여부 확인
                Jws<Claims> at_claims = Jwts.parserBuilder().setSigningKey(secretKey).build().parseClaimsJws(request.getAccessToken());
                if (at_claims.getBody().getExpiration().before(new Date())) { // AT만 만료 => AT만 새로.
                    return TokenInfoResDTO.builder()
                            .grantType("Bearer ")
                            .accessToken(request.getAccessToken())
                            .refreshToken(request.getRefreshToken())
                            .build();
                }

            } catch (Exception e) {
                // AT expired, RT is OK
                String AT = this.createAccessToken(user.getEmail(), user.getTiers());
                return TokenInfoResDTO.builder()
                        .grantType("Bearer ")
                        .accessToken(AT)
                        .refreshToken(request.getRefreshToken())
                        .build();
            }
            return TokenInfoResDTO.builder()
                    .grantType("Bearer ")
                    .accessToken(request.getAccessToken())
                    .refreshToken(request.getRefreshToken())
                    .build();


        } catch (Exception e) {
            throw new CustomException(CustomExceptionStatus.REQUEST_LOGIN);
        }
    }


}
