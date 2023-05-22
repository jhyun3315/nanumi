package com.ssafy.nanumi.api.request;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ProductInsertDTO {
    private String name;
    private String content;
    private Long categoryId;
}
