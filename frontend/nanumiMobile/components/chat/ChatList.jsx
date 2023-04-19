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
    lastMessage: '뭐뭐뭐뭐무머ㅜ머',
    time: '16:00',
    notification: '3',
    // isBlocked
    // isMuted
    // hasStory
  },
  {
    profileImage: assets.person02,
    username: '다람쥐나무2',
    bio: '만나서 반가워요',
    description: '안녕',
    lastMessage: '뭐뭐뭐뭐무머ㅜ머',
    time: '16:00',
  },
  {
    profileImage: assets.person03,
    username: '다람쥐나무3',
    bio: '만나서 반가워요',
    description: '안녕',
    lastMessage: '뭐뭐뭐뭐무머ㅜ머',
    time: '16:00',
    notification: '3',
  },
  {
    profileImage: assets.person04,
    username: '다람쥐나무4',
    bio: '만나서 반가워요',
    description: '안녕',
    lastMessage: '뭐뭐뭐뭐무머ㅜ머',
    time: '16:00',
  },
  {
    profileImage: assets.person03,
    username: '다람쥐나무5',
    bio: '만나서 반가워요',
    description: '안녕',
    lastMessage: '뭐뭐뭐뭐무머ㅜ머',
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
