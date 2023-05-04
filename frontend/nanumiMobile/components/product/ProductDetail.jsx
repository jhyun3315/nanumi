import React, {useCallback, useEffect, useMemo, useRef} from 'react';
import FocusedStatusBar from './../../ui/FocusedStatusBar';
import DetailDesc from './DetailDesc';
import {
  SafeAreaView,
  View,
  StatusBar,
  FlatList,
  StyleSheet,
  Dimensions,
  Animated,
} from 'react-native';
import {SIZES, SHADOWS, assets, COLORS} from '../../constants';
import {CircleButton, MoreButton, RectButton} from './../../ui/Button';
import {SubInfo} from './SubInfo';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';
import {useQuery} from '@tanstack/react-query';
import {useModal} from '../../hooks/useModal';
import {requestGetDetailProduct} from '../../api/product';
import {Fallback} from '../../ui/Fallback';
import {useRecoilState} from 'recoil';
import {userState} from './../../state/user';
import Indicator from './Indicator';
import ProductOptions from './ProductOptions';
import GlobalModal from '../modal/GlobalModal';
import ErrorModal from '../modal/ErrorModal';
import DataErrorModal from '../modal/DataErrorModal';

const {width} = Dimensions.get('window');

const DetailHeader = ({data, navigation, handlePresentModalPress}) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [user] = useRecoilState(userState);
  const userId = data?.result?.userId;

  const renderImageItem = ({item, index}) => {
    const inputRange = [
      (index - 1) * width,
      index * width,
      (index + 1) * width,
    ];
    const translateX = scrollX.interpolate({
      inputRange,
      outputRange: [0, 1, 0],
      extrapolate: 'clamp',
    });

    return (
      <Animated.Image
        source={{uri: item}}
        resizeMode="cover"
        style={{width: width, height: 373, transform: [{translateX}]}}
      />
    );
  };

  return (
    <View style={{width: '100%', height: 373}}>
      <Animated.FlatList
        data={data.productImageUrls}
        renderItem={renderImageItem}
        keyExtractor={(item, index) => `image-${item}-${index}`}
        horizontal
        showsHorizontalScrollIndicator={false}
        decelerationRate={0.9}
        snapToInterval={width}
        bounces={false}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: true},
        )}
      />

      <Indicator scrollX={scrollX} data={data.productImageUrls} />
      <CircleButton
        imgUrl={assets.left}
        handlePress={() => {
          navigation.goBack();
        }}
        left={15}
        top={StatusBar.currentHeight + 10}
      />
      {user.userId === userId && (
        <MoreButton
          minWidth={40}
          minHeight={40}
          handlePress={handlePresentModalPress}
          position={'absolute'}
          right={16}
          backgroundColor={COLORS.secondary}
          top={StatusBar.currentHeight + 10}
        />
      )}
    </View>
  );
};

const ProductDetail = ({route, navigation}) => {
  const {id} = route.params.data;
  const {hideModal, showModal} = useModal();

  const handleCloseAndBack = () => {
    hideModal();
    navigation.goBack();
  };

  const {data, isLoading, error} = useQuery(['product', id], () =>
    requestGetDetailProduct(id),
  );

  console.log(data);
  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => ['20%'], []);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  });

  const handleCloseBottomModal = () => {
    bottomSheetModalRef.current?.close();
  };

  const handleOpenProductDeleteModal = productId => {
    handleCloseBottomModal();
    setTimeout(() => {
      showModal({
        modalType: 'ProductDeleteModal',
        args: productId,
      });
    }, 300);
  };

  const handleCloseModalAndNavigateProductUpdate = productId => {
    handleCloseBottomModal();
    setTimeout(() => {
      navigation.navigate('PostUpdateForm', {productId: productId});
    }, 400);
  };

  const renderBackDrop = useCallback(props => {
    return (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        enableTouchThrough={true}
        pressBehavior="close"
      />
    );
  }, []);

  if (data?.code === 404) {
    return <DataErrorModal handlePress={handleCloseAndBack} />;
  }
  if (isLoading) return <Fallback />;
  if (error) return <ErrorModal />;

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <BottomSheetModalProvider>
        <SafeAreaView style={styles.container}>
          <FocusedStatusBar
            batStyle="dark-content"
            backgroundColor="transparent"
            translucent={true}
          />
          <View style={styles.buttonContainer}>
            <RectButton minWidth={170} fontSize={SIZES.large} {...SHADOWS.dark}>
              나눔받기
            </RectButton>
          </View>
          <FlatList
            keyExtractor={item => item.id.toString}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: SIZES.extraLarge * 2}}
            ListHeaderComponent={() => (
              <>
                <DetailHeader
                  data={data?.result}
                  navigation={navigation}
                  handlePresentModalPress={handlePresentModalPress}
                />
                <SubInfo data={data?.result} />
                <View style={{padding: SIZES.font}}>
                  <DetailDesc data={data?.result} />
                </View>
              </>
            )}
          />
          <BottomSheetModal
            isBackDropDismisByPress={true}
            ref={bottomSheetModalRef}
            index={0}
            snapPoints={snapPoints}
            backdropComponent={renderBackDrop}
            animationConfigs={{
              duration: 200,
            }}>
            <ProductOptions
              data={data}
              handleOpenProductDeleteModal={handleOpenProductDeleteModal}
              handleCloseModalAndNavigateProductUpdate={
                handleCloseModalAndNavigateProductUpdate
              }
            />
          </BottomSheetModal>
          <GlobalModal />
        </SafeAreaView>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  buttonContainer: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    paddingVertical: SIZES.font,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
});

export default ProductDetail;
