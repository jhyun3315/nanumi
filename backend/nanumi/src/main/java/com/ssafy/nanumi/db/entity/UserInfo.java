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
@DynamicUpdate
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name="user_info")
public class UserInfo {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private long id;

    @ColumnDefault("0")
    @Column(name = "star_point", columnDefinition = "DOUBLE", nullable = false)
    private double starPoint;

    @ColumnDefault("0")
    @Column(name = "rating", columnDefinition = "DOUBLE", nullable = false)
    private double rating;

    @ColumnDefault("'브론즈'")
    @Column(name = "tier", columnDefinition = "VARCHAR(20)", nullable = false)
    private String tier;

    @ColumnDefault("0")
    @Column(name = "temperature", columnDefinition = "DOUBLE", nullable = false)
    private double temperature;

    @ColumnDefault("0")
    @Column(name = "visit_count", columnDefinition = "BIGINT", nullable = false)
    private long visitCount;

    @ColumnDefault("0")
    @Column(name = "give_count", columnDefinition = "INT", nullable = false)
    private int giveCount;

    @ColumnDefault("0")
    @Column(name = "given_count", columnDefinition = "INT", nullable = false)
    private int givenCount;

    @ColumnDefault("0")
    @Column(name = "reported_total_count", columnDefinition = "INT")
    private int reportedTotalCount;

    @Column(name = "stop_date")
    private LocalDateTime stopDate;

    @Column(name = "refresh_token", columnDefinition = "VARCHAR(255)")
    private String refreshToken;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Builder
    public UserInfo(long id, double starPoint, double rating, String tier, double temperature, long visitCount, int giveCount, int givenCount, int reportedTotalCount, LocalDateTime stopDate, String refreshToken, User user) {
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
