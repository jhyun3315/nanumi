package com.ssafy.nanumi.api.request;

import lombok.Data;

@Data
public class LocalLoginDTO {
    private String email;
    private String password;
}
