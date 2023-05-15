package com.ssafy.nanumi.api.service;

import com.ssafy.nanumi.api.request.ReportUserDTO;
import com.ssafy.nanumi.api.request.UserBanDTO;
import com.ssafy.nanumi.api.response.AdminLoginResDTO;
import com.ssafy.nanumi.api.response.ReportAllDTO;
import com.ssafy.nanumi.api.response.ReportedUserDTO;
import com.ssafy.nanumi.config.jwt.JwtProvider;
import com.ssafy.nanumi.config.response.exception.CustomException;
import com.ssafy.nanumi.db.entity.Address;
import com.ssafy.nanumi.db.entity.Report;
import com.ssafy.nanumi.db.entity.User;
import com.ssafy.nanumi.db.entity.UserInfo;
import com.ssafy.nanumi.db.repository.AddressRepository;
import com.ssafy.nanumi.db.repository.ReportRepository;
import com.ssafy.nanumi.db.repository.UserInfoRepository;
import com.ssafy.nanumi.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static com.ssafy.nanumi.config.response.exception.CustomExceptionStatus.*;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = false)
public class AdminService {

    private final UserRepository userRepository;
    private final UserInfoRepository userInfoRepository;
    private final ReportRepository reportRepository;
    private final AddressRepository addressRepository;
    private final JwtProvider jwtProvider;

    /* 관리자 로그인 */
    public AdminLoginResDTO adminLogin(String email, String password) {

        // TODO : OAuth
        // TODO : 예외처리 수정

        User adminUser = userRepository.findByEmail(email)
                .orElseThrow(() -> new CustomException(REQUEST_ERROR));

        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

        if (!encoder.matches(password, adminUser.getPassword())) {
            throw new CustomException(REQUEST_ERROR);
        }

        // Access Token
        String AT = jwtProvider.createAccessToken(adminUser.getEmail(), adminUser.getTiers());
        // Refresh Token
        String RT = jwtProvider.createRefreshToken(adminUser.getEmail(), adminUser.getTiers());

        UserInfo userInfo = userInfoRepository.findById(adminUser.getUserInfo().getId())
                .orElseThrow(() -> new CustomException(NOT_FOUND_USER_INFO));
        
        userInfo.updateRefreshToken(RT);

        return new AdminLoginResDTO(adminUser, AT, RT);
    }

    /* 신고 목록 조회 */
    @Transactional(readOnly = true)
    public List<ReportAllDTO> findReportAll() {

        List<Report> reportList = reportRepository.findAll();

        List<ReportAllDTO> reportAllDTOS = new ArrayList<>();

        for (Report report : reportList) {

            // 신고 대상자 신고 누적 횟수 조회
            int reportedCount = userInfoRepository.findUserInfoIdByUserId(report.getReported().getId())
                    .orElseThrow(() -> new CustomException(NOT_FOUND_USER));

            // 신고 대상자 조회
            User reported = userRepository.findById(report.getReported().getId())
                    .orElseThrow(() -> new CustomException(NOT_FOUND_USER));

            Address address = addressRepository.findById(reported.getAddress().getId())
                    .orElseThrow(() -> new CustomException(NOT_FOUND_ADDRESS_CODE));

            ReportedUserDTO reportedUserDTO = ReportedUserDTO.builder()
                    .id(reported.getId())
                    .nickname(reported.getNickname())
                    .profile_url(reported.getProfileUrl())
                    .si(address.getSi())
                    .gugun(address.getGuGun())
                    .dong(address.getDong())
                    .build();

            reportAllDTOS.add(
                    ReportAllDTO.builder()
                            .id(report.getId())
                            .reporterId(report.getReporter().getId())
                            .reported(reportedUserDTO)
                            .content(report.getContent())
                            .status(report.isStatus())
                            .reportedCount(reportedCount)
                            .stopDate(report.getStopDate())
                            .reportDate(report.getCreateDate().toString())
                            .build()
            );
        }

        return reportAllDTOS;
    }

    /* 유저 제재 */
    public void banUser(UserBanDTO userBanDTO) {

        // TODO : 예외처리 수정

        User user = userRepository.findById(userBanDTO.getReportedId())
                .orElseThrow(() -> new CustomException(NOT_FOUND_USER));

        UserInfo userInfo = userInfoRepository.findById(user.getUserInfo().getId())
                .orElseThrow(() -> new CustomException(NOT_FOUND_USER_INFO));

        // 현재 시간에서 stopDate만큼 더한 날짜
        LocalDateTime banDate = LocalDateTime.now();
        log.info("banDate1 = " + banDate);
        banDate = banDate.plusDays(userBanDTO.getStopDate());
        log.info("banDate2 = " + banDate);

        // 신고 누적 횟수, 제재 기간 갱신
        userInfo.updateBanUser(banDate);

        Report report = reportRepository.findByReportedIdAndReporterId(userBanDTO.getReportedId(), userBanDTO.getReporterId())
                .orElseThrow(() -> new CustomException(REQUEST_ERROR));

        // 신고 처리 완료, 제재 일수 갱신
        // TODO : 제재기간 갱신은 다시 고민
        report.updateStatus(userBanDTO.getStopDate());
    }

    /* 사용자 신고 */
    public void reportUser(long reporterId, ReportUserDTO reportUserDTO) {
        User reported = userRepository.findById(reportUserDTO.getReportedId())
                .orElseThrow(() -> new CustomException(NOT_FOUND_USER));

        User reporter = userRepository.findById(reporterId)
                .orElseThrow(() -> new CustomException(NOT_FOUND_USER));

        Report report = Report.builder()
                .content(reportUserDTO.getContent())
                .status(false)
                .reported(reported)
                .reporter(reporter)
                .build();

        reportRepository.save(report);
    }
}
