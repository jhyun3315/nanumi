package com.ssafy.nanumi.api.request;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class AddressDTO {
    private long addressId;

    @Builder
    public AddressDTO(long addressId) {
        this.addressId = addressId;
    }
}
