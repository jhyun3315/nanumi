package com.ssafy.nanumi.api.service;

import com.ssafy.nanumi.common.lettuce.RedisLockRepository;
import com.ssafy.nanumi.config.response.exception.CustomException;
import com.ssafy.nanumi.config.response.exception.CustomExceptionStatus;
import com.ssafy.nanumi.db.entity.Match;
import com.ssafy.nanumi.db.entity.Product;
import com.ssafy.nanumi.db.entity.User;
import com.ssafy.nanumi.db.repository.MatchRepository;
import com.ssafy.nanumi.db.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class NanumRegisterService {
    private final MatchRepository matchRepository;
    private final ProductRepository productRepository;
    private final RedisLockRepository redisLockRepository;

//    @DistributeLock(key = "#key")
    public void register( Long productId, User user) {
        System.out.println("들어옴");
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new CustomException(CustomExceptionStatus.NOT_FOUND_MATCH));
        int CountMatches = product.getMatches().size();
        System.out.println(CountMatches);
        if (CountMatches < 3) {
            Match match = Match.builder()
                    .isMatching(false)
                    .product(product)
                    .user(user)
                    .build();
            Match newMatch = matchRepository.save(match);
            System.out.println("저장");
            if (CountMatches == 2) {
                System.out.println("들어옴");
                product.setClosed(true);
            }
        } else {
            product.setClosed(true);
        }
        }

}

