package com.ssafy.nanumi.api.controller;

import com.ssafy.nanumi.api.request.BlockDTO;
import com.ssafy.nanumi.api.response.BlacklistDTO;
import com.ssafy.nanumi.api.service.BlacklistService;
import com.ssafy.nanumi.config.response.CustomDataResponse;
import com.ssafy.nanumi.config.response.CustomResponse;
import com.ssafy.nanumi.config.response.ResponseService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.ssafy.nanumi.config.response.exception.CustomSuccessStatus.*;

@Slf4j
@RestController
@RequiredArgsConstructor
public class BlacklistController {

    private final ResponseService responseService;
    private final BlacklistService blacklistService;

    /* 사용자 차단 */
    @PostMapping("/block/{user-id}")
    public CustomResponse blockUser(@PathVariable("user-id") long userId, @RequestBody BlockDTO blockDTO) {

        // TODO : userId는 JWT에서

        long blockerId = userId;

        blacklistService.blockUser(blockerId, blockDTO);

        return responseService.getSuccessResponse();
    }

    /* 사용자 차단 해제 */
    @PatchMapping("/block/{user-id}")
    public CustomResponse blockCancel(@PathVariable("user-id") long userId, @RequestBody BlockDTO blockDTO) {

        // TODO : userId는 JWT에서

        long blockerId = userId;

        blacklistService.blockCancel(blockerId, blockDTO);

        return responseService.getSuccessResponse();
    }

    /* 차단 사용자 목록 조회 */
    @GetMapping("block/{user-id}")
    public CustomDataResponse<List<BlacklistDTO>> findBlacklist(@PathVariable("user-id") long userId) {

        // TODO : userId는 JWT에서

        List<BlacklistDTO> blacklistDTOS = blacklistService.findBlacklist(userId);

        return responseService.getDataResponse(blacklistDTOS, RESPONSE_SUCCESS);
    }
}
