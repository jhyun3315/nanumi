import React from 'react';
import {SafeAreaView} from 'react-native';
import {ChatHeader, ChatInput, MessagesList} from './ChatInfo';
import {COLORS, assets} from '../../constants';

const CHAT = [
  {
    username: '오육56',
    profileImage: assets.person01,
    isBlocked: false,
    message: '언제 어디서 만날까',
  },
  {
    username: '오육78',
    profileImage: assets.person02,
    isBlocked: true,
    message: '언제 어디서 만나실ㄹㄹㄹㄹㄹ?',
  },
  {
    username: '오육칠팔910',
    profileImage: assets.person03,
    isBlocked: false,
    message: '언제 시간 가능?',
  },
];
const ChatList = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
      <ChatHeader data={CHAT} navigation={navigation} />
      <MessagesList />
      <ChatInput />
    </SafeAreaView>
  );
};

export default ChatList;
