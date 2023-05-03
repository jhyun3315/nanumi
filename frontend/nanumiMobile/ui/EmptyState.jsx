import React from 'react';
import {View, Text, Dimensions} from 'react-native';
import {COLORS, FONTS} from '../constants';

const {width, height} = Dimensions.get('window');

const EmptyState = () => {
  return (
    <View
      style={{
        flex: 1,
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{translateX: -0.15 * width}, {translateY: 0.01 * height}],
      }}>
      <Text
        style={{
          fontFamily: FONTS.bold,
          color: COLORS.primary,
          fontSize: FONTS.font,
        }}>
        데이터가 없습니다.
      </Text>
    </View>
  );
};

export default EmptyState;
