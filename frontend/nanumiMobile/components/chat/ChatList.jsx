import React from 'react';
import {FlatList, SafeAreaView} from 'react-native';
import {COLORS, assets} from '../../constants';
import {ChatListItem} from './ChatListInfo';
const USER = [
  {
    profileImage: assets.person01,
    username: '다람쥐나무',
    bio: '만나서 반가워요',
    description: '안녕',
    lastMessage: '내일 저녁7시에 방문할게요.감사해요^^^^^asdass^^^',
    time: '16:00',
    notification: '3',
    // isBlocked
    // isMuted
    // hasStory
  },
  {
    profileImage: assets.person02,
    username: '콩재',
    bio: '만나서 반가워요',
    description: '만나서 바가워',
    lastMessage: '만나서 반가워요',
    time: '16:00',
  },
  {
    profileImage: assets.person03,
    username: '같이나눔해요',
    bio: '만나서 반가워요',
    description: '안녕',
    lastMessage: '낼 오전 가시죠',
    time: '16:00',
    notification: '3',
  },
  {
    profileImage: assets.person04,
    username: '나누미',
    bio: '만나서 반가워요',
    description: '안녕',
    lastMessage: '뭐뭐뭐뭐무머ㅜ머',
    time: '16:00',
  },
  {
    profileImage: assets.person03,
    username: '댄바다',
    bio: '만나서 반가워요',
    description: '안녕',
    lastMessage: '감사해요ㅎㅎ',
    time: '16:00',
    notification: '3',
  },
];

const ChatList = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
      <FlatList
        data={USER}
        renderItem={({item}) => (
          <ChatListItem data={item} navigation={navigation} />
        )}
        keyExtractor={item => item.username}
      />
    </SafeAreaView>
  );
};

export default ChatList;
