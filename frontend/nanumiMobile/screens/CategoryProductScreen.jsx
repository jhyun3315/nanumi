import React from 'react';
import CategoryProduct from '../components/home/CategoryProduct';

const CategoryProductScreen = ({route}) => {
  const {categoryKey, categoryName} = route.params;
  return (
    <CategoryProduct categoryKey={categoryKey} categoryName={categoryName} />
  );
};

export default CategoryProductScreen;
