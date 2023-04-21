package com.ssafy.nanumi.api.service;

import com.ssafy.nanumi.api.request.UserJoinDTO;
import com.ssafy.nanumi.db.repository.LoginProviderRepository;
import com.ssafy.nanumi.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@Transactional(readOnly = false)
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final LoginProviderRepository loginProviderRepository;

    public void Join(UserJoinDTO userJoinDTO) {

    }
}
