package com.ssafy.nanumi.db.entity;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@Document(collection = "gps_users")
public class GpsUser {
    @Id
    private String sessionId;
    private double beforeLatitude;
    private double beforeLongitude;
    private double nowLatitude;
    private double nowLongitude;
}