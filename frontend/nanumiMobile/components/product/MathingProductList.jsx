import React from 'react';
import {View, FlatList, StyleSheet, Image} from 'react-native';
import {ProductPrice, ProductTitle, SubInfo} from './SubInfo';
import {productState} from '../../state/product';
import {COLORS, SHADOWS, SIZES} from '../../constants';
import {useRecoilValue} from 'recoil';
import {RectButton} from '../../ui/Button';
import {BackHeader} from '../../ui/BackHeader';

const MatchingProductListItem = ({data}) => {
  return (
    <View
      style={{
        backgroundColor: COLORS.white,
        borderRadius: SIZES.font,
        marginBottom: SIZES.extraLarge,
        margin: SIZES.base,
        ...SHADOWS.dark,
      }}>
      <View style={styles.imageContainer}>
        <Image
          source={{uri: data.image[0]}}
          resizeMode="contain"
          style={styles.image}
        />
      </View>
      <SubInfo isMatching={true} />
      <View style={styles.textContainer}>
        <ProductTitle title={data.name} titlSize={SIZES.large} />
        <View style={styles.priceButtonContainer}>
          <ProductPrice />
          <RectButton
            minWidth={64}
            fontSize={SIZES.font}
            handlePress={() => console.log('이동')}>
            매칭인원
          </RectButton>
        </View>
      </View>
    </View>
  );
};

const MatchingProductList = ({navigation}) => {
  const data = useRecoilValue(productState);

  return (
    <View style={styles.container}>
      <BackHeader navigation={navigation} />
      <View style={styles.flatListWrapper}>
        <FlatList
          data={data}
          renderItem={({item}) => <MatchingProductListItem data={item} />}
          keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainerStyle}
        />
      </View>
      <View style={styles.backgroundWrapper}>
        <View style={styles.backgroundTop} />
        <View style={styles.backgroundBottom} />
      </View>
    </View>
  );
};

export default MatchingProductList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatListWrapper: {
    zIndex: 0,
    flex: 1,
  },
  contentContainerStyle: {
    paddingBottom: 16,
  },
  backgroundWrapper: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    zIndex: -1,
  },
  backgroundTop: {
    height: 200,
    backgroundColor: COLORS.white,
  },
  backgroundBottom: {
    flex: 1,
    backgroundColor: COLORS.white,
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
