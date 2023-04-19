import React from 'react';
import {View, Text, Pressable, StyleSheet, Image} from 'react-native';
import {COLORS, FONTS, SIZES} from '../../constants';
export const ChatListItem = ({data}) => {
  const showStoryCircle = () => {};

  return (
    <View style={styles.chatContainer}>
      <Pressable style={styles.conversation}>
        <Pressable style={[styles.imageContainer]}>
          <Image style={styles.image} source={data?.profileImage} />
        </Pressable>
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
            <Text numberOfLine={1} style={[styles.text]}>
              {data?.username}
            </Text>
            <Text style={[styles.text]}>{data?.time}</Text>
          </View>
          <View>
            <Text style={[styles.text]}>{data?.lastMessage}</Text>
            <Text style={[styles.text]}>{data?.notification}</Text>
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
});
