package com.ssafy.nanumi.db.entity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name="categories")
public class Category {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private long id;

    @Column(name="name", columnDefinition="VARCHAR(20)", nullable = false)
    private String name;

    @Column(name="image_url", columnDefinition="VARCHAR(150)", nullable = false)
    private String imageUrl;
}
