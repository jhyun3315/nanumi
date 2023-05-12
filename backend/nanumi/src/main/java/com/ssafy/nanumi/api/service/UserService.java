package com.ssafy.nanumi.api.service;

import com.amazonaws.services.s3.AmazonS3;
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

import static com.ssafy.nanumi.config.response.exception.CustomExceptionStatus.*;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final UserInfoRepository userInfoRepository;
    private final AddressRepository addressRepository;
    private final ProductRepository productRepository;
    private final LoginProviderRepository loginProviderRepository;

    private BCryptPasswordEncoder encoder;
    private final EmailService emailService;
    private final S3Service s3Service;
    private final JwtProvider jwtProvider;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;
    private final AmazonS3 amazonS3;

    public UserLoginResDTO login(UserLoginDTO userLoginDTO){
        LoginProvider loginProvider = loginProviderRepository
                .findByProvider(userLoginDTO.getProvider()).orElseThrow(() -> new CustomException(NOT_FOUND_LOGIN_PROVIDER));
        User user = userRepository
                .findByEmailAndLoginProvider(userLoginDTO.getEmail(), loginProvider).orElseThrow(() -> new CustomException(NOT_FOUND_USER));

        // Access Token
        String AT = jwtProvider.createAccessToken(String.valueOf(user.getId()), user.getTiers());
        // Refresh Token
        String RT = jwtProvider.createRefreshToken(String.valueOf(user.getId()), user.getTiers());

        UserInfo userInfo =userInfoRepository.findById(user.getUserInfo().getId()).orElseThrow(() -> new CustomException(NOT_FOUND_USER_INFO));
        userInfo.updateRefreshToken(RT);
        encoder = new BCryptPasswordEncoder();
        // 입력받은 비밀번호와 저장된 비밀번호 비교

        if (encoder.matches(userLoginDTO.getPassword(), user.getPassword())) {

            userInfo.updateFcmToken(userLoginDTO.getFcmToken());

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
                    case "브론즈" :
                        if(present_visit>=2 && given_count>=2 && give_count>=2) {
                            user.setRoles(Collections.singletonList(Authority.builder().name("ROLE_실버").build()));
                            userInfo.updateTier("실버");
                        }
                        break;
                    case "실버" :
                        if(present_visit>=10 && give_count>=10) {
                            user.setRoles(Collections.singletonList(Authority.builder().name("ROLE_골드").build()));
                            userInfo.updateTier("골드");
                        }
                        break;
                    case "골드" :
                        if(present_visit>=50 && give_count>=50) {
                            user.setRoles(Collections.singletonList(Authority.builder().name("ROLE_플레티넘").build()));
                            userInfo.updateTier("플레티넘");
                        }
                        break;
                    case "플레티넘" :
                        if(present_visit>=50 && give_count>=50 && temperature>=40) {
                            user.setRoles(Collections.singletonList(Authority.builder().name("ROLE_다이아").build()));
                            userInfo.updateTier("다이아");
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

        encoder = new BCryptPasswordEncoder();
        System.out.println("<회원가입> loginProvider : "+loginProvider.getProvider());
        String email = userJoinDTO.getEmail();
        System.out.println("<회원가입> email: "+email);

        // 이미 존재하는 계정이라면 예외 발생
        if(userRepository.findByEmailAndLoginProvider(email, loginProvider).isPresent()) throw new CustomException(RESPONSE_ACCOUNT_EXISTED);

        String profileImage = provider.equals(Provider.local) ? Image.DefaultImage.getValue() : userJoinDTO.getProfileUrl();

        UserInfo userInfo =
                UserInfo.builder()
                        .stopDate(null)
                        .refreshToken(null)
                        .build();

        UserInfo updatedUserInfo = userInfoRepository.save(userInfo);

        Address address = addressRepository.findById(
                userJoinDTO.getAddressId()).orElseThrow(() -> new CustomException(NOT_FOUND_ADDRESS_CODE));

        System.out.println("<회원가입> profileImage: "+profileImage);
        System.out.println("<회원가입> userInfo: "+updatedUserInfo.getId());
        System.out.println("<회원가입> address : "+ address.getId());
        System.out.println("<회원가입 nickname : " + userJoinDTO.getNickname());

        User user = User.builder()
                .email(email)
                .nickname(userJoinDTO.getNickname())
                .profileUrl(profileImage)
                .password(encoder.encode(userJoinDTO.getPassword()))
                .loginProvider(loginProvider)
                .address(address)
                .userInfo(updatedUserInfo)
                .build();

        // Security 일반사용자 권한 추가
        user.setRoles(Collections.singletonList(Authority.builder().name("ROLE_브론즈").build()));
        User createdUser = userRepository.save(user);
        return createdUser;
    }

    @Transactional(readOnly = true)
    public EmailCheckResDTO checkEmail(String email) throws MessagingException, IOException {
        userRepository.findByEmail(email).orElseThrow(() ->  new CustomException(RESPONSE_EMAIL_EXISTED));
        return new EmailCheckResDTO( emailService.sendEmail(email));
    }

    public AddressResDTO updateUserAddress(long addressCode, long userId){
        Address address = addressRepository.findById(addressCode).orElseThrow(
                () -> new CustomException(NOT_FOUND_ADDRESS_CODE));
        User user = userRepository.findById(userId).orElseThrow(
                () -> new CustomException(NOT_FOUND_USER));
        user.updateAddress(address);
        return new AddressResDTO(address);
    }
    @Transactional(readOnly = true)
    public AddressResDTO getUserAddress(long userId){
            User user = userRepository.findById(userId).orElseThrow(()-> new CustomException(NOT_FOUND_USER));
            long addressCode = user.getAddress().getId();
            Address address = addressRepository.findById(addressCode).orElseThrow(() -> new CustomException(NOT_FOUND_ADDRESS_CODE));
            return new AddressResDTO(address);
    }
    @Transactional(readOnly = true)
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
