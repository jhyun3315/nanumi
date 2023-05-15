package com.ssafy.nanumi.api.response;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UserDetailDTO {

    private long id;
    private String nickname;
    private String profileUrl;
    private boolean isDeleted;
    private int giveCount;
    private long givingCount;
    private int givenCount;
    private String tier;
    private double temperature;

    @Builder
    public UserDetailDTO(long id, String nickname, String profileUrl, boolean isDeleted, int giveCount, long givingCount, int givenCount, String tier, double temperature) {
        this.id = id;
        this.nickname = nickname;
        this.profileUrl = profileUrl;
        this.isDeleted = isDeleted;
        this.giveCount = giveCount;
        this.givingCount = givingCount;
        this.givenCount = givenCount;
        this.tier = tier;
        this.temperature = temperature;
    }
}
