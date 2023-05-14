package com.ssafy.nanumi.common;

import lombok.Builder;
import lombok.Getter;

@Getter
public class SearchPageReq {
    int pageSizeForProduct;
    int pageIndex;
    String sortStdForProduct;

    @Builder
    public SearchPageReq(int pageIndex) {
        this.pageSizeForProduct = 6;
        this.pageIndex = pageIndex;
        this.sortStdForProduct = "createDate";
    }
}
