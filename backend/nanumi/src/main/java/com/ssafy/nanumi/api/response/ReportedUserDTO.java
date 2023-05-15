package com.ssafy.nanumi.api.response;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ReportedUserDTO {

    private long id;
    private String nickname;
    private String profile_url;
    private String si;
    private String gugun;
    private String dong;

    @Builder
    public ReportedUserDTO(long id, String nickname, String profile_url, String si, String gugun, String dong) {
        this.id = id;
        this.nickname = nickname;
        this.profile_url = profile_url;
        this.si = si;
        this.gugun = gugun;
        this.dong = dong;
    }
}
