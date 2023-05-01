package com.ssafy.nanumi.db.entity;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Document(collection = "chatroom")
public class ChatRoomEntity {

    @Transient
    public static final String SEQUENCE_NAME = "chatroom_sequence";

    @Id
    private ObjectId _id;
    private long chatroomSeq;
    private long[] userList;
    @Builder.Default
    private boolean isActivate = true;

    public ObjectId get_id() {
        return _id;
    }

    public void set_id(ObjectId _id) {
        this._id = _id;
    }

    public long getChatroomSeq() {
        return chatroomSeq;
    }

    public void setChatroomSeq(long chatroomSeq) {
        this.chatroomSeq = chatroomSeq;
    }

    public long[] getUserList() {
        return userList;
    }

    public void setUserList(long[] userList) {
        this.userList = userList;
    }

    public boolean isActivate() {
        return isActivate;
    }

    public void setActivate(boolean activate) {
        isActivate = activate;
    }
}