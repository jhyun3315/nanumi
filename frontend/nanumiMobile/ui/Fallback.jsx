import React from 'react';
import {View, ActivityIndicator, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

export const Fallback = () => {
  return (
    <View
      style={{
        position: 'absolute',
        zIndex: 1,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: width,
        height: height,
      }}>
      <ActivityIndicator size="large" />
    </View>
  );
};
