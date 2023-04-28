package com.ssafy.nanumi.api.controller;

import com.ssafy.nanumi.api.service.S3UploadService;
import com.ssafy.nanumi.config.response.CustomDataResponse;
import com.ssafy.nanumi.config.response.ResponseService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

import static com.ssafy.nanumi.config.response.exception.CustomSuccessStatus.RESPONSE_SUCCESS;

@RequiredArgsConstructor
@RestController
public class S3UploadController {
    private final S3UploadService s3UploadService;
    private final ResponseService responseService;
    @PostMapping("/upload")
    public CustomDataResponse<List> uploadFile1(@RequestParam("images") MultipartFile[] images) throws IOException {
        for(MultipartFile image : images){
            System.out.println("image : " + image);
        }
        return responseService.getDataResponse(s3UploadService.upload1(images),RESPONSE_SUCCESS);
    }
}
