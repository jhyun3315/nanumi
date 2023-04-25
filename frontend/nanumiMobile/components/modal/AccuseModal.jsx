import React from 'react';
import {Modal, Text, TouchableOpacity, View, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

const AccuseModal = ({visible}) => {
  return (
    <Modal visible={visible} transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modal}>
          <Text style={styles.modalTitle}>신고하기</Text>
          <TouchableOpacity style={styles.modalButton}>
            <Text style={styles.modalButtonText}>신고 종류1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalButton}>
            <Text style={styles.modalButtonText}>신고 종류2</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalButton}>
            <Text style={styles.modalButtonText}>신고 종류3</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalButton}>
            <Text style={styles.modalButtonText}>신고 종류4</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalButton}>
            <Text style={styles.modalButtonText}>신고 종류5</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalButton}>
            <Text style={styles.modalButtonText}>취소</Text>
          </TouchableOpacity>
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
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    position: 'absolute',
    zIndex: 1,
    top: '50%',
    left: '50%',
    transform: [{translateX: -0.4 * width}, {translateY: -0.25 * height}],
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalButton: {
    paddingVertical: 10,
    alignItems: 'center',
  },
  modalButtonText: {
    fontSize: 16,
    color: 'blue',
  },
};
