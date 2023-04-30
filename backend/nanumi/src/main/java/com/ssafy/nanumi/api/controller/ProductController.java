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
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.ssafy.nanumi.config.response.exception.CustomSuccessStatus.RESPONSE_SUCCESS;

@RestController
@AllArgsConstructor
@RequestMapping(value = "/products")
public class ProductController {
    public final ProductService productService;
    public final UserRepository userRepository;
    private final ResponseService responseService;

    @GetMapping("/search")
    public CustomDataResponse<ProductSearchResDTO> search(@RequestParam ("name") String name, @RequestParam("page")int page){
        User user = userRepository.findById(1L)
                .orElseThrow(()-> new CustomException(CustomExceptionStatus.NOT_FOUND_USER));
        PageRequest pageRequest = PageRequest.of(page, 6);
        ProductSearchResDTO productSearchResDTO = productService.searchProductByWords(user, name, pageRequest);
        return responseService.getDataResponse(productSearchResDTO, RESPONSE_SUCCESS);
    }

    /* 상품 전체 조회 */
    @GetMapping("")
    public CustomDataResponse<Page<ProductAllDTO>> getProductAll(@RequestParam("page") Integer page){
        User user = userRepository.findById(1L)
                .orElseThrow(()-> new CustomException(CustomExceptionStatus.NOT_FOUND_USER));
        PageRequest pageRequest = PageRequest.of(page, 6);
        return responseService.getDataResponse(productService.findProductAll(user, pageRequest), RESPONSE_SUCCESS);
    }
    /* 상세 페이지 조회 */
    @GetMapping("/{product_id}")
    public CustomDataResponse<ProductDetailDTO> getProductOne(@PathVariable("product_id") Long id) {
        return responseService.getDataResponse(productService.findByProductId(id), RESPONSE_SUCCESS);
    }
    /* 카테고리별 조회 */
    @GetMapping("/categories/{category_id}")
    public CustomDataResponse<Page<ProductAllDTO>> getCateProductAll(@PathVariable("category_id") Long categoryId, @RequestParam("page") Integer page){
        User user = userRepository.findById(1L)
                .orElseThrow(()-> new CustomException(CustomExceptionStatus.NOT_FOUND_USER));
        PageRequest pageRequest = PageRequest.of(page, 6);
        return responseService.getDataResponse(productService.findCateProductAll(categoryId, user, pageRequest), RESPONSE_SUCCESS);
    }
    /* 상품 등록 */
    @PostMapping("")
    public CustomResponse createProduct(@RequestBody ProductInsertDTO request) {
        User user = userRepository.findById(1L)
                .orElseThrow(()-> new CustomException(CustomExceptionStatus.NOT_FOUND_USER));
        productService.createProduct(request, user);
        return responseService.getSuccessResponse();
    }
    /* 상품 수정 */
    @PatchMapping("/{product_id}")
    public CustomResponse updateProduct(@PathVariable("product_id") Long id, @RequestBody ProductInsertDTO request) {
        productService.updateProduct(request, id);
        return responseService.getSuccessResponse();
    }
    /* 상품 삭제 */
    @DeleteMapping("/{product_id}")
    public CustomResponse deleteProduct(@PathVariable("product_id") Long id) {
        productService.deleteProduct(id);
        return responseService.getSuccessResponse();
    }
    /* 상품 신청 - 매칭 */
    @GetMapping("/application/{product_id}")
    public CustomDataResponse<MatchSuccessDto> applicationProduct(@PathVariable("product_id") Long id) {
        User user = userRepository.findById(1L)
                .orElseThrow(()-> new CustomException(CustomExceptionStatus.NOT_FOUND_USER));
        return responseService.getDataResponse(productService.applicationProduct(id, user),RESPONSE_SUCCESS);
    }
}
