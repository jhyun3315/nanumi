package com.ssafy.nanumi.config.jwt;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Jwt가 유효성을 검증하는 Filter
 */
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtProvider jwtProvider;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try {
            String token = jwtProvider.resolveToken(request);

            if (token != null && jwtProvider.validateToken(token)) {
                // check access token
                token = token.split(" ")[1].trim();
                Authentication auth = jwtProvider.getAuthentication(token);
                SecurityContextHolder.getContext().setAuthentication(auth);
            }

        } catch (MalformedJwtException e) {
//            log.info("유효하지 않은 토큰입니다.");
            request.setAttribute("Invalid Token", e);
        } catch (ExpiredJwtException e) {
//            log.info("만료된 토큰입니다.");
            request.setAttribute("Expired Token", e);
        } catch (UnsupportedJwtException e) {
//            log.info("지원하지 않는 토큰입니다.");
            request.setAttribute("Unsupported Token", e);
        } catch (IllegalStateException e) {
//            log.info("잘못된 토큰입니다.");
            request.setAttribute("Wrong Token", e);
        }

        filterChain.doFilter(request, response);
    }
}