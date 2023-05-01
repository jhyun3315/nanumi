package com.ssafy.nanumi.api.controller;

import com.ssafy.nanumi.api.service.GpsService;
import com.ssafy.nanumi.common.SectorDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpAttributesContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;


/**
 * TODO GpsSectorController는 GPS 섹터 업데이트와 관련된 들어오는 메시지를 처리하는 클래스
 */
@RequiredArgsConstructor
@RequestMapping("accounts")
@Controller
public class GpsSectorController {
    // GPS 섹터 데이터를 관리하기 위한 GpsService 인스턴스
    private final GpsService gpsService;


    /**
     * GPS 섹터 업데이트 메시지를 처리.
     *
     * @param sessionId 메시지를 보낸 사용자의 세션 ID입니다.
     * @param DTO       GPS 섹터 업데이트 정보를 포함하는 데이터 전송 객체.
     */
    @MessageMapping("/sector")
    public void sector(@Header("simpSessionId") String sessionId, SectorDTO DTO) {

        //System.out.println(DTO.getBeforeGpsKey() + " / " + DTO.getNowGpsKey() + " / " + sessionId + " / " + DTO.getPair());

        // GpsService에서 사용자의 GPS 섹터를 업데이트
        gpsService.changeUserSector(DTO.getBeforeGpsKey(), DTO.getNowGpsKey(), sessionId);

        // 현재 사용자의 속성에 업데이트 된 GPS 섹터를 저장
        SimpAttributesContextHolder.currentAttributes().setAttribute("GPS", DTO.getNowGpsKey());
    }


    /**
     * 사용자 연결 해제 이벤트를 처리합니다.
     *
     * @param sessionId 연결 해제하는 사용자의 세션 ID입니다.
     */
    @MessageMapping("/disconnect")
    public void disconnect(@Header("simpSessionId") String sessionId) {
        System.out.println("drop test");

        // GpsService에서 사용자를 제거합니다.
        gpsService.dropUser(sessionId);
    }


    @PostMapping("/calculateDistance")
    public ResponseEntity<Double> calculateDistance(@RequestParam double targetLat,
                                                    @RequestParam double targetLon,
                                                    @RequestParam double otherLat,
                                                    @RequestParam double otherLon) {
        double distance = gpsService.calculateDistance(targetLat, targetLon, otherLat, otherLon);
        return ResponseEntity.ok(distance);
    }
}

