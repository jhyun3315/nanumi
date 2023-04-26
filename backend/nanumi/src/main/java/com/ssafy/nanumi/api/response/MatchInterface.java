package com.ssafy.nanumi.api.response;

import java.time.LocalDateTime;

public interface MatchInterface {
    Long getUserId();
    String getCreateDate();
    Long getMatchId();
    Long getProductId();
    String getProfileUrl();

}
