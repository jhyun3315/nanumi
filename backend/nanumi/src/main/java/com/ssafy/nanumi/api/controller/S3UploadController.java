package com.ssafy.nanumi.api.controller;

import com.ssafy.nanumi.api.service.S3UploadService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RequiredArgsConstructor
@RestController
public class S3UploadController {
    private final S3UploadService s3UploadService;
    @PostMapping("/upload")
    public ResponseEntity<?> uploadFile1(@RequestParam("images") MultipartFile[] images) throws IOException {
        for(MultipartFile image : images){
            System.out.println("image : " + image);
        }
        return new ResponseEntity<>(s3UploadService.upload1(images), HttpStatus.CREATED);
    }
}
