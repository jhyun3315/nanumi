package com.ssafy.nanumi.api.service;

import com.ssafy.nanumi.api.request.TokenInfoDTO;
import com.ssafy.nanumi.api.request.UserJoinDTO;
import com.ssafy.nanumi.api.request.UserLoginDTO;
import com.ssafy.nanumi.api.response.*;
import com.ssafy.nanumi.common.Image;
import com.ssafy.nanumi.common.provider.Provider;
import com.ssafy.nanumi.config.jwt.JwtProvider;
import com.ssafy.nanumi.config.response.exception.CustomException;
import com.ssafy.nanumi.db.entity.*;
import com.ssafy.nanumi.db.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
import java.util.Objects;

import static com.ssafy.nanumi.config.response.exception.CustomExceptionStatus.*;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final UserInfoRepository userInfoRepository;
    private final AddressRepository addressRepository;
    private final LoginProviderRepository loginProviderRepository;
    private final EmailService emailService;
    private final S3Service s3Service;
    private final JwtProvider jwtProvider;

    public UserLoginResDTO login(UserLoginDTO userLoginDTO){
        LoginProvider loginProvider = loginProviderRepository
                .findByProvider(userLoginDTO.getProvider()).orElseThrow(() -> new CustomException(NOT_FOUND_LOGIN_PROVIDER));

        User user = userRepository.findByEmailAndLoginProvider(userLoginDTO.getEmail(), loginProvider)
                .orElseThrow(() -> new CustomException(NOT_FOUND_USER));

        // Access Token
        String AT = jwtProvider.createAccessToken(""+user.getId(), user.getTiers());
        // Refresh Token
        String RT = jwtProvider.createRefreshToken(""+user.getId(), user.getTiers());

        UserInfo userInfo =userInfoRepository.findById(user.getUserInfo().getId()).orElseThrow(() -> new CustomException(NOT_FOUND_USER_INFO));
        userInfo.updateRefreshToken(RT);

        if(userInfo.getVisitCount()==0) userInfo.updateVisitCount(userInfo.getVisitCount()+1);

        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

        // 입력받은 비밀번호와 저장된 비밀번호 비교
        if (loginProvider.getProvider().equals(Provider.kakao) || encoder.matches(userLoginDTO.getPassword(), user.getPassword())) {

            if(userLoginDTO.getFcmToken()==null) throw new CustomException(NOT_FOUND_FCMTOKEN);

            user.updateFcmToken(userLoginDTO.getFcmToken());

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
                        if(present_visit>=10 && give_count>=10 && temperature>=40) {
                            user.setRoles(Collections.singletonList(Authority.builder().name("ROLE_나누미나무").build()));
                            userInfo.updateTier("나누미나무");
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

    public User join(UserJoinDTO userJoinDTO,Provider provider) {

        LoginProvider loginProvider = loginProviderRepository.findByProvider(provider)
                .orElseThrow(() -> new CustomException(NOT_FOUND_LOGIN_PROVIDER));

        Address address = addressRepository.findById(
                userJoinDTO.getAddressId()).orElseThrow(() -> new CustomException(NOT_FOUND_ADDRESS_CODE));

        String email = userJoinDTO.getEmail();
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

        if (userRepository.findByEmailAndLoginProvider(email, loginProvider).isPresent())
            throw new CustomException(RESPONSE_ACCOUNT_EXISTED);

        String profileImage = provider.equals(Provider.local) ? Image.DefaultImage.getValue() : userJoinDTO.getProfileUrl();

        UserInfo userInfo = UserInfo.builder()
                .stopDate(null)
                .refreshToken(null)
                .tier("새싹")
                .build();

        UserInfo userInfoSaved = userInfoRepository.save(userInfo);

        User user = User.builder()
                .email(email)
                .nickname(userJoinDTO.getNickname())
                .profileUrl(profileImage)
                .password(encoder.encode(userJoinDTO.getPassword()))
                .loginProvider(loginProvider)
                .address(address)
                .userInfo(userInfoSaved)
                .build();

        // Security 관리자 권한 추가
        if (userJoinDTO.getEmail().equals("admin@nanumi.com")) {
            user.setRoles(Collections.singletonList(Authority.builder().name("ROLE_관리자").build()));

            userInfo.updateTier("관리자");
        } else {
            // Security 일반사용자 권한 추가
            user.setRoles(Collections.singletonList(Authority.builder().name("ROLE_새싹").build()));
        }
        return userRepository.save(user);
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

    public AddressResDTO getUserAddress(long userId){
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new CustomException(NOT_FOUND_USER_INFO));

            long addressCode = user.getAddress().getId();
            Address address = addressRepository.findById(addressCode)
                    .orElseThrow( () -> new CustomException(NOT_FOUND_ADDRESS_CODE));
                return new AddressResDTO(address);
    }

    public UserDetailDTO findDetailUser(long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(NOT_FOUND_USER));

        UserInfo userInfo = userInfoRepository.findById(user.getUserInfo().getId())
                .orElseThrow(() -> new CustomException(NOT_FOUND_USER_INFO));

        int giveCount = userRepository.countAllReceiveProduct(userId);
        int givingCount = userRepository.countAllMatchProduct(userId);
        int givenCount = userRepository.countAllGivenProduct(userId);

        return UserDetailDTO.builder()
                .id(user.getId())
                .nickname(user.getNickname())
                .profileUrl(user.getProfileUrl())
                .isDeleted(user.isDeleted())
                .giveCount(giveCount)
                .givingCount(givingCount)
                .givenCount(givenCount)
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
            if(!Objects.requireNonNull(profileImg.getOriginalFilename()).startsWith("https")){
                imageString = s3Service.stringImage(profileImg);
            }
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

    public long userByAT(String accessToken) {
            String token = accessToken.split(" ")[1].trim();
            User user = userRepository.findById(Long.parseLong(jwtProvider.getAccount(token)))
                        .orElseThrow(() -> new CustomException(NOT_FOUND_USER_INFO));
            return user.getId();
    }

    public User getUserByAT(String accessToken){
        String token = accessToken.split(" ")[1].trim();
        return userRepository.findById(Long.parseLong(jwtProvider.getAccount(token)))
                .orElseThrow(() -> new CustomException(NOT_FOUND_USER_INFO));
    }

}
