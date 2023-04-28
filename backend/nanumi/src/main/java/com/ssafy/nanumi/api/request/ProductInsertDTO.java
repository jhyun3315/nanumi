package com.ssafy.nanumi.api.request;


import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
public class ProductInsertDTO {
    private String name;
    private String content;
    private List<String> postImage;
    private Long categoryId;
    private Long addressCode;
}
