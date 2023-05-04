package com.ssafy.nanumi.api.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.ssafy.nanumi.api.request.UserJoinDTO;
import com.ssafy.nanumi.api.request.UserLoginDTO;
import com.ssafy.nanumi.api.response.*;
import com.ssafy.nanumi.common.Image;
import com.ssafy.nanumi.common.provider.Provider;
import com.ssafy.nanumi.config.response.exception.CustomException;
import com.ssafy.nanumi.db.entity.Address;
import com.ssafy.nanumi.db.entity.LoginProvider;
import com.ssafy.nanumi.db.entity.User;
import com.ssafy.nanumi.db.entity.UserInfo;
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
    @Value("${cloud.aws.s3.bucket}")
    private String bucket;
    private final AmazonS3 amazonS3;


    public UserLoginResDTO login(UserLoginDTO userLoginDTO){
        String userID = userLoginDTO.getId();
        String userPassword = userLoginDTO.getPassword();

        User user = userRepository.findByEmail(userID).orElseThrow(() -> new CustomException(NOT_FOUND_USER));
        String originPassword = user.getPassword();

        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

        // 입력받은 비밀번호와 저장된 비밀번호 비교
        if(encoder.matches(userPassword, originPassword)){
            return new UserLoginResDTO(user);
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
            String s3FileName = UUID.randomUUID() + "-" + profileImg.getOriginalFilename();
            ObjectMetadata objMeta = new ObjectMetadata();
            objMeta.setContentLength(profileImg.getInputStream().available());
            amazonS3.putObject(bucket, s3FileName, profileImg.getInputStream(), objMeta);
            imageString = amazonS3.getUrl(bucket, s3FileName).toString();
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
    public Page<ProductAllDTO> getMatchingProduct(User user, PageRequest pageRequest){
        return userRepository.getAllMatchingProduct(user.getId(), pageRequest);
    }
}
