import React from 'react';
import {View, StatusBar, StyleSheet} from 'react-native';
import {CircleButton, MoreButton} from './Button';
import {COLORS, SIZES, assets} from '../constants';

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

export const MoreHeader = ({navigation}) => {
  return (
    <View style={styles.header}>
      <CircleButton
        imgUrl={assets.left}
        handlePress={() => {
          navigation.goBack();
        }}
        left={16}
        top={StatusBar.currentHeight - 12}
      />
      <MoreButton
        minWidth={48}
        handlePress={() => console.log('모달띄우기')}
        position={'absolute'}
        right={16}
        top={StatusBar.currentHeight - 12}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SIZES.base * 2,
  },
});
