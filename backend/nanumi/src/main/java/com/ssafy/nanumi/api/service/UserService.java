package com.ssafy.nanumi.api.service;

import com.ssafy.nanumi.api.request.UserJoinDTO;
import com.ssafy.nanumi.api.request.UserLoginDTO;
import com.ssafy.nanumi.api.request.UserUpdateDTO;
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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.mail.MessagingException;
import java.io.UnsupportedEncodingException;

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

    public EmailCheckResDTO checkEmail(String email) throws MessagingException, UnsupportedEncodingException {
        String code = "";

        if( userRepository.findByEmail(email).isPresent() ){
            throw new CustomException(RESPONSE_EMAIL_EXISTED);
        }else{
            code = emailService.sendEmail(email);
        }
        return new EmailCheckResDTO(code);
    }

    public void updateUserAddress(long addressCode, long userId){
       if(addressRepository.findById(addressCode).isEmpty()){
           throw new CustomException(NOT_FOUND_ADDRESS_CODE);
       }else{
           User user = userRepository.findById(userId).orElseThrow(
                   () -> new CustomException(NOT_FOUND_USER)
           );
           user.updateAddress(addressRepository.getById(addressCode));
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
                String addressName = address.getSi()+" "+address.getGuGun()+" "+address.getDong();
                return new AddressResDTO(address.getId(), addressName);
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

    public void updateUser(User user, UserUpdateDTO userUpdateDTO) {
        String userNickname = userUpdateDTO.getNickname();
        String userProfile = userUpdateDTO.getProfileUrl();

        if(userNickname.equals("")) userNickname = user.getNickname();
        else if(userProfile.equals("")) userProfile = Image.DefaultImage.getValue();
        user.updateUserInfo(userNickname, userProfile);
    }
    public void deleteUser(User user){
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
