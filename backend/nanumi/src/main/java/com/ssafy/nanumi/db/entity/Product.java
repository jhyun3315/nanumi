package com.ssafy.nanumi.db.entity;

import com.ssafy.nanumi.config.entity.BaseTimeEntity;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
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
    private boolean isClosed;

    @Column(name = "is_deleted", columnDefinition = "TINYINT", nullable = false)
    private boolean isDeleted;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="address_id")
    private Address address;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="category_id")
    private Category category;

    @OneToMany(mappedBy = "product")
    private List<ProductImage> productImages = new ArrayList<>();

    public void delete(){
        this.isDeleted = true;
    }
    public void close(){
        this.isClosed = true;
    }
    @Builder
    public Product(long id, String name, String content, boolean isClosed, boolean isDeleted, Address address, User user, Category category) {
        this.id = id;
        this.name = name;
        this.content = content;
        this.isClosed = isClosed;
        this.isDeleted = isDeleted;
        this.address = address;
        this.user = user;
        this.category = category;
    }
}
