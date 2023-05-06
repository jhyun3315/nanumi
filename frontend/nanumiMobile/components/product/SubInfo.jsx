import React from 'react';
import {View, Image, Text} from 'react-native';
import {SIZES, COLORS, SHADOWS, assets, FONTS} from '../../constants';

export const ProductTitle = ({title, titleSize, subTitle, subTitleSize}) => {
  return (
    <View>
      <Text style={{fontFamily: FONTS.medium, fontSize: titleSize}}>
        {title}
      </Text>
      <Text
        style={{
          fontFamily: FONTS.regular,
          fontSize: subTitleSize,
          color: COLORS.primary,
        }}>
        {subTitle}
      </Text>
    </View>
  );
};

export const ProductPrice = () => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <Image
        source={assets.eth}
        resizeMode="contain"
        style={{width: 20, height: 20, marginRight: 20}}
      />
      <Text
        style={{
          fontFamily: FONTS.medium,
          fontSize: SIZES.font,
          color: COLORS.primary,
        }}>
        무료나눔
      </Text>
    </View>
  );
};

export const ImageCmp = ({imgUrl}) => {
  return (
    <Image
      source={imgUrl}
      resizeMode="contain"
      style={{
        width: 48,
        height: 48,
        marginRight: SIZES.small,
      }}
    />
  );
};

export const People = () => {
  return (
    <View style={{flexDirection: 'row'}}>
      <ImageCmp imgUrl={assets.person01} />
    </View>
  );
};

export const EndDate = () => {
  return (
    <View
      style={{
        paddingHorizontal: SIZES.font,
        paddingVertical: SIZES.font,
        backgroundColor: COLORS.white,
        justifyContent: 'center',
        alignItems: 'center',
        ...SHADOWS.light,
        elevation: 1,
        maxWidth: '50%',
      }}>
      <Text
        style={{
          fontFamily: FONTS.bold,
          fontSize: SIZES.small,
          color: COLORS.primary,
        }}>
        시작
      </Text>
      <Text
        style={{
          fontFamily: FONTS.light,
          fontSize: SIZES.medium,
          color: COLORS.primary,
        }}>
        19:00
      </Text>
    </View>
  );
};

export const SubInfo = () => {
  return (
    <View
      style={{
        width: '100%',
        paddingHorizontal: SIZES.font,
        marginTop: -SIZES.extraLarge,
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
      <People />
      <EndDate />
    </View>
  );
};
