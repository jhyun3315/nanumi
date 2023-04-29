import React from 'react';
import {
  Modal,
  View,
  Dimensions,
  Text,
  Pressable,
  TouchableWithoutFeedback,
} from 'react-native';
import {COLORS, FONTS, SIZES} from '../../constants';
import {RectButton} from '../../ui/Button';
import {useModal} from '../../hooks/useModal';
const {width, height} = Dimensions.get('window');

const LogoutModal = () => {
  const {hideModal} = useModal();

  return (
    <Modal visible={true} transparent={true}>
      <Pressable style={styles.modalContainer} onPress={hideModal}>
        <TouchableWithoutFeedback onPress={event => event.stopPropagation()}>
          <View style={styles.modal}>
            <View style={styles.logoutContainer}>
              <Text style={styles.text}>로그아웃</Text>
            </View>
            <Text style={styles.subText}>정말 로그아웃 하시겠어요?</Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
              }}>
              <RectButton
                minWidth={96}
                fontSize={FONTS.font}
                handlePress={hideModal}>
                네
              </RectButton>
              <RectButton
                minWidth={96}
                fontSize={FONTS.font}
                backgroundColor={COLORS.primary}
                handlePress={hideModal}>
                취소
              </RectButton>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Pressable>
    </Modal>
  );
};
export default LogoutModal;

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
  logoutContainer: {
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
