package com.ssafy.nanumi.config.response;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

@Getter
@Setter
@NoArgsConstructor
public class CustomDataResponse<T> extends CustomResponse {

    public T result;
}
