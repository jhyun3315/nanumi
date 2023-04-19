import React from 'react';
import {Text, View, StyleSheet, Pressable, TextInput} from 'react-native';
import {MoreHeader} from '../../ui/BackHeader';
import {SIZES, COLORS} from '../../constants';
import Icon from 'react-native-ionicons';

export const ChatHeader = ({navigation}) => {
  return (
    <>
      <MoreHeader navigation={navigation} />
    </>
  );
};

export const ChatInput = () => {
  return (
    <View style={styles.inputContainer}>
      <View style={styles.innerContainer}>
        <View style={styles.inputAndMicroPhone}>
          <TextInput
            multiline
            placeholder="메시지를 입력해주세요..."
            style={styles.input}
            onChangeText={() => {}}
          />
          <Pressable style={styles.rightIconButtonStyle}>
            <Icon name="flame" color={COLORS.gray} size={SIZES.extraLarge} />
          </Pressable>
          <Pressable style={styles.rightIconButtonStyle}>
            <Icon name="camera" color={COLORS.gray} size={SIZES.large} />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export const MessagesList = () => {
  return <Text>List</Text>;
};

const styles = StyleSheet.create({
  inputContainer: {
    justifyContent: 'center',
  },
  innerContainer: {
    width: '100%',
    paddingHorizontal: SIZES.base,
    marginHorizontal: SIZES.base,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SIZES.base,
  },
  inputAndMicroPhone: {
    flexDirection: 'row',
    backgroundColor: COLORS.lightGray,
    flex: 3,
    borderRadius: SIZES.extraLarge,
    marginRight: SIZES.base,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    backgroundColor: 'transparent',
    paddingLeft: SIZES.large,
    flex: 3,
    color: COLORS.primary,
    alignSelf: 'center',
    height: 50,
    maxHeight: 100,
  },
  rightIconButtonStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: SIZES.medium,
  },
  emotionButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: SIZES.medium,
  },
  sendButton: {
    backgroundColor: COLORS.violet,
    borderRadius: SIZES.extraLarge,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
