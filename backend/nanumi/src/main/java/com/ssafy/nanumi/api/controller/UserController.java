package com.ssafy.nanumi.api.controller;

import com.ssafy.nanumi.api.request.AddressDTO;
import com.ssafy.nanumi.api.request.TokenInfoDTO;
import com.ssafy.nanumi.api.request.UserJoinDTO;
import com.ssafy.nanumi.api.request.UserLoginDTO;
import com.ssafy.nanumi.api.response.*;
import com.ssafy.nanumi.api.service.UserService;
import com.ssafy.nanumi.common.SearchPageReq;
import com.ssafy.nanumi.common.provider.Provider;
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
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import javax.mail.MessagingException;
import java.io.IOException;
import static com.ssafy.nanumi.config.response.exception.CustomSuccessStatus.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:3000", "https://k8b103.p.ssafy.io"})
public class UserController {

    private final UserService userService;
    private final UserRepository userRepository;
    private final ResponseService responseService;

    /* 로컬 회원가입 */
    @PostMapping("/users/join")
    public CustomResponse join(@RequestBody UserJoinDTO userJoinDTO) {
        userService.join(userJoinDTO, Provider.local);
        return responseService.getSuccessResponse();
    }

    /* 로컬 로그인 */
    @PostMapping("/users/login")
    public CustomDataResponse login(@RequestBody UserLoginDTO userLoginDTO){
        userLoginDTO.ifLocalLogin();
        UserLoginResDTO userLoginResDTO = userService.login(userLoginDTO);
        return responseService.getDataResponse(userLoginResDTO, RESPONSE_SUCCESS);
    }

    /* AT, RT 유효성 검사 */
    @PostMapping(value="/users/isRTValid")
    public ResponseEntity<TokenInfoResDTO> isRTValid(@RequestBody TokenInfoDTO request) throws Exception {
        return new ResponseEntity<>(userService.isRTValid(request), HttpStatus.OK);
    }

    @GetMapping("/users/check/{email}")
    public CustomDataResponse emailCheck(@PathVariable("email") String email) throws MessagingException, IOException {
        // 이메일 중복 처리, 인증 처리
        System.out.println(email);
        EmailCheckResDTO emailCheckResDTO = userService.checkEmail(email);
        return responseService.getDataResponse(emailCheckResDTO, RESPONSE_SUCCESS);
    }

    @GetMapping("/users/token")
    public long userByAT(@RequestHeader("Authorization") String accessToken) {
        long userId = userService.userByAT(accessToken);
        return userId;
    }

    /*사용자 장소 정보 등록 수정*/
    @PatchMapping("/users/address/{user-id}")
    public CustomResponse saveUserAddress( @RequestHeader("Authorization") String accessToken, @RequestBody AddressDTO addressDTO){
        long userId = userService.userByAT(accessToken);
        return responseService.getDataResponse(userService.updateUserAddress(addressDTO.getAddressId(),userId), RESPONSE_SUCCESS);
    }

    /*사용자 주소 조회*/
    @GetMapping("/users/address/{user-id}")
    public CustomDataResponse findUserAddress( @RequestHeader("Authorization") String accessToken){
        long userId = userService.userByAT(accessToken);
       AddressResDTO addressResDTO =  userService.getUserAddress(userId);
       return responseService.getDataResponse(addressResDTO, RESPONSE_SUCCESS);
    }


    /* 회원 정보 조회 */
    @GetMapping("/users/{user-id}")
    public CustomDataResponse<UserDetailDTO> findDetailUser(@PathVariable("user-id") long userId ){
        return responseService.getDataResponse(userService.findDetailUser(userId), RESPONSE_SUCCESS);
    }


    /* 회원 정보 수정 */
    @PatchMapping("/users/{user-id}")
    public CustomDataResponse<UserSimpleDTO> updateUser( @RequestHeader("Authorization") String accessToken,
                                     @RequestParam("nickname") String nickname,
                                     @RequestParam("profileUrl") MultipartFile profileUrl) throws IOException {
        long userId = userService.userByAT(accessToken);
        User user = userRepository.findById(userId)
                .orElseThrow(()-> new CustomException(CustomExceptionStatus.NOT_FOUND_USER));
        return responseService.getDataResponse(userService.updateUser(user, nickname, profileUrl), RESPONSE_SUCCESS);
    }

    /* 회원 정보 탈퇴 */
    @DeleteMapping("/users/{user-id}")
    public CustomResponse deleteUser( @RequestHeader("Authorization") String accessToken){
        long userId = userService.userByAT(accessToken);
        User user = userRepository.findById(userId)
                .orElseThrow(()-> new CustomException(CustomExceptionStatus.NOT_FOUND_USER));
        userService.deleteUser(user);
        return responseService.getSuccessResponse();
    }

    /* 거래 후기 조회 (남이 나에게) */
    @GetMapping("/users/reviews/{user-id}")
    public CustomDataResponse<Page<ReviewReadDTO>> getAllReview( @PathVariable("user-id") long userId, @RequestParam("page") Integer page){
        User user = userRepository.findById(userId)
                .orElseThrow(()-> new CustomException(CustomExceptionStatus.NOT_FOUND_USER));
        PageRequest pageRequest = PageRequest.of(page, 6);
        return responseService.getDataResponse(userService.getAllReview(user, pageRequest),RESPONSE_SUCCESS);
    }

    /* 나눔한 상품 목록 조회 (모든 거래) */
    @GetMapping("/users/products/{user-id}")
    public CustomDataResponse<Page<ProductAllDTO>> getAllReceiveProduct(@PathVariable("user-id") long userId,@RequestHeader("Authorization") String accessToken, @RequestParam("page") Integer page){
        User user = userRepository.findById(userId)
                .orElseThrow(()-> new CustomException(CustomExceptionStatus.NOT_FOUND_USER));
        PageRequest pageRequest = PageRequest.of(page, 6);
        return responseService.getDataResponse(userService.getAllReceiveProduct(user, pageRequest), RESPONSE_SUCCESS);
    }

    /* 매칭 목록 (현재 진행중 "나눔" 목록) */
    @GetMapping("/users/matches/{user-id}")
    public CustomDataResponse<Page<ProductAllDTO>> getMatchProduct(@PathVariable("user-id") long userId, @RequestHeader("Authorization") String accessToken, @RequestParam("page") Integer page){
        User user = userRepository.findById(userId)
                .orElseThrow(()-> new CustomException(CustomExceptionStatus.NOT_FOUND_USER));

        SearchPageReq searchPageReq = new SearchPageReq(page);
        PageRequest pageRequest = PageRequest.of(searchPageReq.getPageIndex(),
                searchPageReq.getPageSizeForProduct(),
                Sort.by(searchPageReq.getSortStdForProduct()).descending()
        );

        return responseService.getDataResponse(userService.getMatchProduct(user, pageRequest),RESPONSE_SUCCESS);
    }

    /* 매칭 중인 상품 목록 조회 */
    @GetMapping("/users/matching/{user-id}")
    public CustomDataResponse<Page<ProductAllDTO>> getMatchingeProduct( @PathVariable("user-id") long userId, @RequestParam("page") Integer page ){
        User user = userRepository.findById(userId)
                .orElseThrow(()-> new CustomException(CustomExceptionStatus.NOT_FOUND_USER));

        SearchPageReq searchPageReq = new SearchPageReq(page);
        PageRequest pageRequest = PageRequest.of(searchPageReq.getPageIndex(),
                searchPageReq.getPageSizeForProduct(),
                Sort.by(searchPageReq.getSortStdForProduct()).descending()
        );

        return responseService.getDataResponse(userService.getMatchingProduct(user, pageRequest),RESPONSE_SUCCESS);
    }

    /* 나눔 받은 상품 목록 조회 */
    @GetMapping("/users/given/{user-id}")
    public CustomDataResponse<Page<ProductAllDTO>> getGivenProduct( @PathVariable("user-id") long userId,@RequestParam("page") Integer page){
        User user = userRepository.findById(userId)
                .orElseThrow(()-> new CustomException(CustomExceptionStatus.NOT_FOUND_USER));

        SearchPageReq searchPageReq = new SearchPageReq(page);
        PageRequest pageRequest = PageRequest.of(searchPageReq.getPageIndex(),
                searchPageReq.getPageSizeForProduct(),
                Sort.by(searchPageReq.getSortStdForProduct()).descending()
        );

        return responseService.getDataResponse(userService.getGivenProduct(user, pageRequest), RESPONSE_SUCCESS);
    }
}
