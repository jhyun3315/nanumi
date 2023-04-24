package com.ssafy.nanumi.api.service;

import com.ssafy.nanumi.api.request.ProductInsertDTO;
import com.ssafy.nanumi.api.response.ProductAllDTO;
import com.ssafy.nanumi.api.response.ProductDetailDTO;
import com.ssafy.nanumi.config.response.exception.CustomException;
import com.ssafy.nanumi.config.response.exception.CustomExceptionStatus;
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
    public List<ProductAllDTO> findProductAll(User user) {
        return productRepository.findAllByIsDeletedFalse()
                .stream()
                .filter(product -> product.getAddress().getId() == user.getAddress().getId())
                .map(ProductAllDTO::new)
                .collect(Collectors.toList());
    }
    public ProductDetailDTO findByProductId(Long id) {
        return productRepository.findById(id)
                .map(ProductDetailDTO::new)
                .orElseThrow(()-> new CustomException(CustomExceptionStatus.NOT_FOUND_PRODUCT));
    }
    public List<ProductAllDTO> findCateProductAll(Long id, User user) {
        return productRepository.findAllByIsDeletedFalse()
                .stream()
                .filter(product -> product.getAddress().getId() == user.getAddress().getId() && product.getCategory().getId() == id)
                .map(ProductAllDTO::new).collect(Collectors.toList());
    }
    public void createProduct(ProductInsertDTO request, User user){
        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(()-> new CustomException(CustomExceptionStatus.NOT_FOUND_CATEGORY));
        Address address = user.getAddress();
        Product product = Product.builder()
                .name(request.getName())
                .content(request.getContent())
                .isClosed(false)
                .isDeleted(false)
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
    }
    public void updateProduct(ProductInsertDTO request, Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(()-> new CustomException(CustomExceptionStatus.NOT_FOUND_PRODUCT));
        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(()-> new CustomException(CustomExceptionStatus.NOT_FOUND_CATEGORY));
        product.setName(request.getName());
        product.setContent(request.getContent());
        product.setCategory(category);
    }
    public void deleteProduct(Long id){
        Product product = productRepository.findById(id)
                .orElseThrow(()-> new CustomException(CustomExceptionStatus.NOT_FOUND_PRODUCT));
        product.delete();
    }
}
