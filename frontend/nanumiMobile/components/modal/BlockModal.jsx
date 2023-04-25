import React, {useState} from 'react';
import {Modal, View, Dimensions, Text} from 'react-native';
import {COLORS, FONTS, SIZES} from '../../constants';
import DropDownPicker from 'react-native-dropdown-picker';
import {RectButton} from '../../ui/Button';

const {width, height} = Dimensions.get('window');

const AccuseModal = ({visible}) => {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState('WHY');

  const [items, setItems] = useState([
    {label: '신고하는 이유가 무엇인가요?', value: 'WHY'},
    {label: '비매너 사용자예요', value: 'NOMANNER'},
    {label: '욕설을 해요', value: 'CUSS'},
    {label: '성희롱을 해요', value: 'HARASS'},
    {label: '거래 분쟁이 있어요', value: 'DISPUTE'},
    {label: '다른 문제가 있어요', value: 'OTHER'},
  ]);

  return (
    <Modal visible={visible} transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modal}>
          <DropDownPicker
            open={open}
            value={selectedValue}
            items={items}
            setOpen={setOpen}
            setValue={setSelectedValue}
            setItems={setItems}
          />
          {selectedValue !== 'WHY' && (
            <View style={styles.accuseConatiner}>
              <Text style={styles.text}>신고는 취소할 수 없어요!</Text>
            </View>
          )}
          <RectButton minWidth={64} fontSize={FONTS.font}>
            신고하기
          </RectButton>
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
  accuseConatiner: {
    justifyContent: 'center',
  },

  text: {
    fontFamily: FONTS.bold,
    color: COLORS.primary,
    fontSize: SIZES.large,
  },

  subText: {
    fontFamily: FONTS.medium,
    color: COLORS.red,
    fontSize: SIZES.font,
  },
};
