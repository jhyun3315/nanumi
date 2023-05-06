package com.ssafy.nanumi.db.repository;

import com.ssafy.nanumi.db.entity.ChatMessageEntity;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface ChatRepository extends MongoRepository<ChatMessageEntity, String> {
    List<ChatMessageEntity> findTop20ByRoomIdOrderBySendTimeDesc(long roomId);
}
