package com.ssafy.nanumi.common;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SectorDTO {
    private Double BeforeLatitude;

    private Double BeforeLongitude;

    private Double nowLatitude;
    private Double nowLongitude;

    private String MatchingId;

    private String targetLocation;
}
