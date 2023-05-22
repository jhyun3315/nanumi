package com.ssafy.nanumi.db.repository;


import com.ssafy.nanumi.db.entity.GpsUser;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface GpsRepository extends MongoRepository<GpsUser, String> {
    GpsUser findBySessionId(String sessionId);

    void deleteBySessionId(String sessionId);

}