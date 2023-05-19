package com.ssafy.nanumi.config.response;

import com.ssafy.nanumi.config.response.exception.CustomExceptionStatus;
import com.ssafy.nanumi.config.response.exception.CustomSuccessStatus;
import org.springframework.stereotype.Service;

@Service
public class ResponseService {

    /* 요청 성공 응답 - 응답 데이터가 없는 경우 */
    public CustomResponse getSuccessResponse() {
        return CustomResponse.builder()
                .isSuccess(true)
                .code(200)
                .message("요청에 성공했습니다.")
                .build();
    }

    /* 요청 응답 - 응답 데이터가 있는 경우 */
    public <T> CustomDataResponse<T> getDataResponse(T data, CustomSuccessStatus status) {
        CustomDataResponse<T> response = new CustomDataResponse<>();

        response.setSuccess(status.isSuccess());
        response.setCode(status.getCode());
        response.setMessage(status.getMessage());
        response.setResult(data);

        return response;
    }

    /* 예외 응답 */
    public CustomResponse getExceptionResponse(CustomExceptionStatus status) {
        return CustomResponse.builder()
                .isSuccess(status.isSuccess())
                .code(status.getCode())
                .message(status.getMessage())
                .build();
    }

}
