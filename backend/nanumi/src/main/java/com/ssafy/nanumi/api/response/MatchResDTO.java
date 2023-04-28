package com.ssafy.nanumi.api.response;

import com.ssafy.nanumi.db.entity.User;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;

@RequiredArgsConstructor
@Getter
public class MatchResDTO {
    private long user_id;
    private String user_profile;
    private long product_id;
    private long match_id;
    private String create_date;
    @Builder
    public MatchResDTO(long user_id, String profile_url, long product_id, long match_id,  String create_date) {
        this.user_id = user_id;
        this.user_profile = profile_url;
        this.product_id = product_id;
        this.match_id = match_id;
        this.create_date = create_date;

    }
}
