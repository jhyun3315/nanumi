package com.ssafy.nanumi.config.response.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class CustomException extends RuntimeException {

    CustomExceptionStatus customExceptionStatus;
}
