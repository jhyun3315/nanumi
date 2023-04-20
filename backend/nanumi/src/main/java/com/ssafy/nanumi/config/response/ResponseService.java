package com.ssafy.nanumi.config.response;

import com.ssafy.nanumi.config.response.exception.CustomExceptionStatus;
import com.ssafy.nanumi.config.response.exception.CustomSuccessStatus;
import org.springframework.stereotype.Service;

@Service
public class ResponseService {

    public CustomResponse getSuccessResponse() {
        return CustomResponse.builder()
                .isSuccess(true)
                .code(200)
                .message("요청에 성공했습니다.")
                .build();
    }

    public <T> CustomDataResponse<T> getDataResponse(T data, CustomSuccessStatus status) {
        CustomDataResponse<T> response = new CustomDataResponse<>();

        response.setSuccess(status.isSuccess());
        response.setCode(status.getCode());
        response.setMessage(status.getMessage());
        response.setResult(data);

        return response;
    }

    public CustomResponse getExceptionResponse(CustomExceptionStatus status) {
        return CustomResponse.builder()
                .isSuccess(status.isSuccess())
                .code(status.getCode())
                .message(status.getMessage())
                .build();
    }
}
