package com.ssafy.nanumi.api.response;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class BlacklistDTO {

    private long id;
    private String nickname;
    private String profileUrl;

    @Builder
    public BlacklistDTO(long id, String nickname, String profileUrl) {
        this.id = id;
        this.nickname = nickname;
        this.profileUrl = profileUrl;
    }
}
