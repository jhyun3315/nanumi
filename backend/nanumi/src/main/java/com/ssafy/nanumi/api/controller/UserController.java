package com.ssafy.nanumi.api.controller;

import com.ssafy.nanumi.api.request.AddressDTO;
import com.ssafy.nanumi.api.request.UserJoinDTO;
import com.ssafy.nanumi.api.request.UserLoginDTO;
import com.ssafy.nanumi.api.request.UserUpdateDTO;
import com.ssafy.nanumi.api.response.*;
import com.ssafy.nanumi.api.service.UserService;
import com.ssafy.nanumi.config.response.CustomDataResponse;
import com.ssafy.nanumi.config.response.CustomResponse;
import com.ssafy.nanumi.config.response.ResponseService;
import com.ssafy.nanumi.config.response.exception.CustomException;
import com.ssafy.nanumi.config.response.exception.CustomExceptionStatus;
import com.ssafy.nanumi.db.entity.User;
import com.ssafy.nanumi.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;
import javax.mail.MessagingException;
import java.io.UnsupportedEncodingException;
import static com.ssafy.nanumi.config.response.exception.CustomSuccessStatus.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:3000", "https://k8b103.p.ssafy.io"})
public class UserController {

    private final UserService userService;
    private final UserRepository userRepository;
    private final ResponseService responseService;

    /* 로컬 로그인 (야매) */
    @PostMapping("/users/login")
    public CustomDataResponse login(@RequestBody UserLoginDTO userLoginDTO){
       UserLoginResDTO userLoginResDTO = userService.login(userLoginDTO);
       return responseService.getDataResponse(userLoginResDTO, RESPONSE_SUCCESS);
    }

    /* 로컬 회원가입 */
    @PostMapping("/users/join")
    public CustomResponse join(@RequestBody UserJoinDTO userJoinDTO) {
        userService.join(userJoinDTO);
        return responseService.getSuccessResponse();
    }

    @GetMapping("/users/check/{email}")
    public CustomDataResponse emailCheck(@PathVariable("email") String email) throws MessagingException, UnsupportedEncodingException {
        // 이메일 중복 처리, 인증 처리
        System.out.println(email);
        EmailCheckResDTO emailCheckResDTO = userService.checkEmail(email);
        return responseService.getDataResponse(emailCheckResDTO, RESPONSE_SUCCESS);
    }

    /*사용자 장소 정보 등록 수정*/
    @PatchMapping("/users/address/{user-id}")
    public CustomResponse saveUserAddress(@PathVariable("user-id")long userId, @RequestBody AddressDTO addressDTO){

        return responseService.getDataResponse(userService.updateUserAddress(addressDTO.getAddressId(),userId), RESPONSE_SUCCESS);
    }

    /*사용자 주소 조회*/
    @GetMapping("/users/address/{user-id}")
    public CustomDataResponse findUserAddress(@PathVariable("user-id")long userId){
       AddressResDTO addressResDTO =  userService.getUserAddress(userId);
       return responseService.getDataResponse(addressResDTO, RESPONSE_SUCCESS);
    }


    /* 회원 정보 조회 */
    @GetMapping("users/{user-id}")
    public CustomDataResponse<UserDetailDTO> findDetailUser(@PathVariable("user-id") Long userId) {
        return responseService.getDataResponse(userService.findDetailUser(userId), RESPONSE_SUCCESS);
    }


    /* 회원 정보 수정 */
    @PatchMapping("/users/{user-id}")
    public CustomResponse updateUser(@PathVariable("user-id") Long userId, @RequestBody UserUpdateDTO userUpdateDTO) {
        User user = userRepository.findById(userId)
                .orElseThrow(()-> new CustomException(CustomExceptionStatus.NOT_FOUND_USER));
        userService.updateUser(user, userUpdateDTO);
        return responseService.getSuccessResponse();
    }

    /* 회원 정보 탈퇴 */
    @DeleteMapping("/users/{user-id}")
    public CustomResponse deleteUser(@PathVariable("user-id") Long userId){
        User user = userRepository.findById(userId)
                .orElseThrow(()-> new CustomException(CustomExceptionStatus.NOT_FOUND_USER));
        userService.deleteUser(user);
        return responseService.getSuccessResponse();
    }

    /* 거래 후기 조회 (남이 나에게) */
    @GetMapping("/users/reviews/{user-id}")
    public CustomDataResponse<Page<ReviewReadDTO>> getAllReview(@PathVariable("user-id") Long userId, @RequestParam("page") Integer page){
        User user = userRepository.findById(userId)
                .orElseThrow(()-> new CustomException(CustomExceptionStatus.NOT_FOUND_USER));
        PageRequest pageRequest = PageRequest.of(page, 6);
        return responseService.getDataResponse(userService.getAllReview(user, pageRequest),RESPONSE_SUCCESS);
    }

    /* 나눔 상품 목록 조회 (모든 거래) */
    @GetMapping("/users/products/{user-id}")
    public CustomDataResponse<Page<ProductAllDTO>> getAllReceiveProduct(@PathVariable("user-id") Long userId, @RequestParam("page") Integer page){
        User user = userRepository.findById(userId)
                .orElseThrow(()-> new CustomException(CustomExceptionStatus.NOT_FOUND_USER));
        PageRequest pageRequest = PageRequest.of(page, 6);
        return responseService.getDataResponse(userService.getAllReceiveProduct(user, pageRequest), RESPONSE_SUCCESS);
    }

    /* 매칭 목록 (현재 진행중 "나눔" 목록) */
    @GetMapping("/users/matches/{user-id}")
    public CustomDataResponse<Page<ProductAllDTO>> getMatchingProduct(@PathVariable("user-id") Long userId, @RequestParam("page") Integer page){
        User user = userRepository.findById(userId)
                .orElseThrow(()-> new CustomException(CustomExceptionStatus.NOT_FOUND_USER));
        PageRequest pageRequest = PageRequest.of(page, 6);
        return responseService.getDataResponse(userService.getMatchingProduct(user, pageRequest),RESPONSE_SUCCESS);
    }
}
