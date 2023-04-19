import React from 'react';
import {SafeAreaView} from 'react-native';
import {ChatHeader, ChatInput, MessagesList} from './ChatInfo';
import {COLORS} from '../../constants';

const ChatDetail = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
      <ChatHeader navigation={navigation} />
      <MessagesList />
      <ChatInput />
    </SafeAreaView>
  );
};

export default ChatDetail;
