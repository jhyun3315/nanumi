package com.ssafy.nanumi.api.service;

import com.ssafy.nanumi.api.response.ProductAllResponse;
import com.ssafy.nanumi.api.response.ProductDetailResponse;
import com.ssafy.nanumi.db.repository.ProductRepository;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@AllArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;
    public List<ProductAllResponse> findProductAll() {
        return productRepository.findAllByDeletedFalse().stream().filter(product -> product.getAddress().getId() == 1).map(ProductAllResponse::new).collect(Collectors.toList());
    }
    public ProductDetailResponse findByProductId(Long id) {
        return productRepository.findById(id).map(ProductDetailResponse::new).get();
    }
//    public List<ProductAllResponse> findCateProductAll(Long id){
//        return  productRepository.
//    }
}
