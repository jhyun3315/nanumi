import React from 'react';
import ChatDetail from '../components/chat/ChatDetail';

const ChatDetailScreen = ({navigation, route}) => {
  const {productId, chatRoomId, opponentId, isBlocked} = route.params;
  console.log(route);
  return (
    <ChatDetail
      navigation={navigation}
      productId={productId}
      chatRoomId={chatRoomId}
      opponentId={opponentId}
      isBlocked={isBlocked}
    />
  );
};

export default ChatDetailScreen;
