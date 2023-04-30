import React from 'react';
import Icon from 'react-native-ionicons';
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
  isDisable,
  ...props
}) => {
  return (
    <Pressable
      style={{
        minWidth: minWidth,
        backgroundColor: isDisable ? COLORS.disable : COLORS.blue,
        borderRadius: SIZES.extraLarge,
        padding: SIZES.small,
        ...props,
      }}
      onPress={handlePress}
      disabled={isDisable}>
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

export const CategoryButton = ({minWidth, handlePress}) => {
  return (
    <Pressable
      style={{
        minWidth: minWidth,
        backgroundColor: COLORS.violet,
        borderRadius: SIZES.extraLarge,
        padding: SIZES.small,
        position: 'absolute',
        bottom: 15,
        right: 15,
      }}
      onPress={handlePress}>
      <Icon name="cube" color={COLORS.white} />
    </Pressable>
  );
};

export const MoreButton = ({minWidth, minHeight, handlePress, ...props}) => {
  return (
    <Pressable
      style={{
        minWidth: minWidth,
        minHeight: minHeight,
        backgroundColor: COLORS.violet,
        borderRadius: minWidth / 2,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        ...props,
      }}
      onPress={handlePress}>
      <Icon name="more" color={COLORS.white} size={SIZES.extraLarge} />
    </Pressable>
  );
};
