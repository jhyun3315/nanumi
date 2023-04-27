import React from 'react';
import {Modal, View, Dimensions, Text} from 'react-native';
import {COLORS, FONTS, SIZES} from '../../constants';
import {RectButton} from '../../ui/Button';
import {useModal} from '../../hooks/useModal';
const {width, height} = Dimensions.get('window');

const BlockUserModal = () => {
  const {hideModal} = useModal();

  return (
    <Modal visible={true} transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modal}>
          <View style={styles.blockContainer}>
            <Text style={styles.text}>차단하기</Text>
          </View>
          <Text style={styles.subText}>
            차단시 상대방과의 거래가 취소되고 서로의 게시글을 확인하거나 채팅을
            할 수 없어요. 차단하실래요?
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
              차단하기
            </RectButton>
          </View>
        </View>
      </View>
    </Modal>
  );
};
export default BlockUserModal;

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
  blockContainer: {
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
