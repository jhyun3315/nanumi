import React from 'react';
import {View, StatusBar, StyleSheet, Text} from 'react-native';
import {CircleButton, MoreButton, RectButton} from './Button';
import {COLORS, FONTS, SIZES, assets} from '../constants';

export const BackHeader = ({navigation, children}) => {
  return (
    <View
      style={{
        width: '100%',
        height: 60,
        backgroundColor: COLORS.white,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View>
        <Text
          style={{
            fontFamily: FONTS.bold,
            fontSize: SIZES.large,
            color: COLORS.primary,
          }}>
          {children}
        </Text>
      </View>
      <CircleButton
        imgUrl={assets.left}
        handlePress={() => {
          navigation.goBack();
        }}
        left={16}
      />
    </View>
  );
};

export const CloseHeader = ({handlePress, children}) => {
  return (
    <View
      style={{
        width: '100%',
        height: 60,
        backgroundColor: COLORS.white,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <CircleButton imgUrl={assets.left} handlePress={handlePress} left={16} />
      <View>
        <Text
          style={{
            fontFamily: FONTS.bold,
            fontSize: SIZES.large,
            color: COLORS.primary,
          }}>
          {children}
        </Text>
      </View>
    </View>
  );
};

export const CreateHeader = ({
  navigation,
  handlePress,
  children,
  isDisable,
}) => (
  <View
    style={{
      width: '100%',
      height: 60,
      flexDirection: 'row',
      marginBottom: SIZES.base * 2,
    }}>
    <CircleButton
      imgUrl={assets.left}
      handlePress={() => {
        navigation.goBack();
      }}
      left={16}
      top={StatusBar.currentHeight - 16}
    />
    <RectButton
      isDisable={isDisable}
      minWidth={64}
      handlePress={handlePress}
      position={'absolute'}
      right={16}
      top={StatusBar.currentHeight - 16}>
      {children}
    </RectButton>
  </View>
);

export const MoreHeader = ({navigation, handlePresentModalPress}) => {
  return (
    <View style={styles.header}>
      <CircleButton
        imgUrl={assets.left}
        handlePress={() => {
          navigation.goBack();
        }}
        left={16}
      />
      <MoreButton
        minWidth={40}
        minHeight={40}
        handlePress={handlePresentModalPress}
        position={'absolute'}
        right={16}
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
  username: {
    fontFamily: FONTS.medium,
    color: COLORS.primary,
    fontSize: SIZES.base * 1.4,
  },
  temperature: {
    fontFamily: FONTS.medium,
    color: COLORS.primary,
    fontSize: SIZES.base * 1.4,
  },
});
