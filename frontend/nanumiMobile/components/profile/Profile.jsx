import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  Pressable,
} from 'react-native';
import {COLORS, FONTS, SIZES, assets} from '../../constants';
import Icon from 'react-native-ionicons';

const Profile = ({navigation}) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
        alignItems: 'center',
      }}>
      <View style={styles.profileImage}>
        <Image
          source={assets.person01}
          style={styles.image}
          resizeMode="contain"
        />
        <View style={styles.add}>
          <Icon name="add" size={SIZES.extraLarge} color={COLORS.primary} />
        </View>
      </View>

      <View style={styles.infoContainer}>
        <Text style={[styles.text, styles.nickname]}>닉네임</Text>
      </View>

      <View style={styles.statusContainer}>
        <View style={styles.statusBox}>
          <Text style={[styles.text, styles.count]}>483</Text>
          <Text style={[styles.text, styles.subText]}>나눔한 물건</Text>
        </View>

        <View
          style={[
            styles.statusBox,
            {
              borderColor: '#DFD8C8',
              borderLeftWidth: 1,
              borderRightWidth: 1,
            },
          ]}>
          <Text style={[styles.text, styles.count]}>483</Text>
          <Text style={[styles.text, styles.subText]}>나눔중인 물건</Text>
        </View>

        <View style={styles.statusBox}>
          <Text style={[styles.text, styles.count]}>483</Text>
          <Text style={[styles.text, styles.subText]}>나눔받은 물건</Text>
        </View>
      </View>
      <View
        style={[
          styles.list,
          {borderTopWidth: 1, borderTopColor: COLORS.lightGray},
        ]}>
        <Text style={styles.text}>매칭목록</Text>
      </View>

      <Pressable
        style={styles.list}
        onPress={() => navigation.navigate('ProfileToChat')}>
        <Text style={styles.text}>채팅목록</Text>
      </Pressable>
      <Pressable style={styles.list}>
        <Text style={styles.text}>내 동네 설정</Text>
      </Pressable>
      <Pressable
        style={styles.list}
        onPress={() => navigation.navigate('BlockUser')}>
        <Text style={styles.text}>차단 사용자 관리</Text>
      </Pressable>
      <Pressable style={styles.list}>
        <Text style={styles.text}>로그아웃</Text>
      </Pressable>
      <Pressable style={styles.list}>
        <Text style={styles.text}>탈퇴하기</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  text: {
    fontFamily: FONTS.medium,
    fontSize: SIZES.font,
    color: COLORS.primary,
  },
  subText: {
    fontSize: SIZES.medium,
    color: COLORS.gray,
    fontFamily: FONTS.light,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 100,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  add: {
    backgroundColor: COLORS.disable,
    position: 'absolute',
    bottom: 5,
    right: 5,
    width: SIZES.extraLarge * 1.4,
    height: SIZES.extraLarge * 1.4,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: SIZES.large,
  },
  nickname: {
    fontFamily: FONTS.bold,
    fontSize: SIZES.large,
  },
  statusContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: SIZES.extraLarge,
    marginBottom: SIZES.extraLarge,
  },

  statusBox: {
    alignItems: 'center',
    flex: 1,
  },

  count: {
    fontSize: SIZES.large,
  },

  list: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
    padding: SIZES.base * 2,
  },
});
