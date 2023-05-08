import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  StatusBar,
  FlatList,
} from 'react-native';
import FocusedStatusBar from './../../ui/FocusedStatusBar';
import {COLORS, SIZES, SHADOWS, FONTS, assets} from '../../constants';
import {CircleButton, RectButton} from './../../ui/Button';
import {SubInfo} from './SubInfo';
import DetailDesc from './DetailDesc';

const DetailHeader = ({data, navigation}) => (
  <View style={{width: '100%', height: 373}}>
    <Image
      source={{uri: data.image}}
      resizeMode="cover"
      style={{width: '100%', height: '100%'}}
    />

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

const ProductDetail = ({route, navigation}) => {
  const {data} = route.params;
  return (
    <SafeAreaView style={{flex: 1}}>
      <FocusedStatusBar
        batStyle="dark-content"
        backgroundColor="transparent"
        translucent={true}
      />
      <View
        style={{
          width: '100%',
          position: 'absolute',
          bottom: 0,
          paddingVertical: SIZES.font,
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1,
          backgroundColor: 'rgba(255,255,255,0.5)',
        }}>
        <RectButton minWidth={170} fontSize={SIZES.large} {...SHADOWS.dark}>
          나눔받기
        </RectButton>
      </View>
      <FlatList
        data={data.bids}
        keyExtractor={item => item.id}
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

export default ProductDetail;
