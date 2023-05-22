package com.ssafy.nanumi.api.response;

import com.ssafy.nanumi.db.entity.User;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class AdminLoginResDTO {

    private String email;
    private String access_token;
    private String refresh_token;

    @Builder
    public AdminLoginResDTO(User adminUser, String access_token, String refresh_token) {
        this.email = adminUser.getEmail();
        this.access_token = access_token;
        this.refresh_token = refresh_token;
    }
}
