package com.ssafy.nanumi.api.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class AdminLoginDTO {

    private String email;
    private String password;
}
