import React from 'react';
import {View, StatusBar} from 'react-native';
import {CircleButton} from './Button';
import {COLORS, assets} from '../constants';

export const BackHeader = ({navigation}) => {
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

export const CloseHeader = ({setModalVisible}) => {
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
          setModalVisible(false);
        }}
        left={16}
        top={StatusBar.currentHeight - 12}
      />
    </View>
  );
};
