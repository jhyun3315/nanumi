package com.ssafy.nanumi.api.service;

import com.ssafy.nanumi.api.request.UserReviewDTO;
import com.ssafy.nanumi.config.response.exception.CustomException;
import com.ssafy.nanumi.db.entity.Match;
import com.ssafy.nanumi.db.entity.Review;
import com.ssafy.nanumi.db.entity.User;
import com.ssafy.nanumi.db.entity.UserInfo;
import com.ssafy.nanumi.db.repository.MatchRepository;
import com.ssafy.nanumi.db.repository.ReviewRepository;
import com.ssafy.nanumi.db.repository.UserInfoRepository;
import com.ssafy.nanumi.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static com.ssafy.nanumi.config.response.exception.CustomExceptionStatus.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class ReviewService {

    private final UserRepository userRepository;
    private final UserInfoRepository userInfoRepository;
    private final ReviewRepository reviewRepository;
    private final MatchRepository matchRepository;

    /* 거래한 상대방 평가 */
    @Transactional(readOnly = false)
    public void saveUserReview(UserReviewDTO userReviewDTO, long writerId, long matchId) {

        // TODO : writerId는 JWT에서, receiverId는 products table에서, matchId는 Pathvariable에서

        // 리뷰 작성자 유저 검증
        User writer = userRepository.findById(writerId)
                .orElseThrow(() -> new CustomException(NOT_FOUND_USER));

        // 매칭 조회
        Match match = matchRepository.findById(matchId)
                .orElseThrow(() -> new CustomException(REQUEST_ERROR)); // 예외처리 필요

        // Product 테이블에서 나누미(리뷰 대상자) id 조회 (query 테스트 필요)
        long receiverId = reviewRepository.findReceiverIdByMatchId(matchId)
                .orElseThrow(() -> new CustomException(REQUEST_ERROR)); // 예외처리 필요


        // 리뷰 대상자 유저 검증
        User receiver = userRepository.findById(receiverId)
                .orElseThrow(() -> new CustomException(NOT_FOUND_USER));

        // rating 계산 로직
        List<Integer> rating = userReviewDTO.getRating();
        int totalRating = 0;
        for (int r : rating) {
            totalRating += 1; // 수정해야함
        }

        // 리뷰 저장, starPoint가 0이 아닐때만
        Review review = Review.builder()
                .writer(writer)
                .receiver(receiver)
                .match(match)
                .starPoint(userReviewDTO.getStarPoint())
                .rating(totalRating)
                .content(userReviewDTO.getContent())
                .build();

        reviewRepository.save(review);

        // 리뷰 대상자 유저 정보 조회
        UserInfo receiverInfo = userInfoRepository.findById(receiver.getUserInfo().getId())
                .orElseThrow(() -> new CustomException(NOT_FOUND_USER_INFO));

        // 리뷰 대상자 유저 별점, 평가 정보 업데이트
        receiverInfo.updateStar(userReviewDTO.getStarPoint());
        receiverInfo.updateRating(totalRating);

        // 온도 계산
        double temperature;
        temperature = ((userReviewDTO.getStarPoint() + totalRating) / 2 - 3) * 0.15;
        temperature = Math.floor(temperature * 100) / 100.0;

        // 리뷰 대상자 온도 업데이트
        receiverInfo.updateTemperature(temperature);
    }
}
