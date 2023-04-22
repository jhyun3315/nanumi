package com.ssafy.nanumi.api.controller;

import com.ssafy.nanumi.api.request.ProductInsertRequest;
import com.ssafy.nanumi.api.response.ProductAllResponse;
import com.ssafy.nanumi.api.response.ProductDetailResponse;
import com.ssafy.nanumi.api.service.ProductService;
import com.ssafy.nanumi.db.entity.User;
import com.ssafy.nanumi.db.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping(value = "/products")
public class ProductController {
    public final ProductService productService;
    public final UserRepository userRepository;


    // 전체 조회
    @GetMapping("")
    public ResponseEntity<List<ProductAllResponse>> getProductAll(){
        return new ResponseEntity<>(productService.findProductAll(), HttpStatus.OK);
    }
    // 상세 페이지 조회
    @GetMapping("/{product_id}")
    public ResponseEntity<ProductDetailResponse> getProductOne(@PathVariable("product_id") Long id) {
        return new ResponseEntity<>(productService.findByProductId(id), HttpStatus.OK);
    }
    // 카테고리별 조회
    @GetMapping("/categories/{categorie_id}")
    public ResponseEntity<List<ProductAllResponse>> getCateProductAll(@PathVariable("categorie_id") Long id){
        return new ResponseEntity<>(productService.findCateProductAll(id), HttpStatus.OK);
    }
    // 상품 등록
    @PostMapping("")
    public ResponseEntity<ProductDetailResponse> createProduct(@RequestBody ProductInsertRequest request) {
        User user = userRepository.findById(1L).get();
        return new ResponseEntity<>(productService.createProduct(request, user), HttpStatus.CREATED);
    }
    // 상품 수정
//    @PatchMapping("/{product_id}")
//    public ResponseEntity<?> updateProduct(@PathVariable("product_id") Long id) {
//        return new ResponseEntity<>(productService.updateProduct(id), HttpStatus.OK);
//    }
    // 상품 삭제
    @DeleteMapping("/{product_id}")
    public ResponseEntity<ProductDetailResponse> deleteproduct(@PathVariable("product_id") Long id, @RequestBody ProductInsertRequest request) {
        return new ResponseEntity<>(productService.deleteProduct(request, id), HttpStatus.OK);
    }
}
