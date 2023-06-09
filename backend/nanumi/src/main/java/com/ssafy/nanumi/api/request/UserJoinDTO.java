package com.ssafy.nanumi.api.request;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
public class UserJoinDTO {

    private String email;
    private String nickname;
    private String password;
    private long addressId;
    private String profileUrl;

    @Builder
    public UserJoinDTO(String email, String nickname, String password, long addressId, String profileUrl) {
        this.email = email;
        this.nickname = nickname;
        this.password = password;
        this.addressId = addressId;
        this.profileUrl = profileUrl;
    }

    private void updateUserProfile(String imageUrl){
        this.profileUrl = imageUrl;
    }
}
