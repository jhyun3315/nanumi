package com.ssafy.nanumi.config.security;

import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class WebSecurityConfig {
    @Bean
    public BCryptPasswordEncoder encodePassWord(){
        return new BCryptPasswordEncoder();
    }
}
