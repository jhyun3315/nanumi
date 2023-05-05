package com.ssafy.nanumi.config.security;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Configuration
@EnableWebSecurity // 스프링 시큐리티 필터가 스프링 필터체인에 등록됨
@RequiredArgsConstructor
public class SecurityConfig  extends WebSecurityConfigurerAdapter {
    @Bean
    public PasswordEncoder getPasswordEncoder(){
        return new BCryptPasswordEncoder();
    }
    @Override
    public void configure(HttpSecurity http) throws Exception{
        http.csrf().disable();
        http.authorizeHttpRequests()
                .antMatchers("/users/join/**","/users/check/**","/api/v2/**", "/health", "/swagger-ui.html", "/swagger/**",
                        "/swagger-ui/**","/swagger-resources/**", "/webjars/**", "/v2/api-docs").permitAll()
                .anyRequest().authenticated();

        http.formLogin()
                .usernameParameter("id")
                .loginProcessingUrl("/users/login") // 로그인 주소가 호출되면 시큐리티가 낚아채서 대신 처리함
                .defaultSuccessUrl("/login/redirect")
                .failureUrl("/")
                .permitAll()
                .and()
                .logout();
    }
}
