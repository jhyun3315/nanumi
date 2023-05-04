import React from 'react';
import DivideProduct from '../components/product/DivideProduct';

const DivideProductScreen = ({navigation, route}) => {
  const {type} = route.params;
  return <DivideProduct navigation={navigation} type={type} />;
};

export default DivideProductScreen;
