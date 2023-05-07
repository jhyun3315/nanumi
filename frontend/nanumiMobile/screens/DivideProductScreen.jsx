import React from 'react';
import DivideProduct from '../components/product/DivideProduct';

const DivideProductScreen = ({navigation, route}) => {
  const {type, userId} = route.params;
  return <DivideProduct navigation={navigation} type={type} userId={userId} />;
};

export default DivideProductScreen;
