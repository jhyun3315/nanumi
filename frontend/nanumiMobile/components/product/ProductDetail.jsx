import React, {useRef} from 'react';
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
import {CircleButton, RectButton} from './../../ui/Button';
import {SubInfo} from './SubInfo';
import Indicator from './Indicator';

const {width} = Dimensions.get('window');

const DetailHeader = ({data, navigation}) => {
  const scrollX = useRef(new Animated.Value(0)).current;

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
        data={data.image}
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

      <Indicator scrollX={scrollX} data={data.image} />
      <CircleButton
        imgUrl={assets.left}
        handlePress={() => {
          navigation.goBack();
        }}
        left={15}
        top={StatusBar.currentHeight + 10}
      />
    </View>
  );
};

const ProductDetail = ({route, navigation}) => {
  const {data} = route.params;
  return (
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
            <DetailHeader data={data} navigation={navigation} />
            <SubInfo />
            <View style={{padding: SIZES.font}}>
              <DetailDesc data={data} />
            </View>
          </>
        )}
      />
    </SafeAreaView>
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
