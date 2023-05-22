import React from 'react';
import {View, Image, Text, Pressable} from 'react-native';
import {SIZES, COLORS, SHADOWS, assets, FONTS} from '../../constants';
import {useNavigation} from '@react-navigation/native';

export const ProductTitle = ({title, titleSize, subTitle, subTitleSize}) => {
  return (
    <View>
      <Text
        style={{
          fontFamily: FONTS.medium,
          fontSize: titleSize,
          color: COLORS.primary,
        }}>
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
        borderRadius: SIZES.extraLarge,
      }}
    />
  );
};

export const People = ({data}) => {
  const navigation = useNavigation();
  return (
    <Pressable
      style={{flexDirection: 'row'}}
      onPress={() =>
        navigation.navigate('OtherProfile', {userId: data?.userId})
      }>
      <ImageCmp imgUrl={{uri: data?.userProfileUrl}} />
    </Pressable>
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
        14:00
      </Text>
    </View>
  );
};

export const SubInfo = ({isMatching, data}) => {
  return (
    <View
      style={{
        width: '100%',
        paddingHorizontal: SIZES.font,
        marginTop: -SIZES.extraLarge,
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
      <People data={data} />
      {!isMatching && <EndDate />}
    </View>
  );
};
