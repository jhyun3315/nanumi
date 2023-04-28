package com.ssafy.nanumi.api.service;

import com.ssafy.nanumi.api.request.UserReviewDTO;
import com.ssafy.nanumi.config.response.exception.CustomException;
import com.ssafy.nanumi.config.response.exception.CustomExceptionStatus;
import com.ssafy.nanumi.db.entity.User;
import com.ssafy.nanumi.db.entity.UserInfo;
import com.ssafy.nanumi.db.repository.UserInfoRepository;
import com.ssafy.nanumi.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

import static com.ssafy.nanumi.config.response.exception.CustomExceptionStatus.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class ReviewService {

    private final UserRepository userRepository;
    private final UserInfoRepository userInfoRepository;

    /* 거래한 상대방 평가 */
    public void saveUserReview(UserReviewDTO userReviewDTO) {

        // TODO : rating 계산로직 수정

        User user = userRepository.findById(userReviewDTO.getReaderId())
                .orElseThrow(() -> new CustomException(NOT_FOUND_USER));

        UserInfo userInfo = userInfoRepository.findById(user.getUserInfo().getId())
                .orElseThrow(() -> new CustomException(NOT_FOUND_USER_INFO));

        List<Integer> rating = userReviewDTO.getRating();
        int totalRating = 0;
        for (int r : rating) {
            totalRating += r; // 수정해야함
        }

        

        int starPoint = userReviewDTO.getStarPoint();
        if (starPoint != 0) { // 별점을 남겼을 경우에만 업데이트
            userInfo.updateStar(userReviewDTO.getStarPoint());
        }
    }
}
