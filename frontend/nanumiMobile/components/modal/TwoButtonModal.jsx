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

const TwoButtonModal = () => {
  const {modal, hideModal} = useModal();

  return (
    <Modal
      visible={modal?.modalProps.visible}
      transparent={true}
      statusBarTranslucent={true}
      backgroundColor="transparent">
      <Pressable style={styles.modalContainer} onPress={hideModal}>
        <TouchableWithoutFeedback onPress={event => event.stopPropagation()}>
          <View style={styles.modal}>
            <View style={styles.twoButtonContainer}>
              <Text style={styles.text}>{modal?.modalProps?.title}</Text>
            </View>
            <Text style={styles.subText}>{modal?.modalProps?.content}</Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
              }}>
              <RectButton
                minWidth={96}
                fontSize={FONTS.font}
                handlePress={modal?.modalProps.onConfirm}>
                네
              </RectButton>
              <RectButton
                minWidth={96}
                fontSize={FONTS.font}
                backgroundColor={COLORS.primary}
                handlePress={modal?.modalProps.onCancel}>
                취소
              </RectButton>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Pressable>
    </Modal>
  );
};
export default TwoButtonModal;

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
    backgroundColor: 'rgba(0,0,0,0.4)',
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
  twoButtonContainer: {
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
