package com.ssafy.nanumi.api.service;

import com.ssafy.nanumi.api.response.MatchSuccessDto;
import com.ssafy.nanumi.api.service.NanumRegisterService;
import com.ssafy.nanumi.common.lettuce.RedisLockRepository;
import com.ssafy.nanumi.db.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class NanumService {
    private final NanumRegisterService nanumRegisterService;
    private final RedisLockRepository redisLockRepository;
    public void registerNanum(Long productId, User user) throws InterruptedException {
        System.out.println("야 ;;");
        System.out.println(redisLockRepository.lock(productId));
        while (!redisLockRepository.lock(productId)) {
            Thread.sleep(100);
        }
        try {
            nanumRegisterService.register(productId, user);
        } finally {
            System.out.println("락 풀음");
            boolean val = redisLockRepository.unlock(productId);
            System.out.println(val);
        }
    }
}
