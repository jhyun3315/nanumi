import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {FONTS, SIZES, COLORS} from '../../constants';
import {useModal} from '../../hooks/useModal';
import {useRecoilState} from 'recoil';
import {transactionLocationState} from '../../state/transactionLocation';

export const ChatOptions = ({
  navigation,
  handleCloseBottomModal,
  handleOpenBlockUserModal,
  handleOpenChatExitModal,
  handleOpenTransactionCompleteModal,
}) => {
  const {showModal, hideModal} = useModal();
  const [transactionLocation, setTransactionLocation] = useRecoilState(
    transactionLocationState,
  );

  const handleCloseAndNavigateChatOptionsModal = () => {
    handleCloseBottomModal();
    setTimeout(() => {
      navigation.navigate('Report');
    }, 300);
  };

  const handleConfirmLocation = coordinate => {
    console.log('실행');
    setTransactionLocation(prev => coordinate);
    hideModal();
  };

  const handleCloseAndNavigateLocationPickerModal = () => {
    handleCloseBottomModal();
    setTimeout(() => {
      showModal({
        modalType: 'LocationPickerModal',
        modalProps: {
          visible: true,
          onConfirm: handleConfirmLocation,
          oncancel: hideModal,
        },
      });
    }, 300);
  };

  return (
    <View style={styles.optionContainer}>
      <Pressable
        style={styles.option}
        onPress={handleCloseAndNavigateLocationPickerModal}>
        <Text style={styles.optionText}>거래장소선택</Text>
      </Pressable>

      <Pressable style={styles.option} onPress={handleOpenBlockUserModal}>
        <Text style={styles.optionText}>차단하기</Text>
      </Pressable>
      <Pressable
        style={styles.option}
        onPress={handleOpenTransactionCompleteModal}>
        <Text style={styles.optionText}>거래완료</Text>
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
