package com.ssafy.nanumi.db.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Entity
@Table(name="user_info")
@DynamicUpdate
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class UserInfo {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private long id;

    @ColumnDefault("0")
    @Column(name = "star_point")
    private double starPoint;

    @ColumnDefault("0")
    @Column(name="rating", nullable = false)
    private double rating;

    @ColumnDefault("브론즈")
    @Column(name="tier", nullable = false)
    private String tier;

    @ColumnDefault("0")
    @Column(name="temperature", nullable = false)
    private double temperature;

    @ColumnDefault("0")
    @Column(name="visit_count", nullable = false)
    private long visitCount;

    @ColumnDefault("0")
    @Column(name = "give_count", nullable = false)
    private long giveCount;

    @ColumnDefault("0")
    @Column(name="given_count", nullable = false)
    private long givenCount;

    @ColumnDefault("0")
    @Column(name = "reported_total_count")
    private long reportedTotalCount;

    @Column(name = "stop_date")
    private LocalDateTime stopDate;

    @Column(name = "refresh_token ")
    private String refreshToken;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Builder
    public UserInfo(long id, double starPoint, double rating, String tier, double temperature, long visitCount, long giveCount, long givenCount, long reportedTotalCount, LocalDateTime stopDate, String refreshToken, User user) {
        this.id = id;
        this.starPoint = starPoint;
        this.rating = rating;
        this.tier = tier;
        this.temperature = temperature;
        this.visitCount = visitCount;
        this.giveCount = giveCount;
        this.givenCount = givenCount;
        this.reportedTotalCount = reportedTotalCount;
        this.stopDate = stopDate;
        this.refreshToken = refreshToken;
        this.user = user;
    }
}
