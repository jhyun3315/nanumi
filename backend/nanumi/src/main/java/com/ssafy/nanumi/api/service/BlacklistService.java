package com.ssafy.nanumi.api.service;

import com.ssafy.nanumi.api.request.BlockCancelDTO;
import com.ssafy.nanumi.config.response.exception.CustomException;
import com.ssafy.nanumi.db.entity.Blacklist;
import com.ssafy.nanumi.db.entity.User;
import com.ssafy.nanumi.db.repository.BlacklistRepository;
import com.ssafy.nanumi.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.ssafy.nanumi.config.response.exception.CustomExceptionStatus.*;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = false)
public class BlacklistService {

    private final BlacklistRepository blacklistRepository;
    private final UserRepository userRepository;

    /* 사용자 차단 해제 */
    public void blockCancel(long blockerId, BlockCancelDTO blockCancelDTO) {

        // 차단자 유저 검증
        User blocker = userRepository.findById(blockerId)
                .orElseThrow(() -> new CustomException(NOT_FOUND_USER));

        // 차단대상자 유저 검증
        User target = userRepository.findById(blockCancelDTO.getTargetId())
                .orElseThrow(() -> new CustomException(NOT_FOUND_USER));

        // 차단 목록 조회
        Blacklist blacklist = blacklistRepository.findByBlockIdAndTargetId(blockerId, blockCancelDTO.getTargetId())
                .orElseThrow(() -> new CustomException(REQUEST_ERROR)); // 에러 처리 필요

        // 사용자 차단 해제
        blacklist.blockCancel();
    }
}
