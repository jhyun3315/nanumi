package com.ssafy.nanumi.api.response;

import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;


@RequiredArgsConstructor
@Getter
public class MatchResDTO {
    private long userId;
    private String userNickname;
    private String userProfileUrl;
    private long productId;
    private long matchId;
    private String createDate;
    @Builder
    public MatchResDTO(long userId, String userNickname, String userProfileUrl, long productId, long matchId, String createDate) {
        this.userId = userId;
        this.userNickname = userNickname;
        this.userProfileUrl = userProfileUrl;
        this.productId = productId;
        this.matchId = matchId;
        this.createDate = createDate;
    }
}
