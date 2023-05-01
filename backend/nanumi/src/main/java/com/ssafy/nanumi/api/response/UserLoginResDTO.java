package com.ssafy.nanumi.api.response;

import com.ssafy.nanumi.db.entity.Address;
import com.ssafy.nanumi.db.entity.User;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class UserLoginResDTO {
    private long userId;
    private String nickname;
    private String tier;
    private String userProfileUrl;
    private long addressId;
    private String si;
    private String gugun;
    private String dong;


    @Builder
    public UserLoginResDTO(User user) {
        Address address = user.getAddress();
        this.userId = user.getId();
        this.nickname = user.getNickname();
        this.tier = user.getUserInfo().getTier();
        this.userProfileUrl = user.getProfileUrl();
        this.addressId = address.getId();
        this.si = address.getSi();
        this.gugun = address.getGuGun();
        this.dong = address.getDong();
    }
}
