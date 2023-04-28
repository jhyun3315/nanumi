package com.ssafy.nanumi.api.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@Service
@Transactional
public class S3UploadService {
    @Value("${cloud.aws.s3.bucket}")
    private String bucket;
    private final AmazonS3 amazonS3;
    public List<String> upload1(MultipartFile[] list) throws IOException {

        List<String> urls = new ArrayList<>();

        for(MultipartFile file : list) {
            String s3FileName = UUID.randomUUID() + "-" + file.getOriginalFilename();

            ObjectMetadata objMeta = new ObjectMetadata();
            objMeta.setContentLength(file.getInputStream().available());

            amazonS3.putObject(bucket, s3FileName, file.getInputStream(), objMeta);

            urls.add(amazonS3.getUrl(bucket, s3FileName).toString());
        }
        return urls;
    }
}

