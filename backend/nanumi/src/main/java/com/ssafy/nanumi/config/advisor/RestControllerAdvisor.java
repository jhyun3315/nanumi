package com.ssafy.nanumi.config.advisor;

import com.ssafy.nanumi.config.response.CustomResponse;
import com.ssafy.nanumi.config.response.ResponseService;
import com.ssafy.nanumi.config.response.exception.CustomException;
import com.ssafy.nanumi.config.response.exception.CustomExceptionStatus;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Slf4j
@Getter
@RequiredArgsConstructor
@RestControllerAdvice
public class RestControllerAdvisor {

    private final ResponseService responseService;

    /* 커스텀 예외 처리 */
    @ExceptionHandler
    public CustomResponse exceptionHandler(CustomException e) {
        CustomExceptionStatus status = e.getCustomExceptionStatus();

        log.warn("[ CustomException - " + LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss")) + " ] : " + status.getMessage());

        return responseService.getExceptionResponse(status);
    }

    /* 커스텀 예외로 처리되지 않은 모든 런타임 예외 처리 */
    @ExceptionHandler
    public CustomResponse exceptionHandler(RuntimeException e) {
        log.error("[ CustomException - " + LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss")) + " ] : " + e.getMessage());

        return  CustomResponse.builder()
                .isSuccess(false)
                .code(400)
                .message(e.getMessage())
                .build();
    }
}
