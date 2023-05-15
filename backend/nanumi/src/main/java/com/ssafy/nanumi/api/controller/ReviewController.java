package com.ssafy.nanumi.api.controller;

import com.ssafy.nanumi.api.request.UserReviewDTO;
import com.ssafy.nanumi.api.service.ReviewService;
import com.ssafy.nanumi.api.service.UserService;
import com.ssafy.nanumi.config.response.CustomResponse;
import com.ssafy.nanumi.config.response.ResponseService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
public class ReviewController {

    private final ResponseService responseService;
    private final ReviewService reviewService;
    private final UserService userService;

    /* 거래한 상대방 평가 */
    @PostMapping("/matches/{match-id}/reviews/{user-id}")
    public CustomResponse saveUserReview(@RequestBody UserReviewDTO userReviewDTO,
                                         @PathVariable("match-id") long matchId,
                                         @RequestHeader("Authorization") String accessToken) {

        // TODO : writerId는 JWT에서, receiverId는 products table에서

        long writerId =  userService.userByAT(accessToken);

        // 별점을 남겼을 경우에만 (후기를 남겼을 경우에만)
        if (userReviewDTO.getStarPoint() != 0) {
            reviewService.saveUserReview(userReviewDTO, writerId, matchId);
        }

        return responseService.getSuccessResponse();
    }
}
