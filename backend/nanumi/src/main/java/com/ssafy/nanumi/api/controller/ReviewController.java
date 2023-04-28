package com.ssafy.nanumi.api.controller;

import com.ssafy.nanumi.api.request.UserReviewDTO;
import com.ssafy.nanumi.api.service.ReviewService;
import com.ssafy.nanumi.config.response.CustomResponse;
import com.ssafy.nanumi.config.response.ResponseService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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

        reviewService.saveUserReview(userReviewDTO);

        return responseService.getSuccessResponse();
    }
}
