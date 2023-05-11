package com.ssafy.nanumi.sequence;

import lombok.RequiredArgsConstructor;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.util.Objects;

import static org.springframework.data.mongodb.core.FindAndModifyOptions.options;
import static org.springframework.data.mongodb.core.query.Criteria.where;

/**
 * SequenceGeneratorService는 MongoDB에 저장되는 각 도메인 객체에 대한 순차 ID를 생성하는 서비스입니다.
 * 이 클래스는 MongoDB에서 제공하지 않는 기능인 자동 증가 순차 ID를 생성하기 위해 사용됩니다.
 */
@RequiredArgsConstructor
@Service
public class SequenceGeneratorService {
    // MongoOperations는 MongoDB 데이터베이스에 대한 일반적인 작업을 수행하기 위한 인터페이스입니다.
    private final MongoOperations mongoOperations;

    /**
     * 이 메서드는 주어진 seqName에 대한 새로운 순차 ID를 생성하고 반환합니다.
     * 이 메서드는 findAndModify 메서드를 사용하여 주어진 seqName에 대한 AutoIncrementSequence 객체를 조회하고, seq 필드를 1 증가시킵니다.
     * 만약 AutoIncrementSequence 객체가 없으면 새로 생성하고 초기값 1을 할당합니다.
     *
     * @param seqName 새로운 순차 ID를 생성하려는 도메인 객체의 이름입니다. 예를 들어, ChatRoomEntity의 경우 "chatroom"이 됩니다.
     * @return 생성된 새로운 순차 ID
     */
    public Long generateSequence(String seqName) {
        AutoIncrementSequence counter = mongoOperations.findAndModify(Query.query(where("_id").is(seqName)),
                new Update().inc("seq", 1), options().returnNew(true).upsert(true), AutoIncrementSequence.class);
        return !Objects.isNull(counter) ? counter.getSeq() : 1;
    }
}
