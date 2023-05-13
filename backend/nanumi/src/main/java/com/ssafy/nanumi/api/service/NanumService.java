package com.ssafy.nanumi.api.service;

import com.ssafy.nanumi.api.response.MatchSuccessDto;
import com.ssafy.nanumi.api.service.NanumRegisterService;
import com.ssafy.nanumi.db.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class NanumService {
    private final NanumRegisterService nanumRegisterService;
    private static final String NANUM_KEY_PREFIX = "NANUM_";
    public MatchSuccessDto registerNanum(Long productId, User user)  {
        String key = NANUM_KEY_PREFIX + productId.toString();
        return nanumRegisterService.register(key, productId, user);
    }

}
