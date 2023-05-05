package com.ssafy.nanumi.config.auth;

import com.ssafy.nanumi.api.response.UserLoginResDTO;
import com.ssafy.nanumi.api.service.UserService;
import com.ssafy.nanumi.config.response.ResponseService;
import com.ssafy.nanumi.config.response.exception.CustomException;
import com.ssafy.nanumi.db.entity.User;
import com.ssafy.nanumi.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import static com.ssafy.nanumi.config.response.exception.CustomExceptionStatus.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthService implements UserDetailsService {
    private final UserRepository userRepository;

    public String loginPage() {
        return "https://www.google.com/";
    }

    @Override
    public UserDetails loadUserByUsername(String id) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(id).orElseThrow(() -> new CustomException(NOT_FOUND_USER));
        return new PrincipalDetails(user);

    }
}
