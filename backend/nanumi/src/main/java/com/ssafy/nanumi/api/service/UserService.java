package com.ssafy.nanumi.api.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.ssafy.nanumi.api.request.TokenInfoDTO;
import com.ssafy.nanumi.api.request.UserJoinDTO;
import com.ssafy.nanumi.api.request.UserLoginDTO;
import com.ssafy.nanumi.api.response.*;
import com.ssafy.nanumi.common.Image;
import com.ssafy.nanumi.common.provider.Provider;
import com.ssafy.nanumi.config.entity.BaseTimeEntity;
import com.ssafy.nanumi.config.jwt.JwtProvider;
import com.ssafy.nanumi.config.response.exception.CustomException;
import com.ssafy.nanumi.db.entity.*;
import com.ssafy.nanumi.db.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.mail.MessagingException;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.Date;
import java.util.UUID;

import static com.ssafy.nanumi.config.response.exception.CustomExceptionStatus.*;

@Slf4j
@Service
@Transactional(readOnly = false)
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final UserInfoRepository userInfoRepository;
    private final AddressRepository addressRepository;
    private final ProductRepository productRepository;
    private final LoginProviderRepository loginProviderRepository;
    private final EmailService emailService;
    private final S3Service s3Service;
    private final JwtProvider jwtProvider;
    @Value("${cloud.aws.s3.bucket}")
    private String bucket;
    private final AmazonS3 amazonS3;


    public UserLoginResDTO login(UserLoginDTO userLoginDTO){
        User user = userRepository.findByEmail(userLoginDTO.getEmail()).orElseThrow(() -> new CustomException(NOT_FOUND_USER));
        // Access Token
        String AT = jwtProvider.createAccessToken(user.getEmail(), user.getTiers());
        // Refresh Token
        String RT = jwtProvider.createRefreshToken(user.getEmail(), user.getTiers());

        UserInfo userInfo =userInfoRepository.findById(user.getUserInfo().getId()).orElseThrow(() -> new CustomException(NOT_FOUND_USER_INFO));
        userInfo.updateRefreshToken(RT);

        if(userInfo.getVisitCount()==0) userInfo.updateVisitCount(userInfo.getVisitCount()+1);

        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        // 입력받은 비밀번호와 저장된 비밀번호 비교
        if(encoder.matches(userLoginDTO.getPassword(), user.getPassword())){

            if(userInfo.getFcmToken()==null) {
                userInfo.updateFcmToken(userLoginDTO.getFcmToken());
            }

            LocalDateTime now = LocalDateTime.now();
            LocalDateTime modifiedDate = user.getUpdateDate();
            int nowMonth = now.getMonthValue();
            int nowDay = now.getDayOfMonth();

            int modifiedMonth = modifiedDate.getMonthValue();
            int modifiedDay = modifiedDate.getDayOfMonth();

            if (nowMonth != modifiedMonth || nowDay != modifiedDay) { // 월, 일의 변동
                String tier = userInfo.getTier();
                int give_count = userInfo.getGiveCount();
                int given_count = userInfo.getGivenCount();
                long present_visit = userInfo.getVisitCount();
                double temperature = userInfo.getTemperature();

                userInfo.updateVisitCount(present_visit+1);

                switch (tier) {
                    case "새싹" :
                        if(present_visit>=2 && given_count>=2 && give_count>=2) {
                            user.setRoles(Collections.singletonList(Authority.builder().name("ROLE_나무").build()));
                            userInfo.updateTier("나무");
                        }
                        break;
                    case "나무" :
                        if(present_visit>=10 && give_count>=10) {
                            user.setRoles(Collections.singletonList(Authority.builder().name("ROLE_골드나무").build()));
                            userInfo.updateTier("골드나무");
                        }
                        break;

                    default :
                }
            }

            user.updateDate(now);
            return new UserLoginResDTO(user,AT, RT);
        }else{
            throw new CustomException(NOT_MATCHED_PASSWORD);
        }
    }

    public void join(UserJoinDTO userJoinDTO) {
        LoginProvider loginProvider = loginProviderRepository.findByProvider(Provider.local)
                .orElseThrow(() -> new CustomException(NOT_FOUND_LOGIN_PROVIDER));

        String email = userJoinDTO.getEmail();
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

        if( userRepository.findByEmail(email).isPresent() ){
            throw new CustomException(RESPONSE_EMAIL_EXISTED);
        }else{
            UserInfo userInfo = UserInfo.builder()
                    .stopDate(null)
                    .refreshToken(null)
                    .build();

            UserInfo userInfoSaved  = userInfoRepository.save(userInfo);
            if(addressRepository.findById(userJoinDTO.getAddressId()).isEmpty()){
                throw new CustomException(NOT_FOUND_ADDRESS_CODE);
            }else{
                User user = User.builder()
                        .email(userJoinDTO.getEmail())
                        .nickname(userJoinDTO.getNickname())
                        .profileUrl(Image.DefaultImage.getValue())
                        .password(passwordEncoder.encode(userJoinDTO.getPassword()))
                        .loginProvider(loginProvider)
                        .address(addressRepository.getById(userJoinDTO.getAddressId()))
                        .userInfo(userInfoSaved)
                        .build();

                // Security 일반사용자 권한 추가
                user.setRoles(Collections.singletonList(Authority.builder().name("ROLE_새싹").build()));

                userRepository.save(user);
            }
        }
    }

    public EmailCheckResDTO checkEmail(String email) throws MessagingException, IOException {
        String code = "";

        if( userRepository.findByEmail(email).isPresent() ){
            throw new CustomException(RESPONSE_EMAIL_EXISTED);
        }else{
            code = emailService.sendEmail(email);
        }
        return new EmailCheckResDTO(code);
    }

    public AddressResDTO updateUserAddress(long addressCode, long userId){
       if(addressRepository.findById(addressCode).isEmpty()){
           throw new CustomException(NOT_FOUND_ADDRESS_CODE);
       }else{
           User user = userRepository.findById(userId).orElseThrow(
                   () -> new CustomException(NOT_FOUND_USER)
           );
           user.updateAddress(addressRepository.getById(addressCode));
          return new AddressResDTO(user.getAddress());
       }
    }

    public AddressResDTO getUserAddress(long user_id){
        if(userRepository.findById(user_id).isEmpty()){
            throw new CustomException(NOT_FOUND_USER_INFO);
        }else{
            User user = userRepository.getById(user_id);
            long addressCode = user.getAddress().getId();

            if(addressRepository.findById(addressCode).isEmpty()){
                throw new CustomException(NOT_FOUND_ADDRESS_CODE);
            }else{
                Address address = addressRepository.getById(addressCode);
                return new AddressResDTO(address);
            }

        }
    }

    public UserDetailDTO findDetailUser(long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(NOT_FOUND_USER));

        UserInfo userInfo = userInfoRepository.findById(user.getUserInfo().getId())
                .orElseThrow(() -> new CustomException(NOT_FOUND_USER_INFO));

        int givingCount = productRepository.findGivingCount(userId)
                .orElseThrow(() -> new CustomException(REQUEST_ERROR));

        return UserDetailDTO.builder()
                .id(user.getId())
                .nickname(user.getNickname())
                .profileUrl(user.getProfileUrl())
                .isDeleted(user.isDeleted())
                .giveCount(userInfo.getGiveCount())
                .givingCount(givingCount)
                .givenCount(userInfo.getGivenCount())
                .tier(userInfo.getTier())
                .temperature(userInfo.getTemperature())
                .build();
    }

    public UserSimpleDTO updateUser(User user, String nickname, MultipartFile profileImg) throws IOException {
        String userNickname = user.getNickname();
        String imageString = user.getProfileUrl();
        if(nickname != null) {
            userNickname = nickname;
        }
        if(profileImg != null) {
            imageString = s3Service.stringImage(profileImg);
        }
        user.updateUserInfo(userNickname, imageString);
        return new UserSimpleDTO(user);
    }
    public void deleteUser(User user) {
        user.delete();
    }

    public Page<ReviewReadDTO> getAllReview(User user, PageRequest pageRequest){
        return userRepository.getAllReview(user.getId(), pageRequest);
    }
    public Page<ProductAllDTO> getAllReceiveProduct(User user, PageRequest pageRequest){
        return userRepository.getAllReceiveProduct(user.getId(), pageRequest);
    }
    public Page<ProductAllDTO> getMatchProduct(User user, PageRequest pageRequest){
        return userRepository.getAllMatchProduct(user.getId(), pageRequest);
    }
    public Page<ProductAllDTO> getMatchingProduct(User user,PageRequest pageRequest){
        return userRepository.getAllMatchingProduct(user.getId(), pageRequest);
    }
    public Page<ProductAllDTO> getGivenProduct(User user, PageRequest pageRequest){
        return userRepository.getAllGivenProduct(user.getId(),pageRequest);
    }
    public TokenInfoResDTO isRTValid(TokenInfoDTO request) throws Exception {
        return jwtProvider.validateRefreshToken(request);
    }
}
