package com.ssafy.nanumi.api.response;

import com.ssafy.nanumi.db.entity.Review;
import lombok.Getter;

@Getter
public class ReviewReadDTO {
    private final String content;
    private final int starPoint;
    private final int rating;
    private final String writerNickname;
    private final String writerProfileUrl;
    public ReviewReadDTO(Review review){
        content = review.getContent();
        starPoint = review.getStarPoint();
        rating = review.getRating();
        writerNickname = review.getWriter().getNickname();
        writerProfileUrl = review.getWriter().getProfileUrl();
    }
}
