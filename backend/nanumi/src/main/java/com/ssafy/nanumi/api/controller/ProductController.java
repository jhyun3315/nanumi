package com.ssafy.nanumi.api.controller;

import com.ssafy.nanumi.api.request.ProductInsertDTO;
import com.ssafy.nanumi.api.response.MatchSuccessDto;
import com.ssafy.nanumi.api.response.ProductAllDTO;
import com.ssafy.nanumi.api.response.ProductDetailDTO;
import com.ssafy.nanumi.api.response.ProductSearchResDTO;
import com.ssafy.nanumi.api.service.ProductService;
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
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


import java.io.IOException;

import static com.ssafy.nanumi.config.response.exception.CustomSuccessStatus.RESPONSE_SUCCESS;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/products")
@CrossOrigin(origins = {"http://localhost:3000", "https://k8b103.p.ssafy.io"})
public class ProductController {
    private final ProductService productService;
    private final UserRepository userRepository;
    private final ResponseService responseService;

    @GetMapping("/search/{words}/{page}/{user-id}")
    public CustomDataResponse<ProductSearchResDTO> search(@PathVariable ("words") String words, @PathVariable("page")int page, @PathVariable("user-id") long userId){
        PageRequest pageRequest = PageRequest.of(page, 6);
        ProductSearchResDTO productSearchResDTO = productService.searchProductByWords(userId, words, pageRequest);
        return responseService.getDataResponse(productSearchResDTO, RESPONSE_SUCCESS);
    }

    /* 상품 전체 조회 */
    @GetMapping("/{user-id}")
    public CustomDataResponse<Page<ProductAllDTO>> getProductAll(@PathVariable("user-id") long userId, @RequestParam("page") Integer page){
        User user = userRepository.findById(userId)
                .orElseThrow(()-> new CustomException(CustomExceptionStatus.NOT_FOUND_USER));
        PageRequest pageRequest = PageRequest.of(page, 6);
        return responseService.getDataResponse(productService.findProductAll(user, pageRequest), RESPONSE_SUCCESS);
    }
    /* 상세 페이지 조회 */
    @GetMapping("detail/{product-id}")
    public CustomDataResponse<ProductDetailDTO> getProductOne(@PathVariable("product-id") long productId) {
        return responseService.getDataResponse(productService.findByProductId(productId), RESPONSE_SUCCESS);
    }
    /* 카테고리별 조회 */
    @GetMapping("/categories/{category-id}/{user-id}")
    public CustomDataResponse<Page<ProductAllDTO>> getCateProductAll(@PathVariable("user-id") long userId, @PathVariable("category-id") long categoryId, @RequestParam("page") Integer page){
        User user = userRepository.findById(userId)
                .orElseThrow(()-> new CustomException(CustomExceptionStatus.NOT_FOUND_USER));
        PageRequest pageRequest = PageRequest.of(page, 6);
        return responseService.getDataResponse(productService.findCateProductAll(categoryId, user, pageRequest), RESPONSE_SUCCESS);
    }
    /* 상품 등록 */
    @PostMapping(path = "/{user-id}")
    public CustomResponse createProduct(@PathVariable("user-id") long userId,
                                        @RequestParam("images") MultipartFile[] images,
                                        @RequestParam("name") String name,
                                        @RequestParam("content") String content,
                                        @RequestParam("categoryId") Long categoryId) throws IOException {
        User user = userRepository.findById(userId)
                .orElseThrow(()-> new CustomException(CustomExceptionStatus.NOT_FOUND_USER));
        productService.createProduct(images,name,content,categoryId,user);
        return responseService.getSuccessResponse();
    }
    /* 상품 수정 */
    @PatchMapping("/{product-id}")
    public CustomResponse updateProduct(@PathVariable("product-id") long productId,
                                        @RequestParam("images") MultipartFile[] images,
                                        @RequestParam("name") String name,
                                        @RequestParam("content") String content,
                                        @RequestParam("categoryId") Long categoryId
                                        ) throws IOException {
        productService.updateProduct(productId,images,name,content,categoryId);
        return responseService.getSuccessResponse();
    }
    /* 상품 삭제 */
    @DeleteMapping("/{product-id}")
    public CustomResponse deleteProduct(@PathVariable("product-id") long productId) {
        productService.deleteProduct(productId);
        return responseService.getSuccessResponse();
    }
    /* 상품 신청 - 매칭 */
    @GetMapping("/application/{product-id}/{user-id}")
    public CustomDataResponse<MatchSuccessDto> applicationProduct(@PathVariable("user-id") long userId, @PathVariable("product-id") long productId) {
        User user = userRepository.findById(userId)
                .orElseThrow(()-> new CustomException(CustomExceptionStatus.NOT_FOUND_USER));
        return responseService.getDataResponse(productService.applicationProduct(productId, user),RESPONSE_SUCCESS);
    }
}
