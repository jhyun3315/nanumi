package com.ssafy.nanumi.db.repository;


import com.ssafy.nanumi.db.entity.ChatRoomEntity;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface ChatRoomRepository extends MongoRepository<ChatRoomEntity, String> {
    public List<ChatRoomEntity> findAllByUserListIn(long user);
    public List<ChatRoomEntity> findAll();
    public ChatRoomEntity findChatRoomEntityByChatroomSeq(long seq);

    List<ChatRoomEntity> findAllByUserListContaining(long user);

    ChatRoomEntity findByUserListContainingAndProductId(long sendUser, long productId);

    ChatRoomEntity findByUserEmail(String userEmail);

    ChatRoomEntity findByUserListContaining(long userId);

}

