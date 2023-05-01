package com.ssafy.nanumi.api.service;

import com.ssafy.nanumi.common.SectorDTO;
import com.ssafy.nanumi.db.entity.GpsUser;
import com.ssafy.nanumi.db.repository.GpsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class GpsService {
    private final GpsRepository gpsRepository;
    

    // TODO 세션 아이디를 기반으로 사용자를 제거하는 메소드
    public void dropUser(String sessionId) {
        gpsRepository.deleteBySessionId(sessionId);
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

    // TODO 사용자가 위치를 변환할 때 사용하는 메서드
    public void changeUserSector(Double beforeLatitude, Double beforeLongitude, Double nowLatitude, Double nowLongitude, String sessionId) {
        GpsUser gpsUser = gpsRepository.findBySessionId(sessionId);

        if (gpsUser == null) {
            gpsUser = new GpsUser();
            gpsUser.setSessionId(sessionId);
            gpsUser.setBeforeLatitude(beforeLatitude);
            gpsUser.setBeforeLongitude(beforeLongitude);
            gpsUser.setNowLatitude(nowLatitude);
            gpsUser.setNowLongitude(nowLongitude);
            gpsRepository.save(gpsUser);
        } else {
            gpsUser.setBeforeLatitude(beforeLatitude);
            gpsUser.setBeforeLongitude(beforeLongitude);
            gpsUser.setNowLatitude(nowLatitude);
            gpsUser.setNowLongitude(nowLongitude);
            gpsRepository.save(gpsUser);
        }
    }
}