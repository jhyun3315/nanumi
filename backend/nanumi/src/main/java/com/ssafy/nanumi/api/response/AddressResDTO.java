package com.ssafy.nanumi.api.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class AddressResDTO {
    @JsonProperty("address_id")
    private long addressId;
    @JsonProperty("address_name")
    private String addressName;

    @Builder
    public AddressResDTO(long addressId, String addressName) {
        this.addressId = addressId;
        this.addressName = addressName;
    }
}
