import React from 'react';
import {Pressable, View, Text, Image} from 'react-native';
import {COLORS, SIZES, SHADOWS, FONTS} from '../constants';

export const CircleButton = ({imgUrl, handlePress, ...props}) => {
  return (
    <Pressable
      style={{
        width: 40,
        height: 40,
        backgroundColor: COLORS.white,
        position: 'absolute',
        borderRadius: SIZES.extraLarge,
        alignItems: 'center',
        justifyContent: 'center',
        ...SHADOWS.light,
        ...props,
      }}
      onPress={handlePress}>
      <Image
        source={imgUrl}
        resizeMode="contain"
        style={{
          width: 24,
          height: 24,
        }}
      />
    </Pressable>
  );
};

export const RectButton = ({
  minWidth,
  fontSize,
  handlePress,
  children,
  ...props
}) => {
  return (
    <Pressable
      style={{
        minWidth: minWidth,
        backgroundColor: COLORS.violet,
        borderRadius: SIZES.extraLarge,
        padding: SIZES.small,
        ...props,
      }}
      onPress={handlePress}>
      <Text
        style={{
          fontFamily: FONTS.medium,
          fontSize: fontSize,
          color: COLORS.white,
          textAlign: 'center',
        }}>
        {children}
      </Text>
    </Pressable>
  );
};
