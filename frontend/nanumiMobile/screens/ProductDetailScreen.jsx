import React from 'react';
import ProductDetail from '../components/product/ProductDetail';

const ProductDetailScreen = ({route, navigation}) => {
  return <ProductDetail route={route} navigation={navigation} />;
};

export default ProductDetailScreen;
