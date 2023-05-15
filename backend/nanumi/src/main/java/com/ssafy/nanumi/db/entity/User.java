package com.ssafy.nanumi.db.entity;

import com.ssafy.nanumi.config.entity.BaseTimeEntity;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Builder
@Getter
@Setter
@Table(name="users")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
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

    @ColumnDefault("0")
    @Column(name="is_deleted", columnDefinition = "TINYINT", nullable = false)
    private boolean isDeleted;

    @OneToMany(mappedBy = "user", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @Builder.Default
    private List<Authority> tiers = new ArrayList<>();

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

    @Column(name = "fcm_token", columnDefinition = "VARCHAR(255)")
    private String fcmToken;

    public void delete(){
        this.isDeleted = true;
    }

    @Builder
    public User(long id, String email, String nickname, String profileUrl,String fcmToken, String password, boolean isDeleted, Address address, LoginProvider loginProvider, UserInfo userInfo) {
        this.id = id;
        this.email = email;
        this.nickname = nickname;
        this.profileUrl = profileUrl;
        this.password = password;
        this.isDeleted = isDeleted;
        this.address = address;
        this.loginProvider = loginProvider;
        this.userInfo = userInfo;
        this.fcmToken = fcmToken;

    }

    public void updateAddress(Address address){
        this.address = address;
    }
    public void updateUserInfo(String nickname, String profileUrl){
        this.profileUrl = profileUrl;
        this.nickname = nickname;
    }

    public void setRoles(List<Authority> tier) {
        this.tiers = tier;
        tier.forEach(o -> o.setUser(this));
    }

    public String getProfileUrl() {
        return profileUrl;
    }

    public void updateFcmToken(String fcmToken) { this.fcmToken = fcmToken; }

}
