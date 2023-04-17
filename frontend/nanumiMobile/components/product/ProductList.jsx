import React from 'react';
import ProductCard from './ProductCard';
import Header from '../../ui/Header';
import {COLORS} from '../../constants';
import {View, FlatList, StyleSheet} from 'react-native';

const ProductList = ({isSearch, data}) => {
  return (
    <View style={styles.container}>
      <View style={styles.flatListWrapper}>
        <FlatList
          data={data}
          renderItem={({item}) => <ProductCard data={item} />}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={isSearch ? '' : <Header />}
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

export default ProductList;
