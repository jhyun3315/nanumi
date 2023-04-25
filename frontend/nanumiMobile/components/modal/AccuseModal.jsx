import React from 'react';
import {Modal, Text, Pressable, View, Dimensions} from 'react-native';
import {COLORS, FONTS, SIZES} from '../../constants';
const {width, height} = Dimensions.get('window');

const AccuseModal = ({visible}) => {
  return (
    <Modal visible={visible} transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modal}>
          <Text style={styles.modalTitle}>신고하기</Text>
          <Pressable style={styles.modalButton}>
            <Text style={styles.modalButtonText}>신고 종류1</Text>
          </Pressable>
          <Pressable style={styles.modalButton}>
            <Text style={styles.modalButtonText}>신고 종류2</Text>
          </Pressable>
          <Pressable style={styles.modalButton}>
            <Text style={styles.modalButtonText}>신고 종류3</Text>
          </Pressable>
          <Pressable style={styles.modalButton}>
            <Text style={styles.modalButtonText}>신고 종류4</Text>
          </Pressable>
          <Pressable style={styles.modalButton}>
            <Text style={styles.modalButtonText}>신고 종류5</Text>
          </Pressable>
          <Pressable style={styles.modalButton}>
            <Text style={styles.modalButtonText}>취소</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};
export default AccuseModal;

const styles = {
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: '80%',
    backgroundColor: COLORS.white,
    borderRadius: SIZES.base,
    padding: SIZES.extraLarge,
    position: 'absolute',
    zIndex: 1,
    top: '50%',
    left: '50%',
    transform: [{translateX: -0.4 * width}, {translateY: -0.25 * height}],
  },
  modalTitle: {
    color: COLORS.primary,
    fontSize: SIZES.large,
    marginBottom: SIZES.base,
    fontFamily: FONTS.bold,
  },
  modalButton: {
    paddingVertical: SIZES.base * 2,
    alignItems: 'center',
  },
  modalButtonText: {
    fontSize: SIZES.font,
    color: COLORS.primary,
    fontFamily: FONTS.medium,
  },
};
