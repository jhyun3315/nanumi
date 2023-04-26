package com.ssafy.nanumi.db.entity;

import com.ssafy.nanumi.config.entity.BaseTimeEntity;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

@Getter
@Entity
@DynamicUpdate
@DynamicInsert
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "reports")
public class Report extends BaseTimeEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private long id;

    @Column(name = "content", columnDefinition = "TEXT", nullable = false)
    private String content;

    @Column(name = "status", columnDefinition = "TINYINT", nullable = false)
    private boolean status;

    @ColumnDefault("0")
    @Column(name = "stop_date", columnDefinition = "INT", nullable = false)
    private int stopDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "reporter_id")
    private User reporter;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "reported_id")
    private User reported;

    @Builder
    public Report(long id, String content, boolean status, int stopDate, User reporter, User reported) {
        this.id = id;
        this.content = content;
        this.status = status;
        this.stopDate = stopDate;
        this.reporter = reporter;
        this.reported = reported;
    }

    public void updateStatus(int stopDate) {
        this.status = true;
        this.stopDate = stopDate;
    }
}

