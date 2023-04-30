import React, {useEffect} from 'react';

import {Alert, SafeAreaView, StyleSheet} from 'react-native';
import {COLORS} from '../../constants';
import {CategoryButton} from '../../ui/Button';
import {useNavigation} from '@react-navigation/native';
import {useRecoilValue} from 'recoil';
import {productState} from '../../state/product';
import FocusedStatusBar from '../../ui/FocusedStatusBar';
import ProductList from '../product/ProductList';
import {requestGetAllProduct} from '../../api/product';
import {useQuery} from '@tanstack/react-query';
import {Fallback} from '../../ui/Fallback';
import {showErrorAlert} from '../../ui/Alert';

const Home = () => {
  const navigation = useNavigation();
  const data = useRecoilValue(productState);

  // const {data, isLoading, error} = useQuery(
  //   ['allProduct'],
  //   requestGetAllProduct,
  // );

  // console.log('data', data);
  // console.log('isLoading', isLoading);
  // console.log('error', error);

  // if (isLoading) return <Fallback />;
  // if (error) {
  //   showErrorAlert('데이터를 가져오는데 문제가생겼습니다.', navigation);
  // }
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
