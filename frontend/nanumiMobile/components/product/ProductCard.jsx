import React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {COLORS, SIZES, SHADOWS} from '../../constants';
import {ProductPrice, ProductTitle, SubInfo} from './SubInfo';
import {RectButton} from '../../ui/Button';

const ProductCard = ({data}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{uri: data.productImageUrl}}
          resizeMode="contain"
          style={styles.image}
        />
      </View>
      <SubInfo />
      <View style={styles.textContainer}>
        <ProductTitle title={data.name} titlSize={SIZES.large} />
        <View style={styles.priceButtonContainer}>
          <ProductPrice />
          <RectButton
            minWidth={120}
            fontSize={SIZES.font}
            handlePress={() => navigation.navigate('Detail', {data})}>
            상세정보
          </RectButton>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.font,
    marginBottom: SIZES.extraLarge,
    margin: SIZES.base,
    ...SHADOWS.dark,
  },
  imageContainer: {
    width: '100%',
    height: 250,
  },
  image: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: SIZES.font,
    borderTopRightRadius: SIZES.font,
  },
  textContainer: {
    width: '100%',
    padding: SIZES.font,
  },
  priceButtonContainer: {
    marginTop: SIZES.font,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default ProductCard;
