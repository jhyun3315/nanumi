package com.ssafy.nanumi.api.controller;

import com.ssafy.nanumi.api.request.ProductInsertDTO;
import com.ssafy.nanumi.api.response.ProductAllDTO;
import com.ssafy.nanumi.api.response.ProductDetailDTO;
import com.ssafy.nanumi.api.service.ProductService;
import com.ssafy.nanumi.config.response.CustomDataResponse;
import com.ssafy.nanumi.config.response.CustomResponse;
import com.ssafy.nanumi.config.response.ResponseService;
import com.ssafy.nanumi.db.entity.User;
import com.ssafy.nanumi.db.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    /* 상품 전체 조회 */
    @GetMapping("")
    public CustomDataResponse<List<ProductAllDTO>> getProductAll(){
        User user = userRepository.findById(1L).get();
        return responseService.getDataResponse(productService.findProductAll(user), RESPONSE_SUCCESS);
    }
    /* 상세 페이지 조회 */
    @GetMapping("/{product_id}")
    public CustomDataResponse<ProductDetailDTO> getProductOne(@PathVariable("product_id") Long id) {
        return responseService.getDataResponse(productService.findByProductId(id), RESPONSE_SUCCESS);
    }
    /* 카테고리별 조회 */
    @GetMapping("/categories/{categorie_id}")
    public CustomDataResponse<List<ProductAllDTO>> getCateProductAll(@PathVariable("categorie_id") Long id){
        User user = userRepository.findById(1L).get();
        return  responseService.getDataResponse(productService.findCateProductAll(id, user), RESPONSE_SUCCESS);
    }
    /* 상품 등록 */
    @PostMapping("")
    public CustomResponse createProduct(@RequestBody ProductInsertDTO request) {
        User user = userRepository.findById(1L).get();
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
        return responseService.getSuccessResponse();
    }
}
