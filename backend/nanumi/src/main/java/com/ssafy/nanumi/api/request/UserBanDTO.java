package com.ssafy.nanumi.api.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UserBanDTO {

    private long reporterId;
    private long reportedId;
    private int stopDate;
}
