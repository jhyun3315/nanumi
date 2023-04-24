package com.ssafy.nanumi.api.controller;

import com.ssafy.nanumi.api.request.AdminLoginDTO;
import com.ssafy.nanumi.api.service.AdminService;
import com.ssafy.nanumi.config.response.CustomDataResponse;
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
public class AdminController {

    private final AdminService adminService;
    private final ResponseService responseService;

    /* 관리자 로그인 */
    @PostMapping("/admin")
    public CustomResponse adminLogin(@RequestBody AdminLoginDTO adminLoginDTO) {

        // TODO : 이렇게 간단하게 해도 되나...

        adminService.adminLogin(adminLoginDTO.getEmail(), adminLoginDTO.getPassword());

        return responseService.getSuccessResponse();
    }
}
