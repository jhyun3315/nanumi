package com.ssafy.nanumi.db.entity;

import com.ssafy.nanumi.config.entity.BaseTimeEntity;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@Table(name="users")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class User extends BaseTimeEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id",nullable = false)
    private long id;

    @Column(name="nickname", columnDefinition="VARCHAR(20)", nullable = false)
    private String nickname;

    @Column(name="profile_url", columnDefinition="VARCHAR(150)", nullable = false)
    private String profileUrl;

    @Column(name ="password", columnDefinition = "VARCHAR(64)", nullable = false)
    private String password;

    @Column(name="is_deleted", columnDefinition = "TINYINT(1)", nullable = false)
    private boolean isDeleted;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="address_id")
    private Address address;

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="login_provider")
    private LoginProvider loginProvider;

    @Builder
    public User(Long id, String nickname, String profileUrl, String password, boolean isDeleted, Address address, LoginProvider loginProvider) {
        this.id = id;
        this.nickname = nickname;
        this.profileUrl = profileUrl;
        this.password = password;
        this.isDeleted = isDeleted;
        this.address = address;
        this.loginProvider = loginProvider;
    }
}
