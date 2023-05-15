package com.ssafy.nanumi.db.entity;

import com.ssafy.nanumi.config.entity.BaseTimeEntity;
import lombok.*;

import javax.persistence.*;
@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name="matches")
public class Match extends BaseTimeEntity{

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        @Column(name = "id", nullable = false)
        private long id;

        @Column(name="is_matching", columnDefinition = "TINYINT", nullable = false)
        private boolean isMatching;

        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name="product_id")
        private Product product;

        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name="receiver_id")
        private User user;

        @Builder
        public Match(long id, boolean isMatching, Product product, User user) {
                this.id = id;
                this.isMatching = isMatching;
                this.product = product;
                this.user = user;
        }
}
