import React from 'react';
import {View, Text, Pressable, StyleSheet, Image} from 'react-native';
import {COLORS, FONTS, SIZES} from '../../constants';
export const ChatListItem = ({data, navigation}) => {
  return (
    <View style={styles.chatContainer}>
      <Pressable
        style={styles.conversation}
        onPress={() => {
          navigation.navigate('ChatDetail', {
            productId: data?.productId,
            chatRoomId: data?.chatRoomId,
            opponentId: data?.opponentId,
            isBlocked: data?.blocked,
          });
        }}>
        <View style={[styles.imageContainer]}>
          <Image
            style={styles.image}
            source={{uri: data?.opponentProfileImage}}
          />
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text numberOfLines={1} style={[styles.text, styles.username]}>
              {data?.opponentNickname}
            </Text>
            <Text style={[styles.text, styles.time]}>
              {data?.lastMessageTime
                ? `${data?.lastMessageTime[3]}:${data?.lastMessageTime[4]}`
                : '00:00'}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={[styles.text, styles.message]}>
              {data?.lastMessage ? data?.lastMessage : '채팅기록이 없어요'}
            </Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: FONTS.medium,
    color: COLORS.primary,
  },
  chatContainer: {},
  conversation: {
    flexDirection: 'row',
    paddingBottom: SIZES.extraLarge,
    paddingRight: SIZES.large,
    paddingLeft: SIZES.medium,
  },
  button: {},
  imageContainer: {
    marginRight: SIZES.large,
    borderRadius: SIZES.extraLarge,
    width: SIZES.extraLarge * 2,
    height: SIZES.extraLarge * 2,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  username: {
    fontSize: SIZES.large,
    width: 210,
  },
  message: {
    width: 210,
    fontSize: SIZES.extraLarge / 2,
    color: COLORS.gray,
  },
  time: {
    fontSize: SIZES.extraLarge / 2,
    color: COLORS.gray,
  },
  notificationCircle: {
    backgroundColor: COLORS.violet,
    borderRadius: SIZES.extraLarge,
    height: SIZES.large,
    width: SIZES.large,
    marginRight: SIZES.base,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notification: {
    color: COLORS.white,
    fontSize: SIZES.base * 1.3,
    fontFamily: FONTS.medium,
  },
});
