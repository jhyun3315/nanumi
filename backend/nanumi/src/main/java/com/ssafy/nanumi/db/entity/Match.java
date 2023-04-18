package com.ssafy.nanumi.db.entity;

import com.ssafy.nanumi.config.entity.BaseTimeEntity;
import lombok.AccessLevel;
import lombok.Builder;
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
        private long id;

        @Column(name="is_matching", nullable = false)
        private Boolean isMatching;

        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name="product_id")
        private Product product;

        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name="receiver_id")
        private User user;

        @Builder
        public Match(long id, Boolean isMatching, Product product, User user) {
                this.id = id;
                this.isMatching = isMatching;
                this.product = product;
                this.user = user;
        }
}
