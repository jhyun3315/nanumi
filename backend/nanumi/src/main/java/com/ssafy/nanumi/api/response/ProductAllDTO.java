package com.ssafy.nanumi.api.response;

import com.ssafy.nanumi.db.entity.Product;

import lombok.Getter;


@Getter
public class ProductAllDTO {
    private final long id;
    private final String name;
    private final String userProfileUrl;
    private final String productImageUrl;
    private final Boolean isClosed;
    private final Boolean isMatched;

    public ProductAllDTO(Product product){
        id = product.getId();
        name = product.getName();
        userProfileUrl = product.getUser().getProfileUrl();
        productImageUrl = product.getProductImages().get(0).getImageUrl();
        isClosed = product.isClosed();
        isMatched = product.isMatched();
    }
}
