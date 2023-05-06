package com.ssafy.nanumi.api.service;

import com.ssafy.nanumi.db.repository.BlacklistRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = false)
public class BlacklistService {

    private final BlacklistRepository blacklistRepository;
}
