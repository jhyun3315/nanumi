import React from 'react';
import {View, Text, Dimensions} from 'react-native';
import {COLORS, FONTS} from '../constants';

const {width, height} = Dimensions.get('window');

const EmptyState = ({children}) => {
  return (
    <View
      style={{
        flex: 1,
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{translateX: -0.18 * width}, {translateY: 0.01 * height}],
      }}>
      <Text
        style={{
          fontFamily: FONTS.bold,
          color: COLORS.primary,
          fontSize: FONTS.font,
        }}>
        {children}
      </Text>
    </View>
  );
};

export default EmptyState;
