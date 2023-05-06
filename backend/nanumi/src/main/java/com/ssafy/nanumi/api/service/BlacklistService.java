package com.ssafy.nanumi.api.service;

import com.ssafy.nanumi.api.request.BlockDTO;
import com.ssafy.nanumi.api.response.BlacklistDTO;
import com.ssafy.nanumi.config.response.exception.CustomException;
import com.ssafy.nanumi.db.entity.Blacklist;
import com.ssafy.nanumi.db.entity.User;
import com.ssafy.nanumi.db.repository.BlacklistRepository;
import com.ssafy.nanumi.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

import static com.ssafy.nanumi.config.response.exception.CustomExceptionStatus.*;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = false)
public class BlacklistService {

    private final BlacklistRepository blacklistRepository;
    private final UserRepository userRepository;

    /* 사용자 차단 */
    public void blockUser(long blockerId, BlockDTO blockDTO) {

        // 차단자 유저 검증
        User blocker = userRepository.findById(blockerId)
                .orElseThrow(() -> new CustomException(NOT_FOUND_USER));

        // 차단대상자 유저 검증
        User target = userRepository.findById(blockDTO.getTargetId())
                .orElseThrow(() -> new CustomException(NOT_FOUND_USER));

        // 사용자 차단
        Blacklist blacklist = Blacklist.builder()
                .blocker(blocker)
                .target(target)
                .isBlocked(true)
                .build();
    }

    /* 사용자 차단 해제 */
    public void blockCancel(long blockerId, BlockDTO blockDTO) {

        // 차단자 유저 검증
        User blocker = userRepository.findById(blockerId)
                .orElseThrow(() -> new CustomException(NOT_FOUND_USER));

        // 차단대상자 유저 검증
        User target = userRepository.findById(blockDTO.getTargetId())
                .orElseThrow(() -> new CustomException(NOT_FOUND_USER));

        // 차단 목록 조회
        Blacklist blacklist = blacklistRepository.findByBlockIdAndTargetId(blockerId, blockDTO.getTargetId())
                .orElseThrow(() -> new CustomException(REQUEST_ERROR)); // 에러 처리 필요

        // 사용자 차단 해제
        blacklist.blockCancel();
    }

    /* 차단 사용자 목록 조회 */
    @Transactional(readOnly = true)
    public List<BlacklistDTO> findBlacklist(long userId) {

        // 유저 검증
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(NOT_FOUND_USER));

        // 차단 사용자 목록 조회
        List<Blacklist> blacklists = blacklistRepository.findByBlockerIdAndIsBlockedTrue(userId);

        List<BlacklistDTO> blacklistDTOS = new ArrayList<>();

        for (Blacklist blacklist : blacklists) {

            // 차단대상자 유저 조회
            User target = userRepository.findById(blacklist.getTarget().getId())
                    .orElseThrow(() -> new CustomException(NOT_FOUND_USER));

            blacklistDTOS.add(
                    BlacklistDTO.builder()
                            .id(blacklist.getId())
                            .nickname(target.getNickname())
                            .profileUrl(target.getProfileUrl())
                            .build()
            );
        }

        return blacklistDTOS;
    }
}
