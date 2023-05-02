import React from 'react';
import {
  Modal,
  View,
  Dimensions,
  Text,
  Pressable,
  TouchableWithoutFeedback,
  StatusBar,
} from 'react-native';
import {COLORS, FONTS, SIZES} from '../../constants';
import {RectButton} from '../../ui/Button';
import {useModal} from '../../hooks/useModal';
import {requestDeleteProduct} from '../../api/product';
import {useNavigation} from '@react-navigation/native';
import {useRecoilState} from 'recoil';
import {productState} from '../../state/product';
const {width, height} = Dimensions.get('window');

const ProductDeleteModal = ({args}) => {
  const {hideModal} = useModal();
  const navigation = useNavigation();
  const [productList, setProductList] = useRecoilState(productState);

  const deleteProductLocally = id => {
    setProductList(prev => {
      const updatedProducts = JSON.parse(JSON.stringify(prev.data)); // deep copy

      updatedProducts.pages.forEach(page => {
        page.result.content = page.result.content.filter(
          product => product.id !== id,
        );
      });

      return {...prev, data: updatedProducts};
    });
  };

  const handleDeleteProduct = async () => {
    const response = await requestDeleteProduct(args);
    hideModal();
    if (response.code === 200) {
      deleteProductLocally(args);
      navigation.navigate('BottomTabs', {screen: 'Home'});
    } else {
      Alert.alert('삭제에 실패했습니다.');
    }
  };

  return (
    <>
      {/* <StatusBar hidden={true} /> */}
      <Modal visible={true} transparent={true}>
        <Pressable style={styles.modalContainer} onPress={hideModal}>
          <TouchableWithoutFeedback onPress={event => event.stopPropagation()}>
            <View style={styles.modal}>
              <View style={styles.logoutContainer}>
                <Text style={styles.text}>상품삭제</Text>
              </View>
              <Text style={styles.subText}>정말 상품을 삭제하시겠어요?</Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                }}>
                <RectButton
                  minWidth={96}
                  fontSize={FONTS.font}
                  handlePress={handleDeleteProduct}>
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
    </>
  );
};
export default ProductDeleteModal;

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
