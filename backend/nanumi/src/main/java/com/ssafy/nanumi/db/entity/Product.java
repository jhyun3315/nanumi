package com.ssafy.nanumi.db.entity;

import com.ssafy.nanumi.config.entity.BaseTimeEntity;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@Table(name="products")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Product extends BaseTimeEntity {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id", nullable = false)
    private long id;

    @Column(name="name", columnDefinition = "VARCHAR(10)", nullable = false)
    private String name;

    @Column(name="content", columnDefinition = "TEXT", nullable = false)
    private String content;

    @Column(name="is_closed", columnDefinition = "TINYINT", nullable = false)
    private boolean is_closed;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="address_id")
    private Address address;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="category_id")
    private Category category;

    @Builder
    public Product(long id, String name, String content, boolean is_closed, Address address, User user, Category category) {
        this.id = id;
        this.name = name;
        this.content = content;
        this.is_closed = is_closed;
        this.address = address;
        this.user = user;
        this.category = category;
    }

}
