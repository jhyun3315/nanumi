package com.ssafy.nanumi.config.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@EnableWebSecurity // 스프링 시큐리티 필터가 스프링 필터체인에 등록됨
@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    @Bean
    public PasswordEncoder getPasswordEncoder(){
        return new BCryptPasswordEncoder();
    }
    @Override
    protected void configure(HttpSecurity http) throws Exception{
        http.authorizeHttpRequests()
                .antMatchers("/users/login/**","/users/join/**","/users/check/**","/api/v2/**", "/health", "/swagger-ui.html", "/swagger/**",
                        "/swagger-ui/**","/swagger-resources/**", "/webjars/**", "/v2/api-docs").permitAll()
                .anyRequest().authenticated()
                .and()
                .csrf().disable()
                .formLogin();
    }
}
