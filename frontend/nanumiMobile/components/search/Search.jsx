import React from 'react';
import {SafeAreaView, View, Image, TextInput} from 'react-native';
import {COLORS, SIZES, assets} from '../../constants';

const Search = () => {
  return (
    <SafeAreaView style={{width: '90%', marginTop: SIZES.font}}>
      <View
        style={{
          width: '100%',
          borderRadius: SIZES.font,
          backgroundColor: COLORS.gray,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: SIZES.font,
        }}>
        <Image
          source={assets.search}
          resizeMode="contain"
          style={{width: 20, height: 20, marginRight: SIZES.base}}
        />
        <TextInput
          placeholder="검색"
          style={{flex: 1}}
          onChangeText={() => {}}
        />
      </View>
    </SafeAreaView>
  );
};

export default Search;
