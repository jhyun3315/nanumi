package com.ssafy.nanumi.api.service;

import com.ssafy.nanumi.common.SectorDTO;
import com.ssafy.nanumi.db.repository.GpsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class GpsService {
    private final GpsRepository gpsRepository;

    // TODO 사용자가 이전 GPS에서 현재 GPS로 이동하는 메서드
    public void changeUserSector(String beforeGpsKey, String nowGpsKey, String sessionId) {
        SectorDTO dto = new SectorDTO();
        dto.setBeforeGpsKey(beforeGpsKey);
        dto.setNowGpsKey(nowGpsKey);

        // 사용자가 저장소에 없는 경우, 사용자를 추가
        if (gpsRepository.getUser(sessionId) == null) {
            gpsRepository.addUser(sessionId, dto);
        } else {// 사용자가 저장소에 있는 경우, 사용자 정보를 업데이트`
            gpsRepository.updateUser(sessionId, dto);
        }
    }

    // TODO 세션 아이디를 기반으로 사용자를 제거하는 메소드
    public void dropUser(String sessionId) {
        gpsRepository.deleteUser(sessionId);
    }


    // TODO 대상과 상대방의 위치를 계산하는 메소드
    public double calculateDistance(double targetLat, double targetLon, double otherLat, double otherLon) {
        final int R = 6371; // 지구의 반지름 (km 단위)

        // 위도와 경도를 라디안 단위로 변환
        double latDistance = Math.toRadians(otherLat - targetLat);
        double lonDistance = Math.toRadians(otherLon - targetLon);

        // 거리 계산을 위한 중간 변수
        double a = Math.sin(latDistance / 2) * Math.sin(latDistance / 2)
                + Math.cos(Math.toRadians(targetLat)) * Math.cos(Math.toRadians(otherLat))
                * Math.sin(lonDistance / 2) * Math.sin(lonDistance / 2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return R * c; // 거리 반환 (km 단위)
    }
}