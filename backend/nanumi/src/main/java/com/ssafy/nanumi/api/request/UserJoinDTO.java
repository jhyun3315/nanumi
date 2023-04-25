package com.ssafy.nanumi.api.request;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
public class UserJoinDTO {

    private String email;
    private String nickname;
    private String password;
    private String profileImage;

    @Builder
    public UserJoinDTO(String email, String nickname, String password, String profileImage) {
        this.email = email;
        this.nickname = nickname;
        this.password = password;
        this.profileImage = profileImage;
    }
}
