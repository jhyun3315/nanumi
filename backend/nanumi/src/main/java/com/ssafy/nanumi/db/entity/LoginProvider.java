package com.ssafy.nanumi.db.entity;

import com.ssafy.nanumi.common.provider.Provider;
import lombok.AccessLevel;
import lombok.Builder;
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

    @Enumerated(EnumType.STRING)
    @Column(name = "name")
    private Provider provider;

    @Builder
    public LoginProvider(int id, Provider provider) {
        this.id = id;
        this.provider = provider;
    }
}
