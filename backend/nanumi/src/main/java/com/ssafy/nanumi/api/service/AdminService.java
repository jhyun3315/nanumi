package com.ssafy.nanumi.api.service;

import com.ssafy.nanumi.config.response.exception.CustomException;
import com.ssafy.nanumi.config.response.exception.CustomExceptionStatus;
import com.ssafy.nanumi.db.entity.User;
import com.ssafy.nanumi.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import static com.ssafy.nanumi.config.response.exception.CustomExceptionStatus.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class AdminService {

    private final UserRepository userRepository;

    public void adminLogin(String email, String password) {
        User adminUser = userRepository.findByEmail(email)
                .orElseThrow(() -> new CustomException(REQUEST_ERROR));

        if (!password.equals(adminUser.getPassword())) {
            throw new CustomException(REQUEST_ERROR);
        }
    }
}
