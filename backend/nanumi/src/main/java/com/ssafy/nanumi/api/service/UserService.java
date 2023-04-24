package com.ssafy.nanumi.api.service;

import com.ssafy.nanumi.api.request.UserJoinDTO;
import com.ssafy.nanumi.api.response.EmailCheckDTO;
import com.ssafy.nanumi.api.response.ProductAllDTO;
import com.ssafy.nanumi.api.response.ReviewReadDTO;
import com.ssafy.nanumi.api.response.UserReadDTO;
import com.ssafy.nanumi.common.provider.Provider;
import com.ssafy.nanumi.config.response.CustomDataResponse;
import com.ssafy.nanumi.config.response.exception.CustomException;
import com.ssafy.nanumi.db.entity.LoginProvider;
import com.ssafy.nanumi.db.entity.User;
import com.ssafy.nanumi.db.entity.UserInfo;
import com.ssafy.nanumi.db.repository.LoginProviderRepository;
import com.ssafy.nanumi.db.repository.UserInfoRepository;
import com.ssafy.nanumi.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.mail.MessagingException;
import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static com.ssafy.nanumi.config.response.exception.CustomExceptionStatus.NOT_FOUND_LOGIN_PROVIDER;
import static com.ssafy.nanumi.config.response.exception.CustomExceptionStatus.RESPONSE_EMAIL_EXISTED;

@Slf4j
@Service
@Transactional(readOnly = false)
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final UserInfoRepository userInfoRepository;
    private final LoginProviderRepository loginProviderRepository;
    private final EmailService emailService;

    public void join(UserJoinDTO userJoinDTO) {
        LoginProvider loginProvider = loginProviderRepository.findByProvider(Provider.local)
                .orElseThrow(() -> new CustomException(NOT_FOUND_LOGIN_PROVIDER));

        User user = User.builder()
                .email(userJoinDTO.getEmail())
                .nickname(userJoinDTO.getNickname())
                .password(userJoinDTO.getPassword())
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

    public EmailCheckDTO checkEmail(String email) throws MessagingException, UnsupportedEncodingException {

        String code = "";

        if( userRepository.findByEmail(email).isPresent() ){
            throw new CustomException(RESPONSE_EMAIL_EXISTED);
        }else{
            code = emailService.sendEmail(email);
        }

        return new EmailCheckDTO(code);
    }

    public UserReadDTO getUser(User user){
        return new UserReadDTO(user);
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
