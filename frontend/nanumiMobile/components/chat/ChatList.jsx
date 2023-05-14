import React, {useCallback} from 'react';
import {FlatList, SafeAreaView} from 'react-native';
import {COLORS} from '../../constants';
import {ChatListItem} from './ChatListInfo';
import {useQuery} from '@tanstack/react-query';
import {useRecoilState} from 'recoil';
import {userState} from '../../state/user';
import {requestGetMyChatRoom} from '../../api/chat';
import {Fallback} from '../../ui/Fallback';
import {useFocusEffect} from '@react-navigation/native';
import ErrorModal from '../modal/ErrorModal';
import EmptyState from '../../ui/EmptyState';

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

  if (isLoading) return <Fallback />;
  if (error) return <ErrorModal handlePress={refetch} />;

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
      {data.length === 0 && <EmptyState>채팅목록이 없습니다</EmptyState>}
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
