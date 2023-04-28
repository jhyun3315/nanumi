package com.ssafy.nanumi.api.controller;

import com.ssafy.nanumi.api.service.MatchService;
import com.ssafy.nanumi.config.response.CustomDataResponse;
import com.ssafy.nanumi.config.response.ResponseService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import static com.ssafy.nanumi.config.response.exception.CustomSuccessStatus.*;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:3000", "https://k8b103.p.ssafy.io"})
public class MatchController {
    private final MatchService matchService;
    private final ResponseService responseService;

    @GetMapping("/matches/{product_id}")
    public CustomDataResponse getMatchList(@PathVariable("product_id") long match_id){
        return responseService.getDataResponse(matchService.getMatchList(match_id),RESPONSE_SUCCESS);
    }
}