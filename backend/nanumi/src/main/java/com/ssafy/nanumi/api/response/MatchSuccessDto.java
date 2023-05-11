package com.ssafy.nanumi.api.response;


import lombok.Builder;
import lombok.Getter;

@Getter
public class MatchSuccessDto {
    private boolean result;
    private String resultMessage;
    private Long matchId;
    @Builder
    public MatchSuccessDto(boolean result, String resultMessage, Long matchId) {
        this.result = result;
        this.resultMessage = resultMessage;
        this.matchId = matchId;
    }
}
