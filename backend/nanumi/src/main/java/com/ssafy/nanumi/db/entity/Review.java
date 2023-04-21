package com.ssafy.nanumi.db.entity;

import com.ssafy.nanumi.config.entity.BaseTimeEntity;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name="reviews")
public class Review extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private long id;

    @Column(name="content", columnDefinition = "TEXT", nullable = false)
    private String content;

    @Column(name = "star_point", nullable = false)
    private int starPoint;

    @Column(name = "rating", nullable = false)
    private int rating;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="writer_id")
    private User writer;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="receiver_id")
    private User receiver;

    @OneToOne
    @JoinColumn(name = "match_id")
    private Match match;

    @Builder
    public Review(long id, String content, int starPoint, int rating, User writer, User receiver, Match match) {
        this.id = id;
        this.content = content;
        this.starPoint = starPoint;
        this.rating = rating;
        this.writer = writer;
        this.receiver = receiver;
        this.match = match;
    }
}
