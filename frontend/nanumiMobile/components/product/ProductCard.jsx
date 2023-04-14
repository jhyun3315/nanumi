import React from 'react';
import {View, Image, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {COLORS, SIZES, SHADOWS, assets} from '../../constants';
import {ProductPrice, ProductTitle, SubInfo} from './SubInfo';
import {RectButton} from '../../ui/Button';

const ProductCard = ({data}) => {
  const navigation = useNavigation();

  return (
    <View
      style={{
        backgroundColor: COLORS.white,
        borderRadius: SIZES.font,
        marginBottom: SIZES.extraLarge,
        margin: SIZES.base,
        ...SHADOWS.dark,
      }}>
      <View style={{width: '100%', height: 250}}>
        <Image
          source={data.image}
          resizeMode="cover"
          style={{
            width: '100%',
            height: '100%',
            borderTopLeftRadius: SIZES.font,
            borderTopRightRadius: SIZES.font,
          }}
        />
      </View>
      <SubInfo />
      <View style={{width: '100%', padding: SIZES.font}}>
        <ProductTitle title={data.name} titlSize={SIZES.large} />
        <View
          style={{
            marginTop: SIZES.font,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <ProductPrice />
          <RectButton
            minWidth={120}
            fontSize={SIZES.font}
            handlePress={() => navigation.navigate('Detail', {data})}
          />
        </View>
      </View>
    </View>
  );
};

export default ProductCard;
