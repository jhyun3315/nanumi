import React from 'react';
import {
  Text,
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Image,
} from 'react-native';
import {COLORS, FONTS, SIZES} from '../../constants';
import {RectButton} from '../../ui/Button';
import {BackHeader} from '../../ui/BackHeader';
import {useRecoilState} from 'recoil';
import {userState} from '../../state/user';
import {requestClearBlockUser, requsetGetBlockUser} from '../../api/user';
import {useQuery} from '@tanstack/react-query';
import {Fallback} from '../../ui/Fallback';
import ErrorModal from '../modal/ErrorModal';

const renderItem = ({item, handleClearBlockUser}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: SIZES.large,
        paddingVertical: SIZES.base * 1.5,
      }}>
      <View style={styles.userContainer}>
        <Image
          source={{uri: item?.profileUrl}}
          resizeMode="contain"
          style={styles.image}
        />
        <Text style={styles.text}>{item?.nickname}</Text>
      </View>
      <RectButton
        minWidth={48}
        fontSize={SIZES.small}
        handlePress={() => handleClearBlockUser(item?.target_id)}>
        차단해제
      </RectButton>
    </View>
  );
};

const BlockUserList = ({navigation}) => {
  const [user] = useRecoilState(userState);
  const {data, isLoading, error, refetch} = useQuery(
    ['blockUser', user.userId],
    () => requsetGetBlockUser(user.userId),
  );

  const handleClearBlockUser = async targetId => {
    const response = await requestClearBlockUser(user.userId, targetId);
    console.log(response);
  };

  if (isLoading) return <Fallback />;
  if (error) return <ErrorModal handlePress={refetch} />;

  return (
    <SafeAreaView style={styles.container}>
      <BackHeader navigation={navigation}>차단해제</BackHeader>
      <FlatList
        data={data?.result}
        renderItem={({item}) => renderItem({item, handleClearBlockUser})}
        keyExtractor={item => item?.id}
      />
    </SafeAreaView>
  );
};

export default BlockUserList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontFamily: FONTS.medium,
    color: COLORS.primary,
    fontSize: SIZES.font,
  },
  image: {
    width: SIZES.extraLarge * 1.5,
    height: SIZES.extraLarge * 1.5,
    borderRadius: SIZES.extraLarge,
    marginRight: SIZES.base,
  },
});
