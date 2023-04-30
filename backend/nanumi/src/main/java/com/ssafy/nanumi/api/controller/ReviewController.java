package com.ssafy.nanumi.api.controller;

import com.ssafy.nanumi.api.request.UserReviewDTO;
import com.ssafy.nanumi.api.service.ReviewService;
import com.ssafy.nanumi.config.response.CustomResponse;
import com.ssafy.nanumi.config.response.ResponseService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
public class ReviewController {

    private final ResponseService responseService;
    private final ReviewService reviewService;

    /* 거래한 상대방 평가 */
    @PostMapping("/reviews")
    public CustomResponse saveUserReview(@RequestBody UserReviewDTO userReviewDTO) {

        // TODO : writerId는 JWT에서, receiverId는 products table에서, matchId는 Pathvariable에서

        long writerId = 1L;
        long matchId = 1L;

        // 별점을 남겼을 경우에만 (후기를 남겼을 경우에만)
        if (userReviewDTO.getStarPoint() != 0) {
            reviewService.saveUserReview(userReviewDTO, writerId, matchId);
        }

        return responseService.getSuccessResponse();
    }
}
