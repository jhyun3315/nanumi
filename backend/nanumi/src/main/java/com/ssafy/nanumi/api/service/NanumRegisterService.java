package com.ssafy.nanumi.api.service;

import com.ssafy.nanumi.common.lock.DistributeLock;
import com.ssafy.nanumi.api.response.MatchSuccessDto;
import com.ssafy.nanumi.config.response.exception.CustomException;
import com.ssafy.nanumi.config.response.exception.CustomExceptionStatus;
import com.ssafy.nanumi.db.entity.Match;
import com.ssafy.nanumi.db.entity.Product;
import com.ssafy.nanumi.db.entity.User;
import com.ssafy.nanumi.db.repository.MatchRepository;
import com.ssafy.nanumi.db.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.json.JSONObject;
import org.springframework.stereotype.Component;

import java.time.LocalTime;
import java.util.List;

@Component
@RequiredArgsConstructor
public class NanumRegisterService {
    private final MatchRepository matchRepository;
    private final ProductRepository productRepository;

    @DistributeLock(key = "#key")
    public MatchSuccessDto register(final String key, Long productId, User user) {
        Product product = productRepository.findById(productId)
                .orElseThrow();

        // 서버시간 확인.
        LocalTime currentTime = LocalTime.now();
        // 오후 2시에서 3시 사이 확인
        if (!(currentTime.isAfter(LocalTime.of(9, 55)) & currentTime.isBefore(LocalTime.of(10, 0)))) {
            return MatchSuccessDto.builder()
                    .result(false)
                    .resultMessage("상품 나눔 시간이 아닙니다.")
                    .matchId(null)
                    .build();
        }

        boolean isDuplicate = matchRepository.existsByProductIdAndUserId(productId, user.getId());
        if (isDuplicate) {
            return MatchSuccessDto.builder()
                    .result(false)
                    .resultMessage("중복된 요청 입니다.")
                    .matchId(null)
                    .build();
        }
        else {
            int CountMatches = product.getMatches().size();
            if (CountMatches < 3) {
                Match match = Match.builder()
                        .isMatching(false)
                        .product(product)
                        .user(user)
                        .build();
                Match newMatch = matchRepository.save(match);
                if (CountMatches == 2) {
                    product.setClosed(true);
                }
                return MatchSuccessDto.builder()
                        .result(true)
                        .resultMessage("신청 되었습니다.")
                        .matchId(newMatch.getId())
                        .build();
            } else {
                product.setClosed(true);
                return MatchSuccessDto.builder()
                        .result(false)
                        .resultMessage("인원이 다 찼습니다.")
                        .matchId(null)
                        .build();
            }
        }
    }

}

