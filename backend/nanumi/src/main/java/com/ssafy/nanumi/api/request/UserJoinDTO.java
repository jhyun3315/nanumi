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
    private long address_id;

    @Builder
    public UserJoinDTO(String email, String nickname, String password, String profileImage,long address_id) {
        this.email = email;
        this.nickname = nickname;
        this.password = password;
        this.profileImage = profileImage;
        this.address_id = address_id;
    }
}
