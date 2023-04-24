import React from 'react';
import ProductCard from './ProductCard';
import {COLORS} from '../../constants';
import {View, FlatList, StyleSheet} from 'react-native';
import {useRecoilValue} from 'recoil';
import {productState} from '../../state/product';
import {BackHeader} from '../../ui/BackHeader';

const DivideProduct = ({navigation}) => {
  const data = useRecoilValue(productState);
  return (
    <View style={styles.container}>
      <BackHeader navigation={navigation}>나눔 상품</BackHeader>
      <View style={styles.flatListWrapper}>
        <FlatList
          data={data}
          renderItem={({item}) => <ProductCard data={item} />}
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

export default DivideProduct;

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
});
