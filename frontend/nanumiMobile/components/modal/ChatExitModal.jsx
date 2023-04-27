import React, {useState} from 'react';
import {Modal, View, Dimensions, Text} from 'react-native';
import {COLORS, FONTS, SIZES} from '../../constants';
import {RectButton} from '../../ui/Button';
import {useModal} from '../../hooks/useModal';
const {width, height} = Dimensions.get('window');

const ChatExitModal = () => {
  const {hideModal} = useModal();

  return (
    <Modal visible={true} transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modal}>
          <View style={styles.chatContainer}>
            <Text style={styles.text}>채팅방 나가기</Text>
          </View>
          <Text style={styles.subText}>
            채팅방을 나가면 채팅 목록 및 대화 내용이 삭제되고 복구할 수 없어요.
            채팅방에서 나가시겠어요?
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}>
            <RectButton
              minWidth={96}
              fontSize={FONTS.font}
              backgroundColor={COLORS.primary}
              handlePress={hideModal}>
              취소
            </RectButton>
            <RectButton
              minWidth={96}
              fontSize={FONTS.font}
              handlePress={hideModal}>
              네, 나갈래요
            </RectButton>
          </View>
        </View>
      </View>
    </Modal>
  );
};
export default ChatExitModal;

const styles = {
  closeIcon: {
    width: SIZES.extraLarge,
    height: SIZES.extraLarge,
    position: 'absolute',
    zIndex: 1,
    top: SIZES.base * 2,
    right: SIZES.base * 2,
  },

  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: '80%',
    height: height / 3,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.base,
    padding: SIZES.extraLarge,
    position: 'absolute',
    zIndex: 1,
    top: '50%',
    left: '50%',
    transform: [{translateX: -0.4 * width}, {translateY: -0.15 * height}],
    justifyContent: 'space-between',
  },
  chatContainer: {
    justifyContent: 'center',
  },

  text: {
    fontFamily: FONTS.bold,
    color: COLORS.primary,
    fontSize: SIZES.large,
  },

  subText: {
    fontFamily: FONTS.medium,
    color: COLORS.primary,
    fontSize: SIZES.font,
  },
};
