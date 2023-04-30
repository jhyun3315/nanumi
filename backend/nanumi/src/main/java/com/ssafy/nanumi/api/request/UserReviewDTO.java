package com.ssafy.nanumi.api.request;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class UserReviewDTO {

    private int starPoint;
    private List<Integer> rating;
    private String content;
}
