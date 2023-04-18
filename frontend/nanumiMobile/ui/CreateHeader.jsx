import React from 'react';
import {StatusBar, View, StyleSheet} from 'react-native';
import {CircleButton, RectButton} from './Button';
import {SIZES, assets} from '../constants';

export const CreateHeader = ({navigation}) => (
  <View style={styles.header}>
    <CircleButton
      imgUrl={assets.left}
      handlePress={() => {
        navigation.goBack();
      }}
      left={16}
      top={StatusBar.currentHeight - 12}
    />
    <RectButton
      minWidth={64}
      handlePress={() => console.log('등록')}
      position={'absolute'}
      right={16}
      top={StatusBar.currentHeight - 12}>
      등록
    </RectButton>
  </View>
);

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    marginBottom: SIZES.base,
  },
});
