package com.ssafy.nanumi.api.controller;

import com.ssafy.nanumi.api.service.BlacklistService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
public class BlacklistController {

    private final BlacklistService blacklistService;
}
