package com.ssafy.nanumi.api.response;

import com.ssafy.nanumi.db.entity.Product;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.Page;

import java.util.List;
@Getter
@NoArgsConstructor
public class ProductSearchResDTO{
    private int totalPage;
    private int currPage;
    private List<ProductAllDTO> content;
@Builder
    public ProductSearchResDTO(List<ProductAllDTO> content, int totalPage, int currPage) {
        this.content = content;
        this.totalPage =totalPage;
        this.currPage = currPage;
    }
}
