package com.ssafy.nanumi.api.service;

import com.ssafy.nanumi.api.request.ProductInsertRequest;
import com.ssafy.nanumi.api.response.ProductAllResponse;
import com.ssafy.nanumi.api.response.ProductDetailResponse;
import com.ssafy.nanumi.db.entity.*;
import com.ssafy.nanumi.db.repository.AddressRepository;
import com.ssafy.nanumi.db.repository.CategoryRepository;
import com.ssafy.nanumi.db.repository.ProductImageRepository;
import com.ssafy.nanumi.db.repository.ProductRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@AllArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final AddressRepository addressRepository;
    private final ProductImageRepository productImageRepository;
    public List<ProductAllResponse> findProductAll() {
        return productRepository.findAllByDeletedFalse().stream().filter(product -> product.getAddress().getId() == 1).map(ProductAllResponse::new).collect(Collectors.toList());
    }
    public ProductDetailResponse findByProductId(Long id) {
        return productRepository.findById(id).map(ProductDetailResponse::new).get();
    }
    public List<ProductAllResponse> findCateProductAll(Long id) {
        return productRepository.findAllByDeletedFalse().stream().filter(product -> product.getAddress().getId() == 1 && product.getCategory().getId() == id).map(ProductAllResponse::new).collect(Collectors.toList());
    }
    public ProductDetailResponse createProduct(ProductInsertRequest request, User user){
        Category category = categoryRepository.findById(request.getCategoryId()).get();
        Address address = addressRepository.findById(request.getAddressCode()).get();
        Product product = Product.builder()
                .name(request.getName())
                .content(request.getContent())
                .isClosed(false)
                .deleted(false)
                .user(user)
                .category(category)
                .address(address)
                .build();
        Product createProduct = productRepository.save(product);
        List<String> images = request.getPostImage();
        for (String image : images) {
            ProductImage productImage = ProductImage.builder()
                    .imageUrl(image)
                    .product(createProduct)
                    .build();
            productImageRepository.save(productImage);
        }
        return new ProductDetailResponse(createProduct);
    }
//    public ProductDetailResponse updateProduct(ProductInsertRequest request, Long id) {
//        Product product = productRepository.findById(id).get();
//
//    }
    public ProductDetailResponse deleteProduct(ProductInsertRequest request, Long id){
        Product product = productRepository.findById(id).get();
        product.delete();
        return new ProductDetailResponse(product);
    }
}
