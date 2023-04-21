package com.ssafy.nanumi.db.entity;

import com.ssafy.nanumi.api.request.ChatMessageRequest;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.Table;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Document(collection = "chat")

public class ChatEntity {
    
    
    //TODO 구현
//    private ChatMessageDTO.MessageType type;
//
//    private ChatMessageRequest.
    private long roomId;
    private long sender;
    private String message;
    private String sendTime;
}
