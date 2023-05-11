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

    //이 메서드는 opponentId와 productId를 사용하여 기존에 있는 채팅방을 찾아내는 역할을 합니다.
    Optional<ChatRoomEntity> findByOpponentIdAndProductId(long opponentId, long productId);

}

