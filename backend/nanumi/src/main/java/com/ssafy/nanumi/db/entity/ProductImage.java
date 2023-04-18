package com.ssafy.nanumi.db.entity;

import com.ssafy.nanumi.config.entity.BaseTimeEntity;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@Table(name="product_images")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ProductImage extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id",nullable = false)
    private Long id;

    @Column(name = "image_url", nullable = false)
    private String imageUrl;
}
