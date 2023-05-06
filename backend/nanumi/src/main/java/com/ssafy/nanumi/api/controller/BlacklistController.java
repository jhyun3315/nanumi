package com.ssafy.nanumi.api.controller;

import com.ssafy.nanumi.api.request.BlockCancelDTO;
import com.ssafy.nanumi.api.service.BlacklistService;
import com.ssafy.nanumi.config.response.CustomResponse;
import com.ssafy.nanumi.config.response.ResponseService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
public class BlacklistController {

    private final ResponseService responseService;
    private final BlacklistService blacklistService;

    /* 사용자 차단 해제 */
    @PatchMapping("/block/{uesr-id}")
    public CustomResponse blockCancel(@PathVariable("user-id") long userId, @RequestBody BlockCancelDTO blockCancelDTO) {

        // TODO : userId는 JWT에서

        long blockerId = userId;

        blacklistService.blockCancel(blockerId, blockCancelDTO);

        return responseService.getSuccessResponse();
    }
}
