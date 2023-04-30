import React, {useEffect} from 'react';

import {SafeAreaView, StyleSheet} from 'react-native';
import {COLORS} from '../../constants';
import {CategoryButton} from '../../ui/Button';
import {useNavigation} from '@react-navigation/native';
import {useRecoilValue} from 'recoil';
import {productState} from '../../state/product';
import FocusedStatusBar from '../../ui/FocusedStatusBar';
import ProductList from '../product/ProductList';
import {requestGetAllProduct} from '../../api/product';

const Home = () => {
  const navigation = useNavigation();
  const data = useRecoilValue(productState);

  useEffect(() => {
    const test = () => {
      const response = requestGetAllProduct();
      console.log(response);
    };
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <FocusedStatusBar background={COLORS.secondary} />
      <ProductList isSearch={false} data={data} />
      <CategoryButton
        minwidth={48}
        handlePress={() => navigation.navigate('Category')}
      />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
