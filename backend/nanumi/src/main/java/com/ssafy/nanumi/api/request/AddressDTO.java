package com.ssafy.nanumi.api.request;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class AddressDTO {
    private long address_id;
    private long user_id;

    @Builder
    public AddressDTO(long address_id, long user_id) {
        this.address_id = address_id;
        this.user_id = user_id;
    }
}
