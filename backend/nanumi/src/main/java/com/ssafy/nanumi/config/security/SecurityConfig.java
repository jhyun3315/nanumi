package com.ssafy.nanumi.config.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@EnableWebSecurity
@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    @Bean
    public PasswordEncoder getPasswordEncoder(){
        return new BCryptPasswordEncoder();
    }
    @Override
    protected void configure(HttpSecurity http) throws Exception{
        http.authorizeHttpRequests()
                .antMatchers("/api/v2/**", "/health", "/swagger-ui.html", "/swagger/**",
                        "/swagger-ui/**","/swagger-resources/**", "/webjars/**", "/v2/api-docs").permitAll()
                .anyRequest().authenticated()
                .and()
                .csrf().disable()
                .formLogin();
    }
}
