package com.ssafy.nanumi.api.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.ssafy.nanumi.config.response.exception.CustomException;
import com.ssafy.nanumi.config.response.exception.CustomExceptionStatus;
import com.ssafy.nanumi.db.entity.Product;
import com.ssafy.nanumi.db.entity.ProductImage;
import com.ssafy.nanumi.db.repository.ProductImageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Arrays;
import java.util.Objects;
import java.util.UUID;

@Service
@Transactional
@RequiredArgsConstructor
public class S3Service {
    @Value("${cloud.aws.s3.bucket}")
    private String bucket;
    private final AmazonS3 amazonS3;
    private final ProductImageRepository productImageRepository;

    public void imageSave(MultipartFile[] images, Product product) throws IOException {
        for (MultipartFile file : images) {
            checkSupportedformat(file);
            MultipartFile resizeImageFile = resizeImageFile(file);
            String imageString = saveS3Image(resizeImageFile);
            saveDBImage(imageString, product);
        }
    }

    private void checkSupportedformat(MultipartFile file) {
        String originFilename = Objects.requireNonNull(file.getOriginalFilename()).replaceAll(" ", "");
        String formatName = originFilename.substring(originFilename.lastIndexOf(".") + 1).toLowerCase();
        String[] supportFormat = { "jpg", "jpeg", "png" };
        if (!Arrays.asList(supportFormat).contains(formatName)) {
            throw new CustomException(CustomExceptionStatus.NOT_SUPPORTED_FORMAT);
        }
    }
    private String saveS3Image(MultipartFile file) throws IOException {
        String s3FileName = UUID.randomUUID() + "-" + file.getOriginalFilename();
        ObjectMetadata objMeta = new ObjectMetadata();
        objMeta.setContentLength(file.getInputStream().available());
        amazonS3.putObject(bucket, s3FileName, file.getInputStream(), objMeta);
        return amazonS3.getUrl(bucket, s3FileName).toString();
    }
    private void saveDBImage(String imageString,Product product){
        ProductImage productImage = ProductImage.builder()
                .imageUrl(imageString)
                .product(product)
                .build();
        productImageRepository.save(productImage);
    }
    private MultipartFile resizeImageFile(MultipartFile file) throws IOException {
        // 이미지 읽어 오기
        BufferedImage inputImage = ImageIO.read(file.getInputStream());
        // 이미지 세로 가로 측정
        int originWidth = inputImage.getWidth();
        int originHeight = inputImage.getHeight();
        // 변경할 가로 길이
        int newWidth = 500;
        if (originWidth > newWidth) {
            // 기존 이미지 비율을 유지하여 세로 길이 설정
            int newHeight = (originHeight * newWidth) / originWidth;
            Image resizeImage = inputImage.getScaledInstance(newWidth, newHeight, Image.SCALE_FAST);
            BufferedImage newImage = new BufferedImage(newWidth, newHeight, BufferedImage.TYPE_INT_RGB);
            Graphics graphics = newImage.getGraphics();
            graphics.drawImage(resizeImage, 0, 0, null);
            graphics.dispose();
            // 이미지 저장
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            ImageIO.write(newImage, "jpg", baos);
            byte[] bytes = baos.toByteArray();
            MultipartFile resizedFile = new MockMultipartFile("file", bytes);
            return resizedFile;
        } else {
            return file;
        }
    }
}
