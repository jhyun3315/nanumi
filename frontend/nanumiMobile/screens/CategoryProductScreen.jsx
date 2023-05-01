import React from 'react';
import CategoryProduct from '../components/home/CategoryProduct';

const CategoryProductScreen = ({route}) => {
  const {categoryKey} = route.params;
  return <CategoryProduct categoryKey={categoryKey} />;
};

export default CategoryProductScreen;
