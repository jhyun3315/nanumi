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
    private long addressCode;

    @Builder
    public UserJoinDTO(String email, String nickname, String password, String profileImage,long addressCode) {
        this.email = email;
        this.nickname = nickname;
        this.password = password;
        this.profileImage = profileImage;
        this.addressCode = addressCode;
    }
}
