package com.ssafy.nanumi.api.controller;

import com.ssafy.nanumi.api.service.GpsService;
import com.ssafy.nanumi.common.SectorDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpAttributesContextHolder;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Map;


/**
 * TODO GpsSectorController는 GPS 섹터 업데이트와 관련된 들어오는 메시지를 처리하는 클래스
 */
@RequiredArgsConstructor
@RequestMapping("accounts")
@Controller
public class GpsSectorController {
    // GPS 섹터 데이터를 관리하기 위한 GpsService 인스턴스
    private final GpsService gpsService;
    private final SimpMessagingTemplate messagingTemplate;

    // TODO GPS에서 내 위치 최신화하는 메서드
    @MessageMapping("/sector")
    public void sector(@Header("simpSessionId") String sessionId, SectorDTO DTO) {

        // 사용자의 이전 위도, 경도, 현재 위도, 경도, 세션 ID를 DTO에서 가져옵니다.(찍어보는 작업)
        System.out.println(DTO.getBeforeLatitude() + ", " + DTO.getBeforeLongitude() + " / " + DTO.getNowLatitude() + ", " + DTO.getNowLongitude() + " / " + sessionId);

        // GpsService에서 사용자의 GPS 섹터를 업데이트
        // 이전 위도, 경도와 현재 위도, 경도를 사용하여 사용자의 섹터를 업데이트합니다.
        gpsService.changeUserSector(DTO.getBeforeLatitude(), DTO.getBeforeLongitude(), DTO.getNowLatitude(), DTO.getNowLongitude(), sessionId);

        // 현재 사용자의 속성에 업데이트 된 GPS 섹터를 저장
        // 사용자의 위치 정보를 추적하고 관리할 수 있습니다.
        // 위도와 경도를 사용하여 위치 정보를 저장합니다.
        SimpAttributesContextHolder.currentAttributes().setAttribute("Latitude", DTO.getNowLatitude());
        SimpAttributesContextHolder.currentAttributes().setAttribute("Longitude", DTO.getNowLongitude());
    }


    // TODO 이 메서드는 사용자의 연결이 끊어졌을 때 처리를 담당합니다.
    //  사용자의 세션 ID를 전달받아 GpsService의 dropUser 메서드를 호출하여 해당 사용자를 제거.
    //  이를 통해 사용자가 더 이상 위치 추적 대상이 아니게 되고, 필요하지 않은 리소스 사용을 줄일 수 있습니다.
    @MessageMapping("/disconnect")
    public void disconnect(@Header("simpSessionId") String sessionId) {
        System.out.println("drop test");

        // GpsService에서 사용자를 제거합니다.
        gpsService.dropUser(sessionId);
    }

    // TODO 이 메서드는 두 좌표 사이의 거리를 계산하는 기능을 담당합니다
    @MessageMapping("/calculateDistanceFromUser")
    public void calculateDistanceFromUser(@Header("simpSessionId") String sessionId,
                                          @Payload Map<String, Double> request) {
        // 현재 사용자의 최신 위도와 경도를 가져옵니다.
        double targetLat = (double) SimpAttributesContextHolder.currentAttributes().getAttribute("Latitude");
        double targetLon = (double) SimpAttributesContextHolder.currentAttributes().getAttribute("Longitude");

        // 클라이언트로부터 전달받은 위도, 경도
        double otherLat = request.get("otherLat");
        double otherLon = request.get("otherLon");

        // 두 좌표 사이의 거리를 계산합니다.
        double distance = gpsService.calculateDistance(targetLat, targetLon, otherLat, otherLon);

        // 결과를 클라이언트에게 전송합니다.
        messagingTemplate.convertAndSendToUser(sessionId, "/topic/distance", distance);
    }
}

