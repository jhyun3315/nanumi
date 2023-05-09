package com.ssafy.nanumi.api.controller;

import com.ssafy.nanumi.common.LocationDTO;
import com.ssafy.nanumi.api.service.PushNotificationService;
import com.ssafy.nanumi.db.entity.ChatRoomEntity;
import com.ssafy.nanumi.db.entity.User;
import com.ssafy.nanumi.db.entity.UserInfo;
import com.ssafy.nanumi.db.repository.ChatRoomRepository;
import com.ssafy.nanumi.db.repository.UserInfoRepository;
import com.ssafy.nanumi.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@RequestMapping("accounts")
@Controller
public class GpsSectorController {
    // 상대방의 FCM 토큰을 가져오기 위해 ChatRoomRepository를 주입한다.
    private final UserInfoRepository userInfoRepository;
    private final PushNotificationService pushNotificationService;


    @MessageMapping("/location")
    public void handleLocation(LocationDTO locationDTO) {
        if (isWithinTargetDistance(locationDTO.getLatitude(), locationDTO.getLongitude(), locationDTO.getTargetLatitude(), locationDTO.getTargetLongitude())) {
            // 상대방에게 푸시 알림을 보내는 로직
            long opponentId = locationDTO.getOpponentId(); // 사용자의 이메일로 상대방의 opponentId를 가져옵니다.
            String fcmToken = userInfoRepository.getTokenByUserId(opponentId); // 상대방의 FCM 토큰을 가져오는 로직

            System.out.println("opponentId : " + opponentId);
            System.out.println("fcmToken : " + fcmToken);

            pushNotificationService.sendPushNotification(fcmToken, "목표 지점 도착", "상대방이 목표 지점에 도착했습니다.");
        }
    }

    private double calculateDistance(double lat1, double lon1, double lat2, double lon2) {
        int EARTH_RADIUS = 6371; // 지구 반지름 (킬로미터)

        double latDistance = Math.toRadians(lat2 - lat1);
        double lonDistance = Math.toRadians(lon2 - lon1);
        double a = Math.sin(latDistance / 2) * Math.sin(latDistance / 2)
                + Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2))
                * Math.sin(lonDistance / 2) * Math.sin(lonDistance / 2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        double distance = EARTH_RADIUS * c * 1000; // 거리를 미터 단위로 변환

        return distance;
    }


    public boolean isWithinTargetDistance(double userLatitude, double userLongitude, double targetLatitude, double targetLongitude) {
        final int TARGET_DISTANCE = 100;
        double distance = calculateDistance(userLatitude, userLongitude, targetLatitude, targetLongitude);

        return distance <= TARGET_DISTANCE;
    }
}
// TODO 알림 요청
//    @MessageMapping("/calculateDistanceFromUser")
//    public void calculateDistanceFromUser(@Header("simpSessionId") String sessionId,
//                                          @Payload Map<String, Double> request) {
//        // 현재 사용자의 최신 위도와 경도를 가져옵니다.
//        double targetLat = (double) SimpAttributesContextHolder.currentAttributes().getAttribute("Latitude");
//        double targetLon = (double) SimpAttributesContextHolder.currentAttributes().getAttribute("Longitude");
//
//        // 클라이언트로부터 전달받은 위도, 경도
//        double otherLat = request.get("otherLat");
//        double otherLon = request.get("otherLon");
//
//        // 두 좌표 사이의 거리를 계산합니다.
//        double distance = gpsService.calculateDistance(targetLat, targetLon, otherLat, otherLon);
//
//        // 결과를 클라이언트에게 전송합니다.
//        messagingTemplate.convertAndSendToUser(sessionId, "/topic/distance", distance);
//    }
//
//
//    // TODO 이 메서드는 사용자의 연결이 끊어졌을 때 처리를 담당합니다.
//    //  사용자의 세션 ID를 전달받아 GpsService의 dropUser 메서드를 호출하여 해당 사용자를 제거.
//    //  이를 통해 사용자가 더 이상 위치 추적 대상이 아니게 되고, 필요하지 않은 리소스 사용을 줄일 수 있습니다.
//    @MessageMapping("/disconnect")
//    public void disconnect(@Header("simpSessionId") String sessionId) {
//        System.out.println("drop test");
//
//        // GpsService에서 사용자를 제거합니다.
//        gpsService.dropUser(sessionId);
//    }




//    // TODO GPS에서 내 위치 최신화하는 메서드
//    @MessageMapping("/sector")
//    public void sector(@Header("simpSessionId") String sessionId, SectorDTO DTO) {
//
//        // 사용자의 이전 위도, 경도, 현재 위도, 경도, 세션 ID를 DTO에서 가져옵니다.(찍어보는 작업)
//        //System.out.println(DTO.getBeforeLatitude() + ", " + DTO.getBeforeLongitude() + " / " + DTO.getNowLatitude() + ", " + DTO.getNowLongitude() + " / " + sessionId);
//
//        // GpsService에서 사용자의 GPS 섹터를 업데이트
//        // 이전 위도, 경도와 현재 위도, 경도를 사용하여 사용자의 섹터를 업데이트합니다.
//        //gpsService.changeUserSector(DTO.getBeforeLatitude(), DTO.getBeforeLongitude(), DTO.getNowLatitude(), DTO.getNowLongitude(), sessionId);
//
//        // 현재 사용자의 속성에 업데이트 된 GPS 섹터를 저장
//        // 사용자의 위치 정보를 추적하고 관리할 수 있습니다.
//        // 위도와 경도를 사용하여 위치 정보를 저장합니다.
//        SimpAttributesContextHolder.currentAttributes().setAttribute("Latitude", DTO.getNowLatitude());
//        SimpAttributesContextHolder.currentAttributes().setAttribute("Longitude", DTO.getNowLongitude());
//    }

