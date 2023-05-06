import React, {useCallback} from 'react';
import {FlatList, SafeAreaView} from 'react-native';
import {COLORS, assets} from '../../constants';
import {ChatListItem} from './ChatListInfo';
import {useQuery} from '@tanstack/react-query';
import {useRecoilState} from 'recoil';
import {userState} from '../../state/user';
import {requestGetMyChatRoom} from '../../api/chat';
import {Fallback} from '../../ui/Fallback';
import ErrorModal from '../modal/ErrorModal';
import {useFocusEffect} from '@react-navigation/native';

const ChatList = ({navigation}) => {
  const [user] = useRecoilState(userState);

  const {data, isLoading, error, refetch} = useQuery(
    ['mychat', user.userId],
    () => requestGetMyChatRoom(user.userId),
  );

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, []),
  );

  console.log('채팅', data);

  if (isLoading) return <Fallback />;
  if (error) return <ErrorModal handlePress={refetch} />;

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
      <FlatList
        data={data ? data : []}
        renderItem={({item}) => (
          <ChatListItem data={item} navigation={navigation} />
        )}
        keyExtractor={item => item.chatRoomId}
      />
    </SafeAreaView>
  );
};

export default ChatList;
