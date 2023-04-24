package com.ssafy.nanumi.api.response;

import com.ssafy.nanumi.db.entity.Address;
import com.ssafy.nanumi.db.entity.User;
import com.ssafy.nanumi.db.entity.UserInfo;
import lombok.Getter;

@Getter
public class UserReadDTO {
    private final long id;
    private final String email;
    private final String nickname;
    private final String profileUrl;
    private final String address;

    /* 나눔 한 물건 개수 */
    private final int giveCount;

    /* 나눔 중인 물건 개수 */
    private final Long givingCount;

    /* 나눔 받은 물건 개수 */
    private final int givenCount;

    public UserReadDTO(User user){
        id = user.getId();
        email = user.getEmail();
        nickname = user.getNickname();
        profileUrl = user.getProfileUrl();
        address = user.getAddress().getSi() + user.getAddress().getGuGun() + user.getAddress().getDong();
        giveCount = user.getUserInfo().getGiveCount();
        givenCount = user.getUserInfo().getGivenCount();
        givingCount = user.getProducts()
                .stream()
                .filter(product -> !product.isDeleted() && !product.isClosed())
                .count();
    }
}
