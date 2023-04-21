package com.ssafy.nanumi.api.response;

import com.ssafy.nanumi.db.entity.Product;
import jdk.jfr.Category;
import lombok.Builder;

import java.util.List;
import java.util.stream.Collectors;

public class ProductDetailResponse {
    private final Long id;
    private final String name;
    private final String content;
    private final  boolean isClosed;
    private final Long categoryId;
    private final String categoryName;
    private final List<String> productImageUrls;
    private final Long userId;
    private final String userNickname;
    private final String userProfileUrl;


    public ProductDetailResponse(Product product){
        id = product.getId();
        name = product.getName();
        content = product.getContent();
        isClosed = product.isClosed();
        categoryId = product.getCategory().getId();
        categoryName = product.getCategory().getName();
        productImageUrls = product.getProductImages().stream().map(h->h.getImageUrl()).collect(Collectors.toList());
        userId = product.getId();
        userNickname = product.getUser().getNickname();
        userProfileUrl= product.getUser().getProfileUrl();
    }
}
