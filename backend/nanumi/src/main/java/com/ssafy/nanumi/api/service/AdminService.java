package com.ssafy.nanumi.api.service;

import com.ssafy.nanumi.api.request.UserBanDTO;
import com.ssafy.nanumi.api.response.ReportAllDTO;
import com.ssafy.nanumi.config.response.exception.CustomException;
import com.ssafy.nanumi.config.response.exception.CustomExceptionStatus;
import com.ssafy.nanumi.db.entity.Report;
import com.ssafy.nanumi.db.entity.User;
import com.ssafy.nanumi.db.repository.ReportRepository;
import com.ssafy.nanumi.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static com.ssafy.nanumi.config.response.exception.CustomExceptionStatus.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class AdminService {

    private final UserRepository userRepository;
    private final ReportRepository reportRepository;

    /* 관리자 로그인 */
    public void adminLogin(String email, String password) {

        // TODO : OAuth, JWT, PasswordEncoder 적용해야함.
        // TODO : 예외처리 수정

        User adminUser = userRepository.findByEmail(email)
                .orElseThrow(() -> new CustomException(REQUEST_ERROR));

        if (!password.equals(adminUser.getPassword())) {
            throw new CustomException(REQUEST_ERROR);
        }
    }

    /* 신고 목록 조회 */
    public List<ReportAllDTO> findReportAll() {

        List<Report> reportList = reportRepository.findAll();

        List<ReportAllDTO> reportAllDTOS = new ArrayList<>();

        for (Report report : reportList) {

            reportAllDTOS.add(
                    ReportAllDTO.builder()
                            .id(report.getId())
                            .reporterId(report.getReporter().getId())
                            .reportedId(report.getReported().getId())
                            .content(report.getContent())
                            .status(report.isStatus())
                            .stopDate(report.getStopDate())
                            .reportDate(report.getCreateDate().toString())
                            .build()
            );
        }

        return reportAllDTOS;
    }

    public void banUser(UserBanDTO userBanDTO) {

        // TODO : 예외처리 수정

        User user = userRepository.findById(userBanDTO.getReportedId())
                .orElseThrow(() -> new CustomException(REQUEST_ERROR));

    }
}
