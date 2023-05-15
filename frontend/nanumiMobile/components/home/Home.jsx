import React from 'react';

import {SafeAreaView, StyleSheet} from 'react-native';
import {COLORS, Data} from '../../constants';
import FocusedStatusBar from '../../ui/FocusedStatusBar';
import ProductList from '../product/ProductList';

const Home = () => {
  return (
    <SafeAreaView style={styles.container}>
      <FocusedStatusBar background={COLORS.secondary} />
      <ProductList isSearch={false} data={Data} />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
