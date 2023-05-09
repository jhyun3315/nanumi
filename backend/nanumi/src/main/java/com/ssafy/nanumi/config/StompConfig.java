package com.ssafy.nanumi.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpAttributesContextHolder;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;
import org.springframework.web.socket.messaging.*;

@Configuration
@RequiredArgsConstructor
@EnableWebSocketMessageBroker // 웹소켓 브로커 사용 설정
public class StompConfig implements WebSocketMessageBrokerConfigurer {
//    private final GpsRepository gpsRepository;

    //TODO 메시지 브로커의 구성 정의
    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        //클라이언트에게 메시지를 전송하는데 사용되는 브로커에 대한 경로 설정
        registry.enableSimpleBroker("/sub");
        //클라이언트에서 서버로 메시지를 저장할 때 사용되는 경로의 접두사 설정
        registry.setApplicationDestinationPrefixes("/pub");
    }

    //TODO 클라이언트가 웹소켓 서버에 연결할 수 있는 ENDPOINT 제공
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        // 웹 소켓 서버에 연결할 수 있는 엔드 포인트 설정
        registry.addEndpoint("/ws-stomp")
                .setAllowedOrigins("http://localhost:8080", "http://127.0.0.1:5500")
                .withSockJS();

    }


    //TODO 웹소켓이 세션에 연결 되었을 때 실행된다. 세션 연결 이벤트를 처리하며 연결된 세션 ID를 출력하고
    // "GPS"라는 이름으로 빈 문자열을 속성으로 설정합니다.
    @EventListener
    public void handleSessionConnect(SessionConnectEvent event) {
        System.out.println("CONNECT / " + SimpAttributesContextHolder.currentAttributes().getSessionId());
        SimpAttributesContextHolder.currentAttributes().setAttribute("GPS", "");
//        System.out.println(SimpAttributesContextHolder.currentAttributes().getAttribute("TEST"));
//        System.out.println(event);
    }


    // TODO 웹소켓 세션이 끊어질 때 사용이된다. GPS 속성을 가져와서 gpsKey 변수에 저장하고 해당 세션 ID를 출력한다.
    @EventListener
    public void handleSessionDisconnect(SessionDisconnectEvent event) {
        String gpsKey = (String) SimpAttributesContextHolder.currentAttributes().getAttribute("GPS");
        String sessionId = event.getSessionId();
        System.out.println("DISCONNECT / " + sessionId + " / " + gpsKey);

        //GPS 정보 삭제
        //gpsRepository.dropUser(gpsKey, sessionId);
    }
}
