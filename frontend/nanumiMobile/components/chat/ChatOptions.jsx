import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {FONTS, SIZES, COLORS} from '../../constants';

export const ChatOptions = ({
  navigation,
  handleCloseBottomModal,
  handleOpenBlockModal,
  handleOpenChatExitModal,
}) => {
  const handleCloseAndNavigateChatOptionsModal = () => {
    handleCloseBottomModal();
    setTimeout(() => {
      navigation.navigate('Report');
    }, 300);
  };
  return (
    <View style={styles.optionContainer}>
      <Pressable style={styles.option}>
        <Text style={styles.optionText}>거래시작</Text>
      </Pressable>
      <Pressable style={styles.option} onPress={handleOpenBlockModal}>
        <Text style={styles.optionText}>차단하기</Text>
      </Pressable>
      <Pressable
        style={styles.option}
        onPress={handleCloseAndNavigateChatOptionsModal}>
        <Text style={[styles.optionText, styles.reportButtonText]}>
          신고하기
        </Text>
      </Pressable>
      <Pressable
        style={[styles.option, styles.exitButton]}
        onPress={handleOpenChatExitModal}>
        <Text style={[styles.optionText, styles.exitButtonText]}>
          채팅방 나가기
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  optionContainer: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    paddingBottom: SIZES.base * 2,
    paddingHorizontal: SIZES.base * 2,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: SIZES.small,
    borderTopRightRadius: SIZES.small,
  },
  option: {
    width: '100%',
    paddingVertical: SIZES.base * 1.5,
    marginBottom: SIZES.base,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  optionText: {
    fontFamily: FONTS.bold,
    fontSize: SIZES.font,
    color: COLORS.primary,
    textAlign: 'center',
  },
  reportButtonText: {
    color: COLORS.red,
  },
  exitButton: {
    borderBottomWidth: 0,
  },
  exitButtonText: {
    color: COLORS.violet,
  },
});
