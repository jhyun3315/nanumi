package com.ssafy.nanumi.api.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.nanumi.common.ChatMessageDTO;
import com.ssafy.nanumi.config.response.CustomResponse;
import com.ssafy.nanumi.config.response.ResponseService;
import com.ssafy.nanumi.config.response.exception.CustomException;
import com.ssafy.nanumi.config.response.exception.CustomExceptionStatus;
import com.ssafy.nanumi.db.entity.*;
import com.ssafy.nanumi.db.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Collections;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ChatService {
    // 웹 소켓 메시지를 전송하는데 사용되는 인터페이스
    private final SimpMessageSendingOperations messageTemplate;
    private final ChatRepository chatRepository;
    private final ProductRepository productRepository;
    private final ResponseService responseService;
    private final UserRepository userRepository;
    private final UserInfoRepository userInfoRepository;
    private final MatchRepository matchRepository;


    // TODO DTO 객체를 입력으로 받아서, 채팅 메시지를 저장하고 해당 채팅방에 전송한다.
    @Transactional
    public void CreateChat(ChatMessageDTO DTO) {

        // sender의 프로필 URL을 가져옵니다.
        User senderUser = userRepository.findById(DTO.getSender())
                .orElseThrow(() -> new CustomException(CustomExceptionStatus.NOT_FOUND_USER));
        String profileUrl = senderUser.getProfileUrl();

        // 날짜 형식 및 포멧터를 직접 설정 
        String pattern = "yyyy-MM-dd a KK:mm ss:SSS";
        DateFormat df = new SimpleDateFormat(pattern);

        // chatEntiy 객체를 데이터 베이스에 저장
        ChatMessageEntity chatEntity = ChatMessageEntity.builder()
                .type(DTO.getType())
                .roomId(DTO.getRoomId())
                .sender(DTO.getSender())
                .message(DTO.getMessage())
                //.profileUrl(profileUrl)
                .sendTime(df.format(new Date()))
                .build();
        chatRepository.save(chatEntity);

        // messageTemplate.convertAndSend("/sub/chat/room/" + DTO.getRoomId(), chatEntity);
        // 채팅방의 구독자들에게 채팅 메시지를 전송한다.
        ObjectMapper objectMapper = new ObjectMapper();
        String chatEntityJson = null;
        try {
            chatEntityJson = objectMapper.writeValueAsString(chatEntity);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return;
        }

        messageTemplate.convertAndSend("/sub/chat/room/" + DTO.getRoomId(), chatEntityJson);

    }


    // TODO roomSeq를 입력으로 받아서 해당 채팅방의 최근 20개의 채팅 로그를 반환한다.
    @Transactional
    public List<ChatMessageEntity> GetChatLogLimit20(long roomSeq) {
        // 데이터베이스에서 최근 20개의 채팅 로그를 가져온다.
        return chatRepository.findTop20ByRoomIdOrderBySendTimeDesc(roomSeq);
    }

    @Transactional
    public CustomResponse chatEndMatch(Long productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(()-> new CustomException(CustomExceptionStatus.NOT_FOUND_USER));
        product.matchedEnd();

        System.out.println("@@@ product id: "+product.getId());
        System.out.println("@@@ product user: "+product.getUser());
        // 나눠준 사용자, 나눔받은 사용자의 give_count, given_count 증가
        // 나눠준 사람
        User give_user = userRepository.findById(product.getUser().getId())
                .orElseThrow(()-> new CustomException(CustomExceptionStatus.NOT_FOUND_USER));

        System.out.println("@#@# user id : "+give_user.getId());
        System.out.println("@#@# user email : "+give_user.getEmail());
        System.out.println("@#@# user tier : "+give_user.getUserInfo().getTier());

        Match match = matchRepository.findMatch(product.getId())
                .orElseThrow(()-> new CustomException(CustomExceptionStatus.NOT_FOUND_MATCH));

        System.out.println("$$$$ Match id: "+match.getId());
        System.out.println("$$$ Match user : "+match.getUser());

        // 나눔받은 사람
        User given_user = userRepository.findById(match.getUser().getId())
                .orElseThrow(()-> new CustomException(CustomExceptionStatus.NOT_FOUND_USER));

        // 나눔이 info
        UserInfo give_userinfo = userInfoRepository.findById(give_user.getUserInfo().getId())
                .orElseThrow(()-> new CustomException(CustomExceptionStatus.NOT_FOUND_USER_INFO));
        give_userinfo.updateGiveCount(give_userinfo.getGiveCount()+1);

        // 나눔받은이 info
        UserInfo given_userinfo = userInfoRepository.findById(given_user.getUserInfo().getId())
                .orElseThrow(()-> new CustomException(CustomExceptionStatus.NOT_FOUND_USER_INFO));
        given_userinfo.updateGivenCount(given_userinfo.getGivenCount()+1);

        System.out.println("### given user id : "+given_user.getId());
        System.out.println("### given user email : "+given_user.getEmail());
        System.out.println("#$#$ given userinfo id : "+given_userinfo.getId());
        System.out.println("#$#$ given userinfo tier : "+given_userinfo.getTier());

        // 티어 계산
        // 나눠준 사람 티어
        String giver_tier = give_userinfo.getTier();
        int giver_give_count = give_userinfo.getGiveCount();
        int giver_given_count = given_userinfo.getGivenCount();
        long giver_visit = give_userinfo.getVisitCount();
        double giver_temperature = give_userinfo.getTemperature();

        System.out.println("#$#$ giver tier : "+giver_tier);

        switch (giver_tier) {
            case "브론즈" :
                if(giver_visit>=2 && giver_give_count>=2 && giver_given_count>=2) {
                    give_user.setRoles(Collections.singletonList(Authority.builder().name("ROLE_실버").build()));
                    give_userinfo.updateTier("실버");
                }
                break;
            case "실버" :
                if(giver_visit>=10 && giver_give_count>=10) {
                    give_user.setRoles(Collections.singletonList(Authority.builder().name("ROLE_골드").build()));
                    give_userinfo.updateTier("골드");
                }
                break;
            case "골드" :
                if(giver_visit>=50 && giver_give_count>=50) {
                    give_user.setRoles(Collections.singletonList(Authority.builder().name("ROLE_플레티넘").build()));
                    give_userinfo.updateTier("플레티넘");
                }
                break;
            case "플레티넘" :
                System.out.println("Giver는 플레티넘입니당.");
                if(giver_visit>=50 && giver_give_count>=50 && giver_temperature>=40) {
                    System.out.println("다이아로 승급합니다.");
                    give_userinfo.updateTier("다이아");
                    give_user.setRoles(Collections.singletonList(Authority.builder().name("ROLE_다이아").build()));

                }
                break;
            default:
        }
        System.out.println("@@@@@@@@@@@@@@@@@@@@@@@@@");
//        userRepository.save(give_user);
//        userInfoRepository.save(give_userinfo);

        System.out.println("최종 Giver ID : "+give_userinfo.getId());
        System.out.println("최종 Giver 티어: "+give_userinfo.getTier());

        // 나눔받은 사람 티어
        // given_user, given_userinfo
        String givener_tier = given_userinfo.getTier();
        int givener_give_count = given_userinfo.getGiveCount();
        int givener_given_count = given_userinfo.getGivenCount();
        long givener_visit = given_userinfo.getVisitCount();
        double givener_temperature = given_userinfo.getTemperature();

        System.out.println("Givener 티어 : "+givener_tier);

        switch (givener_tier) {
            case "브론즈" :
                System.out.println("아직 브론즈입니다.");
                if(givener_visit>=2 && givener_give_count>=2 && givener_given_count>=2) {
                    System.out.println("실버로 승급합니다.");
                    given_userinfo.updateTier("실버");
                    given_user.setRoles(Collections.singletonList(Authority.builder().name("ROLE_실버").build()));

                }
                break;
            case "실버" :
                if(givener_visit>=10 && givener_give_count>=10) {
                    given_user.setRoles(Collections.singletonList(Authority.builder().name("ROLE_골드").build()));
                    given_userinfo.updateTier("골드");
                }
                break;
            case "골드" :
                if(givener_visit>=50 && givener_give_count>=50) {
                    given_user.setRoles(Collections.singletonList(Authority.builder().name("ROLE_플레티넘").build()));
                    given_userinfo.updateTier("플레티넘");
                }
                break;
            case "플레티넘" :
                if(givener_visit>=100 && givener_give_count>=100 && givener_temperature>=40) {
                    given_user.setRoles(Collections.singletonList(Authority.builder().name("ROLE_다이아").build()));
                    given_userinfo.updateTier("다이아");
                }
                break;
            default:
        }

//        userRepository.save(given_user);
//        userInfoRepository.save(given_userinfo);

        System.out.println("최종 Giver ID : "+given_user.getId());
        System.out.println("최종 Giver 티어 : "+given_userinfo.getTier());

        return responseService.getSuccessResponse();
    }
}
