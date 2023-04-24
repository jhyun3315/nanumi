package com.ssafy.nanumi.db.entity;

import com.ssafy.nanumi.config.entity.BaseTimeEntity;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name="product_images")
public class ProductImage{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private long id;

    @Column(name = "image_url", nullable = false)
    private String imageUrl;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="product_id")
    private Product product;

    @Builder
    public ProductImage(long id, String imageUrl, Product product) {
        this.id = id;
        this.imageUrl = imageUrl;
        this.product = product;
    }
}
