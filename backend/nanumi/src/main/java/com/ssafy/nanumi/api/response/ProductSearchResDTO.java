package com.ssafy.nanumi.api.response;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;
@Getter
@NoArgsConstructor
public class ProductSearchResDTO{
    private int totalPage;
    private int currPage;
    private boolean isFirstPage;
    private boolean isLastPage;
    private List<ProductAllDTO> content;
@Builder
    public ProductSearchResDTO(List<ProductAllDTO> content, int totalPage, int currPage) {
        this.content = content;
        this.totalPage =totalPage;
        this.currPage = currPage;
        this.isFirstPage =  (currPage == 0);
        this.isLastPage = (totalPage == currPage);
    }
}
