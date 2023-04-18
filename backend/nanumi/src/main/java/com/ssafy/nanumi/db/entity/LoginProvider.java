package com.ssafy.nanumi.db.entity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "login_provider")
public class LoginProvider {

    @Id
    @Column(name = "id")
    private int id;

//    @Enumerated(EnumType.STRING)
    @Column(name = "name")
    private String name; // 나중에 AuthProvider name으로 바꿔야함!
}
