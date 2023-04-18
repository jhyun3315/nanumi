import React from 'react';
import {View, StatusBar} from 'react-native';
import {CircleButton} from './Button';
import {COLORS, assets} from '../constants';

const BackHeader = ({navigation}) => {
  return (
    <View
      style={{
        width: '100%',
        height: 60,
        backgroundColor: COLORS.white,
      }}>
      <CircleButton
        imgUrl={assets.left}
        handlePress={() => {
          navigation.goBack();
        }}
        left={16}
        top={StatusBar.currentHeight - 12}
      />
    </View>
  );
};

export default BackHeader;
