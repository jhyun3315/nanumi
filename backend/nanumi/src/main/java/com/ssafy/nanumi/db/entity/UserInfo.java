package com.ssafy.nanumi.db.entity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

@Getter
@Entity
@Table(name="user_info")
@DynamicUpdate
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class UserInfo {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private long id;

    @OneToOne
    @Column(name = "user_id")
    private User user;

    @ColumnDefault("0")
    @Column(name = "star_point")
    private double starPoint;

    @ColumnDefault("0")
    @Column(name="rating", columnDefinition="DECIMAL(2,1)", nullable = false)
    private double rating;

    @ColumnDefault("브론즈")
    @Column(name="tier", columnDefinition="VARCHAR(5)", nullable = false)
    private String tier;

    @ColumnDefault("0")
    @Column(name="temperature", columnDefinition="DECIMAL(4,1)", nullable = false)
    private double temperature;

    @ColumnDefault("0")
    @Column(name="visit_counts", columnDefinition="INT", nullable = false)
    private long visitCount;

    @ColumnDefault("0")
    @Column(name = "give_count", columnDefinition = "INT", nullable = false)
    private long giveCount;

    @ColumnDefault("0")
    @Column(name="given_count", columnDefinition="INT", nullable = false)
    private long givenCount;

    @ColumnDefault("0")
    @Column(name = "reported_total_count")
    private long reportedTotalCount;
}
