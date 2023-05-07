import React from 'react';
import ChatDetail from '../components/chat/ChatDetail';

const ChatDetailScreen = ({navigation, route}) => {
  const {productId, chatRoomId} = route.params;
  return (
    <ChatDetail
      navigation={navigation}
      productId={productId}
      chatRoomId={chatRoomId}
    />
  );
};

export default ChatDetailScreen;
