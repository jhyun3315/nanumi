package com.ssafy.nanumi.api.response;

import com.ssafy.nanumi.db.entity.Product;
import lombok.Getter;

import java.util.List;
import java.util.stream.Collectors;
@Getter
public class ProductDetailDTO {
    private final long id;
    private final String name;
    private final String content;
    private final  boolean isClosed;
    private final  boolean isMatched;
    private final Long categoryId;
    private final String categoryName;
    private final List<String> productImageUrls;
    private final Long userId;
    private final String userNickname;
    private final String userProfileUrl;

    //private final

    public ProductDetailDTO(Product product){
        id = product.getId();
        name = product.getName();
        content = product.getContent();
        isClosed = product.isClosed();
        isMatched  = product.isMatched();
        categoryId = product.getCategory().getId();
        categoryName = product.getCategory().getName();
        productImageUrls = product.getProductImages().stream().map(h->h.getImageUrl()).collect(Collectors.toList());
        userId = product.getUser().getId();
        userNickname = product.getUser().getNickname();
        userProfileUrl= product.getUser().getProfileUrl();
    }
}
