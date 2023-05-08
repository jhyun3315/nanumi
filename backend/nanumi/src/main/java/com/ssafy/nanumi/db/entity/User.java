package com.ssafy.nanumi.db.entity;

import com.ssafy.nanumi.config.entity.BaseTimeEntity;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Table(name="users")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class User extends BaseTimeEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private long id;

    @Column(name = "email", columnDefinition = "VARCHAR(50)", nullable = false)
    private String email;

    @Column(name="nickname", columnDefinition="VARCHAR(20)", nullable = false)
    private String nickname;

    @Column(name="profile_url", columnDefinition="VARCHAR(150)")
    private String profileUrl;

    @Column(name ="password", columnDefinition = "VARCHAR(64)", nullable = false)
    private String password;

    @Column(name="fcm_token", columnDefinition="VARCHAR(255)")
    private String fcmToken;

    @ColumnDefault("0")
    @Column(name="is_deleted", columnDefinition = "TINYINT", nullable = false)
    private boolean isDeleted;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="address_id")
    private Address address;

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="login_provider")
    private LoginProvider loginProvider;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_info_id", referencedColumnName = "id")
    private UserInfo userInfo;

    @OneToMany(mappedBy = "receiver")
    private List<Review> reviews = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<Product> products = new ArrayList<>();

    public void delete(){
        this.isDeleted = true;
    }
    @Builder
    public User(long id, String email, String nickname, String profileUrl, String password, boolean isDeleted, Address address, LoginProvider loginProvider, UserInfo userInfo) {
        this.id = id;
        this.email = email;
        this.nickname = nickname;
        this.profileUrl = profileUrl;
        this.password = password;
        this.isDeleted = isDeleted;
        this.address = address;
        this.loginProvider = loginProvider;
        this.userInfo = userInfo;
    }

    public void updateAddress(Address address){
        this.address = address;
    }
    public void updateUserInfo(String nickname, String profileUrl){
        this.profileUrl = profileUrl;
        this.nickname = nickname;
    }
}
