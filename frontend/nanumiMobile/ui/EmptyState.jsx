import React from 'react';
import {View, Text} from 'react-native';
import {COLORS, FONTS} from '../constants';

const EmptyState = () => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
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
