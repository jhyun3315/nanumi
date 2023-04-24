package com.ssafy.nanumi.api.service;

import com.ssafy.nanumi.api.request.UserJoinDTO;
import com.ssafy.nanumi.api.response.*;
import com.ssafy.nanumi.common.provider.Provider;
import com.ssafy.nanumi.config.response.CustomDataResponse;
import com.ssafy.nanumi.config.response.exception.CustomException;
import com.ssafy.nanumi.db.entity.LoginProvider;
import com.ssafy.nanumi.db.entity.User;
import com.ssafy.nanumi.db.entity.UserInfo;
import com.ssafy.nanumi.db.repository.LoginProviderRepository;
import com.ssafy.nanumi.db.repository.ProductRepository;
import com.ssafy.nanumi.db.repository.UserInfoRepository;
import com.ssafy.nanumi.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.mail.MessagingException;
import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.stream.Collectors;

import static com.ssafy.nanumi.config.response.exception.CustomExceptionStatus.*;

@Slf4j
@Service
@Transactional(readOnly = false)
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final UserInfoRepository userInfoRepository;
    private final ProductRepository productRepository;
    private final LoginProviderRepository loginProviderRepository;
    private final EmailService emailService;

    public void join(UserJoinDTO userJoinDTO) {
        LoginProvider loginProvider = loginProviderRepository.findByProvider(Provider.local)
                .orElseThrow(() -> new CustomException(NOT_FOUND_LOGIN_PROVIDER));

        String email = userJoinDTO.getEmail();
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

        if( userRepository.findByEmail(email).isPresent() ){
            throw new CustomException(RESPONSE_EMAIL_EXISTED);
        }else{
            User user = User.builder()
                    .email(userJoinDTO.getEmail())
                    .nickname(userJoinDTO.getNickname())
                    .password(passwordEncoder.encode(userJoinDTO.getPassword()))
                    .profileUrl("url")
                    .isDeleted(false)
                    .loginProvider(loginProvider)
                    .address(null)
                    .build();

            userRepository.save(user);

            UserInfo userInfo = UserInfo.builder()
                    .user(user)
                    .stopDate(null)
                    .refreshToken(null)
                    .build();

            userInfoRepository.save(userInfo);
        }

    }

    public EmailCheckDTO checkEmail(String email) throws MessagingException, UnsupportedEncodingException {

        String code = "";

        if( userRepository.findByEmail(email).isPresent() ){
            throw new CustomException(RESPONSE_EMAIL_EXISTED);
        }else{
            code = emailService.sendEmail(email);
        }

        return new EmailCheckDTO(code);
    }


    public UserDetailDTO findDetailUser(long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(NOT_FOUND_USER));

        UserInfo userInfo = userInfoRepository.findById(user.getId())
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

    public UserReadDTO getUser(User user){
        return new UserReadDTO(user);
    }
    public void updateUser(User user, UserJoinDTO userJoinDTO) {
        user.setEmail(userJoinDTO.getEmail());
        user.setNickname(userJoinDTO.getNickname());
        user.setPassword(userJoinDTO.getPassword());
    }
    public void deleteUser(User user){
        user.delete();
    }
    public List<ReviewReadDTO> getAllReview(User user){
        return user.getReviews()
                .stream()
                .map(ReviewReadDTO::new).collect(Collectors.toList());
    }
    public List<ProductAllDTO> getAllReceiveProduct(User user){
        return user.getProducts()
                .stream()
                .filter(product -> !product.isDeleted())
                .map(ProductAllDTO::new)
                .collect(Collectors.toList());
    }
    public List<ProductAllDTO> getMatchingProduct(User user){
        return user.getProducts()
                .stream()
                .filter(product -> !product.isDeleted() && !product.isClosed())
                .map(ProductAllDTO::new)
                .collect(Collectors.toList());
    }
}
