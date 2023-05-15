package com.ssafy.nanumi.api.controller;

import com.ssafy.nanumi.api.service.MatchService;
import com.ssafy.nanumi.api.service.UserService;
import com.ssafy.nanumi.config.response.CustomDataResponse;
import com.ssafy.nanumi.config.response.ResponseService;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import static com.ssafy.nanumi.config.response.exception.CustomSuccessStatus.*;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:3000", "https://k8b103.p.ssafy.io"})
public class MatchController {
    private final MatchService matchService;
    private final ResponseService responseService;
    private final UserService userService;

    @GetMapping("/matches/{product-id}/{user-id}")
    public CustomDataResponse getMatchList(@PathVariable("product-id") long productId, @RequestHeader("Authorization") String accessToken){
        long userId = userService.userByAT(accessToken);
        return responseService.getDataResponse(matchService.getMatchList(productId, userId),RESPONSE_SUCCESS);
    }
    @GetMapping("/matches/{opponent-id}/{product-id}/{user-id}")
    public CustomDataResponse getMatchList(@PathVariable("opponent-id") long opponentId, @PathVariable("product-id") long productId, @RequestHeader("Authorization") String accessToken){
        long userId = userService.userByAT(accessToken);
        return responseService.getDataResponse(matchService.getMachId(opponentId, productId, userId),RESPONSE_SUCCESS);
    }

}
