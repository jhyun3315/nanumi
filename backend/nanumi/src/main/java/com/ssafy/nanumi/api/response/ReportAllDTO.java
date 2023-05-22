package com.ssafy.nanumi.api.response;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@NoArgsConstructor
public class ReportAllDTO {

    private long id;
    private long reporterId;
    private ReportedUserDTO reported;
    private String content;
    private boolean status;
    private int reportedCount;
    private int stopDate;
    private String reportDate; // 신고한 날짜

    @Builder
    public ReportAllDTO(long id, long reporterId, ReportedUserDTO reported, String content, boolean status, int reportedCount, int stopDate, String reportDate) {
        this.id = id;
        this.reporterId = reporterId;
        this.reported = reported;
        this.content = content;
        this.status = status;
        this.reportedCount = reportedCount;
        this.stopDate = stopDate;
        this.reportDate = reportDate;
    }
}
