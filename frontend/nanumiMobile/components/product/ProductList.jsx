import React from 'react';
import ProductCard from './ProductCard';
import Header from '../../ui/Header';
import {COLORS} from '../../constants';
import {View, FlatList} from 'react-native';

const ProductList = ({isSearch, data}) => {
  return (
    <View style={{flex: 1}}>
      <View style={{zIndex: 0}}>
        <FlatList
          data={data}
          renderItem={({item}) => <ProductCard data={item} />}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={isSearch ? '' : <Header />}
        />
      </View>
      <View
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          zIndex: -1,
        }}>
        <View style={{height: 200, backgroundColor: COLORS.white}} />
        <View style={{flex: 1, backgroundColor: COLORS.white}} />
      </View>
    </View>
  );
};

export default ProductList;
