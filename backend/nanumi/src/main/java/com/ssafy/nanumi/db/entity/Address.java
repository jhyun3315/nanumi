package com.ssafy.nanumi.db.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;


@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name="address")
public class Address {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private long id;

    @Column(name="si", columnDefinition="VARCHAR(20)", nullable = false)
    private String si;

    @Column(name="gugun", columnDefinition="VARCHAR(20)", nullable = false)
    private String guGun;

    @Column(name="dong", columnDefinition="VARCHAR(20)", nullable = false)
    private String dong;

    @Builder
    public Address(long id, String si, String guGun, String dong){
        this.id = id;
        this.si = si;
        this.dong = dong;
        this.guGun = guGun;
    }


}
