import React from 'react';
import {
  Text,
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Image,
  Pressable,
} from 'react-native';
import {COLORS, FONTS, SIZES, assets} from '../../constants';
import {RectButton} from '../../ui/Button';
import {BackHeader} from '../../ui/BackHeader';

const USER = [
  {
    id: '1',
    name: 'gg',
    profileImage: assets.person01,
  },
  {
    id: '2',
    name: 'ss',
    profileImage: assets.person02,
  },
  {
    id: '3',
    name: 'gg',
    profileImage: assets.person03,
  },
  {
    id: '4',
    name: 'zz',
    profileImage: assets.person04,
  },
  {
    id: '5',
    name: 'aads',
    profileImage: assets.person03,
  },
];
const renderItem = ({item, desc}) => {
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
          source={item.profileImage}
          resizeMode="contain"
          style={styles.image}
        />
        <Text style={styles.text}>{item.name}</Text>
      </View>
      <RectButton minWidth={48} fontSize={SIZES.small}>
        {desc}
      </RectButton>
    </View>
  );
};

const UserList = ({navigation, desc}) => {
  const title = desc === '차단해제' ? '차단목록' : '채팅목록';
  return (
    <SafeAreaView style={styles.container}>
      <BackHeader navigation={navigation}>{title}</BackHeader>
      <FlatList
        data={USER}
        renderItem={({item}) => renderItem({item, desc: desc})}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

export default UserList;

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
