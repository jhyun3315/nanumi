package com.ssafy.nanumi.api.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.ssafy.nanumi.api.response.ProductAllDTO;
import com.ssafy.nanumi.api.response.ProductDetailDTO;
import com.ssafy.nanumi.config.response.exception.CustomException;
import com.ssafy.nanumi.config.response.exception.CustomExceptionStatus;
import com.ssafy.nanumi.db.entity.*;
import com.ssafy.nanumi.db.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.*;

import static com.ssafy.nanumi.config.response.exception.CustomExceptionStatus.*;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final AddressRepository addressRepository;
    private final ProductImageRepository productImageRepository;
    private final MatchRepository matchRepository;
    private final UserRepository userRepository;
    private final UserInfoRepository userInfoRepository;
    private final BlacklistRepository blacklistRepository;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;
    private final AmazonS3 amazonS3;

    public Page<ProductAllDTO> searchProductByWords(long userId, String words, PageRequest pageRequest){
        User user = userRepository.findById(userId).orElseThrow(() ->  new CustomException(NOT_FOUND_USER));
        Address address = addressRepository.findById(user.getAddress().getId()).orElseThrow( () ->  new CustomException(NOT_FOUND_ADDRESS_CODE));

        // 차단자 조회
        List<Long> blockers = blacklistRepository.findBlockerId(user.getId());
        blockers.add(0L);

        // 차단대상자 조회
        List<Long> targets = blacklistRepository.findTargetId(user.getId());
        targets.add(0L);

        return productRepository.searchAll(address.getId(), blockers, targets, words, pageRequest);
    }

    public Page<ProductAllDTO> findProductAll(long userId, PageRequest pageRequest) {
        User user = userRepository.findById(userId)
                .orElseThrow(()-> new CustomException(CustomExceptionStatus.NOT_FOUND_USER));

        Long addressId = user.getAddress().getId();

        // 차단자 조회
        List<Long> blockers = blacklistRepository.findBlockerId(user.getId());
        blockers.add(0L);

        // 차단대상자 조회
        List<Long> targets = blacklistRepository.findTargetId(user.getId());
        targets.add(0L);

        return productRepository.findAllProduct(addressId, blockers, targets, pageRequest);
    }

    public ProductDetailDTO findByProductId(Long productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(()-> new CustomException(CustomExceptionStatus.NOT_FOUND_PRODUCT));
        if (product.isDeleted()) {
            throw new CustomException(CustomExceptionStatus.NOT_FOUND_PRODUCT);
        }
        return new ProductDetailDTO(product);
    }

    public Page<ProductAllDTO> findCateProductAll(Long categoryId, long userId, Pageable pageRequest) {
        User user = userRepository.findById(userId)
                .orElseThrow(()-> new CustomException(CustomExceptionStatus.NOT_FOUND_USER));

        categoryRepository.findById(categoryId)
                .orElseThrow(() -> new CustomException(CustomExceptionStatus.NOT_FOUND_CATEGORY));

        Long addressId = user.getAddress().getId();

        // 차단자 조회
        List<Long> blockers = blacklistRepository.findBlockerId(user.getId());
        blockers.add(0L);

        // 차단대상자 조회
        List<Long> targets = blacklistRepository.findTargetId(user.getId());
        targets.add(0L);

        return productRepository.findAllCategoryProduct(addressId,categoryId, blockers, targets, pageRequest);
}

    public void createProduct(MultipartFile[] images,String name,String content,Long categoryId, User user) throws IOException {
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(()-> new CustomException(CustomExceptionStatus.NOT_FOUND_CATEGORY));
        Address address = user.getAddress();
        Product product = Product.builder()
                .name(name)
                .content(content)
                .isClosed(false)
                .isDeleted(false)
                .user(user)
                .category(category)
                .address(address)
                .build();
        Product createProduct = productRepository.save(product);

        for(MultipartFile file : images) {
            String s3FileName = UUID.randomUUID() + "-" + file.getOriginalFilename();
            ObjectMetadata objMeta = new ObjectMetadata();
            objMeta.setContentLength(file.getInputStream().available());
            amazonS3.putObject(bucket, s3FileName, file.getInputStream(), objMeta);
            String imageString = amazonS3.getUrl(bucket, s3FileName).toString();
            ProductImage productImage = ProductImage.builder()
                    .imageUrl(imageString)
                    .product(createProduct)
                    .build();
            productImageRepository.save(productImage);
        }
    }

    public void updateProduct(Long productId,
                              MultipartFile[] images,
                              String name,
                              String content,
                              Long categoryId) throws IOException {
        Product product = productRepository.findById(productId)
                .orElseThrow(()-> new CustomException(CustomExceptionStatus.NOT_FOUND_PRODUCT));
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(()-> new CustomException(CustomExceptionStatus.NOT_FOUND_CATEGORY));

        List<ProductImage> beforeImages = product.getProductImages();
        productImageRepository.deleteAll(beforeImages);

        for(MultipartFile file : images) {
            String s3FileName = UUID.randomUUID() + "-" + file.getOriginalFilename();
            ObjectMetadata objMeta = new ObjectMetadata();
            objMeta.setContentLength(file.getInputStream().available());
            amazonS3.putObject(bucket, s3FileName, file.getInputStream(), objMeta);
            String imageString = amazonS3.getUrl(bucket, s3FileName).toString();
            ProductImage productImage = ProductImage.builder()
                    .imageUrl(imageString)
                    .product(product)
                    .build();
            productImageRepository.save(productImage);
        }
        product.setName(name);
        product.setContent(content);
        product.setCategory(category);

    }
    public void deleteProduct(Long productId){
        Product product = productRepository.findById(productId)
                .orElseThrow(()-> new CustomException(CustomExceptionStatus.NOT_FOUND_PRODUCT));
        product.delete();
    }

}
