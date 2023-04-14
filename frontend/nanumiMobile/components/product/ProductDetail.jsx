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
import DetailBid from './DetailBid';

const DetailHeader = ({data, navigation}) => (
  <View style={{width: '100%', height: 373}}>
    <Image
      source={data.image}
      resizeMode="cover"
      style={{width: '100%', height: '100%'}}
    />

    <CircleButton
      imgUrl={assets.left}
      handlePress={() => {
        navigation.goBack();
      }}
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
        <RectButton minWidth={170} fontSize={SIZES.large} {...SHADOWS.dark} />
      </View>
      <FlatList
        data={data.bids}
        renderItem={({item}) => <DetailBid bid={item} />}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: SIZES.extraLarge * 2}}
        ListHeaderComponent={() => (
          <DetailHeader data={data} navigation={navigation} />
        )}
      />
    </SafeAreaView>
  );
};

export default ProductDetail;
