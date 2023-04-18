package com.ssafy.nanumi.db.entity;

import com.ssafy.nanumi.config.entity.BaseTimeEntity;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
@Entity
@Getter
@Table(name="matches")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Match extends BaseTimeEntity{
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        @Column(name = "id",nullable = false)
        private Long id;

        @Column(name="is_matching", nullable = false)
        private Boolean isMatching;
}
