package com.ssafy.nanumi.common;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class LocationDTO {
    private double latitude;
    private double longitude;
    private double targetLatitude;
    private double targetLongitude;
    private int chatRoomSeq;
    private int opponentId;
}
