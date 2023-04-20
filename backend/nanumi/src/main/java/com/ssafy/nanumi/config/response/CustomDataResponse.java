package com.ssafy.nanumi.config.response;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CustomDataResponse<T> extends CustomResponse {

    public T result;
}
