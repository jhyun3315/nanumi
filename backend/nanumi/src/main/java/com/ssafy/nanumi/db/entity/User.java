package com.ssafy.nanumi.db.entity;

import com.ssafy.nanumi.config.entity.BaseTimeEntity;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Table(name="users")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class User extends BaseTimeEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id",nullable = false)
    private Long id;

    @Column(name="nickname", columnDefinition="VARCHAR(20)", nullable = false)
    private String nickName;

    @Column(name="profile_url", columnDefinition="VARCHAR(150)", nullable = false)
    private String profileUrl;

    @Column(name ="password", columnDefinition = "VARCHAR(64)", nullable = false)
    private String password;

    @Column(name="is_deleted", columnDefinition = "TINYINT(1)", nullable = false)
    private boolean isDeleted;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="address_id")
    private Address address;

    @Builder
    public User(Long id, String nickName, String profileUrl, String password, boolean isDeleted, Address address) {
        this.id = id;
        this.nickName = nickName;
        this.profileUrl = profileUrl;
        this.password = password;
        this.isDeleted = isDeleted;
        this.address = address;
    }
}
