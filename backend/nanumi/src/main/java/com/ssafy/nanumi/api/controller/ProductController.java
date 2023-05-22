package com.ssafy.nanumi.api.controller;

import com.ssafy.nanumi.api.response.MatchSuccessDto;
import com.ssafy.nanumi.api.response.ProductAllDTO;
import com.ssafy.nanumi.api.response.ProductDetailDTO;
import com.ssafy.nanumi.api.service.NanumService;
import com.ssafy.nanumi.api.service.ProductService;
import com.ssafy.nanumi.api.service.UserService;
import com.ssafy.nanumi.common.SearchPageReq;
import com.ssafy.nanumi.config.response.CustomDataResponse;
import com.ssafy.nanumi.config.response.CustomResponse;
import com.ssafy.nanumi.config.response.ResponseService;
import com.ssafy.nanumi.config.response.exception.CustomException;
import com.ssafy.nanumi.config.response.exception.CustomExceptionStatus;
import com.ssafy.nanumi.db.entity.User;
import com.ssafy.nanumi.db.repository.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


import java.io.IOException;
import java.io.UnsupportedEncodingException;

import static com.ssafy.nanumi.config.response.exception.CustomSuccessStatus.RESPONSE_SUCCESS;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/products")
@CrossOrigin(origins = {"http://localhost:3000", "https://k8b103.p.ssafy.io"})
public class ProductController {
    private final ProductService productService;
    private final UserRepository userRepository;
    private final ResponseService responseService;
    private final NanumService nanumService;
    private final UserService userService;


    /* 제목으로 상품 검색 */
    @GetMapping("/search")
    public CustomDataResponse<Page<ProductAllDTO>> search(@RequestParam ("words") String words,
                                                          @RequestParam("page")int page,
                                                          @RequestHeader("Authorization") String accessToken) throws UnsupportedEncodingException {
        SearchPageReq searchPageReq = new SearchPageReq(page);
        PageRequest pageRequest = PageRequest.of(searchPageReq.getPageIndex(),
                searchPageReq.getPageSizeForProduct(),
                Sort.by(searchPageReq.getSortStdForProduct()).descending()
        );

        long userId = userService.userByAT(accessToken);
        return responseService.getDataResponse(productService.searchProductByWords(userId, words, pageRequest), RESPONSE_SUCCESS);
    }

    /* 상품 전체 조회 */
    @GetMapping("/{user-id}")
    public CustomDataResponse<Page<ProductAllDTO>> getProductAll(@PathVariable("user-id") long userId, @RequestParam("page") int page){
        SearchPageReq searchPageReq = new SearchPageReq(page);
        PageRequest pageRequest = PageRequest.of(searchPageReq.getPageIndex(),
                searchPageReq.getPageSizeForProduct(),
                Sort.by(searchPageReq.getSortStdForProduct()).descending()
        );
        return responseService.getDataResponse(productService.findProductAll(userId, pageRequest), RESPONSE_SUCCESS);
    }

    /* 상세 페이지 조회 */
    @GetMapping("detail/{product-id}")
    public CustomDataResponse<ProductDetailDTO> getProductOne(@PathVariable("product-id") long productId) {
        return responseService.getDataResponse(productService.findByProductId(productId), RESPONSE_SUCCESS);
    }

    /* 카테고리별 조회 */
    @GetMapping("/categories/{category-id}/{user-id}")
    public CustomDataResponse<Page<ProductAllDTO>> getCateProductAll( @RequestHeader("Authorization") String accessToken, @PathVariable("category-id") long categoryId, @RequestParam("page") Integer page){
        SearchPageReq searchPageReq = new SearchPageReq(page);
        PageRequest pageRequest = PageRequest.of(searchPageReq.getPageIndex(),
                searchPageReq.getPageSizeForProduct(),
                Sort.by(searchPageReq.getSortStdForProduct()).descending()
        );
        long userId = userService.userByAT(accessToken);
        return responseService.getDataResponse(productService.findCateProductAll(categoryId, userId, pageRequest), RESPONSE_SUCCESS);
    }

    /* 상품 등록 */
    @PostMapping(path = "/{user-id}")
    public CustomResponse createProduct( @RequestHeader("Authorization") String accessToken,
                                        @RequestParam("images") MultipartFile[] images,
                                        @RequestParam("name") String name,
                                        @RequestParam("content") String content,
                                        @RequestParam("categoryId") Long categoryId) throws IOException {
        long userId = userService.userByAT(accessToken);
        User user = userRepository.findById(userId)
                .orElseThrow(()-> new CustomException(CustomExceptionStatus.NOT_FOUND_USER));
        productService.createProduct(images,name,content,categoryId,user);
        return responseService.getSuccessResponse();
    }
    /* 상품 수정 */
    @PatchMapping("/{product-id}")
    public CustomResponse updateProduct(@RequestHeader("Authorization") String accessToken,
                                        @PathVariable("product-id") long productId,
                                        @RequestParam("images") MultipartFile[] images,
                                        @RequestParam("name") String name,
                                        @RequestParam("content") String content,
                                        @RequestParam("categoryId") Long categoryId
                                        ) throws IOException {
        long userId = userService.userByAT(accessToken);
        productService.updateProduct(userId,productId,images,name,content,categoryId);
        return responseService.getSuccessResponse();
    }
    /* 상품 삭제 */
    @DeleteMapping("/{product-id}")
    public CustomResponse deleteProduct(@RequestHeader("Authorization") String accessToken,
                                        @PathVariable("product-id") long productId) {
        long userId = userService.userByAT(accessToken);
        productService.deleteProduct(userId,productId);
        return responseService.getSuccessResponse();
    }
    /* 상품 신청 - 매칭 */
    @GetMapping("/application/{product-id}/{user-id}")
    public CustomDataResponse<MatchSuccessDto> applicationProduct( @RequestHeader("Authorization") String accessToken, @PathVariable("product-id") long productId) {
        long userId = userService.userByAT(accessToken);
        User user = userRepository.findById(userId)
                .orElseThrow(()-> new CustomException(CustomExceptionStatus.NOT_FOUND_USER));
        return responseService.getDataResponse(nanumService.registerNanum(productId, user),RESPONSE_SUCCESS);
    }

}
