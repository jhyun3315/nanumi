package com.ssafy.nanumi.db.repository;

import com.ssafy.nanumi.common.SectorDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.annotation.PostConstruct;
import java.util.HashMap;
import java.util.Map;

@Repository
public class GpsRepository {
    private final Map<String, SectorDTO> gpsData = new HashMap<>();

    public void addUser(String sessionId, SectorDTO dto) {
        gpsData.put(sessionId, dto);
    }

    public void updateUser(String sessionId, SectorDTO dto) {
        gpsData.replace(sessionId, dto);
    }

    public void deleteUser(String sessionId) {
        gpsData.remove(sessionId);
    }

    public SectorDTO getUser(String sessionId) {
        return gpsData.get(sessionId);
    }
}