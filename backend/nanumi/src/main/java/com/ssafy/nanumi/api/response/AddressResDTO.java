package com.ssafy.nanumi.api.response;

import com.ssafy.nanumi.db.entity.Address;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class AddressResDTO {
    private long addressId;
    private String si;
    private String gugun;
    private String dong;

    public AddressResDTO(Address address) {
        this.addressId = address.getId();
        this.si = address.getSi();
        this.gugun = address.getGuGun();
        this.dong = address.getDong();
    }
}
