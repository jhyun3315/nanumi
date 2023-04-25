package com.ssafy.nanumi.api.response;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class ReportAllDTO {

    private long id;
    private long reporterId;
    private long reportedId;
    private String content;
    private boolean status;
    private int stopDate;
    private String reportDate; // 신고한 날짜

    @Builder
    public ReportAllDTO(long id, long reporterId, long reportedId, String content, boolean status, int stopDate, String reportDate) {
        this.id = id;
        this.reporterId = reporterId;
        this.reportedId = reportedId;
        this.content = content;
        this.status = status;
        this.stopDate = stopDate;
        this.reportDate = reportDate;
    }
}
